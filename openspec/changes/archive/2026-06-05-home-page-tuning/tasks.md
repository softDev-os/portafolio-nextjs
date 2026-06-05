# Tasks: home-page-tuning

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | Source: 20–90; OpenSpec/task artifacts excluded from source budget |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR / single commit-per-unit slice |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

Additional session guard: target review budget is 300 changed lines per unit; fail-stop before Apply if the source forecast exceeds 150 changed lines without explicit user approval.

## Implementation Tasks

### 1. Pre-apply safety and baseline

- [x] Confirm workspace safety with `git status --short`.
  - Expected untracked/changed OpenSpec path: `openspec/changes/home-page-tuning/`.
  - Do not touch or include `openspec/specs/design-responsividad/`.
  - Stop before source edits if unrelated source files are modified or untracked.
- [x] Run baseline quality commands if feasible before source edits:
  - `npm run lint`
  - `npm run build`
  - Record any pre-existing failures in `openspec/changes/home-page-tuning/apply.md` before editing.
- [x] Read and record the current Home CSS baseline (recorded inline by parent; see apply-progress.md):
  - `.home-hero__cta-link`
  - `.home-hero__cta-link--primary` and `.home-hero__cta-link--secondary`
  - Home `@media (prefers-reduced-motion: reduce)` block
  - Home `[data-theme="dark"]` blocks
  - Home responsive blocks at `max-width: 1023px`, `767px`, and `480px`
- [x] Reconfirm source forecast before Apply (33 changed lines confirmed).
  - Planned source file should be only `src/styles/home.css`.
  - If planned source diff exceeds 150 changed source lines, stop and request explicit user approval.
  - If the plan requires JSX, route/data/content, primitive, global responsive, or global dark-mode edits, stop before Apply.

### 2. Explicit read-only / no-op scope guards

- [x] Keep `src/app/page.tsx` read-only; no JSX/metadata/content changes.
- [x] Keep shared/global files read-only; none were touched.
  - `src/styles/primitives.css`
  - `src/styles/responsive-mobile.css`
  - `src/styles/responsive-tablet.css`
  - `src/styles/responsive-small.css`
  - `src/styles/dark-mode.css`
  - `src/styles/index.css`
- [x] Do not modify `openspec/specs/design-responsividad/` — untouched.
- [x] Do not introduce Tailwind/shadcn/dependencies/global hover-focus rules — none added.

### 3. CSS Apply — `src/styles/home.css`

- [x] Conservatively deduplicate `.home-hero__cta-link` base declarations owned by `.btn` (display, align-items, gap, padding, border-radius, text-decoration, transition).
  - Remove exact duplicates for `display`, `align-items`, `gap`, base `padding`, `border-radius`, and `text-decoration`.
  - Prefer removing the local base `transition` so `.btn` owns the default button transition baseline.
  - Keep Home-owned `font-size: 1.3rem` and `font-weight: 500`.
- [x] Preserve Home CTA variant behavior (primary glow, secondary fill/lift, small breakpoint sizing).
  - Keep primary CTA glow/shadow and hover/focus lift.
  - Keep secondary CTA outline/fill behavior and hover/focus lift.
  - Keep small breakpoint `.home-hero__cta-link` padding/font-size overrides at `max-width: 480px`.
- [x] Preserve and recheck Home reduced-motion selector (CTA/card transition suppression intact).
  - Keep `.home-hero__cta-link, .case-card { transition: none; }` in the Home reduced-motion block so Home CTAs suppress `.btn` transitions.
  - Do not add a `prefers-reduced-motion` block to `src/styles/primitives.css`.
- [x] Optionally normalize exact dark-mode token aliases (`#1a1b30`→`--color-principal`, `#50b1b1`→`--secundario-color`, `#e2e2ec`→`--color-titles`); remaining hardcoded values skipped as planned.
  - `#1a1b30` → `var(--color-principal)`
  - `#50b1b1` → `var(--secundario-color)`
  - `#e2e2ec` → `var(--color-titles)`
  - Skip normalization for `#22253a`, `#333656`, `#f5c84a`, and rgba shadows unless a specific contrast issue is reproduced.
- [x] Optionally apply Home-local responsive tweaks — **skipped**; no overflow/density issue was reproduced during smoke.
  - Control-room overflow/density: tune only `.control-room`, `.control-room__grid`, `.control-room__node*`, or text wrapping/min-width rules.
  - Proof-card overflow/density: tune only `.home-proof__grid`, `.case-card`, `.case-card__stack`, or `.case-card__stack li`.
  - Pipeline overflow/density: tune only `.home-pipeline`, `.home-pipeline__step`, `.home-pipeline__label`, `.home-pipeline__arrow`, or `.home-pipeline__icon`.
  - Do not move page-level padding, scroll, overflow, safe-area, sidebar, or nav ownership out of responsive files.

### 4. Verification

- [x] Run required automated checks (lint/build/diff-check PASS).
  - `npm run lint`
  - `npm run build`
  - `git diff --check`
- [x] Run static diff guards (all PASS; see apply-progress.md).
  - `git diff --name-only -- src` shows only `src/styles/home.css`.
  - `git diff -- src/app/page.tsx` is empty.
  - No route, data, metadata, content, dependency, or control-flow files changed.
  - `src/styles/primitives.css`, responsive files, `src/styles/dark-mode.css`, and `src/styles/index.css` are unchanged.
  - No global `a:focus-visible`, `button:focus-visible`, `a:hover`, or `button:hover` rules were added.
  - No changes under `openspec/specs/design-responsividad/`.
- [x] Run Playwright Home smoke (5/5 passed; see apply-progress.md).
  - Desktop: expected heading and both CTAs render; hero remains two-column.
  - Keyboard: Tab reaches both CTAs; visible focus outline appears; wait at least 300ms before any computed `box-shadow` assertion.
  - Dark mode: hero, CTAs, control-room, proof cards, and pipeline remain readable.
  - Reduced motion: Home entrance animations, divider animation, node pulses, data pulses, and CTA/card transitions are suppressed or minimized.
  - Mobile/small-mobile: check 390px and 360px widths for no horizontal overflow, clipping, or unusable density.

### 5. Fresh review / Judgment Day before commit

- [x] Before committing, perform fresh Judgment Day review (dual review CLEAN).
- [x] Confirm implemented source diff under 150 (33 changed lines) and under 300.
- [x] Confirm every optional dark-mode change recorded; responsive skipped intentionally.
- [x] No scope guard failed; all guards PASS.

### 6. Commit strategy

- [x] Created commit `52cbd6f tune(css): deduplicate Home CTAs after button primitive adoption`.
- [x] Pushed to `origin/main`.
- [x] No chained PRs; single commit within budget.

### 7. Rollback

- [ ] To rollback source changes, revert `src/styles/home.css` to the pre-Apply state.
- [ ] Re-run `npm run lint`, `npm run build`, and `git diff --check` after rollback.
- [ ] Re-run the Home smoke matrix for desktop, keyboard focus, dark mode, reduced motion, and mobile overflow.
- [ ] Keep shared primitives unchanged unless a separate primitive bug is proven and approved.
