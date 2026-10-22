import { describe, expect, it } from "bun:test";
import { buildPagination } from "@/utils/pagination/paginated-data";

describe("buildPagination", () => {
  it("computes totalPages from total / perPage", () => {
    expect(buildPagination({ total: 100, page: 1, perPage: 20 })).toEqual({
      page: 1,
      perPage: 20,
      total: 100,
      totalPages: 5
    });
  });

  it("rounds totalPages up when total is not a multiple of perPage", () => {
    const result = buildPagination({ total: 101, page: 1, perPage: 20 });
    expect(result.totalPages).toBe(6);
  });

  it("returns totalPages=0 for an empty collection", () => {
    expect(buildPagination({ total: 0, page: 1, perPage: 20 })).toEqual({
      page: 1,
      perPage: 20,
      total: 0,
      totalPages: 0
    });
  });

  it("preserves the requested page even when it is beyond totalPages", () => {
    const result = buildPagination({ total: 10, page: 99, perPage: 20 });
    expect(result.page).toBe(99);
    expect(result.totalPages).toBe(1);
  });
});
