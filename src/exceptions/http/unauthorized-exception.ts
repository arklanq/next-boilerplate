import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class UnauthorizedException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 401, ...options });
  }
}
