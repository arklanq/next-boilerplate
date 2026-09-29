import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class UnprocessableContentException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status"> = {}) {
    super({ status: 422, ...options });
  }
}
