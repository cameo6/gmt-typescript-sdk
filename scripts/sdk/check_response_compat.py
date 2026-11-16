"""Check that the candidate preserves the previously published response shapes."""

import json
import sys

from contract import response_schemas, schema_shape


def response_shapes(spec):
    operations = {
        operation["operationId"]: (method.upper(), path)
        for path, item in spec["paths"].items()
        for method, operation in item.items()
        if isinstance(operation, dict) and "operationId" in operation
    }
    return {name: schema_shape(schema) for name, schema in response_schemas(spec, operations)}


def compare(previous, candidate, path):
    """Check existing fields and types recursively. New response fields are allowed."""
    for key in ("$ref", "type", "format", "nullable", "enum", "const"):
        if previous.get(key) != candidate.get(key):
            yield f"{path}: changed {key}"

    old_fields = previous.get("properties", {})
    new_fields = candidate.get("properties", {})
    old_required = set(previous.get("required", []))
    new_required = set(candidate.get("required", []))
    for name, schema in old_fields.items():
        field_path = f"{path}.{name}"
        if name not in new_fields:
            yield f"{field_path}: removed response field"
            continue
        if (name in old_required) != (name in new_required):
            yield f"{field_path}: changed required status"
        yield from compare(schema, new_fields[name], field_path)

    for key in ("items", "oneOf", "anyOf", "allOf"):
        old = previous.get(key)
        new = candidate.get(key)
        if old is None and new is None:
            continue
        if isinstance(old, dict) and isinstance(new, dict):
            yield from compare(old, new, f"{path}.{key}")
        elif isinstance(old, list) and isinstance(new, list) and len(old) == len(new):
            for index, (before, after) in enumerate(zip(old, new)):
                yield from compare(before, after, f"{path}.{key}[{index}]")
        else:
            yield f"{path}: changed {key}"


def main():
    with open(sys.argv[1]) as file:
        previous = response_shapes(json.load(file))
    with open(sys.argv[2]) as file:
        candidate = response_shapes(json.load(file))
    errors = []
    for name, schema in previous.items():
        if name not in candidate:
            errors.append(f"{name}: removed JSON response")
        else:
            errors.extend(compare(schema, candidate[name], name))
    if errors:
        sys.exit("\n".join(errors))


if __name__ == "__main__":
    main()
