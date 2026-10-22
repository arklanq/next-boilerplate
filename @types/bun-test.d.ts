import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { expect } from "bun:test";

// Types the @testing-library/jest-dom matchers registered in `tests/unit/setup.ts`.
declare module "bun:test" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Matchers<T = any> extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, T> {}
}
