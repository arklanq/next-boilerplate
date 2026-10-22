import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { NextRequest } from "next/server";
import { appBaseUrl } from "@/config/app-base-url/app-base-url";
import { ApiMiddlewareBuilder } from "@/server/api/api-middleware-builder";
import { errorInterceptor } from "@/server/api/middlewares/error-interceptor";
import { sameOrigin } from "@/server/api/middlewares/same-origin";

const origin = "http://localhost:3000";
const context = { params: Promise.resolve({}) };
const handler = mock(async () => new Response(null, { status: 204 }));
const route = new ApiMiddlewareBuilder().apply(errorInterceptor).apply(sameOrigin).apply(handler).build();
const post = (headers: Record<string, string>) => new NextRequest(`${origin}/api`, { method: "POST", headers });

const initialBaseUrl = process.env.APP_BASE_URL;

beforeEach(() => {
  handler.mockClear();
  process.env.APP_BASE_URL = origin;
});
afterEach(() => {
  if (initialBaseUrl === undefined) delete process.env.APP_BASE_URL;
  else process.env.APP_BASE_URL = initialBaseUrl;
});

describe("same-origin middleware", () => {
  it.each<Record<string, string>>([{}, { origin: "https://foreign.example" }, { origin: "http://127.0.0.1:3000" }])(
    "rejects a request from another origin (%j) before the handler",
    async (headers) => {
      const response = await route(post(headers), context);
      expect(response.status).toBe(403);
      expect(await response.json()).toMatchObject({ success: false, message: "Request origin not allowed." });
      expect(handler).not.toHaveBeenCalled();
    }
  );

  it("passes a request from the app's own origin to the handler", async () => {
    expect((await route(post({ origin }), context)).status).toBe(204);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("appBaseUrl", () => {
  it("defaults to the Next.js development origin", () => {
    delete process.env.APP_BASE_URL;
    expect(appBaseUrl()).toBe("http://localhost:3000");
  });

  it.each(["ftp://example.com", "https://user:secret@example.com", "http://example.com"])(
    "rejects an unsafe origin %j",
    (value) => {
      process.env.APP_BASE_URL = value;
      expect(() => appBaseUrl()).toThrow();
    }
  );
});
