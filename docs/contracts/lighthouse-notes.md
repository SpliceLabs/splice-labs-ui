# Lighthouse CI — Operational Notes

> **STATUS**: ACTIVE  
> **VERSION**: 1.0.0  
> **LAST UPDATED**: 2026-03-04

---

## 1. Running Lighthouse CI Locally

### 1.1 Prerequisites

```bash
npm install -g @lhci/cli
```

### 1.2 Steps

1. Build the production app:
   ```bash
   npm run build
   ```

2. Serve the production build:
   ```bash
   npx vite preview --port 4173
   ```

3. Run LHCI against the URL list:
   ```bash
   lhci autorun --config=/config/lighthouserc.json
   ```

### 1.3 Configuration Files

| File | Path | Purpose |
|------|------|---------|
| LHCI config | `/config/lighthouserc.json` | Defines collect, assert, and upload settings |
| URL list | `/config/lighthouse-urls.txt` | One path per line (e.g., `/`, `/decks`, `/logos`) |
| CI script | `/scripts/lighthouse-ci.sh` | Wrapper script for CI environments |

---

## 2. Deterministic Audit Configuration

The LHCI config (`/config/lighthouserc.json`) MUST include:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["<read from /config/lighthouse-urls.txt>"],
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

A separate mobile run MUST use `"preset": "mobile"` (or `"emulatedFormFactor": "mobile"`).

---

## 3. Adding New Routes to Audit

1. Open `/config/lighthouse-urls.txt`.
2. Add the new route path on a new line (e.g., `/new-page`).
3. Routes MUST be relative paths. The base URL is configured in the LHCI collect settings or CI script.

---

## 4. Running in CI

The CI script (`/scripts/lighthouse-ci.sh`) MUST:

1. Build the app (`npm run build`).
2. Start a preview server in the background.
3. Wait for the server to be ready.
4. Run `lhci autorun --config=/config/lighthouserc.json`.
5. Capture exit code and fail the pipeline if any assertion fails.
6. Kill the preview server.

---

## 5. Interpreting Results

- **PASS**: All assertions in the config pass across all 3 runs (median used).
- **FAIL**: Any assertion failure. The LHCI output will list the failing metric, the measured value, and the threshold.
- Results SHOULD be uploaded to a Lighthouse CI server or stored as artifacts for historical tracking.
