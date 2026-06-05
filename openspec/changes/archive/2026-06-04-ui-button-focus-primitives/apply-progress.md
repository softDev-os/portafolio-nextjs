# Apply Progress — ui-button-focus-primitives

## Status

Apply complete. No commit was made.

Strict TDD is inactive for this change (`openspec/config.yaml` has `strict_tdd: false`).

## Workload / PR Boundary

| Field | Value |
|-------|-------|
| Delivery strategy | Single PR / single work unit |
| Review budget | 300 changed lines |
| Forecast | 55–95 changed lines |
| Actual source diff | 10 files changed, 65 insertions(+), 24 deletions(-) = 89 changed lines |
| Budget status | PASS — well under 300 |
| Chained PRs recommended | No |
| Size exception needed | No |

## Completed Tasks

| Task | Status | Evidence |
| --- | --- | --- |
| Phase 0 — Pre-apply safety | Complete | Git clean, baseline lint/build pass, sidebar.css focus group confirmed, TSX classNames confirmed. |
| Phase 1.1 — `.btn` base in primitives.css | Complete | Added `display: inline-flex`, `align-items: center`, `justify-content: center`, `gap`, `padding`, `border-radius`, `text-decoration`, `cursor`, `transition`. |
| Phase 1.2 — `.btn--primary` in primitives.css | Complete | Added `background: var(--principal-color)`, `color: #0c0d1c`, `border: 0`. |
| Phase 1.3 — `.btn--outline` in primitives.css | Complete | Added `background: transparent`, `border: 2px solid var(--terciario-color)`, `color: var(--terciario-color)`. `.btn--subtle` NOT created (deferred). |
| Phase 1.4 — Extended gold-ring focus group | Complete | 13 selectors grouped: `.btn`, `.nav-float__link`, `.home-hero__cta-link`, `.contact__data`, `.footer__link`, `.footer__social-link`, `.form__button`, `.error-btn-primary`, `.error-btn-secondary`, `.not-found__link`, `.portfolio__link`, `.blog-article__back`, `.article__link`. |
| Phase 2.1 — Remove old focus group from sidebar.css | Complete | Old 5-selector group removed. `.sidebar__theme-toggle:focus-visible` preserved at line 305. |
| Phase 3.1 — Conservative dedup in home.css | **Skipped** | Not done to keep review focused and avoid visual regression risk. The `.btn` base provides defaults but page selectors override via cascade. |
| Phase 4.1–4.8 — TSX className additions | Complete | 14 className additions across 7 TSX files. All changes are additive `btn btn--primary` or `btn btn--outline` appended to existing className strings. |
| Phase 5.1 — Lint | Complete | `npm run lint` passes. |
| Phase 5.2 — Build | Complete | `npm run build` passes. |
| Phase 5.3 — Grep checks | Complete | All 7 grep checks pass (see verification evidence). |
| Phase 5.4 — TSX diff audit | Complete | All TSX changes are className-only; no JSX structure/content/data/flow changes. |
| Phase 5.5 — CSS diff audit | Complete | No global selectors, no hover normalization, no dark-mode blocks, no responsive breakpoints, no reduced-motion blocks in primitives.css. |

## Files Changed

### Source CSS

- `src/styles/primitives.css` — added `.btn`, `.btn--primary`, `.btn--outline`, and extended gold-ring focus-visible group (+51 lines).
- `src/styles/sidebar.css` — removed old 5-selector focus-visible group (-10 lines).

### Source TSX

- `src/app/page.tsx` — 2 className additions.
- `src/app/perfil/page.tsx` — 2 className additions.
- `src/app/contacto/page.tsx` — 2 className additions.
- `src/app/blog/page.tsx` — 2 className additions.
- `src/app/blog/[slug]/page.tsx` — 2 className additions.
- `src/app/casos-reales/page.tsx` — 1 className addition.
- `src/app/error.tsx` — 2 className additions.
- `src/app/not-found.tsx` — 1 className addition.

### Explicitly untouched

- `src/styles/dark-mode.css`
- `src/styles/responsive-*.css`
- `src/styles/home.css` (conservative dedup skipped)
- `src/styles/contact.css`, `src/styles/error.css`, `src/styles/pages-misc.css`, `src/styles/portfolio.css`, `src/styles/blog.css`
- `src/data/**`, `src/components/**`
- `openspec/specs/design-responsividad/**`

## Verification Evidence

### Automated Checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS (fixed one trailing newline in sidebar.css). |

### Grep / Scope Checks

| Check | Result |
| --- | --- |
| No global `a:focus-visible` / `button:focus-visible` | PASS — no global selectors. |
| No `.btn--subtle` | PASS — deferred per design. |
| `.sidebar__theme-toggle:focus-visible` in sidebar.css | PASS — preserved at line 305. |
| Focus group in primitives.css | PASS — 13 selectors in extended gold-ring group. |
| No hover normalization in primitives.css | PASS. |
| No `data-theme` in primitives.css | PASS. |
| No `prefers-reduced-motion` in primitives.css | PASS. |
| TSX diffs className-only | PASS — all changes are additive className strings. |
| No data/components changes | PASS. |
| No design-responsividad changes | PASS. |

### Browser / Manual Smoke

Not run in this apply phase. Deferred to Verify phase.

## Deviations / Notes

- Phase 3.1 (conservative dedup in `home.css`) was skipped to keep the diff focused. The `.btn` base provides fallback defaults, and `home.css` page selectors override them via cascade order. This means `.home-hero__cta-link` keeps its own `display`, `align-items`, `gap`, `padding`, `border-radius`, and `text-decoration` declarations alongside `.btn`. No visual change.
- `.btn` base does NOT set `background`, `color`, `border`, `font-size`, `font-weight` — these remain page-owned.
- `.btn--subtle` was deferred per design decision. Error/not-found opacity-hover and blog back-link patterns are not stable enough to justify a shared variant.
- TSX changes touched 7 files with 14 total className additions — all are class-name-only and additive.
- The old sidebar.css focus group was removed (not left as duplicate) because the primitives.css group is a superset.

## Post-Apply Parent Correction

Fresh parent audit found the apply executor had reformatted some TSX files beyond the className-only intent. The parent restored all touched TSX files and re-applied only the additive className changes from the task list.

Post-correction source diff returned to the intended scope:

```text
10 files changed, 65 insertions(+), 24 deletions(-)
```

Post-correction checks run by the parent:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |
| Static guards | PASS — no `.btn--subtle`, no global `a:focus-visible`/`button:focus-visible`, `.sidebar__theme-toggle:focus-visible` preserved, focus selectors present in `primitives.css`. |

## Remaining Tasks

1. Parent/orchestrator fresh review / Judgment Day.
2. If review passes, parent handles commit.
3. Post-commit verification.
4. Later SDD Verify and Archive/Sync.

## Risks / Follow-ups

- `.btn` base may cause unintended cascade effects if a page selector is less specific than expected. Mitigated by keeping `.btn` low-specificity and only adding non-visual base properties.
- Home CTA page `:focus-visible` rules may still add page-specific shadow/fill alongside the shared ring. This is additive and intentional.
- Legacy CSS selectors (`.form__button`, `.portfolio__link`) have no current TSX elements but are covered by the focus group for future-proofing.
