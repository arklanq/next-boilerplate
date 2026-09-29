import { type NextRequest, NextResponse } from "next/server";
import { HttpException } from "@/exceptions/http/http-exception";
import { InternalServerException } from "@/exceptions/http/internal-server-exception";
import type { ErrorResponse } from "@/types/api/responses";
import type { RouteContext } from "@/types/next/route-context";
import type { NextCallback } from "../composable-api-middleware-interface";

// Next.js and React use `Error.digest` (string) as a control-flow channel for framework signals such as
// `NEXT_REDIRECT`, `NEXT_NOT_FOUND`, `NEXT_PRERENDER_INTERRUPTED`, and `HANGING_PROMISE_REJECTION`. These must
// bubble up to the runtime instead of being serialized as an HTTP response. Application errors extend
// `HttpException` and never set `digest`, so the presence of a string `digest` is a reliable signal.
function isNextFrameworkSignal(error: unknown): boolean {
  return error instanceof Error && "digest" in error && typeof error.digest === "string";
}

export async function errorInterceptor(req: NextRequest, _ctx: RouteContext, next: NextCallback): Promise<Response> {
  try {
    return await next(req);
  } catch (e: unknown) {
    if (isNextFrameworkSignal(e)) {
      throw e;
    }

    const exception = e instanceof HttpException ? e : new InternalServerException({ cause: e });

    if (exception.status >= 500) {
      console.error(e);
    }

    const body: ErrorResponse = { success: false, ...exception.serialize() };

    return NextResponse.json(body, {
      status: exception.status,
      headers: { "Cache-Control": "no-store" }
    });
  }
}
