---
name: test-after-pull-request
description: Run the project's test suite after creating or updating a pull request. Use when a PR was just created or updated, when finishing agent work before handoff, or when the user asks to test after a PR.
---

# Test After Pull Request

Verify changes by running tests **after** the pull request exists and changes are pushed. Do not treat a PR as ready until checks pass.

## When to Use

- Immediately after creating or updating a pull request
- At the end of an agent task that opened or modified a PR
- When the user asks to "test after PR", "verify the PR", or "run checks before merge"
- Before marking work complete on a branch with an open PR

## Prerequisites

1. All changes are **committed and pushed** to the PR branch
2. The PR is created or updated for that pushed revision
3. Dependencies are installed if needed (`npm install`, `pip install`, etc.)

If you have uncommitted changes, commit and push first, then update the PR, then run this workflow.

## Instructions

### 1. Discover available checks

Inspect the project to find how it validates code. Look in this order:

| Source | What to look for |
|--------|------------------|
| `package.json` scripts | `test`, `test:unit`, `test:e2e`, `lint`, `typecheck`, `build`, `check` |
| `Makefile` | `test`, `check`, `ci` targets |
| `pyproject.toml` / `setup.cfg` | pytest, ruff, mypy configuration |
| `.github/workflows/` | CI job commands (use the same commands locally) |
| `Cargo.toml`, `go.mod`, `pom.xml` | Language-specific test and lint commands |

If no test script exists but test files are present (e.g. `*.test.ts`, `*_test.go`, `test_*.py`), identify the test runner from config files (`vitest.config.*`, `jest.config.*`, `pytest.ini`) and run the appropriate command.

### 2. Run checks in order

Run applicable checks from fastest feedback to slowest:

1. **Lint / format** — catch style and static issues early
2. **Type check** — if the project uses TypeScript, mypy, etc.
3. **Unit / integration tests** — the main test suite
4. **Build** — confirm the project compiles or bundles successfully

Use the shell to run each command. Do not skip a category that exists in the project just because a prior step failed — run all checks so the PR summary reflects the full picture.

### 3. Handle failures

If any check fails:

1. Read the full error output and identify the root cause
2. Fix the issue with a minimal, focused change
3. Commit and push the fix to the same PR branch
4. Re-run the full check sequence from step 2
5. Repeat until all checks pass or you are blocked and need user input

Do not mark the task complete or leave the PR in a "ready" state with failing checks.

### 4. Report results

After checks complete, summarize in your response:

- Which commands ran
- Pass/fail status for each
- Any fixes applied during the test loop
- Whether the PR branch is green and ready for review

Optionally add a brief comment to the PR body or update the existing PR description with the test results if the workflow context expects it.

## Project Notes (this repo)

This is a React + TypeScript + Vite project. Current validation commands:

```bash
npm run lint      # ESLint
npm run build     # TypeScript compile + Vite production build
```

Test files exist under `src/` (`App.test.tsx`, `setupTests.ts`) but no `test` script is defined in `package.json` yet. If adding or running tests, configure a runner (e.g. Vitest) first, then include `npm test` in this workflow.

## Anti-patterns

- Creating a PR but skipping verification because "the change is small"
- Running only lint and skipping build/tests when both exist
- Declaring success without actually executing commands in the shell
- Leaving failing tests for the reviewer to discover
