# Reuse guide

Use the existing modules as starting points. The homepage is only a placeholder. Every directory's `.gitkeep` note describes what belongs there.

## UI

- [`src/app/`](../src/app/) contains the active App Router entry points and global styles. [`src/app/layout.tsx`](../src/app/layout.tsx) is the root layout currently used by Next.js.
  - [`src/components/layouts/root-layout/`](../src/components/layouts/root-layout/) offers a default layout with `next-themes`, `NuqsAdapter`, TanStack Query, toast notifications, and [`RootShell`](../src/components/shells/root-shell/root-shell.tsx).
- [`src/config/`](../src/config/) contains font definitions, query client defaults, and toast options.
- `import { cn } from "cn"` merges utility classes.
- [`src/hooks/use-boolean/`](../src/hooks/use-boolean/) provides boolean state helpers.
- [`src/ad-hocs/`](../src/ad-hocs/) contains component wrappers for default props and grouped components.

## API and shared data

- [`src/server/api/`](../src/server/api/) provides a typed middleware chain. A chain needs a final handler that returns a `Response`.
- [`errorInterceptor`](../src/server/api/middlewares/error-interceptor.ts) converts application errors into structured HTTP responses.
- [`src/exceptions/http/`](../src/exceptions/http/) contains HTTP exception classes.
- [`src/types/api/responses.ts`](../src/types/api/responses.ts) defines success and error response shapes.
- Build every API route with `ApiMiddlewareBuilder` and apply `errorInterceptor` first, so all errors share one response format. Handlers report errors by throwing an HTTP exception instead of building an error response.
- Implement shared request checks, such as origin or authentication checks, as middlewares in [`src/server/api/middlewares/`](../src/server/api/middlewares/) rather than as helpers called inside handlers.
- [`sameOrigin`](../src/server/api/middlewares/same-origin.ts) rejects state-changing requests from other sites (CSRF). It compares the `Origin` header with `APP_BASE_URL`, read through [`appBaseUrl`](../src/config/app-base-url/app-base-url.ts). Apply it after `errorInterceptor` on every `POST`, `PUT`, `PATCH` and `DELETE` route.
- [`src/utils/pagination/`](../src/utils/pagination/) contains schemas for numeric inputs and URL query strings, a pagination metadata builder, and per-field text truncation.
- [`src/types/`](../src/types/) contains reusable Next.js and TypeScript types.
- [`src/utils/unimplemented-proxy/`](../src/utils/unimplemented-proxy/) provides a proxy that throws until an implementation is supplied.

## Extension points

- [`src/components/atoms/`](../src/components/atoms/), [`molecules/`](../src/components/molecules/), and [`organisms/`](../src/components/organisms/) are available for new UI components.
- [`src/queries/`](../src/queries/), [`mutations/`](../src/mutations/), [`services/`](../src/services/), and [`models/`](../src/models/) are available for feature data and domain logic.
- [`src/contexts/`](../src/contexts/), [`libs/`](../src/libs/), and [`assets/`](../src/assets/) are available when the feature needs them.

There are no application API routes, services, persistence layer, or MCP transport yet. Add code to these directories only when its responsibility is needed.
