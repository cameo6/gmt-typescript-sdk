"""Check Mintlify snippets against the public methods of the installed SDKs."""

import ast
import inspect
import json
from pathlib import Path
import sys


def check_python(source, client):
    tree = ast.parse(source)
    for call in (node for node in ast.walk(tree) if isinstance(node, ast.Call)):
        member = call.func
        parts = []
        while isinstance(member, ast.Attribute):
            parts.append(member.attr)
            member = member.value
        if not (isinstance(member, ast.Name) and member.id == "client"):
            continue
        method = client
        for name in reversed(parts):
            method = getattr(method, name)
        inspect.signature(method).bind(
            *[None for _ in call.args], **{keyword.arg: None for keyword in call.keywords}
        )


def main():
    spec = json.loads(Path(sys.argv[1]).read_text())
    operations = [operation for item in spec["paths"].values() for operation in item.values()
                  if isinstance(operation, dict) and operation.get("operationId")]
    if not operations:
        raise ValueError("No OpenAPI operations to check")
    if sys.argv[2] == "python":
        from gmt import Gmt
        with Gmt(base_url="http://127.0.0.1:1") as client:
            for operation in operations:
                sample = next(s for s in operation["x-codeSamples"] if s["lang"] == "python")
                check_python(sample["source"], client)
    else:
        target = Path(sys.argv[2])
        for index, operation in enumerate(operations):
            sample = next(s for s in operation["x-codeSamples"] if s["lang"] == "javascript")
            (target / f"example-{index}.mts").write_text(
                "declare const process: { env: Record<string, string | undefined> };\n"
                + sample["source"] + "\n"
            )
    print(f"Checked example sources for {len(operations)} operations")


if __name__ == "__main__":
    main()
