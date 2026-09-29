import { Exception } from "enhanced-exception";

export class AccessDeniedException extends Exception {
  public constructor(message?: string, cause?: unknown) {
    super(message ?? "Access denied", cause);
  }
}
