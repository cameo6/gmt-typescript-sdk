"""Check the public Python operation surface and the public response models."""

import ast
import json
from response_models import generate_purchase_models


RESPONSE_MODELS = {
    "getV1PurchasesHistory": ("purchases/purchases", "PurchaseHistoryResponse", "purchases/list_responses", "PurchaseHistoryResponse", ()),
    "getV1PurchasesBulk": ("purchases/bulk", "BulkListResponse", "purchases/list_responses", "BulkListResponse", ()),
    "getV1ServiceHealth": ("service", "ServiceHealthCheckResponse", "service_health_check_response", "ServiceHealthCheckResponse", ()),
    "getV1ServiceTime": ("service", "ServiceGetServerTimeResponse", "service_get_server_time_response", "ServiceGetServerTimeResponse", ()),
    "getV1Accounts": ("accounts", "AccountListResponse", "account_list_response", "AccountListResponse", ("properties", "items", "items")),
    "getV1AccountsCountries": ("accounts", "AccountListCountriesResponse", "account_list_countries_response", "AccountListCountriesResponse", ("properties", "items", "items")),
    "getV1AccountsByCountry_code": ("accounts", "AccountRetrieveResponse", "account_retrieve_response", "AccountRetrieveResponse", ()),
    "getV1Profile": ("profile/profile", "ProfileRetrieveResponse", "profile_retrieve_response", "ProfileRetrieveResponse", ()),
    "getV1ProfileDiscount": ("profile/discount", "DiscountRetrieveResponse", "profile/discount_retrieve_response", "DiscountRetrieveResponse", ()),
    "getV1ProfileReferral": ("profile/referral/referral", "ReferralRetrieveResponse", "profile/referral_retrieve_response", "ReferralRetrieveResponse", ()),
    "getV1ProfileReferralTransaction": ("profile/referral/transaction", "TransactionListResponse", "profile/referral/transaction_list_response", "TransactionListResponse", ("properties", "items", "items")),
    "postV1ProfileReferralTransfer-balance": ("profile/referral/referral", "ReferralTransferBalanceResponse", "profile/referral_transfer_balance_response", "ReferralTransferBalanceResponse", ()),
    "patchV1ProfileChange-password": ("profile/profile", "ProfileChangePasswordResponse", "profile_change_password_response", "ProfileChangePasswordResponse", ()),
    "patchV1ProfileChange-login": ("profile/profile", "ProfileChangeLoginResponse", "profile_change_login_response", "ProfileChangeLoginResponse", ()),
    "patchV1ProfileUnbind-telegram": ("profile/profile", "ProfileUnbindTelegramResponse", "profile_unbind_telegram_response", "ProfileUnbindTelegramResponse", ()),
    "patchV1ProfileLanguage": ("profile/profile", "ProfileChangeLanguageResponse", "profile_change_language_response", "ProfileChangeLanguageResponse", ()),
    "postV1WebhooksTest": ("webhooks", "WebhookTestResponse", "webhook_test_response", "WebhookTestResponse", ()),
    "postV1Purchases": ("purchases/purchases", "PurchaseCreateResponse", "purchase_create_response", "PurchaseCreateResponse", ()),
    "getV1PurchasesByPurchase_id": ("purchases/purchases", "PurchaseRetrieveResponse", "purchase_retrieve_response", "PurchaseRetrieveResponse", ()),
    "getV1Purchases": ("purchases/purchases", "PurchaseListResponse", "purchase_list_response", "PurchaseListResponse", ("properties", "items", "items")),
    "postV1PurchasesByPurchase_idRefund": ("purchases/purchases", "PurchaseRefundResponse.Purchase", "purchase_refund_response", "Purchase", ("properties", "purchase")),
    "postV1PurchasesByPurchase_idRequest-code": ("purchases/purchases", "PurchaseRequestVerificationCodeResponse.Purchase", "purchase_request_verification_code_response", "Purchase", ("properties", "purchase")),
    "getV1Purchases-by-hashByHash": ("purchases-by-hash", "PurchasesByHashRetrieveResponse", "purchases_by_hash_retrieve_response", "PurchasesByHashRetrieveResponse", ()),
    "postV1Purchases-by-hashByHashRequest-code": ("purchases-by-hash", "PurchasesByHashRequestVerificationCodeResponse.Purchase", "purchases_by_hash_request_verification_code_response", "Purchase", ("properties", "purchase")),
    "postV1PurchasesBulk": ("purchases/bulk", "BulkCreateResponse", "purchases/bulk_create_response", "BulkCreateResponse", ()),
    "getV1PurchasesBulkByPurchase_id": ("purchases/bulk", "BulkRetrieveResponse", "purchases/bulk_retrieve_response", "BulkRetrieveResponse", ()),
}


def python_surface(resources):
    surfaces = {"sync": {}, "async": {}}
    for file in sorted(resources.rglob("*.py")):
        tree = ast.parse(file.read_text())
        for cls in (node for node in tree.body if isinstance(node, ast.ClassDef)):
            for fn in cls.body:
                if not isinstance(fn, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    continue
                for call in ast.walk(fn):
                    if not isinstance(call, ast.Call) or not isinstance(call.func, ast.Attribute) or not call.args:
                        continue
                    route = call.args[0]
                    if isinstance(route, ast.Call) and isinstance(route.func, ast.Name) and route.func.id == "path_template":
                        route = route.args[0]
                    if not (isinstance(route, ast.Subscript) and isinstance(route.value, ast.Name)
                            and route.value.id == "OPERATIONS" and isinstance(route.slice, ast.Constant)):
                        continue
                    variant = "async" if cls.name.startswith("Async") else "sync"
                    verb = call.func.attr.removeprefix("_")
                    verb = "GET" if verb == "get_api_list" else verb.upper()
                    key = route.slice.value
                    if key in surfaces[variant]:
                        raise ValueError(f"Duplicate Python {variant} implementation: {key}")
                    surfaces[variant][key] = {
                        "method": f"{cls.name}.{fn.name}",
                        "signature": ast.unparse(fn.args),
                        "verb": verb,
                        "coroutine": isinstance(fn, ast.AsyncFunctionDef),
                    }
    return surfaces


def check_python_surface(resources, operations, baseline):
    actual = python_surface(resources)
    for variant, surface in actual.items():
        expected = {name: verb for name, (verb, _) in operations.items()}
        if {name: entry["verb"] for name, entry in surface.items()} != expected:
            raise ValueError(f"Python {variant} SDK coverage differs from OpenAPI")
    for variant, entries in baseline.items():
        for name, entry in entries.items():
            if actual[variant].get(name) != entry:
                raise ValueError(f"Python {variant} public method changed: {entry['method']}")


def python_model_fields(file, name, purchase_fields):
    tree = ast.parse(file.read_text())
    model = next(cls for cls in tree.body if isinstance(cls, ast.ClassDef) and cls.name == name)
    fields = set(purchase_fields) if any(
        isinstance(base, ast.Name) and base.id == "PurchaseResponseFields" for base in model.bases
    ) else set()
    for field in model.body:
        if not isinstance(field, ast.AnnAssign):
            continue
        keywords = field.value.keywords if isinstance(field.value, ast.Call) else []
        aliases = [keyword.value.value for keyword in keywords if keyword.arg == "alias"]
        fields.add(aliases[0] if aliases else field.target.id)
    return fields


def schema_shape(schema):
    shape = {
        key: schema[key]
        for key in ("$ref", "type", "format", "nullable", "enum", "const")
        if key in schema
    }
    if "required" in schema:
        shape["required"] = sorted(schema["required"])
    if "properties" in schema:
        shape["properties"] = {name: schema_shape(field) for name, field in schema["properties"].items()}
    if "items" in schema:
        shape["items"] = schema_shape(schema["items"])
    for key in ("oneOf", "anyOf", "allOf"):
        if key in schema:
            shape[key] = [schema_shape(part) for part in schema[key]]
    return shape


def response_schemas(spec, operations):
    for name, (method, path) in operations.items():
        content = spec["paths"][path][method.lower()]["responses"]["200"].get("content", {})
        if "application/json" in content:
            yield name, content["application/json"]["schema"]


def write_model_contract(spec, operations, js, py, out):
    schemas = dict(response_schemas(spec, operations))
    if schemas.keys() != RESPONSE_MODELS.keys():
        raise ValueError("JSON response operations and SDK model mappings differ")

    models = []
    for name, schema in schemas.items():
        js_file, js_model, py_file, py_model, model_path = RESPONSE_MODELS[name]
        for segment in model_path:
            schema = schema[segment]
        models.append((schema["properties"], js_file, js_model, py_file, py_model))

    purchase_fields = generate_purchase_models((fields for fields, *_ in models), js, py)
    checks = []
    for fields, js_file, js_model, py_file, py_model in models:
        expected = set(fields)
        if py is not None:
            actual = python_model_fields(py / "types" / (py_file + ".py"), py_model, purchase_fields)
            if actual != expected:
                raise ValueError(f"{py_model}: missing {sorted(expected - actual)}, unexpected {sorted(actual - expected)}")
        checks.append({"file": js_file, "model": js_model, "fields": sorted(expected)})

    if js is not None:
        out.write_text(json.dumps({"models": checks, "purchaseFields": sorted(purchase_fields)}))
