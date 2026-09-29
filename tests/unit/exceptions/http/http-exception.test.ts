import { describe, expect, it } from "vitest";
import { HttpException } from "@/exceptions/http/http-exception";
import { getHttpStatus } from "@/utils/http-status/get-http-status";

describe("getHttpStatus", () => {
  it("looks up the message and code for a known status", () => {
    expect(getHttpStatus(404)).toEqual({ message: "Not Found", code: "NOT_FOUND" });
  });

  it("returns fallback values for an unknown status", () => {
    expect(getHttpStatus(999)).toEqual({ message: "HTTP 999", code: "UNKNOWN" });
  });
});

describe("HttpException", () => {
  it("uses the status lookup and preserves an explicit message", () => {
    expect(new HttpException({ status: 404 }).serialize()).toEqual({
      status: 404,
      code: "NOT_FOUND",
      message: "Not Found",
      details: undefined
    });
    expect(new HttpException({ status: 404, message: "Missing post" }).message).toBe("Missing post");
  });
});
