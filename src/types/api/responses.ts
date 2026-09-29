import type { StructuredErrorPayload } from "@/exceptions/http/http-exception";

/*
 * Standard success response wrapper.
 */
export type SuccessResponse<T> = {
  success: true;
  data: T;
};

/*
 * Standard HTTP error response with a `success: false` discriminator.
 */
export type ErrorResponse = {
  success: false;
} & StructuredErrorPayload;
