import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/app/**/layout.tsx",
        "src/app/**/loading.tsx",
        "src/app/**/not-found.tsx",
        "src/app/**/error.tsx",
        "src/components/ui/**"
      ]
    },
    projects: [
      {
        plugins: [react()],
        resolve: { tsconfigPaths: true },
        test: {
          name: "unit-dom",
          include: ["tests/unit/**/*.{test,spec}.tsx"],
          environment: "jsdom",
          setupFiles: ["./tests/unit/setup.ts"],
          sequence: { groupOrder: 0 }
        }
      },
      {
        resolve: { tsconfigPaths: true },
        test: {
          name: "unit-node",
          include: ["tests/unit/**/*.{test,spec}.ts"],
          environment: "node",
          sequence: { groupOrder: 1 }
        }
      }
    ]
  }
});
