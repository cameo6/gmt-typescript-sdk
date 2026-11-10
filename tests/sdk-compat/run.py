"""Run installed SDKs against a shared HTTP fixture on an ephemeral port."""

import json
import os
from pathlib import Path
import subprocess
import sys
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from urllib.parse import parse_qs, urlsplit


NOW = "2026-01-01T00:00:00.000Z"
ERROR = {
    "code": 401,
    "status": "UNAUTHENTICATED",
    "message": "Invalid credentials",
    "details": [{"reason": "INVALID_TOKEN", "domain": "gmt"}],
}


def purchase(id_, status):
    return {
        "id": id_,
        "country_code": "US",
        "created_at": NOW,
        "display_name": {"en": "United States", "ru": "США"},
        "emoji": "🇺🇸",
        "price": {"amount": "1.00", "currency_code": "USD"},
        "purchase_source": "API",
        "purchase_type": "SINGLE",
        "status": status,
        "code_page": {"title": "GMT", "description": None, "logo_url": None, "support_url": None},
    }


class FixtureServer(ThreadingHTTPServer):
    # Wait for timed-out request handlers before closing the test process.
    daemon_threads = False


class GmtHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/v1/purchases/" or self.headers.get("x-api-key") != "test-api-key":
            self.respond(401, ERROR)
            return

        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        if body != {"country_code": "US"} or self.headers.get("Idempotency-Key") != "test-order":
            self.respond(400, {"message": "Unexpected purchase body or idempotency key"})
            return

        self.respond(200, purchase(103, "PENDING"))

    def do_GET(self):
        url = urlsplit(self.path)
        if url.path == "/v1/service/health":
            slow = self.headers.get("x-test-slow-response") == "true"
            if slow:
                time.sleep(1)
            try:
                self.respond(200, {"status": "ok", "now": NOW, "uptimeSeconds": 42})
            except (BrokenPipeError, ConnectionResetError):
                if not slow:
                    raise
            return

        if url.path == "/v1/purchases-by-hash/order%2F103":
            self.respond(200, purchase(103, "PENDING"))
            return

        if url.path in ("/v1/purchases/history", "/v1/purchases/bulk"):
            item = (
                {**purchase(103, "PENDING"), "kind": "purchase"}
                if url.path.endswith("/history")
                else {"bulk_purchase_id": 104, "country_code": "US", "quantity": 2,
                      "status": "PENDING", "created_at": NOW, "refunded_quantity": 0,
                      "total_price": {"amount": "2.00", "currency_code": "USD"}}
            )
            self.respond(200, {"items": [item], "pagination": {
                "current_page": 1, "page_size": 1, "total_items": 1, "total_pages": 1,
                "has_next": False, "has_previous": False,
            }})
            return

        if url.path != "/v1/purchases/":
            self.respond(404, {"message": "Unexpected endpoint"})
            return

        if not (
            self.headers.get("x-api-key") == "test-api-key"
            or self.headers.get("Authorization") == "Bearer test-bearer"
        ):
            self.respond(401, ERROR)
            return

        query = parse_qs(url.query)
        page = query.get("page")
        if page not in (["1"], ["2"]) or query.get("page_size") != ["1"]:
            self.respond(400, {"message": "Unexpected pagination query"})
            return

        page_number = int(page[0])
        self.respond(200, {
            "items": [purchase(100 + page_number, "SUCCESS")],
            "pagination": {
                "current_page": page_number,
                "page_size": 1,
                "has_next": page_number == 1,
                "has_previous": page_number == 2,
                "total_items": 2,
                "total_pages": 2,
            },
        })

    def respond(self, status, body):
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)


def main():
    commands = {
        "js": ["node", "--test", "javascript.test.mjs"],
        "python": [sys.executable, "-m", "unittest", "test_python"],
    }
    selected = sys.argv[1:] or list(commands)
    if any(language not in commands for language in selected):
        raise SystemExit("Usage: run.py [js] [python]")

    with FixtureServer(("127.0.0.1", 0), GmtHandler) as server:
        worker = Thread(target=server.serve_forever, daemon=True)
        worker.start()
        env = {
            **os.environ,
            "SDK_TEST_URL": f"http://127.0.0.1:{server.server_port}",
        }
        env.pop("GMT_API_KEY", None)
        try:
            results = [
                subprocess.run(
                    commands[language], cwd=Path(__file__).resolve().parent,
                    env=env, timeout=45, check=False,
                ).returncode
                for language in selected
            ]
            return int(any(results))
        finally:
            server.shutdown()
            worker.join()


if __name__ == "__main__":
    sys.exit(main())
