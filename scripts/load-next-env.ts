import { createRequire } from "node:module";

// @next/env is CommonJS and does not expose named ESM exports under Node.js 24.
const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env") as typeof import("@next/env");

// Import this side-effect module first so `.env*` values load before other modules read `process.env`.
loadEnvConfig(process.cwd(), process.env["NODE_ENV"] !== "production");
