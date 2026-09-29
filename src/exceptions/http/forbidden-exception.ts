import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class ForbiddenException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 403, ...options });
  }
}
