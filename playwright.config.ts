import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "node_modules/.cache/playwright-results",
  reporter: "list",
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bun run build && bun run start",
    url: baseURL,
    env: { HOSTNAME: "127.0.0.1", PORT: "3100" },
    reuseExistingServer: false,
    timeout: 120_000
  }
});
