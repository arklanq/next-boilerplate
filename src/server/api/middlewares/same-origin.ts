import type { NextRequest } from "next/server";
import { appBaseUrl } from "@/config/app-base-url/app-base-url";
import { ForbiddenException } from "@/exceptions/http/forbidden-exception";
import type { RouteContext } from "@/types/next/route-context";
import type { NextCallback } from "../composable-api-middleware-interface";

// State-changing requests must come from the app's own pages, never from another site (CSRF).
export async function sameOrigin(req: NextRequest, _ctx: RouteContext, next: NextCallback): Promise<Response> {
  if (req.headers.get("origin") !== appBaseUrl()) {
    throw new ForbiddenException({ message: "Request origin not allowed." });
  }
  return next(req);
}
