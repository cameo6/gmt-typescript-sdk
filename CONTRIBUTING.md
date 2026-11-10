# Contributing to the JavaScript SDK

Use Node.js 22, Python 3.12, and Docker to run the same checks as CI.

```sh
sh scripts/check-sdk.sh
```

This command regenerates internal routes and models from the checked-in
[OpenAPI contract](openapi.json), checks the response models, and builds the npm
tarball. It installs the tarball in a temporary project to test ESM and CommonJS
imports, runtime behavior, TypeScript declarations, and examples from the API
contract. The tested tarball and its SHA-256 checksum are written to `artifacts/`.

For a local build with the checked-in generated files, use
`npm ci --ignore-scripts` followed by `npm run build`.

Open an issue or pull request here for SDK changes. The
[public API schema](https://api.getmytg.com/docs/openapi.json) is exported by
the backend. Review schema updates alongside the SDK code that implements them.
After updating `openapi.json`, regenerate and commit the internal source files.

```sh
sh scripts/sdk/generate.sh javascript "$(mktemp -d)" --update
```
