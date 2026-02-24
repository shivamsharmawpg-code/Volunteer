#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:-https://indiaheritage.ca/}"
OUTPUT_DIR="${2:-indiaheritage.ca}"

wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-parent \
  "$TARGET_URL" \
  -P "$OUTPUT_DIR"
