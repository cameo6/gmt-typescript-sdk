#!/bin/sh
set -eu

repo=$(CDPATH='' cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo"
artifacts="${1:-$repo/artifacts}"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir "$work/build" "$work/compat"

sh scripts/sdk/generate.sh javascript "$work/build"

(
  cd "$work/build/javascript"
  npm ci --registry=https://registry.npmjs.org --ignore-scripts --no-audit --no-fund
  node scripts/check-contract.cjs "$work/build/response-contract.json"
  npm run build
)

archive=$(npm pack "$work/build/javascript/dist" --ignore-scripts --pack-destination "$work")
cp tests/sdk-compat/run.py tests/sdk-compat/javascript.test.mjs tests/sdk-compat/types.mts "$work/compat/"
npm install --prefix "$work/compat" --registry=https://registry.npmjs.org --ignore-scripts --no-audit --no-fund \
  "$work/$archive" typescript@5.9.3

python3 tests/sdk-compat/check-examples.py "$work/build/openapi.json" "$work/compat"
"$work/compat/node_modules/.bin/tsc" --noEmit --strict --target ES2022 --module NodeNext --skipLibCheck \
  "$work/compat/types.mts" "$work/compat"/example-*.mts
SDK_COMPAT_RELEASE=1 python3 "$work/compat/run.py" js

mkdir -p "$artifacts"
artifacts=$(cd -- "$artifacts" && pwd)
(
  cd "$work"
  shasum -a 256 "$archive" > SHA256SUMS
  cp "$archive" SHA256SUMS "$artifacts/"
)
