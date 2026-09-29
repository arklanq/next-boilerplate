import type { NextRequest } from "next/server";
import type { RouteContext } from "@/types/next/route-context";

export type ApiMiddlewareInterface = (request: NextRequest, context: RouteContext) => Promise<Response>;
