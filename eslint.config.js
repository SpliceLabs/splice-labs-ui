import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next", "dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // ─── Boundary: Ban fetch() outside @acme/api-client ───────────────
  {
    files: [
      "src/packages/contracts/**/*.{ts,tsx}",
      "src/packages/core/**/*.{ts,tsx}",
      "src/packages/ui-universal/**/*.{ts,tsx}",
      "src/packages/features/**/*.{ts,tsx}",
      "src/packages/platform/**/*.{ts,tsx}",
      "src/packages/config/**/*.{ts,tsx}",
      "src/packages/observability/**/*.{ts,tsx}",
      "src/screens/**/*.{ts,tsx}",
      "src/app/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "Direct fetch() is banned. Use @acme/api-client instead.",
        },
      ],
    },
  },

  // ─── Boundary: Ban react-router outside web-vite shell ────────────
  {
    files: [
      "src/packages/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-router-dom",
              message: "Shared packages must not import react-router-dom. Use @acme/core route IDs + href() instead.",
            },
            {
              name: "react-router",
              message: "Shared packages must not import react-router. Use @acme/core route IDs + href() instead.",
            },
            {
              name: "next/navigation",
              message: "Shared packages must not import next/navigation.",
            },
            {
              name: "next/router",
              message: "Shared packages must not import next/router.",
            },
            {
              name: "expo-router",
              message: "Shared packages must not import expo-router.",
            },
          ],
        },
      ],
    },
  },
);
