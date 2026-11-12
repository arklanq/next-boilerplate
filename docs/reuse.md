# Reuse guide

Use the existing modules as starting points. The homepage is only a placeholder. Every directory's `.gitkeep` note describes what belongs there.

## UI

- [`src/app/`](../src/app/) contains the active App Router entry points and global styles. [`src/app/layout.tsx`](../src/app/layout.tsx) is the root layout currently used by Next.js.
  - [`src/components/layouts/root-layout/`](../src/components/layouts/root-layout/) offers a default layout with `next-themes`, `NuqsAdapter`, TanStack Query, toast notifications, and [`RootShell`](../src/components/shells/root-shell/root-shell.tsx).
- [`src/config/`](../src/config/) contains font definitions, query client defaults, and toast options.
- [`fonts.ts`](../src/config/fonts/fonts.ts) loads pinned Geist and Geist Mono variable WOFF2 files from [`public/fonts/`](../public/fonts/README.md) through `next/font/local`, keeping `--font-sans` and `--font-mono`. Builds and development do not fetch Google Fonts. The bundled files include Latin and Polish glyphs; their versions, source hashes and license are recorded beside them.
- UI components come from [ui-sdk](https://github.com/vercel-labs/ui). Import each from its own entry, such as `@ui-sdk/react/select`. [`globals.css`](../src/app/globals.css) imports `@ui-sdk/core/web.css` for their default look. Its colors follow the `.dark` class from `next-themes` through `color-scheme`. Theme it with `--ui-*` tokens, which also color the page.
- [`src/hooks/use-boolean/`](../src/hooks/use-boolean/) provides boolean state helpers.
- [`src/ad-hocs/`](../src/ad-hocs/) contains component wrappers for default props and grouped components.

## Styles

Styles are written in CSS Modules; the project has no Tailwind.

- Each component has its own `.module.css` next to its `.tsx`, such as `root-shell/root-shell.tsx` and `root-shell/root-shell.module.css`. Class names are camelCase, and `clsx` joins them.
- A component imports only its own module and the shared module, if one exists. A parent changes a child's look through props (`compact`) or a CSS variable, not by passing its own classes.
- A loading skeleton lives in its own file in the component's folder, such as `odometer/odometer-skeleton.tsx`, with its own module.
- Style a ui-sdk part by giving it a module class and targeting its state attributes, such as `.trigger[data-open]`.
- [`globals.css`](../src/app/globals.css) holds only the layer order, the reset and element styles, the theme switch and `sr-only`. Its layers go from weakest to strongest: `ui-sdk` (`web.css`, with the reset in its `ui-sdk.reset` sublayer) and `ui` for classes shared by many components. `ui-sdk` must stay first: the library also injects its own `<style>` at the top of `<head>`, so a layer meant to sit under it would end up above it. Create the shared module, such as `src/components/ui.module.css`, when the first shared class is needed and wrap its rules in `@layer ui`. Component modules stay outside layers, so they override both whatever order the files load in.

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
