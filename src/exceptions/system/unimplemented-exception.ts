import { Exception } from "enhanced-exception";

export class UnimplementedException extends Exception {
  public constructor(message?: string) {
    super(message ?? "Not implemented!");
  }
}
