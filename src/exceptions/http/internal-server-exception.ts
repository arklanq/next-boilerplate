import { HttpException, type HttpExceptionOptions } from "./http-exception";

export class InternalServerException extends HttpException {
  public constructor(options: Omit<HttpExceptionOptions, "status" | "exposeDetails"> = {}) {
    super({ status: 500, ...options, exposeDetails: false });
  }
}
