# Apply Progress — ui-foundation-tuning

## Status

T0–T14 complete. Size exception was approved by the user after the actual code diff exceeded the 300-line review budget forecast.

## Completed tasks

| Task | Status | Evidence |
| --- | --- | --- |
| T0 — Pre-apply safety | Complete | `git log --oneline -3`, `git status --short`, SDD artifact existence checks. Baseline `npm run lint` and `npm run build` passed. Pre-existing `openspec/specs/design-responsividad/` left untouched. |
| T1 — Create `responsive-foundation.css` | Complete | New `src/styles/responsive-foundation.css` created with shared `@media (max-width: 1023px)` shell/sidebar/nav rules. |
| T2 — Safe-area tokens | Complete | `--safe-top` and `--safe-bottom` added to `src/styles/variables.css`. |
| T3 — Import order | Complete | `src/styles/index.css` imports `responsive-foundation.css` before tablet/mobile/small responsive files and before `dark-mode.css`. |
| T4 — Replace touched `env()` usages | Complete with caveat | Touched responsive usages now use `var(--safe-top)` / `var(--safe-bottom)`. Direct `env(safe-area...)` remains only in `variables.css` as token source. |
| T5 — Move ThemeToggle structure | Complete | `.sidebar__theme-toggle` structural styles moved from `dark-mode.css` to `sidebar.css`; `dark-mode.css` has zero toggle selectors. |
| T6 — Reduced-motion baseline | Complete | `reset.css` now has global reduced-motion baseline. |
| T7 — Home scroll labels | Complete | `layout.css` home shell comments clarified without declaration changes. |
| T8 — Remove tablet duplicate foundation | Complete | Shared tablet shell/sidebar/nav declarations removed from `responsive-tablet.css`; page-specific blocks preserved. |
| T9 — Remove mobile duplicate foundation | Complete | Shared mobile shell/sidebar/nav declarations removed from `responsive-mobile.css`; page-specific blocks preserved. |
| T10 — Lint | Complete | `npm run lint` passed after implementation. |
| T11 — Build | Complete | `npm run build` passed after implementation; existing Edge runtime static-generation warning remains. |
| T12 — Grep checks | Complete | Safe-area direct `env()` centralized in `variables.css`; no ThemeToggle selectors in `dark-mode.css`; ThemeToggle structural selectors present in `sidebar.css`. |
| T13 — Viewport matrix | Complete | Playwright smoke matrix passed 8 route/viewport combinations: desktop, tablet, mobile, small-mobile. |
| T14 — Interaction checks | Complete | Playwright smoke checks passed ThemeToggle, keyboard focus outline, dark reload, skip link, ScrollToTop, and reduced-motion behavior. |

## Files changed

- `src/styles/responsive-foundation.css` (new)
- `src/styles/index.css`
- `src/styles/variables.css`
- `src/styles/reset.css`
- `src/styles/layout.css`
- `src/styles/sidebar.css`
- `src/styles/dark-mode.css`
- `src/styles/responsive-tablet.css`
- `src/styles/responsive-mobile.css`
- `openspec/changes/ui-foundation-tuning/apply-progress.md`

## Test commands run

### Baseline before implementation

```bash
npm run lint
npm run build
```

Result: both passed. Build emitted the pre-existing warning: `Using edge runtime on a page currently disables static generation for that page`.

### After implementation

```bash
npm run lint
npm run build
```

Result: both passed. Build emitted the same pre-existing Edge runtime warning.

### Browser smoke verification

A temporary `npm run dev -- --hostname 127.0.0.1 --port 3000` server was started and checked with a Playwright script. Result:

```json
{
  "total": 67,
  "failed": 0
}
```

Covered:

- Desktop 1280×900: `/`, `/credenciales`
- Tablet 800×900: `/`, `/contacto`
- Mobile 375×812: `/`, `/casos-reales`
- Small mobile 360×740: `/`, `/credenciales`
- ThemeToggle changes `data-theme` at all viewports.
- ThemeToggle is keyboard reachable and has visible focus outline at all viewports.
- Dark reload keeps `data-theme="dark"` at `domcontentloaded`.
- Skip link is first Tab target and Enter moves focus to `#main-content`.
- `ScrollToTop` route change resets `.layout__main`/window scroll (allowing <=1px subpixel residue).
- Reduced motion minimizes animation duration and sets scroll behavior to `auto`.

## Grep/check evidence

```bash
grep -rn 'env(safe-area' src/styles/
```

Result:

```text
src/styles/variables.css:38:	--safe-top: env(safe-area-inset-top, 0px);
src/styles/variables.css:39:	--safe-bottom: env(safe-area-inset-bottom, 0px);
```

This deviates from the literal T12 wording of zero matches across all `src/styles/`, but matches the spec/proposal intent: direct `env()` is centralized in tokens.

```bash
grep -rn 'sidebar__theme-toggle' src/styles/dark-mode.css
```

Result: zero matches.

```bash
grep -rn 'sidebar__theme-toggle' src/styles/sidebar.css
```

Result: structural, hover, focus-visible, and mobile media selectors present.

```bash
git diff --name-only | grep -E 'home.css|portfolio.css|blog.css|contact.css|pages-.*\.css'
```

Result: zero matches. Page CSS files were not touched.

```bash
git diff -- src/styles/sidebar.css | grep -nE 'nth-child|avatar.*important'
```

Result: zero matches. Social `nth-child` selectors and avatar `!important` were not touched.

## Deviations from design/tasks

- T12 literal grep expectation (`grep -rn 'env(safe-area' src/styles/` returns 0) is impossible while `variables.css` defines `--safe-top` and `--safe-bottom` using `env()`. Implementation centralizes direct `env()` usage in `variables.css` only.
- Manual viewport/interaction checks were performed as automated Playwright smoke checks because this subagent does not have an interactive browser UI.
- Size exception was required and approved by user because actual code changed-line count exceeded 300.

## Review workload / PR boundary

- Approved budget: 300 changed lines per unit.
- Size exception: approved by user after apply stopped.
- Tracked CSS diff (excluding new untracked `responsive-foundation.css`): `63 insertions(+), 210 deletions(-)`.
- New `src/styles/responsive-foundation.css`: 95 lines.
- Actual code diff estimate: ~368 inserted+deleted code lines.
- Suggested PR boundary: single foundation unit under approved size exception; parent should run fresh review/Judgment Day before commit.

## Remaining tasks

- Parent/orchestrator should run fresh review/Judgment Day (T15) before commit.
- Parent/orchestrator owns commit (T16) if review passes.
- Keep `openspec/specs/design-responsividad/` out of this unit unless separately decided.
