---
name: git-flow
description: Branch, stage, commit and open a PR using this repo's conventions. Use when asked to commit, push, branch, or open a pull request, or when a verified change is ready to ship. Runs last, after verify and update-docs.
---

# Git flow

## Gate

The change is verified and the docs are updated. **Only commit when the user asks** — finishing a
task is not an instruction to commit it.

## Know whose agent you are

`git config user.email` → the matching row in `docs/knowledge/TEAM.md` → that person's GitHub handle.
Their name goes on the commits, their handle on the PR. If the email is not in `TEAM.md`, stop and
ask. (Solo project with no `TEAM.md`? Carry on — just skip the issue-linking below.)

## Branch

Work happens on a feature branch off `development`, never on a long-lived branch.
`development`, `staging` and `production` are **PR-only** — the guard hook denies commits on them.

```bash
git fetch origin
git switch -c feat/12-bookings origin/development
```

Name it `<type>/<issue-number>-<slug>`: `feat/12-bookings`, `fix/31-delete-guard`. The number links
branch, PR and issue. No issue (solo work, quick fix)? Drop the number, keep the shape.

See `docs/conventions/50-collaboration.md` for the full branch model.

## Stage deliberately

Run `git status` and `git diff` and **read the diff before staging**. Never `git add -A` without
looking — that is how `.env` files, build output and scratch scripts get committed.

Never commit `.env` (any variant but `.env.example`), `apps/server/out/`, `node_modules/`,
`apps/server/log/`, `apps/server/uploads/`, or anything holding a credential. `.gitignore` covers
these; check anyway. New environment variables go into `.env.example` with a comment, same commit.

## Commit

Conventional commits with a workspace scope — the existing convention, visible in `git log`:

```
feat(admin): filter builder, column control, and readable tables
fix(server): reject search filters on unindexed fields
refactor: move shared constants into @demo-panel/shared
```

- Types: `feat` `fix` `refactor` `chore` `style` `docs` `test`
- Scope: `admin`, `server`, `shared`, or omitted when it spans them
- Subject: lowercase, imperative, no trailing period, under ~70 chars
- Say **what changed**, not which files
- One logical change per commit. Fixed a known bug from
  `docs/conventions/10-architecture.md` along the way? Its own commit.

A body earns its place when the *why* is not obvious: the constraint that forced the approach, the
alternative rejected, the ADR it implements (`ADR-007`).

## Push, then open the PR — then stop

**Push as soon as the work is done.** An unpushed branch is invisible to every other agent on the
team, and invisible work gets built twice.

```bash
git push -u origin feat/12-bookings
gh pr create --base development --title "feat(admin): bookings module" --body "..."
gh issue comment 12 --body "PR up: <url>. Ready for review."
```

Target `development`, always. Put `Closes #12` in the body so the issue closes on merge.

**Then stop. An agent does not merge its own PR**, and does not promote to `staging` or
`production` — those are human decisions. If the PR has conflicts, that is the `integrate` skill.

If the work is unfinished but you are stopping, push anyway with a `wip(...)` commit and say so on
the issue — see the `handoff` skill.

## Pull request

```markdown
## What
<one paragraph — what this adds and why>

## Design
Implements ADR-007 in docs/knowledge/DECISIONS.md.
<approach in two or three lines, and the alternative that lost>

## Acceptance check
<from the design brief — what the reviewer does to see it work>

## Verification
- `npm test` / `npm run build` — passing
- Exercised by hand: create, list, filter, sort, edit, delete, delete-blocked path
- Checked as a non-admin user

## Notes
<seed re-run, backfill script, new env vars — anything that breaks another checkout>
```

## Never

Force-push, `git reset --hard` with uncommitted work, rewriting published history, or committing
when the user did not ask. The `PreToolUse` hook blocks the first two — if it fires, that is the
guardrail working. Do not route around it; ask the user.

## Done when

- [ ] Diff read before staging; nothing unintended included
- [ ] No secrets, build output or scratch files
- [ ] Message follows `type(scope): lowercase imperative subject`; one logical change
- [ ] PR body names the ADR, the acceptance check, and what was actually verified
- [ ] Required seed, backfill or env var called out
