import { Exception } from "enhanced-exception";
import { getHttpStatus } from "@/utils/http-status/get-http-status";

export type StructuredErrorPayload = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};

export type HttpExceptionOptions = {
  status: number;
  message?: string;
  details?: unknown;
  /** Defaults to `true` when `status < 500` (client errors are safe to expose). */
  exposeDetails?: boolean;
  cause?: unknown;
};

export class HttpException extends Exception {
  public readonly status: number;
  public readonly details: unknown;
  public readonly exposeDetails: boolean;

  public constructor(options: HttpExceptionOptions) {
    const { status, message, details, exposeDetails, cause } = options;
    const fallbackMessage = getHttpStatus(status).message;
    super(message ?? fallbackMessage, cause);
    this.status = status;
    this.details = details;
    this.exposeDetails = exposeDetails != null ? exposeDetails : status < 500;
  }

  public get code(): string {
    return getHttpStatus(this.status).code;
  }

  public serialize(): StructuredErrorPayload {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      details: this.exposeDetails ? this.details : undefined
    };
  }
}
