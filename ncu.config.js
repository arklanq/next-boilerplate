const heldAtCurrentMajor = new Set([
  // Keep Node types aligned with the project's Node.js 26 (fallback) runtime (Bun is primary).
  "@types/node",

  // eslint-plugin-react still declares eslint ^9.7 as its peer.
  "eslint",
  "@eslint/js",

  // typescript-eslint still declares TypeScript >=4.8.4 <6.1.0 as its peer.
  "typescript",

  // jsdom 30 fails to initialize under Bun 1.4.2.
  "jsdom"
]);

/** @type {import("npm-check-updates").RunOptions} */
const config = {
  target(packageName) {
    return heldAtCurrentMajor.has(packageName) ? "minor" : "latest";
  }
};

export default config;
