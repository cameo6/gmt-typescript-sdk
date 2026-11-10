#!/bin/sh
set -eu

if [ "$#" -lt 2 ] || [ "$#" -gt 3 ]; then
  echo "Usage: $0 javascript|python <empty-work-directory> [--update]" >&2
  exit 2
fi

language=$1
workdir=$(cd -- "$2" && pwd)
mode=${3:-}
if [ -n "$mode" ] && [ "$mode" != "--update" ]; then
  echo "Expected --update or no third argument" >&2
  exit 2
fi

case "$language" in
  javascript)
    generated='src/internal/operations.ts src/internal/code-page.ts'
    ;;
  python)
    generated='src/gmt/_operations.py src/gmt/types/code_page.py'
    ;;
  *)
    echo "Unknown SDK language: $language" >&2
    exit 2
    ;;
esac

mkdir "$workdir/$language"
cp -R src "$workdir/$language/"
case "$language" in
  javascript)
    cp package.json package-lock.json tsconfig*.json README.md LICENSE "$workdir/$language/"
    mkdir "$workdir/$language/scripts"
    cp scripts/build scripts/stage-esm.cjs scripts/check-contract.cjs "$workdir/$language/scripts/"
    cp -R scripts/utils "$workdir/$language/scripts/"
    ;;
  python)
    cp pyproject.toml README.md LICENSE "$workdir/$language/"
    ;;
esac
cp openapi.json "$workdir/openapi.json"
mkdir "$workdir/codegen"
cp -R scripts/sdk/templates "$workdir/codegen/"
cp scripts/sdk/config.yaml "$workdir/codegen/"

if ! docker run --rm --network none --user "$(id -u):$(id -g)" \
  -v "$workdir:/work" -w /work \
  openapitools/openapi-generator-cli:v7.17.0@sha256:868b97eb4e5080d2cdfd5b3eeaa4d52e4bbb7c56f14e234b08b0b0bc4f38a78f \
  generate -i openapi.json -g typescript-fetch -c codegen/config.yaml -o manifest \
  --global-property apis,supportingFiles=operations.tsv > "$workdir/generator.log" 2>&1; then
  cat "$workdir/generator.log" >&2
  exit 1
fi
mv "$workdir/manifest/operations.tsv" "$workdir/operations.tsv"
python3 -B scripts/sdk/generate.py "$language" "$workdir"

for file in $generated; do
  if [ "$mode" = "--update" ]; then
    cp "$workdir/$language/$file" "$file"
  elif ! diff -u "$file" "$workdir/$language/$file"; then
    echo "Generated SDK source is out of date: $file. Rerun with --update." >&2
    exit 1
  fi
done
