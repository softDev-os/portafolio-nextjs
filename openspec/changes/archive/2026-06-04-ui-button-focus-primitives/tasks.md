# Tasks: ui-button-focus-primitives

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 70 – 120 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low
```

---

## Phase 0 — Pre-Apply Safety (Discovery)

*Run before any edits. Do not proceed past Phase 0 if any check fails.*

### Task 0.1 — Check git status

- Run `git status` and verify the working tree is clean.
- If uncommitted changes exist, inform the operator; do not proceed.
- Record current branch name for rollback reference.

**File:** `git status` output  
**Dependencies:** None  
**Verification:** Clean working tree or explicit operator decision to proceed.

### Task 0.2 — Baseline lint + build

- Run `npm run lint` — must pass with zero errors.
- Run `npm run build` — must succeed with zero errors.
- Record the exact output as the baseline. Any new violations after edits are attributable.

**Files:** `npm run lint` output, `npm run build` output  
**Dependencies:** 0.1  
**Verification:** Both commands exit successfully.

### Task 0.3 — Inspect current focus-visible grouping in sidebar.css

- Read `src/styles/sidebar.css` lines ~425-436.
- Confirm the exact grouped rule:
  ```css
  .nav-float__link:focus-visible,
  .home-hero__cta-link:focus-visible,
  .contact__data:focus-visible,
  .footer__link:focus-visible,
  .footer__social-link:focus-visible {
    outline: 0.3rem solid var(--principal-color);
    outline-offset: 0.35rem;
    box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18);
  }
  ```
- Confirm `.sidebar__theme-toggle:focus-visible` is **not** in this group (it has its own `outline: 2px solid #fff` rule elsewhere).
- Record exact content for rollback.

**File:** `src/styles/sidebar.css` lines 425-436  
**Dependencies:** 0.1  
**Verification:** Grouped rule is exactly as expected; theme-toggle is separate.

### Task 0.4 — Inspect current CSS selectors to be touched

Read the following files and record existing property values for:
1. `src/styles/home.css` lines ~150-185: `.home-hero__cta-link`, `.home-hero__cta-link--primary`, `.home-hero__cta-link--secondary`. Record base shape: `display`, `align-items`, `gap`, `padding`, `border-radius`, `font-size`, `font-weight`, `text-decoration`, `transition`.
2. `src/styles/error.css`: `.error-btn-primary`, `.error-btn-secondary` — record `border-radius`, `transition`, hover behavior.
3. `src/styles/pages-misc.css` lines ~381-407: `.not-found__link` — record `border-radius`, `transition`, hover.
4. `src/styles/portfolio.css` lines ~31-55: `.portfolio__link` — record `border-radius`, `transition`, hover.
5. `src/styles/blog.css` lines ~115-144: `.article__link`, `.blog-article__back` — record existing focus/non-focus state.
6. `src/styles/contact.css` lines ~178-194: `.form__button` — record existing transition, hover.

**Files:** Multiple CSS files  
**Dependencies:** 0.1  
**Verification:** All existing values recorded for post-edit diff comparison.

### Task 0.5 — Inspect current TSX className usage

Read and record the exact `className` strings for all elements that will receive `.btn`/variant additions:

| File | Line | Current className | New className |
|------|------|-------------------|---------------|
| `src/app/page.tsx` | 45 | `"home-hero__cta-link home-hero__cta-link--primary"` | Add `btn btn--primary` |
| `src/app/page.tsx` | 51 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/perfil/page.tsx` | 106 | `"home-hero__cta-link home-hero__cta-link--primary"` | Add `btn btn--primary` |
| `src/app/perfil/page.tsx` | 112 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/contacto/page.tsx` | 88 | `"home-hero__cta-link home-hero__cta-link--primary"` | Add `btn btn--primary` |
| `src/app/contacto/page.tsx` | 96 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/blog/page.tsx` | 77 | `"home-hero__cta-link home-hero__cta-link--primary"` | Add `btn btn--primary` |
| `src/app/blog/page.tsx` | 83 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/blog/[slug]/page.tsx` | 91 | `"home-hero__cta-link home-hero__cta-link--primary"` | Add `btn btn--primary` |
| `src/app/blog/[slug]/page.tsx` | 97 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/casos-reales/page.tsx` | 100 | `"home-hero__cta-link home-hero__cta-link--secondary"` | Add `btn btn--outline` |
| `src/app/error.tsx` | 19 | `"error-btn-primary"` | Add `btn btn--primary` |
| `src/app/error.tsx` | 22 | `"error-btn-secondary"` | Add `btn btn--outline` |
| `src/app/not-found.tsx` | 19 | `"not-found__link"` | Add `btn btn--primary` |

**Files:** 7 TSX files  
**Dependencies:** 0.1  
**Verification:** All className strings recorded; no non-additive changes will be introduced.

---

## Phase 1 — CSS: `primitives.css` Additions

### Task 1.1 — Add `.btn` base class to `primitives.css`

Add the low-specificity `.btn` base class in `src/styles/primitives.css`. Position it after the existing `/* Badge / tag / pill */` section and before any new variant rules. Use a section comment `/* --- Button primitives --- */`.

```css
/* --- Button primitives --- */

.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
	padding: 1rem 2.4rem;
	border-radius: 3.2rem;
	text-decoration: none;
	cursor: pointer;
	transition:
		transform 0.25s ease,
		box-shadow 0.25s ease,
		background 0.25s ease,
		color 0.25s ease,
		border-color 0.25s ease,
		opacity 0.2s ease;
}
```

**Constraint:** `.btn` MUST NOT set `background`, `color`, `border`, `font-size`, `font-weight`, `box-shadow`, `margin`, `width/height`, or responsive breakpoints.

**File:** `src/styles/primitives.css`  
**Dependencies:** 0.5  
**Verification:** The selector exists, properties match the design contract.

### Task 1.2 — Add `.btn--primary` variant

Add after `.btn` in `primitives.css`:

```css
.btn--primary {
	background: var(--principal-color);
	color: #0c0d1c;
	border: 0;
}
```

**Constraint:** No hover, active, dark-mode, or responsive rules.

**File:** `src/styles/primitives.css`  
**Dependencies:** 1.1  
**Verification:** Properties set match design; no extra behavior.

### Task 1.3 — Add `.btn--outline` variant

Add after `.btn--primary` in `primitives.css`:

```css
.btn--outline {
	background: transparent;
	border: 2px solid var(--terciario-color);
	color: var(--terciario-color);
}
```

**Constraint:** No hover, active, dark-mode, or responsive rules. Do **not** create `.btn--subtle` (deferred per design).

**File:** `src/styles/primitives.css`  
**Dependencies:** 1.2  
**Verification:** Properties set match design; `.btn--subtle` is absent.

### Task 1.4 — Add extended gold-ring focus-visible group to `primitives.css`

Add after `.btn--outline` in `primitives.css`:

```css
/* --- Focus-visible keyboard ring --- */
.btn:focus-visible,
.nav-float__link:focus-visible,
.home-hero__cta-link:focus-visible,
.contact__data:focus-visible,
.footer__link:focus-visible,
.footer__social-link:focus-visible,
.form__button:focus-visible,
.error-btn-primary:focus-visible,
.error-btn-secondary:focus-visible,
.not-found__link:focus-visible,
.portfolio__link:focus-visible,
.blog-article__back:focus-visible,
.article__link:focus-visible {
	outline: 0.3rem solid var(--principal-color);
	outline-offset: 0.35rem;
	box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18);
}
```

**Constraint:** Do **not** include `.sidebar__theme-toggle:focus-visible` — that remains in `sidebar.css` with its white outline. Do **not** use `:focus` (only `:focus-visible`). Do **not** add global `a:focus-visible` or `button:focus-visible`.

**File:** `src/styles/primitives.css`  
**Dependencies:** 1.3  
**Verification:** All 13 selectors listed; theme-toggle not included; no `:focus` variant; no global selectors.

---

## Phase 2 — CSS: `sidebar.css` Cleanup

### Task 2.1 — Remove the old grouped focus rule from `sidebar.css`

After confirming the extended rule exists in `primitives.css`, remove the following block from `src/styles/sidebar.css`:

```css
.nav-float__link:focus-visible,
.home-hero__cta-link:focus-visible,
.contact__data:focus-visible,
.footer__link:focus-visible,
.footer__social-link:focus-visible {
	outline: 0.3rem solid var(--principal-color);
	outline-offset: 0.35rem;
	box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18);
}
```

**Constraint:** Do **not** remove or modify `.sidebar__theme-toggle:focus-visible`. Its rule (`outline: 2px solid #fff; outline-offset: 2px;`) must stay intact in `sidebar.css`.

**File:** `src/styles/sidebar.css` (lines ~427-435)  
**Dependencies:** 1.4  
**Verification:** grep confirms the old block is gone; `.sidebar__theme-toggle:focus-visible` is still present.

---

## Phase 3 — CSS: Optional Conservative Deduplication in `home.css`

### Task 3.1 — Evaluate and optionally deduplicate `.home-hero__cta-link` base shape

Compare `.home-hero__cta-link` properties in `home.css` against the new `.btn` base. The overlapping properties are:

| Property | `.home-hero__cta-link` (home.css) | `.btn` (primitives.css) | Match? |
|----------|----------------------------------|------------------------|--------|
| `display` | `inline-flex` | `inline-flex` | **Yes** |
| `align-items` | `center` | `center` | **Yes** |
| `gap` | `0.6rem` | `0.6rem` | **Yes** |
| `padding` | `1rem 2.4rem` | `1rem 2.4rem` | **Yes** |
| `border-radius` | `3.2rem` | `3.2rem` | **Yes** |
| `text-decoration` | `none` | `none` | **Yes** |
| `transition` | `transform, box-shadow, background, color` | same 4 + `border-color, opacity` | **Partial** (extra props in `.btn`) |
| `font-size` | `1.3rem` | (not set) | N/A — page-owned |
| `font-weight` | `500` | (not set) | N/A — page-owned |

**Decision:** If all matched properties are exactly identical, remove the duplicated declarations from `.home-hero__cta-link` in `home.css` and let `.btn` provide them. Keep `font-size`, `font-weight`, and any `transition` properties NOT covered by `.btn`. This step **may** be skipped if visual regression concern outweighs dedup benefit.

**Constraint:** Only remove declarations when the values are **exact** matches. Do not change any other property in `home.css`.

**File:** `src/styles/home.css` (lines ~150-165, the `.home-hero__cta-link` rule block)  
**Dependencies:** 1.1, 0.3  
**Verification:** After edit, `.home-hero__cta-link` renders identically. Visual regression check recommended.

---

## Phase 4 — TSX Additive Class Name Changes

*All changes in this phase are className-only. One task per file for traceability.*

### Task 4.1 — `src/app/page.tsx`

- Line 45: change `className="home-hero__cta-link home-hero__cta-link--primary"` → `className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"`
- Line 51: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/page.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed; no other content/structure changes.

### Task 4.2 — `src/app/perfil/page.tsx`

- Line 106: change `className="home-hero__cta-link home-hero__cta-link--primary"` → `className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"`
- Line 112: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/perfil/page.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed.

### Task 4.3 — `src/app/contacto/page.tsx`

- Line 88: change `className="home-hero__cta-link home-hero__cta-link--primary"` → `className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"`
- Line 96: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/contacto/page.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed. The `.form__button` element does NOT receive `.btn` (no current TSX usage).

### Task 4.4 — `src/app/blog/page.tsx`

- Line 77: change `className="home-hero__cta-link home-hero__cta-link--primary"` → `className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"`
- Line 83: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/blog/page.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed. `.article__link` elements do NOT receive `.btn`.

### Task 4.5 — `src/app/blog/[slug]/page.tsx`

- Line 91: change `className="home-hero__cta-link home-hero__cta-link--primary"` → `className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"`
- Line 97: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/blog/[slug]/page.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed. `.blog-article__back` does NOT receive `.btn`.

### Task 4.6 — `src/app/casos-reales/page.tsx`

- Line 100: change `className="home-hero__cta-link home-hero__cta-link--secondary"` → `className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"`

**File:** `src/app/casos-reales/page.tsx`  
**Dependencies:** 1.1, 1.3  
**Verification:** Only className strings changed. `.portfolio__link` elements (if any are present) do NOT receive `.btn`.

### Task 4.7 — `src/app/error.tsx`

- Line 19: change `className="error-btn-primary"` → `className="error-btn-primary btn btn--primary"`
- Line 22: change `className="error-btn-secondary"` → `className="error-btn-secondary btn btn--outline"`

**File:** `src/app/error.tsx`  
**Dependencies:** 1.1, 1.2, 1.3  
**Verification:** Only className strings changed. No other error page content/structure changes.

### Task 4.8 — `src/app/not-found.tsx`

- Line 19: change `className="not-found__link"` → `className="not-found__link btn btn--primary"`

**File:** `src/app/not-found.tsx`  
**Dependencies:** 1.1, 1.2  
**Verification:** Only className strings changed. No other not-found page content/structure changes.

---

## Phase 5 — Verification

### Task 5.1 — Lint check

- Run `npm run lint`. Must pass with zero errors.
- If new violations appear, they MUST be attributable only to this change. Fix any regressions.

**Dependencies:** 4.1–4.8, 2.1, 3.1 (if done), 1.1–1.4  
**Verification:** Exit code 0, no new violations.

### Task 5.2 — Build check

- Run `npm run build`. Must succeed with zero errors.
- If build fails, investigate the cause (likely CSS syntax or TSX syntax from class-name changes).

**Dependencies:** 5.1  
**Verification:** Exit code 0, no new warnings.

### Task 5.3 — grep checks for non-goal violations

Run the following grep commands:

1. `grep -rn 'a:focus-visible\|button:focus-visible' src/styles/` — must show **no results** (no global link/button restyle).
2. `grep -rn '\.btn--subtle' src/styles/` — must show **no results** (deferred variant not implemented).
3. `grep -rn '\.sidebar__theme-toggle:focus-visible' src/styles/sidebar.css` — must show **at least one match** (sidebar theme toggle focus preserved).
4. `grep -rn ':focus-visible' src/styles/primitives.css` — must show the extended group rule.
5. `grep -rn ' &:hover\|a:hover\|button:hover' src/styles/primitives.css` — must show **no results** (no hover normalization in primitives).
6. `grep -rn 'data-theme\|\[theme' src/styles/primitives.css` — must show **no results** (no dark-mode blocks in primitives).
7. `grep -rn '@media (prefers-reduced-motion: reduce)' src/styles/primitives.css` — must show **no results** (no reduced-motion block in primitives).
8. `grep -rn 'openspec/specs/design-responsividad'` on the diff — must show **no results**.

**Dependencies:** 5.2  
**Verification:** All grep checks pass; no non-goal scope creep.

### Task 5.4 — Diff audit: TSX className-only and no route/data/content

- Run `git diff` (or review staged diff).
- For every `.tsx` file in the diff, confirm changes are **only** additive className string changes.
- Confirm no `.ts` (route handler), no `src/data/`, no metadata export changes.
- Confirm no changes to `openspec/specs/design-responsividad/`.
- Confirm no Tailwind (`className=` with ` ` or Tailwind-style classes), no shadcn imports.

**Dependencies:** 5.2  
**Verification:** All TSX diffs are className-only; no non-goal file changes.

### Task 5.5 — Diff audit: CSS non-goal enforcement

- For every `.css` file in the diff, confirm:
  - No global `a:focus-visible` or `button:focus-visible` selectors.
  - No `:hover` rules added in `primitives.css`.
  - No `@media (prefers-reduced-motion: reduce)` blocks in `primitives.css`.
  - No `[data-theme="dark"]` blocks in `primitives.css`.
  - No responsive breakpoint additions.
  - No Tailwind `@apply` or utility declarations.
- Confirm that any deduplication in `home.css` is conservative (only exact-match base shape properties removed).

**Dependencies:** 5.2  
**Verification:** All CSS diffs comply with design non-goals.

### Task 5.6 — Keyboard/focus-visible smoke test matrix

If an interactive browser is available, Tab through these routes and confirm visible gold rings:

| Route | Targets | Expected |
|-------|---------|----------|
| `/` | Primary + secondary hero CTAs | Gold ring on Tab focus, no ring on mouse click |
| `/perfil` | Primary + secondary CTAs | Gold ring on Tab focus |
| `/contacto` | WhatsApp CTA, cases CTA | Gold ring on Tab focus |
| `/casos-reales` | Contact CTA | Gold ring on Tab focus |
| `/blog` | Primary + secondary CTAs | Gold ring on Tab focus |
| `/blog/[slug]` | Primary + secondary CTAs, back link | Gold ring on Tab focus |
| `/not-found` | Recovery link | Gold ring on Tab focus |
| Error boundary (trigger error) | Retry button, home link | Gold ring on Tab focus |

**Constraint:** The focus ring MUST NOT appear when clicking with a mouse (`:focus-visible` behavior, not `:focus`).  
**Constraint:** Previously covered selectors (`.nav-float__link`, `.contact__data`, `.footer__link`, `.footer__social-link`, `.home-hero__cta-link`) MUST still show focus rings through the moved primitive group.

**Dependencies:** 5.2  
**Verification:** All routes pass; focus ring visible on keyboard Tab, invisible on mouse click.

### Task 5.7 — Dark mode smoke check

- Toggle dark mode on routes: `/`, `/contacto`, `/error` (if triggerable), `/not-found`.
- Verify button backgrounds, colors, and borders render correctly (same as before the change).
- Verify the gold focus ring is visible against dark backgrounds (gold-on-dark contrast is sufficient).
- Confirm no dark-mode regressions attributable to `primitives.css` (which should have no `[data-theme="dark"]` blocks).

**Dependencies:** 5.6  
**Verification:** All dark-mode checks pass; no contrast regressions.

### Task 5.8 — Reduced motion smoke check

- Enable `prefers-reduced-motion: reduce` (via OS or browser devtools).
- Visit `/`, `/contacto`, `/not-found`.
- Verify hover transforms and transitions on all `.btn` and `.btn--*` elements are minimized (duration near-zero).
- Verify no unexpected motion artifacts.

**Dependencies:** 5.6  
**Verification:** Global reduced-motion baseline covers all new transitions.

---

## Phase 6 — Pre-Commit Review / Judgment Day

### Task 6.1 — Full diff review

- Review the complete `git diff` (or staged diff).
- Confirm: total changed lines ≤ 300.
- Confirm: no non-additive TSX changes.
- Confirm: no global `a:focus-visible`/`button:focus-visible`.
- Confirm: no hover normalization.
- Confirm: `.sidebar__theme-toggle:focus-visible` is still in `sidebar.css`.
- Confirm: no `.btn--subtle`.
- Confirm: no `openspec/specs/design-responsividad/` changes.
- Confirm: no route, data, content, or metadata changes.
- Confirm: `primitives.css` has no dark-mode blocks, no reduced-motion blocks, no responsive breakpoints.
- If the diff exceeds 300 lines, **stop** and request a delivery decision before committing.

**Dependencies:** 5.2–5.8  
**Verification:** All constraints confirmed; diff within budget; ready to commit.

### Task 6.2 — Fail-stop condition: budget exceeded

**If the total changed line count (additions + deletions) exceeds 300:**

1. Do **not** commit.
2. Record the exact count.
3. Inform the operator: "Forecast exceeds 300 changed lines. Request delivery decision before continuing. Options: (a) approve larger budget, (b) split into chained PRs, (c) reduce scope."
4. Provide a breakdown of which units exceed the budget.

**Dependencies:** 6.1  
**Verification:** Budget check performed; action taken according to result.

---

## Phase 7 — Commit

### Task 7.1 — Commit as single unit

If total changed lines ≤ 300:

1. Stage all changed files:
   ```
   git add src/styles/primitives.css src/styles/sidebar.css src/styles/home.css (if changed)
   git add src/app/page.tsx src/app/perfil/page.tsx src/app/contacto/page.tsx
   git add src/app/blog/page.tsx src/app/blog/\[slug\]/page.tsx src/app/casos-reales/page.tsx
   git add src/app/error.tsx src/app/not-found.tsx
   ```
2. Commit with message:
   ```
   feat(ui): add btn primitives and normalize focus-visible
    
   - Add .btn, .btn--primary, .btn--outline in primitives.css
   - Move and extend gold-ring :focus-visible group to primitives.css
   - Remove old grouped focus rule from sidebar.css (preserve theme-toggle)
   - Add btn/variant classes to 14 TSX elements across 7 files
   - Fix WCAG 2.4.7 focus-visible gap for 7 selectors
   - Optional conservative dedupe of home-hero__cta-link base shape
    
   Constraint: TSX changes are className-only; no global link/button restyle;
   no hover normalization; no dark-mode additions; no responsive retuning.
   ```

**Dependencies:** 6.1 (budget OK)  
**Verification:** Commit succeeds; diff matches the review.

---

## Phase 8 — Rollback

### Task 8.1 — Rollback instructions

If rollback is needed (visual regression, cascade conflict, or operator request):

1. **Revert the commit**:
   ```
   git revert HEAD --no-edit
   ```
   Or if uncommitted, restore working tree:
   ```
   git checkout -- .
   ```

2. **Manual rollback** (if partial revert is needed):
   - Remove `.btn`, `.btn--primary`, `.btn--outline`, and the extended focus-visible group from `src/styles/primitives.css`.
   - Restore the old grouped focus rule in `src/styles/sidebar.css` from the recorded backup (Task 0.3).
   - Restore any deduplicated `.home-hero__cta-link` base properties in `src/styles/home.css`.
   - Remove additive `btn`/variant class names from all 7 TSX files (revert to recorded originals from Task 0.5).
   - Re-run `npm run lint` and `npm run build` to confirm clean state.
   - Run keyboard focus smoke test to confirm previous focus behavior is restored.

**Dependencies:** 7.1  
**Verification:** `npm run lint`, `npm run build` pass; keyboard focus re-test passes; git status shows clean tree or reverted state.

---

## Summary of Files to Touch

| # | File | Change type | Est. lines |
|---|------|-------------|-----------:|
| 1 | `src/styles/primitives.css` | Add: `.btn`, `.btn--primary`, `.btn--outline`, focus-visible group | +35–50 |
| 2 | `src/styles/sidebar.css` | Remove old grouped focus rule (keep theme-toggle) | −5–8 |
| 3 | `src/styles/home.css` | Optional: remove duplicated base shape from `.home-hero__cta-link` | 0 to −15 |
| 4 | `src/app/page.tsx` | Add className to 2 elements | +2 |
| 5 | `src/app/perfil/page.tsx` | Add className to 2 elements | +2 |
| 6 | `src/app/contacto/page.tsx` | Add className to 2 elements | +2 |
| 7 | `src/app/blog/page.tsx` | Add className to 2 elements | +2 |
| 8 | `src/app/blog/[slug]/page.tsx` | Add className to 2 elements | +2 |
| 9 | `src/app/casos-reales/page.tsx` | Add className to 1 element | +1 |
| 10 | `src/app/error.tsx` | Add className to 2 elements | +2 |
| 11 | `src/app/not-found.tsx` | Add className to 1 element | +1 |
| | **Total estimated** | | **~55–95** |

No changes to: `contact.css`, `error.css`, `pages-misc.css`, `portfolio.css`, `blog.css`, `dark-mode.css`, any `responsive-*.css`, `openspec/specs/design-responsividad/`, route handlers, data modules, or metadata exports.
