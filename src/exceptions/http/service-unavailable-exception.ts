import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class ServiceUnavailableException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 503, ...options });
  }
}
