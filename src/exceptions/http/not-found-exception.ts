import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class NotFoundException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 404, ...options });
  }
}
