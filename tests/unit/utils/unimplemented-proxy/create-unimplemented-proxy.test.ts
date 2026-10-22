import { describe, expect, it } from "bun:test";
import { UnimplementedException } from "@/exceptions/system/unimplemented-exception";
import { createUnimplementedProxy } from "@/utils/unimplemented-proxy/create-unimplemented-proxy";

describe("createUnimplementedProxy", () => {
  it("throws UnimplementedException when reading any property", () => {
    const proxy = createUnimplementedProxy<{ foo: unknown }>();
    expect(() => proxy.foo).toThrow(UnimplementedException);
  });

  it("throws UnimplementedException when writing any property", () => {
    const proxy = createUnimplementedProxy<{ bar: number }>();
    expect(() => {
      proxy.bar = 1;
    }).toThrow(UnimplementedException);
  });

  it("propagates the provided message", () => {
    const proxy = createUnimplementedProxy<{ foo: unknown }>("UserContext used outside its provider");
    expect(() => proxy.foo).toThrow("UserContext used outside its provider");
  });

  it("falls back to the default message when none is provided", () => {
    const proxy = createUnimplementedProxy<{ foo: unknown }>();
    expect(() => proxy.foo).toThrow("Not implemented!");
  });
});
