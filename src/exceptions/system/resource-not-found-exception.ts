import { Exception } from "enhanced-exception";

export class ResourceNotFoundException extends Exception {
  public constructor(message: string = "Resource not found", cause?: unknown) {
    super(message, cause);
  }
}
