/**
 * @type {import('prettier').Config}
 */
const config = {
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: "none",
  arrowParens: "always",
  experimentalTernaries: true,
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
