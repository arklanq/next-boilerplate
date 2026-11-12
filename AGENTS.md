# Agent guide

Read [README.md](README.md) for the project's purpose and commands. Open only the relevant guide for the task:

- [docs/reuse.md](docs/reuse.md) locates reusable modules and explains the directory structure.
- [docs/testing.md](docs/testing.md) describes the current test setup and where new tests belong.
- [docs/upgrade-hints.md](docs/upgrade-hints.md) describes the upgrade hints attached to each release, and how to write and apply them.

Before adding a helper, component, or folder, inspect the existing equivalent. Keep changes scoped to the requested feature and update the relevant guide if its documented behavior changes.

Build UI with [ui-sdk](https://github.com/vercel-labs/ui) (`@ui-sdk/react`). Before using it, follow the `ui-sdk` skill if it's installed, and read `node_modules/@ui-sdk/react/docs/llms.txt`. To build a new component, also search `node_modules/@ui-sdk/react/docs/core.md` by heading, and read `rendering.md` next to it.

A directory's `.gitkeep` is a Markdown note on what the directory holds and its rules. Read it when you explore the repository or work in that directory, and keep it current when the directory's role changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
