# Testing

Unit tests run with Bun's built-in test runner (`bun test`). [`bunfig.toml`](../bunfig.toml) limits it to `tests/unit` and preloads [`tests/unit/setup.ts`](../tests/unit/setup.ts). Tests import their API (`describe`, `it`, `expect`, `mock`, ...) from `bun:test`.

- `tests/unit/**/*.{test,spec}.tsx` run with a [happy-dom](https://github.com/capricorn86/happy-dom) DOM, React Testing Library and the `@testing-library/jest-dom` matchers.
- `tests/unit/**/*.{test,spec}.ts` run without a DOM and keep Bun's native `fetch`, `Request` and `Response`, which happy-dom would replace.

The unit scripts pass `--parallel`, which runs files in worker processes and implies `--isolate`, so every file gets a fresh global and the setup decides per file whether to register the DOM. Use the scripts, or add `--parallel` or `--isolate` yourself: a plain `bun test` over several files runs the setup once, so every file gets the first file's environment and the no-DOM tests fail.

React Testing Library unmounts rendered components after every test by itself, because Bun exposes `afterEach` globally. Do not add `afterEach(cleanup)` to test files.

Put focused tests near the matching feature area. The [homepage unit test](../tests/unit/app/home-page.test.tsx) renders a component with the DOM. The [pagination tests](../tests/unit/utils/pagination/pagination-input.test.ts) show the no-DOM pattern.

The [homepage browser test](../tests/e2e/home-page.spec.ts) uses Playwright in Chromium to check the production build, visible heading, and browser errors. Install the browser once with `bunx --bun playwright install chromium`, then run `bun run test:e2e`. [`playwright.config.ts`](../playwright.config.ts) builds and starts Next.js for the test.

Run `bun run test` for the unit and browser tests. `bun run test:ci` also runs both and stops the unit tests at the first failure. Use `bun run test:unit`, `bun run test:watch` or `bun run test:e2e` to run a group separately. The other quality commands are listed in [README.md](../README.md).
