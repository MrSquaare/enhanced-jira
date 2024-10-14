import js from "@eslint/js";
import importX from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  prettier,
  {
    rules: {
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
      "react/jsx-sort-props": ["warn"],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["off"],
    },
  },
];
