import { Exception } from "enhanced-exception";

export class InterruptedException extends Exception {
  public constructor(message?: string, previous?: unknown) {
    super(message ?? "Interrupted Exception", previous);
  }
}
