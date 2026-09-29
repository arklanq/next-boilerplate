import { UnimplementedException } from "@/exceptions/system/unimplemented-exception";

export function createUnimplementedProxy<T extends object = object>(message?: string): T {
  const proxy = new Proxy(
    {},
    {
      get() {
        throw new UnimplementedException(message);
      },
      set() {
        throw new UnimplementedException(message);
      }
    }
  );

  return proxy as unknown as T;
}
