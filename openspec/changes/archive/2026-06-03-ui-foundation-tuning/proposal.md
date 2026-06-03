# Proposal: ui-foundation-tuning

## Problem statement

The portfolio UI foundation is functionally sound, but its responsive foundation rules are duplicated and mixed with page-specific responsive rules. This makes controlled component-by-component tuning risky: a small foundation adjustment can accidentally affect contact, curriculum, about, portfolio, pricing, or other page-specific layouts.

The most fragile areas are duplicated tablet/mobile layout resets, scattered safe-area `env()` usage, structural ThemeToggle styles living in `dark-mode.css`, home shell scroll rules split across multiple files, and reduced-motion rules spread across component styles without a global baseline.

## Intent

Create a clearer foundation layer for the existing raw CSS architecture so future UI tuning can proceed component by component without migrating to Tailwind and without disturbing page-specific responsive rules in Unit 1.

## Scope

Unit 1 is foundation-only. It should tune CSS ownership and organization for the application shell, sidebar/header transformation, bottom navigation, safe-area tokens, ThemeToggle structural placement, home shell scroll ownership, and reduced-motion baseline.

## Affected areas

Expected implementation touch points:

- `src/styles/index.css` — import the new shared responsive foundation file in the correct cascade position.
- `src/styles/variables.css` — add safe-area CSS tokens.
- `src/styles/reset.css` — add global reduced-motion baseline.
- `src/styles/layout.css` — clarify/co-locate desktop home shell scroll ownership.
- `src/styles/sidebar.css` — own ThemeToggle structural styles alongside sidebar/nav structure.
- `src/styles/dark-mode.css` — retain only actual dark-mode overrides; remove ThemeToggle structural ownership.
- `src/styles/responsive-tablet.css` — remove duplicated foundation blocks; keep breakpoint-specific and page-specific rules.
- `src/styles/responsive-mobile.css` — remove duplicated foundation blocks; keep mobile-specific and page-specific rules.
- New `src/styles/responsive-foundation.css` — shared tablet/mobile application shell, sidebar-header, and bottom-nav foundation.

No React component, page data, route, or Tailwind migration work is included.

## Goals

1. Separate shared responsive foundation rules from breakpoint-specific and page-specific responsive rules.
2. Reduce duplicated layout/sidebar/nav reset blocks across tablet and mobile CSS.
3. Centralize safe-area values as CSS custom properties.
4. Move ThemeToggle structural styling out of `dark-mode.css` and into sidebar ownership.
5. Make home shell scroll behavior easier to find and review without changing home component styling.
6. Add an accessible global reduced-motion baseline while preserving component-specific transform/behavior overrides.
7. Keep the reviewable implementation within the 300 changed-line budget.

## Non-goals

- Do not modify page-specific responsive rules for contact, curriculum, about, services, reviews, prices, portfolio, blog, or similar page sections.
- Do not modify sidebar social `nth-child` selectors; this was explicitly ruled out for Unit 1.
- Do not modify page CSS files such as `home.css`, `portfolio.css`, `blog.css`, or `contact.css`.
- Do not migrate to Tailwind; the project remains on global raw CSS.
- Do not change dark-mode hydration behavior or the SSR inline script in `layout.tsx`.
- Do not refactor component-specific dark-mode overrides.
- Do not address avatar `!important` specificity in this unit.
- Do not change scrollbar pseudo-element styling, page enter animation semantics, footer CSS, or `ScrollToTop.tsx` behavior.
- Do not modify or depend on the pre-existing `openspec/specs/design-responsividad/` files.

## Proposed changes

### A. Extract shared responsive foundation file

Create `src/styles/responsive-foundation.css` for shared rules that apply once the floating desktop card becomes a single-column app shell.

The file should own shared responsive foundation behavior, including:

- `body` responsive scroll unlock.
- `.layout` static positioning, full-width sizing, one-column grid areas, and border-radius reset.
- `.layout__main` border-radius reset where common.
- `.sidebar` conversion from desktop panel to sticky top header foundation.
- `.sidebar::before` border-radius reset.
- `.nav-float` conversion from desktop floating nav to fixed bottom navigation foundation.
- `.nav-float__list` shared horizontal bottom-bar shape.
- `.nav-float__overlay { display: none; }` for responsive bottom nav.

`responsive-tablet.css` and `responsive-mobile.css` should retain only breakpoint-specific values and existing page-specific blocks. This means page-specific rules stay in place for now, but foundation duplication is removed.

`index.css` should import the new file before `responsive-tablet.css` and `responsive-mobile.css` so breakpoint files can override spacing, sizing, and page-specific details.

### B. Add safe-area CSS tokens

Add safe-area tokens to `:root` in `variables.css`:

- `--safe-top: env(safe-area-inset-top, 0px);`
- `--safe-bottom: env(safe-area-inset-bottom, 0px);`

Use these tokens anywhere Unit 1 touches existing safe-area foundation rules, especially:

- Mobile sticky sidebar/header top padding.
- Mobile bottom nav bottom padding.
- Home shell bottom padding in tablet/mobile responsive files.
- ThemeToggle mobile top position if that responsive structural rule is moved with sidebar ownership.

The implementation should grep for remaining `env(safe-area` references and leave any remaining occurrences only if they are intentionally outside Unit 1 scope.

### C. Move ThemeToggle structural styles to `sidebar.css`

Move `.sidebar__theme-toggle` structural styles out of `dark-mode.css` because the button is part of sidebar layout, not a dark-mode override.

`sidebar.css` should own:

- Absolute positioning within the sidebar/header.
- Size and touch target dimensions.
- Border, background, color, cursor, hover, focus-visible, and transition styles.
- Reduced-motion behavior for the toggle.
- Mobile sizing/positioning if kept as a sidebar-owned media block.

`dark-mode.css` should keep only actual dark theme variable overrides or dark-only visual differences, if any are needed. This preserves the zero-flash dark-mode approach and avoids changing ThemeToggle React behavior.

### D. Consolidate Home scroll foundation ownership

Co-locate and clearly label home shell scroll rules so there is one conceptual owner for the application-shell behavior of `content__page--home`.

The implementation should keep the distinction between:

- Desktop home shell behavior in `layout.css` (`.layout__main:has(.content__page--home)` and footer hiding).
- Shared responsive home shell behavior where it can be safely deduplicated in `responsive-foundation.css`.
- Mobile-only shell behavior that must remain in `responsive-mobile.css`.
- Breakpoint-specific home padding values that should remain in their existing responsive files.

Do not move or edit page component styling in `home.css`. The purpose is ownership clarity for layout/scroll behavior, not a home redesign.

### E. Add global reduced-motion baseline

Add a global reduced-motion baseline in `reset.css` for WCAG-friendly motion handling:

- Minimize animation and transition durations.
- Limit animation iteration count.
- Disable smooth scrolling by setting `scroll-behavior: auto`.

Preserve component-specific reduced-motion overrides that do more than duration changes, such as `transform: none`, overlay behavior, or explicit animation removal. This avoids regressing components that need additional motion-specific behavior beyond the global baseline.

## Success criteria

- Shared tablet/mobile foundation rules are extracted into `responsive-foundation.css` and imported before breakpoint-specific responsive files.
- Existing page-specific responsive rules remain untouched in Unit 1.
- Safe-area values are available through `--safe-top` and `--safe-bottom` and used for touched foundation rules.
- `.sidebar__theme-toggle` structural styling is no longer owned by `dark-mode.css`.
- Home shell scroll rules are easier to find and review, with no page CSS redesign.
- Reduced-motion behavior has a global baseline and retains component-specific transform overrides.
- Desktop, tablet, mobile, and small-mobile layouts visually match the current foundation behavior.
- The implementation stays at or below the 300 changed-line review budget.

## Review budget / estimated changed lines

Target review budget: **≤300 changed lines** for Unit 1.

Estimated implementation diff: **180–250 changed lines**.

Expected net effect:

- New shared file adds foundation rules.
- Tablet/mobile files lose duplicated foundation blocks.
- Existing page-specific responsive blocks remain in place.
- Net new CSS should be modest because most additions replace duplicated blocks.

If implementation forecasting exceeds 300 changed lines, pause before apply and request a delivery decision.

## Verification plan

Required checks confirmed for this change:

1. `npm run build` — must exit 0 with no new build errors or warnings attributable to Unit 1.
2. `npm run lint` — must exit 0 with no new lint violations.
3. Manual viewport checks:
   - Desktop 1280px+ — floating card layout, sidebar, content panel, and desktop nav render correctly.
   - Tablet around 800px — sticky top header and fixed bottom nav render correctly.
   - Mobile around 375px — compact header, social icons, ThemeToggle, and bottom nav fit without horizontal overflow.
   - Small mobile around 360px/≤480px — content remains readable and no foundation overflow appears.
4. Dark mode toggle check:
   - Toggle switches theme without hydration flash on reload.
   - CSS variables update correctly.
   - Sidebar/social pills remain visible in light and dark modes.
5. Safe-area check:
   - iPhone/notched viewport simulation keeps sticky top header and fixed bottom nav clear of safe-area insets.
6. Reduced-motion check:
   - With `prefers-reduced-motion: reduce`, page animations and smooth scrolling are minimized.
   - Component-specific `transform: none` overrides still apply where needed.
7. Foundation regression checks:
   - Home page scroll works on desktop, tablet, and mobile.
   - Desktop home footer remains hidden in the scroll container.
   - Skip link appears on keyboard focus and remains hidden otherwise.
   - `ScrollToTop` still resets `.layout__main`/window scroll after navigation.

## Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Shared responsive foundation changes tablet/mobile cascade unexpectedly | Medium | High | Import before breakpoint files; verify desktop, tablet, mobile, and small mobile manually. |
| Page-specific responsive rules are accidentally changed while extracting foundation | Medium | High | Treat page-specific blocks as non-goal; only remove duplicated shell/sidebar/nav foundation rules. |
| Home shell scroll behavior regresses because rules are split by breakpoint | Low | High | Keep desktop, shared responsive, and mobile-specific responsibilities explicit; manually verify home at all breakpoints. |
| ThemeToggle styling changes because `dark-mode.css` currently imports last | Medium | Medium | Move complete structural rules together and verify light/dark plus mobile; keep dark-only overrides in `dark-mode.css` if needed. |
| Safe-area token replacement misses a call site | Low | Medium | Grep for `env(safe-area` after implementation and verify notched mobile simulation. |
| Global reduced-motion baseline overrides desired component behavior | Medium | Low | Preserve component-specific reduced-motion blocks that remove transforms or alter non-duration behavior. |

## Rollback plan

Rollback should be straightforward because Unit 1 is CSS-only foundation organization:

1. Remove `src/styles/responsive-foundation.css` and its `index.css` import.
2. Restore duplicated foundation blocks in `responsive-tablet.css` and `responsive-mobile.css` from the pre-change version.
3. Move `.sidebar__theme-toggle` structural styles back to `dark-mode.css` if sidebar ownership causes regressions.
4. Revert safe-area token substitutions back to direct `env(safe-area-inset-*, 0px)` usage if needed.
5. Remove the global reduced-motion baseline from `reset.css` if it causes unexpected animation regressions.

Because no React behavior or data shape changes are planned, rollback should not require application state, database, route, or API changes.

## Open questions

None for Unit 1. The required decisions are already confirmed:

- Scope is foundation-only.
- Page-specific responsive rules stay untouched.
- Sidebar social `nth-child` selectors stay as-is.
- Verification includes build, lint, manual viewport checks, dark-mode toggle check, and safe-area check.
