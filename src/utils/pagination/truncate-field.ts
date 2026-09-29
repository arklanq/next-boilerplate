export const DEFAULT_TRUNCATION_LIMIT = 500;
export const TRUNCATION_MARKER = "… [truncated]";

export type TruncatedField = {
  value: string;
  truncated: boolean;
};

/**
 * Per-field text truncation. Use for long free-form columns in list
 * responses so a single page does not blow the agent's context window.
 *
 * Callers should expose `truncated: true` alongside the value (e.g. as
 * `bodyTruncated`) and document how to fetch the full record (e.g.
 * `get_post` with the row's id).
 */
export function truncateField(value: string, limit: number = DEFAULT_TRUNCATION_LIMIT): TruncatedField {
  if (value.length <= limit) {
    return { value, truncated: false };
  }
  return {
    value: value.slice(0, limit) + TRUNCATION_MARKER,
    truncated: true
  };
}
