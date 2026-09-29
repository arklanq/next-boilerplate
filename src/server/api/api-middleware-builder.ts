import type { NextRequest } from "next/server";
import type { RouteContext } from "@/types/next/route-context";
import type { ApiMiddlewareInterface } from "./api-middleware-interface";
import type { ComposableApiMiddlewareInterface, NextCallback } from "./composable-api-middleware-interface";

type NextCallbackRequestParam<N extends NextCallback> = Parameters<N>[0];
type MiddlewareCallbackParam<M extends ComposableApiMiddlewareInterface> = Parameters<M>[2];
type MiddlewareTransformedRequestType<M extends ComposableApiMiddlewareInterface> = NextCallbackRequestParam<
  MiddlewareCallbackParam<M>
>;

export class ApiMiddlewareBuilder<M extends ComposableApiMiddlewareInterface> {
  private readonly stack: ComposableApiMiddlewareInterface[] = [];

  public apply<SubsequentTransformedRequest extends NextRequest = NextRequest>(
    middleware: ComposableApiMiddlewareInterface<MiddlewareTransformedRequestType<M>, SubsequentTransformedRequest>
  ): ApiMiddlewareBuilder<typeof middleware> {
    this.stack.push(middleware);
    return this;
  }

  public build(): ApiMiddlewareInterface {
    return (rootNextRequest: NextRequest, context: RouteContext): Promise<Response> => {
      const buildSegment = async (segmentNextRequest: NextRequest, segmentIndex: number): Promise<Response> => {
        const middleware: ComposableApiMiddlewareInterface | undefined = this.stack[segmentIndex];

        if (middleware == null) {
          throw new Error(
            'No applied middleware returned a response. The Route Handler is considered the end of the middleware "chain". Handlers must always return a Response object.'
          );
        }

        const next: NextCallback = (req: NextRequest) => buildSegment(req, segmentIndex + 1);

        return middleware(segmentNextRequest, context, next);
      };

      return buildSegment(rootNextRequest, 0);
    };
  }
}
