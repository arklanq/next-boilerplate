# Testing

[`vitest.config.ts`](../vitest.config.ts) defines two unit test projects:

- `tests/unit/**/*.{test,spec}.tsx` runs in jsdom with React Testing Library and the polyfills in [`tests/unit/setup.ts`](../tests/unit/setup.ts).
- `tests/unit/**/*.{test,spec}.ts` runs in Vitest's `node` environment without DOM setup.

Put focused tests near the matching feature area. The [homepage unit test](../tests/unit/app/home-page.test.tsx) renders a component in jsdom. The [pagination tests](../tests/unit/utils/pagination/pagination-input.test.ts) show the `node` environment pattern.

The [homepage browser test](../tests/e2e/home-page.spec.ts) uses Playwright in Chromium to check the production build, visible heading, and browser errors. Install the browser once with `bunx playwright install chromium`, then run `bun run test:e2e`. [`playwright.config.ts`](../playwright.config.ts) builds and starts Next.js for the test.

Vitest runs under Bun for both projects. The `node` environment selects Node-compatible globals, not the process runtime. `jsdom` currently uses 29.1.1 and stays on major 29 because version 30 fails to initialize under Bun 1.4.2.

Run `bun run test` for the unit and browser tests. `bun run test:ci` also runs both, with coverage for the unit tests. Use `bun run test:unit` or `bun run test:e2e` to run either group separately. The other quality commands are listed in [README.md](../README.md).
