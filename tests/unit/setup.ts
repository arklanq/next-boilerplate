// Preloaded by `bun test` (see bunfig.toml). With `--parallel` (or `--isolate`) it runs once
// per test file in a fresh global, so only `*.tsx` tests get a DOM; `*.ts` tests keep Bun's
// native globals (fetch, Request, Response, ...), which happy-dom would replace.
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect } from "bun:test";

declare global {
  var __UI_SDK_STRICT__: boolean | undefined;
}

// Bun imports a CSS module as an empty object, so `styles.logo` would be undefined; return the class name itself.
Bun.plugin({
  name: "css-modules",
  setup(build) {
    build.onLoad({ filter: /\.module\.css$/ }, () => ({
      contents: "export default new Proxy({}, { get: (_, key) => (typeof key === 'string' ? key : undefined) });",
      loader: "js"
    }));
  }
});

if (Bun.main.endsWith(".tsx")) {
  // Provides window, document, localStorage, ResizeObserver, scrolling, ...
  GlobalRegistrator.register();

  // Turns ui-sdk development warnings, like a part missing a required state, into errors.
  globalThis.__UI_SDK_STRICT__ = true;

  // Extends `expect` with @testing-library/jest-dom matchers (toBeInTheDocument, toHaveClass, ...).
  // Imported after registering because @testing-library/dom reads `document` on load.
  // The types also declare a `default` export that the ES module doesn't have, so leave it out.
  const { default: _, ...matchers } = await import("@testing-library/jest-dom/matchers");
  expect.extend(matchers);
}
