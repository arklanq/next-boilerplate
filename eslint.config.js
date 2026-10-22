import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import { importX } from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import { configs as tseslint } from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = defineConfig([
  // Turns on ESLint's recommended config
  eslint.configs.recommended,
  // Turns on TypeScript-ESLint's recommended config
  tseslint.recommended,
  // Tweak TS config options.
  // Type-aware parsing (`projectService`) is intentionally turned off. None of the
  // enabled rules need type information, so building the TS program would cost time
  // for no gain. Turn it back on if a type-checked rule is ever added.
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        warnOnUnsupportedTypeScriptVersion: true
      }
    }
  },
  // Support linting of ES2015+ import/export syntax
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver": {
        typescript: true,
        node: true
      }
    }
  },
  // Automatically sort import/export statements
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]]
        }
      ],
      "simple-import-sort/exports": "warn"
    }
  },
  // Custom rules
  {
    rules: {
      // Intentionally disabled alongside TypeScript's `noFallthroughCasesInSwitch` option
      "no-fallthrough": "off",
      "default-case": "off",
      // Bun's built-in modules (bun:test, ...) have no file to resolve
      "import-x/no-unresolved": ["error", { ignore: ["^bun:"] }],
      // Enforce the use of top-level import type qualifier when TS --verbatimModuleSyntax option is enabled
      "@typescript-eslint/no-import-type-side-effects": "error",
      // Allow unused vars with leading underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Ignore vars starting with underscore
          args: "after-used",
          argsIgnorePattern: "^_", // Ignore args starting with underscore
          ignoreRestSiblings: true
        }
      ],
      // Require explicit accessibility modifiers on class properties and methods
      "@typescript-eslint/explicit-member-accessibility": "error",
      // Annoying if used on purpose
      "@typescript-eslint/no-non-null-assertion": "off",
      // Allow explicit type declarations everywhere
      "@typescript-eslint/no-inferrable-types": "off",
      // Disable explicit function return types
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // Forbid the `React.*` namespace — import symbols directly from "react"
      "no-restricted-syntax": [
        "error",
        {
          selector: 'TSQualifiedName[left.name="React"]',
          message:
            'Do not use the `React.*` namespace. Import the symbol directly, e.g. `import type { ReactNode } from "react"`.'
        },
        {
          selector: 'MemberExpression[object.name="React"]',
          message:
            'Do not use the `React.*` namespace. Import the symbol directly, e.g. `import { useState } from "react"`.'
        }
      ]
    }
  },
  // Next.js specific rules
  ...nextVitals,
  ...nextTs,
  {
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.es2025
      }
    }
  },
  // Turns off all styling rules that might conflict with the formatter (`bun fmt`, Prettier-compatible).
  eslintConfigPrettier
]);

export default eslintConfig;
