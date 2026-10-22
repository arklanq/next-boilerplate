import { describe, expect, it } from "bun:test";
import { BadRequestException } from "@/exceptions/http/bad-request-exception";
import {
  DEFAULT_MAX_RECORDS_PER_PAGE,
  DEFAULT_RECORDS_PER_PAGE,
  paginationQuerySchema,
  parsePaginationFromSearchParams
} from "@/utils/pagination/pagination-input";

describe("paginationQuerySchema", () => {
  it("applies defaults when both params are absent", () => {
    const parsed = paginationQuerySchema.parse({});
    expect(parsed).toEqual({ page: 1, perPage: DEFAULT_RECORDS_PER_PAGE });
  });

  it("coerces numeric strings", () => {
    const parsed = paginationQuerySchema.parse({ page: "3", perPage: "50" });
    expect(parsed).toEqual({ page: 3, perPage: 50 });
  });

  it("rejects page below 1", () => {
    expect(() => paginationQuerySchema.parse({ page: "0" })).toThrow();
  });

  it("rejects perPage above MAX_PER_PAGE", () => {
    expect(() => paginationQuerySchema.parse({ perPage: String(DEFAULT_MAX_RECORDS_PER_PAGE + 1) })).toThrow();
  });

  it("rejects non-integer values", () => {
    expect(() => paginationQuerySchema.parse({ page: "1.5" })).toThrow();
  });
});

describe("parsePaginationFromSearchParams", () => {
  it("returns defaults for empty query string", () => {
    const params = new URLSearchParams();
    expect(parsePaginationFromSearchParams(params)).toEqual({ page: 1, perPage: DEFAULT_RECORDS_PER_PAGE });
  });

  it("reads page and perPage from search params", () => {
    const params = new URLSearchParams("page=4&perPage=10");
    expect(parsePaginationFromSearchParams(params)).toEqual({ page: 4, perPage: 10 });
  });

  it("throws BadRequestException on invalid input", () => {
    const params = new URLSearchParams("page=abc");
    expect(() => parsePaginationFromSearchParams(params)).toThrow(BadRequestException);
  });
});
