# Next Boilerplate

A small Next.js App Router starter for building a new application. It ships reusable UI and API utilities, while the homepage remains a placeholder.

## Included

- Next.js 16, React 19, TypeScript, Tailwind CSS 4, and React Compiler.
- A root layout with TanStack Query, URL state, toast notifications, and a shell.
- Composable API middleware, structured HTTP exceptions, and response types.
- Pagination, text truncation, shared hooks, and unit and browser test setup.

The starter does not include a database, authentication, or an MCP server.

## Run

The package declares Node.js 26 or newer. The commands below use Bun.

```bash
bun ci
bun run dev
```

Open <http://localhost:3000>. Replace the placeholder in [`src/app/page.tsx`](src/app/page.tsx) and the metadata in [`src/app/layout.tsx`](src/app/layout.tsx) when starting an application.

## Check

Install Chromium once with `bunx playwright install chromium` before running the tests.

```bash
bun run type:check
bun run lint:check
bun run test
bun run build
```

See [the reuse guide](docs/reuse.md) for existing modules and directory roles, [testing](docs/testing.md) for test conventions, and [AGENTS.md](AGENTS.md) for agent instructions.
