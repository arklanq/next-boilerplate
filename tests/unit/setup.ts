// Preloaded by `bun test` (see bunfig.toml). With `--isolate` it runs once per test file
// in a fresh global, so only `*.tsx` tests get a DOM; `*.ts` tests keep Bun's native
// globals (fetch, Request, Response, ...), which happy-dom would replace.
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect } from "bun:test";

if (Bun.main.endsWith(".tsx")) {
  // Provides window, document, localStorage, ResizeObserver, scrolling, ...
  GlobalRegistrator.register();

  // Extends `expect` with @testing-library/jest-dom matchers (toBeInTheDocument, toHaveClass, ...).
  // Imported after registering because @testing-library/dom reads `document` on load.
  // The types also declare a `default` export that the ES module doesn't have, so leave it out.
  const { default: _, ...matchers } = await import("@testing-library/jest-dom/matchers");
  expect.extend(matchers);
}
