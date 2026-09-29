// Extends Vitest's `expect` with @testing-library/jest-dom matchers
// (toBeInTheDocument, toHaveClass, ...).
import "@testing-library/jest-dom/vitest";

// Map-backed Storage polyfill. Node 22+ exposes a stub `globalThis.localStorage`
// that shadows jsdom's working implementation; this restores DOM-compatible
// behaviour for both production code paths and tests.
function createStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length(): number {
      return store.size;
    },
    clear(): void {
      store.clear();
    },
    getItem(key: string): string | null {
      return store.has(key) ? (store.get(key) ?? null) : null;
    },
    key(index: number): string | null {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    setItem(key: string, value: string): void {
      store.set(key, String(value));
    }
  };
}

// Installs the polyfill on both `globalThis` and `window`.
function installStorage(name: "localStorage" | "sessionStorage"): void {
  const storage = createStorage();
  Object.defineProperty(globalThis, name, { configurable: true, value: storage });
  if (typeof window !== "undefined") {
    Object.defineProperty(window, name, { configurable: true, value: storage });
  }
}

installStorage("localStorage");
installStorage("sessionStorage");

// jsdom does not implement ResizeObserver — stub it so components that observe
// element resizes don't crash during tests.
globalThis.ResizeObserver = class ResizeObserver {
  public observe(): void {}
  public unobserve(): void {}
  public disconnect(): void {}
};

// jsdom does not implement element scrolling — stub these so virtualized lists
// and scroll-on-mount logic don't crash.
Element.prototype.scrollIntoView = function () {};
Element.prototype.scrollTo = function () {};
