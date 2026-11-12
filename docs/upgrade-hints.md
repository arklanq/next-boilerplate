# Upgrade hints

Projects created from this template drift away from it, so a plain merge of a newer template version rarely applies cleanly. Every release after the first (`v1.0.0`) therefore ships upgrade hints: a short Markdown file that tells an AI agent how to bring a derived project to that release.

## Template version

[`.template-version`](../.template-version) holds the tag of the template release the code is based on, for example `v1.1.0`, on a single line. A derived project inherits it and changes it only after applying a release's hints, so it always shows where the next update starts. Create projects from a release tag rather than from `main`, because `main` can be ahead of the version in the file.

Projects created from `v1.0.0` have no `.template-version`, because the file was added in `v1.1.0`. Treat a missing file as `v1.0.0`.

## Release contents

Every release newer than `v1.0.0` includes:

- An asset named `upgrade-hints.md`. The name is the same in every release, so tools can download it without knowing the version.
- Release notes that end with this fixed footer, copied without changes:

```markdown
---

**Upgrade hints:** projects created from this template can update to this release by following `upgrade-hints.md` in the release assets. The file is written for AI agents; see [the upgrade hints guide](https://github.com/arklanq/next-boilerplate/blob/main/docs/upgrade-hints.md).
```

## Hints file format

The file covers the changes between the previous release and this one. It starts with the version range and gets one section per change that a derived project should apply:

```markdown
# Upgrade hints: v1.0.0 → v1.1.0

Apply to a project on template v1.0.0. Skip a hint when the project no longer has the part it changes.

## Replace Tailwind CSS with CSS Modules (#8)

- **Change:** what the template changed and why, in one or two sentences.
- **Action:** the steps, with file paths, package names and commands.
- **Check:** how to confirm the result, for example `bun run test`.
```

Write the hints for an agent that knows the derived project but not the template's history:

- Use imperative steps with concrete paths, packages and commands. Link the pull request for the full diff instead of copying it.
- Say how to tell whether a hint applies, for example "if `src/app/globals.css` still imports Tailwind", because derived projects may have removed or rewritten that part.
- Mark a change as optional when the project works without it.
- Skip changes with no effect on derived projects, such as template documentation or CI-only edits that projects don't copy. For dependency updates, name only the updates that need code or configuration changes, and otherwise say to run `bun run updates:force`.
- Keep each section short. When a change needs no action, leave it out.

## Publishing a release

1. List the changes since the previous release with `git log --oneline <previous-tag>..origin/main` and read their pull requests.
2. Write the release notes and end them with the footer above.
3. Write `upgrade-hints.md` in the format above.
4. Set `.template-version` to the new tag, merge that change into `main`, and tag the merge commit, so the tagged code names its own version.
5. Create the release with the hints as an asset:

```bash
gh release create <tag> --verify-tag --title <tag> --notes-file release-notes.md upgrade-hints.md
```

6. Confirm the asset is attached with `gh release view <tag> --json assets`.

## Applying the hints in a derived project

1. Read the project's template version from `.template-version`, or work it out as described in [Template version](#template-version) when the file is missing.
2. List the newer releases with `gh release list --repo arklanq/next-boilerplate`.
3. For each newer release, oldest first, download its hints and apply them:

```bash
gh release download <tag> --repo arklanq/next-boilerplate --pattern upgrade-hints.md --dir <empty-directory>
```

4. Run the project's checks after each release, so a failure points to one release's hints.
5. Set `.template-version` to that release's tag before moving to the next one.
