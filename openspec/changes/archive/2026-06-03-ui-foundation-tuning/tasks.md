# Tasks — ui-foundation-tuning (Unit 1: Foundation Layer Cleanup)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~190–260 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Dependency Graph

```
T0 (pre-apply safety)
├── T1 (responsive-foundation.css) ────── T3 (index.css import order) ──┐
├── T2 (safe-area tokens in variables.css) ──────────────────────────┐ │
├── T4 (replace env() with tokens) ─────────────────────────────────┤ │
├── T5 (ThemeToggle→sidebar.css) ───────────────────────────────────┤ │
├── T6 (reduced-motion baseline in reset.css) ──────────────────────┤ │
├── T7 (home scroll co-label in layout.css) ────────────────────────┤ │
├── T8 (remove duplicated blocks from responsive-tablet.css) ───────┘ │
└── T9 (remove duplicated blocks from responsive-mobile.css) ────────┘
                          │
                          ▼
                     T10 (verify: lint)
                          │
                          ▼
                     T11 (verify: build)
                          │
                          ▼
                     T12 (verify: grep env + toggle)
                          │
                          ▼
                     T13 (verify: manual viewport matrix)
                          │
                          ▼
                     T14 (verify: interaction checks)
                          │
                          ▼
                     T15 (review / Judgment Day)
                          │
                          ▼
                     T16 (commit)
                          │
                          ▼
                     T17 (rollback reference)
```

---

## T0 — Pre-apply safety and state check

**Depends on:** nothing
**Estimated lines:** 0 changed; 5–8 CLI commands

1. Run `git status` to confirm:
   - No unrelated staged files.
   - Working tree is clean except for expected change files.
   - Recent commit `ffc87ca` (homepage + credentials redesign) is the parent.
2. Confirm pre-existing `openspec/specs/design-responsividad/` files remain untouched and are **not** committed or modified by this unit.
3. Confirm `openspec/changes/ui-foundation-tuning/*.md` (explore, proposal, specs, design) are present.
4. Verify `npm run lint` and `npm run build` pass before making any changes (baseline).
5. Read through `src/styles/index.css` and confirm current import order as reference.

**Verification:** `git status` clean; baseline `npm run lint` + `npm run build` pass.

---

## T1 — Create `src/styles/responsive-foundation.css`

**Depends on:** T0
**Estimated lines:** +65 to +90

Create the new shared responsive foundation file. It will contain shared tablet/mobile shell rules inside a single `@media (max-width: 1023px)` block.

### Rules to include

All declarations listed in the design document `design.md` under "Rules moved from tablet/mobile to `responsive-foundation.css`". Specifically:

1. **Body scroll unlock:** `body { overflow-y: auto; }`
2. **Layout reset:** `.layout` → `position: static; top: auto; left: auto; transform: none; width: 100%; height: auto; min-height: 100vh; margin: 0;` one-column grid-areas; `grid-template-columns: 1fr; border-radius: 0;`
3. **Main common reset:** `.layout__main { border-radius: 0; }` (do not include padding or mobile-specific `overflow: visible`)
4. **Home shell common rule:** `.layout__main:has(.content__page--home) { padding: 0; overflow: visible; height: auto; }`
5. **Sidebar→header conversion:**
   - `.sidebar` → `border-radius: 0; height: auto; min-height: unset; flex-direction: row; flex-wrap: wrap; align-items: center; min-width: unset; overflow: visible; position: sticky; top: 0; z-index: 10; background, box-shadow, border-bottom as per design.md`
   - `.sidebar::before { border-radius: 0; }`
   - `.sidebar__profile { flex-direction: row; align-items: center; margin-bottom: 0; }`
   - `.sidebar__name { margin-top: 0; letter-spacing: -0.03em; }`
   - `.sidebar__social { margin: 0; }`
   - `.sidebar__copy { display: none; }`
6. **Bottom-nav conversion:**
   - `.nav-float` → fixed bottom, full width, z-index 100
   - `.nav-float__list` → horizontal row, full width, min-height unset, no border-radius, space-around, bottom shadow
   - `.nav-float__overlay { display: none; }`

### Not included
- No page-specific selectors (contact, curriculum, about, etc.)
- No breakpoint-specific padding, gap, sizing, font-size, or visibility values
- No home-exclusive `body:has(.content__page--home)` or `.layout:has(.content__page--home)` rules (those stay in mobile)

**Verification:** File exists with valid CSS; rule set matches design.md shared-rule list.

---

## T2 — Add safe-area tokens to `src/styles/variables.css`

**Depends on:** T0
**Estimated lines:** +2 to +4

Add to `:root` block in `variables.css`:

```css
--safe-top: env(safe-area-inset-top, 0px);
--safe-bottom: env(safe-area-inset-bottom, 0px);
```

Place near existing foundation tokens (e.g., after `--ease-soft` definition and before `--profile-text`).

**Verification:** Tokens present in `:root`; `grep --safe-top variables.css` matches.

---

## T3 — Update `src/styles/index.css` import order

**Depends on:** T1, T2
**Estimated lines:** +1

Add `@import "./responsive-foundation.css";` between the last page/footer import (`@import "./error.css";`) and the first responsive breakpoint import (`@import "./responsive-tablet.css";`).

Resulting order:
```
variables.css → reset.css → layout.css → sidebar.css → page CSS files →
footer.css → error.css → responsive-foundation.css → responsive-tablet.css →
responsive-mobile.css → responsive-small.css → dark-mode.css
```

**Verification:** Import exists at correct position; grep confirms exact ordering.

---

## T4 — Replace direct `env(safe-area-*)` usages with `var(--safe-*)` tokens

**Depends on:** T2
**Estimated lines:** +5 to –0 (replace in-place)

Target all 6 occurrences of `env(safe-area-inset-*, 0px)` in foundation files:

### `src/styles/responsive-mobile.css`
1. Line 56: `calc(7.5rem + env(safe-area-inset-bottom, 0px))` → `calc(7.5rem + var(--safe-bottom))`
2. Line 77: `calc(0.7rem + env(safe-area-inset-top, 0px))` → `calc(0.7rem + var(--safe-top))`
3. Line 184: `calc(0.75rem + env(safe-area-inset-bottom, 0px))` → `calc(0.75rem + var(--safe-bottom))`
4. Line 406: `calc(7.5rem + env(safe-area-inset-bottom, 0px))` → `calc(7.5rem + var(--safe-bottom))`

### `src/styles/responsive-tablet.css`
5. Line 42: `calc(7.5rem + env(safe-area-inset-bottom, 0px))` → `calc(7.5rem + var(--safe-bottom))`

### `src/styles/dark-mode.css`
6. Line 149: `calc(0.55rem + env(safe-area-inset-top, 0px))` → `calc(0.55rem + var(--safe-top))`

**Note:** The `dark-mode.css` line 149 is inside a `@media (max-width: 767px)` block for `.sidebar__theme-toggle`. When ThemeToggle moves to `sidebar.css` (T5), this replacement moves with it.

**Verification:** `grep env(safe-area src/styles/` returns 0 matches after replacement.

---

## T5 — Move ThemeToggle structural styles from `dark-mode.css` to `sidebar.css`

**Depends on:** T4 (for the safe-area token replacement)
**Estimated lines:** +40 to +55 in `sidebar.css`; −45 to −60 in `dark-mode.css`

### What to move from `dark-mode.css` to `sidebar.css`
Remove these full blocks from `dark-mode.css`:
- `.sidebar__theme-toggle { ... }` (lines 63–84, structural + dims + border + bg + color + cursor + transition + z-index)
- `.sidebar__theme-toggle:hover { ... }` (lines 86–90)
- `.sidebar__theme-toggle:focus-visible { ... }` (lines 92–95)
- `@media (prefers-reduced-motion: reduce) { .sidebar__theme-toggle { transition-duration: 0.01ms; } }` (lines 141–144)
- `@media (max-width: 767px) { .sidebar__theme-toggle { ... } }` (lines 146–153) — **with** the safe-area token replacement from T4

### What to add to `sidebar.css`
Insert all of the above structural blocks in `sidebar.css`:
- Place near the end of the file, after the `.sidebar__copy` section and before the nav-float section, or in a clearly labeled `/* ThemeToggle — structural (shared across themes) */` section.
- The mobile media query must use `var(--safe-top)` instead of the direct `env(safe-area-inset-top, 0px)`.
- The reduced-motion transition-duration block is now covered by the global baseline in reset.css (T6), but keep it here too for safety (it's harmless redundant).

### What stays in `dark-mode.css`
- All `[data-theme="dark"]` variable overrides
- All component dark-mode rules (portfolio, curriculum, certificates, capability cards, etc.)
- No `.sidebar__theme-toggle` selectors remain

**Verification:** `grep sidebar__theme-toggle src/styles/dark-mode.css` returns 0 matches; `grep sidebar__theme-toggle src/styles/sidebar.css` returns matches for all blocks.

---

## T6 — Add global reduced-motion baseline to `src/styles/reset.css`

**Depends on:** T0
**Estimated lines:** +10 to +12; −4 to −5

### Replace the existing skip-link-only reduced-motion media block

Current (lines 49–52):
```css
@media (prefers-reduced-motion: reduce) {
	.skip-link {
		transition: none;
	}
}
```

Replace with:
```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

The `.skip-link` duration-only override is now covered by the global `transition-duration: 0.01ms !important`. Keep the `.skip-link` existing styles otherwise (position, z-index, transform, focus-visible outline).

### Preserved component reduced-motion (NOT touched in this task)
- `layout.css`: `.content__page:not(.content__page--home) { animation: none; }` — keeps (removes transform animation, not just duration)
- `sidebar.css`: `.sidebar__social-item:hover { transform: none; }` — keeps
- `home.css`: full reduced-motion block — keeps (non-goal, page CSS)
- `contact.css`, `portfolio.css`, `blog.css`, `footer.css`, `pages-*.css` — keep (non-goal, page CSS)

**Verification:** `grep "prefers-reduced-motion" src/styles/reset.css` shows global baseline; `grep "transition: none" src/styles/reset.css` returns 0.

---

## T7 — Co-label Home shell scroll ownership in `layout.css`

**Depends on:** T0
**Estimated lines:** 0 to +3 (comment only)

### No CSS behavior changes.
Add clarifying comments above the existing home shell rules in `layout.css`:

```css
/* Home shell — desktop scroll container ownership */
.layout__main:has(.content__page--home) {
	padding: 0;
	overflow: hidden auto;
}

/* Home shell — hide footer in scroll container */
.layout__main:has(.content__page--home) .footer {
	display: none;
}
```

The existing `@media (prefers-reduced-motion: reduce)` block for `.content__page:not(.content__page--home) { animation: none; }` remains in place because it removes a transform-based entrance animation (not just duration).

**Verification:** Comments present; zero diff in actual CSS declarations.

---

## T8 — Remove duplicated foundation blocks from `src/styles/responsive-tablet.css`

**Depends on:** T1, T3
**Estimated lines:** −50 to −80; +1 (safe-area token already done in T4)

### Which declarations to remove from `responsive-tablet.css`

Remove these exact blocks from the `@media (min-width: 768px) and (max-width: 1023px)` block:

1. `body { overflow-y: auto; }`
2. Full `.layout` static/single-column reset (lines 11–22)
3. `.layout__main { border-radius: 0; }` (line 24)
4. `.layout__main:has(.content__page--home) { padding: 0; overflow: visible; height: auto; }` (lines 30–34)
5. Full `.sidebar` structural conversion (lines 49–62) — *except* tablet-specific: `row-gap`, `column-gap`, `justify-content`, `padding`
6. `.sidebar::before { border-radius: 0; }` (line 64)
7. `.sidebar__profile { flex-direction: row; align-items: center; margin-bottom: 0; }` — *except* tablet-specific `gap: 0.9rem`
8. `.sidebar__name { margin-top: 0; letter-spacing: -0.03em; }` — *except* tablet-specific `font-size`, `font-weight`
9. `.sidebar__social { margin: 0; }`
10. `.sidebar__copy { display: none; }`
11. Full `.nav-float` fixed-bottom shell (lines 101–109)
12. `nav-float__list` common horizontal/full-width values (lines 111–119) — *except* tablet-specific `padding`, `justify-content: space-around` stays
13. `.nav-float__overlay { display: none; }` (line 125)

### What stays (tablet-specific + page-specific)
- `html { font-size: 56%; }`
- `.layout__main` tablet padding (`padding: 2.25rem 2rem; padding-bottom: 9rem;`)
- `.content__page--home` tablet padding/min-height/overflow (with safe-area token)
- Tablet sidebar spacing/sizing: `row-gap`, `column-gap`, `justify-content`, `padding`, avatar `width: 4.6rem`, role visible, social sizing/hover widths, social link/icon/name sizes, avatar-wrapper `margin-top: 0` + `::after` display
- Tablet nav: `padding`, `justify-content: space-around`, icon size
- All page-specific tablet blocks: method, principles, gallery, portfolio, contact, about, services, reviews, curriculum, certificates, prices, extra

**Verification:** Viewport at ~800px renders sticky header + bottom nav correctly; `grep "overflow-y: auto" responsive-tablet.css` returns 0; page-specific blocks intact.

---

## T9 — Remove duplicated foundation blocks from `src/styles/responsive-mobile.css`

**Depends on:** T1, T3
**Estimated lines:** −60 to −90; +1

### Which declarations to remove from `responsive-mobile.css`

Remove from the `@media (max-width: 767px)` block:

1. `body { overflow-y: auto; }`
2. Full `.layout` static/single-column reset
3. `.layout__main { border-radius: 0; }`
4. `.layout__main:has(.content__page--home) { padding: 0; overflow: visible; height: auto; }`
5. Full `.sidebar` structural conversion — *except* mobile-specific: `row-gap`, `column-gap`, `justify-content`, `padding`, `padding-top: calc(0.7rem + var(--safe-top))`
6. `.sidebar::before { border-radius: 0; }`
7. `.sidebar__profile { flex-direction: row; align-items: center; margin-bottom: 0; }` — *except* mobile-specific `gap: 0.6rem`, `flex: 1 1 auto`, `min-width: 0`
8. `.sidebar__name { margin-top: 0; letter-spacing: -0.03em; }` — *except* mobile-specific `font-size`, `font-weight`, `line-height`, ellipsis
9. `.sidebar__social { margin: 0; }`
10. `.sidebar__copy { display: none; }`
11. Full `.nav-float` fixed-bottom shell
12. `nav-float__list` common horizontal/full-width values — *except* mobile-specific `padding: 0.75rem 0.5rem calc(0.75rem + var(--safe-bottom))`
13. `.nav-float__overlay { display: none; }`

### What stays (mobile-specific + page-specific)
- `html { font-size: 56%; }`
- `.layout__main` mobile padding and `overflow: visible;`
- Mobile-only home body/layout rules: `body:has(.content__page--home)`, `.layout:has(.content__page--home)` grid/height/min-height/overflow
- `.content__page--home` mobile padding (with safe-area token), `::after { display: none; }`
- Mobile sidebar: compact gaps, padding, `padding-top: calc(... + var(--safe-top))`, avatar hidden, role hidden, name ellipsis, social non-expanding
- Mobile nav: list padding with `var(--safe-bottom)`, item min-width/min-height, icon size
- All page-specific mobile blocks: about, services, reviews, clients, prices, extra, portfolio, contact, curriculum, certificates, capabilities, timelines, etc.
- The small-mobile `@media (max-width: 480px)` block at bottom — home padding with safe-area token

**Verification:** Viewport at ~375px renders compact header + bottom nav correctly; `grep "overflow-y: auto" responsive-mobile.css` returns 0; page-specific blocks intact.

---

## T10 — Verify: `npm run lint`

**Depends on:** T1–T9
**Estimated lines:** 0

Run `npm run lint`. Must exit 0 with no new violations attributable to Unit 1 changes.

If failures occur, fix:
- CSS lint rules concerning `!important` in the global reduced-motion baseline (legitimate for this use case; add an eslint-disable comment if needed).

**Verification:** Exit 0; no new lint warnings.

---

## T11 — Verify: `npm run build`

**Depends on:** T10
**Estimated lines:** 0

Run `npm run build`. Must exit 0 with no new build errors or warnings.

**Verification:** Exit 0; build output confirms no errors.

---

## T12 — Verify: grep for `env(safe-area` and ThemeToggle in dark-mode.css

**Depends on:** T4, T5
**Estimated lines:** 0

1. Run `grep -rn 'env(safe-area' src/styles/` — confirm 0 matches.
2. Run `grep -rn 'sidebar__theme-toggle' src/styles/dark-mode.css` — confirm 0 matches.
3. Run `grep -rn 'sidebar__theme-toggle' src/styles/sidebar.css` — confirm matches for all: structural block, hover, focus-visible, reduced-motion, mobile media.

**Verification:** All grep checks pass.

---

## T13 — Verify: Manual viewport matrix

**Depends on:** T11
**Estimated lines:** 0

Test in browser devtools at these widths:

| Viewport | Routes | Expected |
|----------|--------|----------|
| Desktop 1280px+ | Home + non-home (e.g., /curriculum) | Floating 75% card, left sidebar, desktop floating nav, `.layout__main` owns scroll, desktop home footer hidden. |
| Tablet ~800px | Home + /contact | One-column layout, sticky top header (avatar + role visible), fixed bottom nav, no horizontal overflow. Page-specific tablet rules unchanged. |
| Mobile ~375px | Home + /portfolio | Compact sticky header (avatar hidden, role hidden), ThemeToggle fits, social icons compact and non-expanding, bottom nav clears content, no horizontal overflow. |
| Small mobile 360px / ≤480px | Home + /about | Small font-size override works, compact social/nav sizing, home bottom padding clears fixed nav, content readable. |
| Notched mobile (simulated) | Home + non-home | Header respects `--safe-top`, bottom nav respects `--safe-bottom`, no controls clipped by notches/insets. |

**Verification:** All cells in the matrix pass.

---

## T14 — Verify: Interaction checks

**Depends on:** T11
**Estimated lines:** 0

Check each:

1. ThemeToggle switches light/dark at desktop, tablet, mobile, small-mobile widths.
2. Reload in dark mode shows no light flash before hydration.
3. ThemeToggle `:focus-visible` outline visible at all widths.
4. Skip link appears on first keyboard Tab, moves focus to `#main-content`.
5. Navigation links retain `:focus-visible` outline and active styling.
6. `ScrollToTop` resets both `.layout__main` and window scroll on route changes.
7. With `prefers-reduced-motion: reduce`: page entrance animations disabled; home decorative animations disabled; smooth scroll disabled. Component `transform: none` overrides (social pills, etc.) still apply in sidebar.

**Verification:** All checks pass.

---

## T15 — Review / Judgment Day (fresh foundation-cascade review)

**Depends on:** T14
**Estimated lines:** 0

Before committing, do a focused review pass:

1. **Import order:** Confirm `index.css` order: base → layout → sidebar → pages → footer/error → **responsive-foundation** → tablet → mobile → small → dark.
2. **Cascade integrity:** Confirm `responsive-foundation.css` uses `@media (max-width: 1023px)` so it covers both tablet and mobile widths. Confirm tablet/mobile breakpoint files override it with more specific values when needed.
3. **No page-CSS changes:** Confirm `home.css`, `portfolio.css`, `blog.css`, `contact.css`, `pages-*.css` are completely untouched.
4. **No ghost env() calls:** Confirm no `env(safe-area` remains.
5. **ThemeToggle:** Confirm structural ownership is in `sidebar.css`; `dark-mode.css` has zero toggle selectors.
6. **Reduced motion:** Confirm global baseline in `reset.css`; confirm component `transform: none` rules (sidebar social hover, layout pageEnter removal) remain in their respective files.
7. **Home scroll:** Confirm `layout.css` home shell rules unchanged except comment labels.
8. **Social nth-child selectors:** Confirm untouched (non-goal).
9. **Avatar `!important`:** Confirm untouched (non-goal).
10. **Changed-line count:** Run `git diff --stat` and confirm ≤300 changed lines (target 190–260).

**Verification:** All review items pass; diff stat confirms within budget.

---

## T16 — Commit

**Depends on:** T15
**Estimated lines:** 0

```bash
git add -A
git commit -m "feat(foundation): responsive-foundation extraction, safe-area tokens, ThemeToggle ownership, reduced-motion baseline, home scroll co-label

- New responsive-foundation.css for shared tablet/mobile shell rules
- Remove duplicated layout/sidebar/nav blocks from responsive-tablet.css and responsive-mobile.css
- Add --safe-top and --safe-bottom tokens; replace all env(safe-area-inset-*) usages
- Move .sidebar__theme-toggle structural styles from dark-mode.css to sidebar.css
- Add global reduced-motion baseline to reset.css
- Co-label home shell scroll ownership in layout.css
- Update index.css import order

No page-specific responsive rules modified. No home/css/page CSS files touched.
Review budget: ~190-260 changed lines."
```

**Verification:** Commit created; `git log --oneline -1` shows the message.

---

## T17 — Rollback reference

**Depends on:** nothing
**Estimated lines:** 0

If rollback is needed after commit:

```bash
# Full rollback (revert commit)
git revert HEAD --no-edit
```

Or for manual rollback:

1. Remove `@import "./responsive-foundation.css";` from `index.css`.
2. Delete `src/styles/responsive-foundation.css`.
3. Restore duplicated shell/sidebar/nav responsive blocks in `responsive-tablet.css` and `responsive-mobile.css` from the pre-change revision (`git show HEAD~1:src/styles/responsive-tablet.css > src/styles/responsive-tablet.css`).
4. Move `.sidebar__theme-toggle` structural and mobile rules back from `sidebar.css` to `dark-mode.css` if ownership causes regressions.
5. Replace `var(--safe-top)` and `var(--safe-bottom)` with direct `env(safe-area-inset-*, 0px)` expressions and remove tokens from `variables.css`.
6. Restore the skip-link-only reduced-motion media block in `reset.css` by reverting to `git show HEAD~1:src/styles/reset.css`.
7. Re-run `npm run build`, `npm run lint`, and the manual viewport matrix.

**Verification:** `git status` clean; `npm run build` + `npm run lint` pass; viewport matrix correct.

---

## Summary of files touched

| File | Change type | Est. delta |
|------|-------------|-----------:|
| `src/styles/responsive-foundation.css` | **NEW** | +65 to +90 |
| `src/styles/index.css` | Edit (add import) | +1 |
| `src/styles/variables.css` | Edit (add tokens) | +2 to +4 |
| `src/styles/reset.css` | Edit (replace reduced-motion block) | +6 to +8 |
| `src/styles/sidebar.css` | Edit (add ThemeToggle structural) | +40 to +55 |
| `src/styles/dark-mode.css` | Edit (remove ThemeToggle structural) | −45 to −60 |
| `src/styles/layout.css` | Edit (add comments only) | 0 to +3 |
| `src/styles/responsive-tablet.css` | Edit (remove dupes, safe-area swap) | −50 to −80 |
| `src/styles/responsive-mobile.css` | Edit (remove dupes, safe-area swap) | −60 to −90 |
| **Total** | | **~190–260** |
