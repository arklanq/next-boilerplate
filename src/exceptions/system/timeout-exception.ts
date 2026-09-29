import { Exception } from "enhanced-exception";

export class TimeoutException extends Exception {
  public constructor(message?: string, previous?: unknown) {
    super(message ?? "Timeout Exception", previous);
  }
}
