# Apply Progress — ui-visual-primitives

## Status

Apply complete. No commit was made.

Strict TDD is inactive for this change (`openspec/config.yaml` has `strict_tdd: false`).

## Workload / PR Boundary

| Field | Value |
| --- | --- |
| Delivery strategy | Single PR / single work unit |
| Review budget | 300 changed lines |
| Forecast | ~135–155 changed lines |
| Actual source diff estimate | 222 changed lines (`1 insertion + 90 deletions` tracked, plus `src/styles/primitives.css` at 131 lines) |
| Budget status | PASS — under 300 |
| Chained PRs recommended | No |
| Size exception needed | No |

## Completed Tasks

| Task | Status | Evidence |
| --- | --- | --- |
| Task 0 — Pre-apply safety and state | Complete | Initial repo state had only expected untracked `openspec/changes/ui-visual-primitives/` and pre-existing `openspec/specs/design-responsividad/`; source tree had no diffs after parent restored `reset.css`. Baseline `npm run lint` and `npm run build` passed. `dark-mode.css` was verified as last import. |
| Task 1 — Create `primitives.css` and wire import | Complete | Added `src/styles/primitives.css`; added `@import "./primitives.css";` after `reset.css` and before `layout.css` in `src/styles/index.css`. |
| Task 2 — Migrate section title decorations | Complete | Removed duplicated `::after` dot decoration blocks from `pages-headers.css` and `pages-profile.css`; primitive selector grouping in `primitives.css` now owns migrated title dots. |
| Task 3 — Migrate card surfaces | Complete | Removed repeated border/radius/background declarations from 5 `pages-misc.css` card/panel selectors; primitive selector grouping now owns shared card surface visuals. |
| Task 4 — Migrate badges/tags | Complete | Removed repeated badge declarations from `portfolio.css`, `blog.css`, and `pages-misc.css`; primitive selector grouping now owns shared badge/tag visuals. |
| Task 5 — Full verification | Complete | Automated checks, grep checks, unit/e2e tests, and custom Playwright smoke passed. |
| Task 6 — Review/Judgment Day | Remaining for parent | Parent/orchestrator should run fresh review after this apply result. |
| Task 7 — Commit | Remaining for parent | No commit made by apply executor. |
| Task 8 — Post-commit verification | Remaining for parent | Run after parent commit. |

## Files Changed

### Source CSS

- `src/styles/primitives.css` — new visual primitive layer.
- `src/styles/index.css` — import `primitives.css` after reset and before layout.
- `src/styles/pages-headers.css` — removed duplicated large title dot declarations.
- `src/styles/pages-profile.css` — removed duplicated small title dot declarations.
- `src/styles/pages-misc.css` — removed duplicated card surface and badge declarations.
- `src/styles/portfolio.css` — removed duplicated badge declarations.
- `src/styles/blog.css` — removed duplicated blog article badge declarations.

### OpenSpec

- `openspec/changes/ui-visual-primitives/apply-progress.md` — this cumulative apply artifact.

## Verification Evidence

### Baseline Checks Before Implementation

| Command | Result |
| --- | --- |
| `git status --short && git diff --stat && git stash list` | Only expected untracked OpenSpec artifacts and pre-existing `openspec/specs/design-responsividad/`; no source diffs. |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Next warning remains: `Using edge runtime on a page currently disables static generation for that page`. |

### Final Automated Checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |
| `npm test` | PASS — Vitest `3 passed (3)` files, `8 passed (8)` tests. |
| `npm run test:e2e` | PASS — Playwright public-site smoke `5 passed`. |

### Grep / Scope Checks

| Check | Result |
| --- | --- |
| `grep -n "data-theme" src/styles/primitives.css` | PASS — zero matches. |
| `grep -n "@media" src/styles/primitives.css` | PASS — zero matches. |
| `grep -n "\.btn" src/styles/primitives.css` | PASS — zero matches; full button primitive remains deferred. |
| `grep -rn "repeating-radial-gradient" src/styles/` | PASS — remaining matches are `sidebar.css`, two intentional inner-span patterns in `pages-profile.css`, and the two primitive definitions in `primitives.css`. |
| import order in `src/styles/index.css` | PASS — `primitives.css` is after `reset.css` and before `layout.css`; `dark-mode.css` remains last. |
| source scope | PASS — no TSX/TS files, no responsive files, no `reset.css`, no `dark-mode.css`, no data/routes changed. |
| `openspec/specs/design-responsividad/` | PASS — untouched and still pre-existing/untracked. |

### Browser Smoke

Custom temporary Playwright smoke was run for representative primitive behavior.

| Command | Result |
| --- | --- |
| `npx playwright test --config=/tmp/ui-visual-primitives-pw-*/playwright.config.ts` | PASS — 26 passed. |

Coverage:

- Routes: `/`, `/perfil`, `/credenciales`, `/contacto`, `/casos-reales`, `/blog`, plus `/blog/memoria-persistente-agentes-ia-engram` for the article badge.
- Viewports: desktop 1280×900, tablet 800×900, mobile 375×812, small 360×740.
- Computed style checks:
  - large title dots: `50px × 30px` radial pattern;
  - small title dots: `30px × 20px` radial pattern;
  - card surfaces have solid border, `14px` radius, non-transparent background;
  - migrated badges have `999px` radius and non-transparent accent background;
  - dark mode on `/credenciales` has non-transparent card backgrounds/borders;
  - reduced motion maps transition duration to `1e-05s` via global baseline.

Exploratory first attempt failed before correction because:

- `/perfil` at 375px showed ~6px horizontal overflow. This matches the known `/perfil` small-mobile overflow warning from Unit 1 Verify and is outside Unit 2 scope; no `/perfil` responsive fix was made.
- Chromium reported reduced-motion transition duration as `1e-05s`, equivalent to the expected `0.01ms` baseline. The assertion was corrected.

## Deviations / Notes

- The task plan described keyboard focus checks for `.timelines__timeline` and `.capability-card`, but those elements are semantic `<article>` elements without `tabindex` or interactive behavior. Since Unit 2 explicitly forbids TSX changes, apply did **not** add focusability. The generic `.card-surface--interactive:focus-visible` API exists in `primitives.css`, and selector-specific `:focus-visible` rules were added for future compatibility, but actual keyboard tab focus is not applicable without a structural TSX change.
- The implementation uses CSS selector grouping in `primitives.css` for existing page selectors to avoid TSX changes, as directed by Design/Tasks.
- No `[data-theme="dark"]` or responsive `@media` rules were added to `primitives.css`.
- Full button primitive remains deferred.

## Post-Review Fixes

Fresh Judgment Day review found two low-severity visual normalization warnings. The parent applied targeted CSS-only fixes before commit:

- `pages-misc.css`: restored page-owned values for `.capability-card__tools li` so tool tags keep their original padding, font-size, font-weight, background opacity, non-uppercase text, and normal letter spacing while still participating in the badge primitive grouping.
- `portfolio.css`: restored `display: inline-flex` for `.portfolio__case-index` and `.portfolio__metadata-badge` while retaining their primitive badge grouping.

Post-fix checks run by the parent:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |
| `grep -n "data-theme\|@media\|\.btn" src/styles/primitives.css || true` | PASS — zero matches. |
| `grep -RIn "repeating-radial-gradient" src/styles/pages-headers.css src/styles/pages-profile.css src/styles/primitives.css` | PASS — only primitive definitions plus intentional remaining inner-span patterns. |

## Remaining Tasks

1. Parent/orchestrator fresh review / Judgment Day re-check after targeted fixes.
2. If review passes, parent handles commit.
3. Post-commit verification.
4. Later SDD Verify and Archive/Sync.

## Risks / Follow-ups

- `/perfil` mobile horizontal overflow remains an out-of-scope follow-up.
- `card-surface` normalizes selected credential card radii to `1.4rem`; browser smoke passed, but visual review should confirm acceptance.
- Because this unit intentionally avoids TSX changes, primitive class names are currently implemented through selector grouping rather than explicit class additions in markup. A future unit can migrate stable primitives to additive classes if desired.
