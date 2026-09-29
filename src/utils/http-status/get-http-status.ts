import httpStatus from "http-status";

export function getHttpStatus(status: number): { message: string; code: string } {
  const message: unknown = Reflect.get(httpStatus, status);
  const code: unknown = Reflect.get(httpStatus, `${status}_NAME`);

  return {
    message: typeof message === "string" ? message : `HTTP ${status}`,
    code: typeof code === "string" ? code : "UNKNOWN"
  };
}
