import { z } from "zod";
import { BadRequestException } from "@/exceptions/http/bad-request-exception";

/**
 * Defaults aligned with the official GitHub MCP server and the
 * cua_version_control_anthropic reference project. `perPage` is a soft
 * default, `DEFAULT_MAX_RECORDS_PER_PAGE` is a hard cap that protects context windows.
 */
export const DEFAULT_RECORDS_PER_PAGE = 20;
export const DEFAULT_MAX_RECORDS_PER_PAGE = 100;

/**
 * Spread into an MCP tool's `inputSchema`. MCP arguments arrive as typed
 * JSON, so the inputs stay numeric — no `z.coerce.*` needed.
 */
export const paginationInputSchema = {
  page: z.number().int().min(1).optional().default(1).describe("Page number (1-based)"),
  perPage: z
    .number()
    .int()
    .min(1)
    .max(DEFAULT_MAX_RECORDS_PER_PAGE)
    .optional()
    .default(DEFAULT_RECORDS_PER_PAGE)
    .describe(`Results per page (max ${DEFAULT_MAX_RECORDS_PER_PAGE})`)
};

/**
 * Variant for HTTP route handlers parsing `URL.searchParams`. Each query
 * param arrives as a string, so `z.coerce.number` runs before validation.
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  perPage: z.coerce.number().int().min(1).max(DEFAULT_MAX_RECORDS_PER_PAGE).optional().default(DEFAULT_RECORDS_PER_PAGE)
});

export type PaginationParams = {
  page: number;
  perPage: number;
};

/**
 * Parse `?page=&perPage=` from a route handler's search params. Throws
 * `BadRequestException` so the standard `errorInterceptor` middleware
 * formats the 400 response — callers do not need their own try/catch.
 */
export function parsePaginationFromSearchParams(searchParams: URLSearchParams): PaginationParams {
  const parsed = paginationQuerySchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    perPage: searchParams.get("perPage") ?? undefined
  });

  if (!parsed.success) {
    throw new BadRequestException({
      message: "Invalid pagination parameters",
      details: parsed.error.issues
    });
  }

  return parsed.data;
}
