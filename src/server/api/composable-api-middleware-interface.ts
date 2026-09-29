import type { NextRequest } from "next/server";
import type { RouteContext } from "@/types/next/route-context";

export type NextCallback<TR extends NextRequest = NextRequest> = (transformedRequest: TR) => Promise<Response>;

export type ComposableApiMiddlewareInterface<
  R extends NextRequest = NextRequest,
  TR extends NextRequest = NextRequest
> = (request: R, context: RouteContext, next: NextCallback<TR>) => Response | Promise<Response>;
