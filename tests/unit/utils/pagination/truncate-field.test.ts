import { describe, expect, it } from "vitest";
import { DEFAULT_TRUNCATION_LIMIT, truncateField, TRUNCATION_MARKER } from "@/utils/pagination/truncate-field";

describe("truncateField", () => {
  it("returns the original value when length is at or below the limit", () => {
    const value = "a".repeat(DEFAULT_TRUNCATION_LIMIT);
    expect(truncateField(value)).toEqual({ value, truncated: false });
  });

  it("truncates and appends the marker when over the limit", () => {
    const value = "a".repeat(DEFAULT_TRUNCATION_LIMIT + 50);
    const result = truncateField(value);
    expect(result.truncated).toBe(true);
    expect(result.value).toBe("a".repeat(DEFAULT_TRUNCATION_LIMIT) + TRUNCATION_MARKER);
  });

  it("respects a custom limit", () => {
    const result = truncateField("hello world", 5);
    expect(result.truncated).toBe(true);
    expect(result.value).toBe("hello" + TRUNCATION_MARKER);
  });

  it("does not truncate an empty string", () => {
    expect(truncateField("")).toEqual({ value: "", truncated: false });
  });
});
