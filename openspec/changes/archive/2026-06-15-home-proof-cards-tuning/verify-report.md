# Verify Report: home-proof-cards-tuning

## Status

PASS.

## Commit and Push Status

| Field | Result |
| --- | --- |
| Source commit | `0c0ce35 feat(home): tune proof card hierarchy` |
| HEAD | PASS — `0c0ce35` |
| `origin/main` | PASS — `0c0ce35` |
| Pushed | PASS |

## Working Tree Context

The repository contains unrelated local work outside this SDD unit:

```text
 M .gitignore
?? cv-refactor-scout.md
?? openspec/changes/private-cv-redesign/
?? openspec/specs/design-responsividad/
```

These paths were treated as out of scope and were not included in commit `0c0ce35`.

Active SDD artifacts for this unit remain under:

```text
openspec/changes/home-proof-cards-tuning/
```

## Verification Evidence

### Automated commands

| Command | Result |
| --- | --- |
| `git rev-parse --short HEAD` | PASS — `0c0ce35` |
| `git rev-parse --short origin/main` | PASS — `0c0ce35` |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |

### Commit static checks

| Check | Result |
| --- | --- |
| Commit source files limited to `src/app/page.tsx` and `src/styles/home.css` | PASS |
| `src/data/projects.ts` unchanged in commit | PASS |
| No global primitive/responsive/dark/index source files changed | PASS |
| No forbidden hero/control-room/pipeline/CTA/global focus/hover selector additions | PASS |
| Source diff under 150-line preferred fail-stop | PASS — 100 changed source lines |
| Unit under 300-line budget | PASS |

Commit numstat:

```text
25	11	src/app/page.tsx
55	9	src/styles/home.css
```

### Playwright verification smoke

A temporary Playwright spec `tests/e2e/home-proof-cards-verify.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke covered:

- `/` renders the `Casos reales` heading.
- Exactly three `.home-proof .case-card` cards render.
- Every card visibly shows `Problema`, `Resultado observado`, and `Stack`.
- Every card renders the existing title, problem, first outcome, and first three stack values from `src/data/projects.ts`.
- The card without `metadataLabel` has no fallback badge.
- Dark mode + reduced-motion context remains stable.
- `390px` and `360px` mobile viewports have no horizontal overflow.

Result:

```text
4 passed
```

## Scope Compliance

- No data mutations.
- No fallback badge.
- No case order/count changes.
- No imports, metadata, route behavior, or broad control-flow changes.
- No source changes outside the approved files.
- No `openspec/specs/design-responsividad/` changes.
- No Tailwind/shadcn/dependency changes.

## Risks

- Permanent regression tests were not added; Playwright smoke was temporary per the SDD verification plan.
- Visible labels add intentional density. Mobile smoke passed, but final product taste remains subjective.
- Outcome surface emphasizes qualitative evidence using existing text only; no overclaim was introduced.

## Next Recommended

Proceed to SDD Sync, then Archive, then commit/push the OpenSpec canonical spec and archive artifacts. Keep unrelated CV/design-responsividad files out of staging.
