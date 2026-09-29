import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class BadRequestException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 400, ...options });
  }
}
