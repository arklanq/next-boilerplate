import { Exception } from "enhanced-exception";

export class RequestAbortedException extends Exception {
  public constructor(message?: string, cause?: unknown) {
    super(message ?? "Request was aborted.", cause);
  }
}
