#!/usr/bin/env bash
# Elite performance gate — builds the app and runs Lighthouse CI against the
# audited route set. Config: config/lighthouserc.json. See the
# elite-performance-contract §1.4.
set -euo pipefail

echo "→ Building production bundle…"
npm run build

echo "→ Running Lighthouse CI (5 runs per URL)…"
npx --yes @lhci/cli@0.14.x autorun --config=./config/lighthouserc.json
