# Apply Progress: home-proof-cards-tuning

## Status

Applied; not committed.

## Structured Status / Action Context Consumed

The delegated task explicitly selected active change `home-proof-cards-tuning`, artifact store OpenSpec, and allowed source edit roots under the repository workspace. The original session status snapshot in inherited context was stale/ambiguous for earlier changes, so this Apply used the delegated task's explicit change selection and current OpenSpec artifacts as authoritative.

Action context warnings:

- `openspec/specs/design-responsividad/` remains pre-existing untracked and out of scope.
- Source changes were restricted to `src/app/page.tsx` and `src/styles/home.css`.
- No commits were made; parent handles review/commit.

## Baseline Before Source Edits

Workspace before source edits:

```text
?? openspec/changes/home-proof-cards-tuning/
?? openspec/specs/design-responsividad/
```

Baseline verification before source edits:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |

Baseline snippets were read for:

- `.home-proof` card JSX in `src/app/page.tsx`.
- `.case-card*` CSS and Home-local dark/reduced-motion blocks in `src/styles/home.css`.

## Completed Tasks and Persisted Checkbox Updates

Completed tasks were marked in `openspec/changes/home-proof-cards-tuning/tasks.md`:

- T0.1-T0.4 pre-apply safety/baseline.
- T1.1-T1.6 JSX implementation.
- T2.1-T2.10 CSS implementation.
- T3.1-T3.8 verification.
- T4.1-T4.3 reviewer-style pre-commit check.

Commit/rollback tasks remain unchecked for parent workflow.

## Source Changes

### `src/app/page.tsx`

Only `.home-proof` proof-card internals changed.

Implemented card hierarchy:

- `case-card__meta` wrapper replaced with semantic `header.case-card__header`.
- Existing `metadataLabel` conditional preserved exactly; no fallback badge added.
- `study.problem` wrapped in `case-card__section` with visible label `Problema`.
- Existing `study.outcomes.length > 0` branch preserved and wrapped in `case-card__section case-card__section--outcome` with label `Resultado observado`.
- Existing stack list preserved and wrapped in `case-card__section case-card__section--stack` with label `Stack`.
- `study.title`, `study.problem`, `study.outcomes[0]`, `study.stack.slice(0, 3)`, map keys, card count, and map order preserved.

### `src/styles/home.css`

Only `.case-card*` selectors and Home-local dark wrappers for `.case-card*` changed.

Implemented CSS hierarchy:

- Added card-level `gap` for labeled sections.
- Replaced `.case-card__meta` with `.case-card__header` flex-column heading area.
- Added `.case-card__section` and `.case-card__section-label`.
- Added subtle section separator with `.case-card__section + .case-card__section`.
- Added `.case-card__section--outcome` gold-tinted observed-evidence surface.
- Added `.case-card__section--stack` and moved bottom alignment from `.case-card__stack` to the section.
- Made `.case-card__outcome` non-italic, stronger, and more scannable without adding claims.
- Preserved grid breakpoints, reduced-motion coverage for `.case-card`, hover behavior, and existing stack list semantics.
- Added dark-mode support only for new `.case-card__section*` and outcome surface selectors.

## Changed Files

```text
src/app/page.tsx
src/styles/home.css
openspec/changes/home-proof-cards-tuning/tasks.md
openspec/changes/home-proof-cards-tuning/apply-progress.md
```

Source diff stat:

```text
src/app/page.tsx    | 36 +++++++++++++++++++++---------
src/styles/home.css | 64 +++++++++++++++++++++++++++++++++++++++++++++--------
2 files changed, 80 insertions(+), 20 deletions(-)
```

Numstat:

```text
25	11	src/app/page.tsx
55	9	src/styles/home.css
```

Actual changed source lines: **100**, under the preferred 150-line fail-stop and under the 300-line unit budget.

## Verification Evidence

### Automated checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |

### Static diff guards

| Guard | Result |
| --- | --- |
| Changed source files limited to `src/app/page.tsx`, `src/styles/home.css` | PASS |
| `src/data/projects.ts` unchanged | PASS |
| No imports/metadata/route behavior changed | PASS |
| JSX changes confined to `.home-proof` card internals | PASS |
| No hero/control-room/pipeline/CTA source changes | PASS |
| CSS selector additions limited to `.case-card*` and Home-local dark wrappers for those selectors | PASS |
| Global primitives/responsive/dark/index files unchanged | PASS |
| No global `a`/`button` hover/focus rules added | PASS |
| `openspec/specs/design-responsividad/` untouched | PASS |
| No Tailwind/shadcn/dependency changes | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-proof-cards-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Initial smoke run: 4/5 passed; one reduced-motion assertion expected `transitionDuration === "0s"`, but the project global reduced-motion baseline intentionally computes `0.01ms` (`1e-05s`). The assertion was corrected to accept transition duration `<= 0.001s` and rerun.

Final smoke result:

```text
5 passed
```

Smoke covered:

- `/` renders the `Casos reales` heading.
- Exactly three `.home-proof .case-card` cards render.
- Every card visibly shows `Problema`, `Resultado observado`, and `Stack`.
- Every card still renders current title, problem, first outcome, and first three stack values from `src/data/projects.ts`.
- The card without `metadataLabel` has no fallback badge.
- Dark mode + reduced-motion context keeps proof cards stable.
- `390px` and `360px` mobile viewports have no horizontal overflow.

## Deviations

- No source files outside the allowed list were touched.
- No data, content, case order, metadata, global primitive, global responsive, global dark-mode, hero/control-room/pipeline/CTA, Tailwind/shadcn, or dependency changes were made.
- The Playwright reduced-motion assertion was adjusted to match the existing project baseline (`0.01ms`) rather than requiring exact `0s`.

## Remaining Tasks

Unchecked task lines remaining in `tasks.md`:

```text
- [ ] T5.1 If verification and Judgment Day pass and the source diff remains under budget, commit as one focused unit. Suggested message: `feat(home): tune proof card hierarchy`.
- [ ] T5.2 Do not commit `openspec/specs/design-responsividad/` or unrelated local/untracked files. Include only approved source changes and the relevant `openspec/changes/home-proof-cards-tuning/` artifacts if the repository workflow expects SDD artifacts in the same unit commit.
- [ ] T6.1 Before commit, rollback by restoring only `src/app/page.tsx` and `src/styles/home.css` to the recorded baseline; keep `src/data/projects.ts` untouched.
- [ ] T6.2 After commit, rollback with a revert of the focused unit commit or by reverting the two source files, then rerun `npm run lint`, `npm run build`, `git diff --check`, and the Home smoke checks.
- [ ] T6.3 Rollback criteria: mobile overflow, dark-mode unreadability, result surface overclaiming, data/order mutation, or source scope creep outside the approved files.
```

## Workload / PR Boundary

Single implementation unit. No chained PR split recommended.

## Risks / Follow-ups

- Visible labels add density; Playwright mobile overflow passed, but visual review can still judge taste.
- Outcome surface uses existing qualitative outcome text only; no metric/guarantee overclaim introduced.
- Parent should run fresh Judgment Day before commit.

## Memory

No memory tools were available in this subagent toolset. Findings are persisted in OpenSpec artifacts and this apply-progress file.

## Next Recommended

Parent/orchestrator should run fresh review / Judgment Day. If clean, parent handles commit and push.
