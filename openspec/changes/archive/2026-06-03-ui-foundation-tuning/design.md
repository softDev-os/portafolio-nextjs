# Design: ui-foundation-tuning — Unit 1 Foundation Layer Cleanup

## Status

Design-ready. This unit is CSS-only foundation organization for the existing raw global CSS architecture. It does **not** migrate to Tailwind and does **not** change React components, routes, data modules, or the dark-mode hydration script.

## Inputs reviewed

- `openspec/changes/ui-foundation-tuning/explore.md`
- `openspec/changes/ui-foundation-tuning/proposal.md`
- `openspec/changes/ui-foundation-tuning/specs/ui-foundation/spec.md`
- `openspec/config.yaml`
- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` global CSS guidance
- Target styles/components:
  - `src/styles/index.css`
  - `src/styles/variables.css`
  - `src/styles/reset.css`
  - `src/styles/layout.css`
  - `src/styles/sidebar.css`
  - `src/styles/dark-mode.css`
  - `src/styles/responsive-tablet.css`
  - `src/styles/responsive-mobile.css`
  - `src/styles/responsive-small.css`
  - `src/app/layout.tsx`
  - `src/components/ThemeToggle.tsx`
  - `src/components/ScrollToTop.tsx`

## Architecture overview

### Current ownership

The application currently uses a global CSS cascade imported once from `src/app/layout.tsx` via `src/styles/index.css`, which is valid for the App Router global stylesheet model. Foundation behavior is split across multiple global stylesheets:

| Concern | Current owner | Issue |
| --- | --- | --- |
| Desktop floating card shell | `layout.css` | Clear desktop owner; keep this as-is. |
| Tablet/mobile shell reset | `responsive-tablet.css`, `responsive-mobile.css` | Duplicated layout, sidebar, and bottom-nav rules. |
| Breakpoint-specific tuning | `responsive-tablet.css`, `responsive-mobile.css`, `responsive-small.css` | Correct owner, but mixed with shared foundation. |
| Page-specific responsive rules | `responsive-tablet.css`, `responsive-mobile.css`, `responsive-small.css` | Must remain untouched in Unit 1. |
| Safe-area values | Direct `env(safe-area-inset-*, 0px)` in responsive files and ThemeToggle mobile styles | Repeated expressions instead of tokens. |
| ThemeToggle structure | `dark-mode.css` | Structural sidebar button styles live in a theme file. |
| Dark-mode variables and component overrides | `dark-mode.css` | Correct owner for actual theme overrides. |
| Reduced motion | `reset.css`, `layout.css`, `sidebar.css`, `dark-mode.css`, page styles | No global baseline; some foundation blocks duplicate duration-only rules. |
| Home shell scroll | `layout.css`, `responsive-tablet.css`, `responsive-mobile.css` | Behavior is correct but conceptually split. |

### Target ownership

Unit 1 introduces a shared responsive foundation layer while preserving desktop and page-specific behavior:

| Concern | Target owner | Notes |
| --- | --- | --- |
| Design tokens | `variables.css` | Add safe-area tokens only. |
| Reset, base body defaults, skip link, global reduced motion | `reset.css` | Add universal reduced-motion baseline. |
| Desktop floating shell and desktop home scroll | `layout.css` | Keep desktop `.layout` and `.layout__main` ownership. |
| Sidebar/nav desktop structure and ThemeToggle structure | `sidebar.css` | Move `.sidebar__theme-toggle` structural styles here. |
| Shared tablet/mobile shell, sticky header foundation, fixed bottom nav foundation | New `responsive-foundation.css` | Imported before tablet/mobile/small breakpoint files. |
| Tablet-specific values and page-specific tablet rules | `responsive-tablet.css` | Remove duplicated shared foundation only. |
| Mobile-specific values, mobile-only home shell, and page-specific mobile rules | `responsive-mobile.css` | Remove duplicated shared foundation only. |
| Small mobile fine-tuning | `responsive-small.css` | No planned ownership change except indirect cascade from new foundation. |
| Dark-mode variables and true dark-only visual differences | `dark-mode.css` | Remove ThemeToggle structure; retain theme variable overrides and component dark styling. |

## Data and cascade flow

No runtime data flow changes are planned. Existing React behavior remains intact:

1. `src/app/layout.tsx` imports `@/styles/index.css` once for global CSS.
2. The inline head script sets `document.documentElement.dataset.theme` before first paint.
3. `ThemeToggle.tsx` toggles `data-theme` and `localStorage` after hydration.
4. `ScrollToTop.tsx` resets `.layout__main.scrollTop` and `window.scrollTo(0, 0)` after route changes.
5. CSS cascade resolves in this order:
   - tokens and base reset;
   - desktop shell/sidebar/page rules;
   - shared responsive foundation;
   - tablet/mobile/small overrides;
   - dark-mode variable/component overrides last.

The unit changes only CSS ownership and import order within the existing global stylesheet pipeline.

## Exact file plan

### `src/styles/responsive-foundation.css` — new file

Create this file for shared behavior that applies to both tablet and mobile once the desktop floating card becomes a single-column application shell.

Planned contents:

- `@media (max-width: 1023px)` wrapper.
- Shared responsive `body` scroll unlock:
  - `overflow-y: auto;`
- Shared `.layout` reset:
  - `position: static;`
  - `top: auto;`
  - `left: auto;`
  - `transform: none;`
  - `width: 100%;`
  - `height: auto;`
  - `min-height: 100vh;`
  - `margin: 0;`
  - one-column `grid-template-areas` and `grid-template-columns: 1fr;`
  - `border-radius: 0;`
- Shared `.layout__main` common responsive reset:
  - `border-radius: 0;`
- Shared responsive home shell rule where tablet and mobile currently match:
  - `.layout__main:has(.content__page--home) { padding: 0; overflow: visible; height: auto; }`
- Shared sidebar-to-header foundation:
  - `border-radius: 0;`
  - `height: auto;`
  - `min-height: unset;`
  - `flex-direction: row;`
  - `flex-wrap: wrap;`
  - common alignment and sticky positioning;
  - `min-width: unset;`
  - `overflow: visible;`
  - `position: sticky;`
  - `top: 0;`
  - `z-index: 10;`
  - `background: var(--sidebar-surface);`
  - `box-shadow: var(--sidebar-shadow-bar), var(--sidebar-highlight-top);`
  - `border-bottom: 1px solid var(--sidebar-edge);`
- Shared `.sidebar::before { border-radius: 0; }`.
- Shared `.sidebar__profile` horizontal header foundation:
  - `flex-direction: row;`
  - `align-items: center;`
  - `margin-bottom: 0;`
- Shared `.sidebar__name` header reset:
  - `margin-top: 0;`
  - `letter-spacing: -0.03em;`
- Shared `.sidebar__social { margin: 0; }`.
- Shared `.sidebar__copy { display: none; }`.
- Shared bottom navigation foundation:
  - `.nav-float` fixed to bottom, left/right 0, full width, `z-index: 100;`
  - `.nav-float__list` horizontal row, full width, no min-height, no border radius, space-around, bottom-bar shadow;
  - `.nav-float__overlay { display: none; }`.

Do not add page-specific selectors here except the shell-owned home selectors explicitly listed above.

### `src/styles/index.css` — import order

Current order imports responsive tablet/mobile/small files before `dark-mode.css`. Keep `dark-mode.css` last for theme overrides and add the new shared responsive foundation immediately before breakpoint-specific responsive files:

```css
@import "./variables.css";
@import "./reset.css";
@import "./layout.css";
@import "./sidebar.css";
@import "./home.css";
@import "./portfolio.css";
@import "./blog.css";
@import "./contact.css";
@import "./pages-headers.css";
@import "./pages-profile.css";
@import "./pages-services.css";
@import "./pages-pricing.css";
@import "./pages-misc.css";
@import "./footer.css";
@import "./error.css";
@import "./responsive-foundation.css";
@import "./responsive-tablet.css";
@import "./responsive-mobile.css";
@import "./responsive-small.css";
@import "./dark-mode.css";
```

Rationale: shared responsive rules must exist before tablet/mobile/small overrides; dark mode remains last so `[data-theme="dark"]` variable and component overrides continue to win.

### `src/styles/variables.css` — safe tokens

Add safe-area tokens in `:root` near other foundation tokens:

```css
--safe-top: env(safe-area-inset-top, 0px);
--safe-bottom: env(safe-area-inset-bottom, 0px);
```

Use these tokens in touched foundation safe-area expressions. No color, typography, shadow, or easing token retuning is planned.

### `src/styles/reset.css` — reduced-motion baseline

Replace the skip-link-only reduced-motion block with a global baseline:

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

The existing `.skip-link` and `.skip-link:focus-visible` styles must remain otherwise unchanged so keyboard users can still bypass navigation.

### `src/styles/sidebar.css` — ThemeToggle structural styles

Move `.sidebar__theme-toggle` base and interaction styles from `dark-mode.css` into `sidebar.css` because the button is structurally part of the sidebar/header. `sidebar.css` should own:

- Absolute placement in the desktop sidebar.
- Button dimensions and minimum touch target.
- Border, border radius, background, color, cursor.
- Hover transform/background/border-color.
- `:focus-visible` outline.
- Mobile responsive dimensions/positioning currently in `dark-mode.css`.
- Any reduced-motion rule that is needed for non-duration behavior; transition duration alone is covered by `reset.css`.

The mobile ThemeToggle top position should use `var(--safe-top)`:

```css
top: calc(0.55rem + var(--safe-top));
```

### `src/styles/dark-mode.css` — remove structural ThemeToggle rules

Remove these non-theme structural blocks from `dark-mode.css`:

- `.sidebar__theme-toggle { ... }`
- `.sidebar__theme-toggle:hover { ... }`
- `.sidebar__theme-toggle:focus-visible { ... }`
- ThemeToggle reduced-motion block if it only changes transition duration.
- ThemeToggle mobile media rule.

Keep `dark-mode.css` for:

- `[data-theme="dark"]` variable overrides.
- Existing component dark-mode rules.
- A ThemeToggle-specific dark-mode selector only if implementation discovers an actual dark-only visual difference is required. The current button uses white-on-translucent styling that works on both sidebar surfaces, so no dark-only ThemeToggle rule is expected.

### `src/styles/layout.css` — Home shell ownership

Keep desktop layout ownership in `layout.css`:

- `.layout` desktop floating-card grid remains unchanged.
- `.layout__main` scroll container remains unchanged.
- `.layout__main:has(.content__page--home)` remains the desktop home scroll owner.
- `.layout__main:has(.content__page--home) .footer { display: none; }` remains unchanged.
- `@media (prefers-reduced-motion: reduce)` for `.content__page:not(.content__page--home) { animation: none; }` remains because it removes a transform-based entrance animation, not just duration.

Recommended comment adjustment only: make the home block label explicit as `Home shell — desktop scroll container ownership` so future tuning can find it.

### `src/styles/responsive-tablet.css` — tablet-specific and page rules

Remove duplicated shared foundation declarations that move to `responsive-foundation.css`. Keep tablet-specific values and page-specific rules.

Tablet should retain:

- `html { font-size: 56%; }`
- `.layout__main` tablet padding:
  - `padding: 2.25rem 2rem;`
  - `padding-bottom: 9rem;`
- `.content__page--home` tablet padding and min/overflow values:
  - use `var(--safe-bottom)` instead of direct `env(...)`.
- Tablet sidebar spacing and sizing values:
  - `row-gap`, `column-gap`, `justify-content`, `padding`;
  - avatar shown at `4.6rem`;
  - role visible;
  - social pill dimensions and hover expansion widths.
- Tablet nav values:
  - list padding;
  - icon size.
- All existing tablet page-specific responsive blocks for method/principles/gallery/portfolio/contact/about/services/reviews/curriculum/prices/extra.

Tablet should no longer duplicate:

- `body { overflow-y: auto; }`
- full `.layout` static/single-column reset.
- common `.layout__main { border-radius: 0; }` if moved.
- full sticky `.sidebar` structural conversion values that are identical to mobile.
- `.sidebar::before { border-radius: 0; }`
- common `.sidebar__profile`, `.sidebar__name`, `.sidebar__social`, `.sidebar__copy` resets.
- fixed `.nav-float` shell and `.nav-float__overlay { display: none; }`.
- common `.nav-float__list` horizontal/full-width shape values.

### `src/styles/responsive-mobile.css` — mobile-specific and page rules

Remove duplicated shared foundation declarations that move to `responsive-foundation.css`. Keep mobile-only values and page-specific rules.

Mobile should retain:

- `html { font-size: 56%; }`
- `.layout__main` mobile padding and `overflow: visible;`
- mobile-only home body/layout shell behavior:
  - `body:has(.content__page--home) { overflow: auto; }`
  - `.layout:has(.content__page--home) { height: auto; min-height: 100dvh; overflow: visible; grid-template-rows: auto 1fr; }`
- `.content__page--home` mobile padding and `::after` suppression:
  - use `var(--safe-bottom)` instead of direct `env(...)`.
- Mobile sidebar spacing and sizing values:
  - compact gaps;
  - `padding` and `padding-top: calc(... + var(--safe-top))`;
  - avatar hidden;
  - role hidden;
  - name ellipsis;
  - social icons compact and non-expanding.
- Mobile nav values:
  - list padding with `var(--safe-bottom)`;
  - item minimum target size;
  - icon size.
- All existing mobile page-specific responsive blocks for about/services/reviews/clients/prices/extra/portfolio/contact/curriculum.
- The existing `@media (max-width: 480px)` home shell padding block at the bottom, updated to `var(--safe-bottom)`.

Mobile should no longer duplicate:

- `body { overflow-y: auto; }` base responsive unlock.
- full `.layout` static/single-column reset.
- `.layout__main:has(.content__page--home)` shared responsive home rule.
- common sticky `.sidebar` structural conversion values.
- `.sidebar::before { border-radius: 0; }`
- common `.sidebar__profile`, `.sidebar__name`, `.sidebar__social`, `.sidebar__copy` resets.
- fixed `.nav-float` shell and `.nav-float__overlay { display: none; }`.
- common `.nav-float__list` horizontal/full-width shape values.

### `src/styles/responsive-small.css` — small mobile ownership

No planned structural ownership changes. Keep small-mobile fine-tuning and page-specific rules in place.

Check whether `.layout__main` small padding should continue to override mobile padding. Because `responsive-small.css` imports after `responsive-mobile.css`, it will keep winning. Do not retune page-specific small rules in Unit 1.

## Cascade strategy

### Responsive foundation import position

`responsive-foundation.css` must be imported after desktop/base/page CSS and before breakpoint files:

```txt
base/tokens/reset/layout/sidebar/page styles
→ responsive-foundation.css
→ responsive-tablet.css
→ responsive-mobile.css
→ responsive-small.css
→ dark-mode.css
```

This lets the new file provide a common tablet/mobile baseline at `max-width: 1023px`, while tablet/mobile/small files continue to provide narrower or more specific values.

### Page-specific responsive rules remain untouched

Selectors for contact, curriculum, about, services, reviews, prices, portfolio, blog, and similar page content remain in their current responsive files. Unit 1 only removes duplicated shell/sidebar/nav foundation rules.

This intentionally leaves page-specific responsive files imperfect, but avoids coupling foundation cleanup to page retuning.

### Tablet/mobile override shared rules

Rules in `responsive-tablet.css` and `responsive-mobile.css` import after `responsive-foundation.css`, so normal cascade order allows them to override shared values without increasing specificity. Examples:

- Shared `.sidebar` defines sticky header structure; tablet/mobile set different padding, gaps, profile visibility, and social sizing.
- Shared `.nav-float__list` defines horizontal full-width bottom bar; tablet/mobile set different padding and icon sizing.
- Shared `.layout__main:has(.content__page--home)` defines responsive home scroll behavior; mobile adds body/layout `:has()` rules and breakpoint-specific page padding.

Avoid adding `!important`; the design relies on import order and equal specificity.

### Dark mode stays last

`dark-mode.css` remains last so `[data-theme="dark"]` custom property overrides continue to affect all previous CSS. Since ThemeToggle structure moves to `sidebar.css`, there should be no dependence on dark-mode import order for the toggle’s layout.

## Detailed move/extract plan

### Rules moved from tablet/mobile to `responsive-foundation.css`

Move the shared portions of these blocks into one `@media (max-width: 1023px)` block:

1. Responsive body scroll unlock:
   - From tablet/mobile: `body { overflow-y: auto; }`

2. Responsive layout reset:
   - From tablet/mobile `.layout`:
     - `position: static;`
     - `top: auto;`
     - `left: auto;`
     - `transform: none;`
     - `width: 100%;`
     - `height: auto;`
     - `min-height: 100vh;`
     - `margin: 0;`
     - one-column grid areas;
     - `grid-template-columns: 1fr;`
     - `border-radius: 0;`

3. Responsive main common reset:
   - From tablet/mobile `.layout__main`:
     - `border-radius: 0;`
   - Do **not** move mobile-only `overflow: visible` for non-home pages.
   - Do **not** move breakpoint-specific padding.

4. Responsive home shell common rule:
   - From tablet/mobile:
     - `.layout__main:has(.content__page--home) { padding: 0; overflow: visible; height: auto; }`

5. Sidebar/header shared conversion:
   - From tablet/mobile `.sidebar` common declarations:
     - `border-radius: 0;`
     - `height: auto;`
     - `min-height: unset;`
     - `flex-direction: row;`
     - `flex-wrap: wrap;`
     - `align-items: center;`
     - `min-width: unset;`
     - `overflow: visible;`
     - `position: sticky;`
     - `top: 0;`
     - `z-index: 10;`
     - `background: var(--sidebar-surface);`
     - `box-shadow: var(--sidebar-shadow-bar), var(--sidebar-highlight-top);`
     - `border-bottom: 1px solid var(--sidebar-edge);`
   - From tablet/mobile `.sidebar::before`:
     - `border-radius: 0;`
   - From tablet/mobile child shared resets:
     - `.sidebar__profile { flex-direction: row; align-items: center; margin-bottom: 0; }`
     - `.sidebar__name { margin-top: 0; letter-spacing: -0.03em; }`
     - `.sidebar__social { margin: 0; }`
     - `.sidebar__copy { display: none; }`

6. Nav bottom-bar shared conversion:
   - From tablet/mobile `.nav-float`:
     - `position: fixed;`
     - `right: 0;`
     - `left: 0;`
     - `bottom: 0;`
     - `top: auto;`
     - `width: 100%;`
     - `z-index: 100;`
   - From tablet/mobile `.nav-float__list` common declarations:
     - `flex-direction: row;`
     - `width: 100%;`
     - `min-height: unset;`
     - `border-radius: 0;`
     - `justify-content: space-around;`
     - bottom shadow.
   - From tablet/mobile `.nav-float__overlay`:
     - `display: none;`

### Rules that remain in tablet/mobile

Keep anything that differs by breakpoint or is page-specific:

- `html` font-size per breakpoint.
- `.layout__main` padding and mobile `overflow: visible`.
- `.content__page--home` padding/min-height/overflow values.
- Mobile-only `body:has(.content__page--home)` and `.layout:has(.content__page--home)`.
- Tablet avatar/role/social expansion sizing.
- Mobile avatar hidden, role hidden, name ellipsis, social non-expansion.
- Tablet/mobile nav padding, icon sizing, and mobile touch target sizes.
- All page-specific selectors and blocks already present in responsive files.

### Rules moved from `dark-mode.css` to `sidebar.css`

Move the full structural ThemeToggle block:

- `.sidebar__theme-toggle`
- `.sidebar__theme-toggle:hover`
- `.sidebar__theme-toggle:focus-visible`
- `@media (max-width: 767px) { .sidebar__theme-toggle { ... } }`

Replace the mobile direct safe-area expression with `var(--safe-top)`.

Do not move dark-mode variables or component dark rules into `sidebar.css`.

### Reduced-motion rules: remain vs covered by `reset.css`

Covered by the new reset baseline:

- `reset.css` skip-link transition duration.
- ThemeToggle transition-duration-only media rule from `dark-mode.css` after ThemeToggle moves to `sidebar.css`.
- Foundation transition-duration-only behavior for `.nav-float__icon`, `.nav-float__overlay`, and `.nav-float__link`.

Should remain because they remove transforms, animations, overlays, or non-duration behavior:

- `layout.css`: `.content__page:not(.content__page--home) { animation: none; }`.
- `sidebar.css`: `.sidebar__social-item:hover, .sidebar__social-item:focus-within { transform: none; }`.
- `home.css`: page-specific animation removal, opacity restoration, transform reset, pulse hiding.
- `contact.css`: `.contact__data { animation: none; }`.
- Other page-specific reduced-motion blocks should remain untouched in Unit 1 even if some declarations are duration-only, because page CSS files are non-goals.

If implementation removes redundant transition-only rules from foundation files, verify that `prefers-reduced-motion: reduce` still passes manual checks. Do not expand this cleanup into page CSS.

## Accessibility design

### Reduced motion

Add the global baseline in `reset.css` to minimize animations, repeated animations, transitions, and smooth scrolling. Preserve component rules that explicitly remove transform-based or persistent animations. This aligns with WCAG motion sensitivity expectations without removing all component-specific safeguards.

### Safe area

Expose `--safe-top` and `--safe-bottom` tokens in `variables.css` and use them in touched foundation/mobile shell rules:

- mobile sticky sidebar/header top padding;
- mobile ThemeToggle top offset;
- mobile bottom nav padding-bottom;
- tablet/mobile/small home bottom padding where touched.

This keeps the top header and bottom navigation clear of notched viewport insets.

### Skip link preservation

The skip link in `src/app/layout.tsx` and `reset.css` must remain unchanged except for reduced-motion handling. The `:focus-visible` reveal, high z-index, visible outline, and `href="#main-content"` target are preserved.

### Focus-visible preservation

Existing focus-visible rules must remain:

- `.skip-link:focus-visible` in `reset.css`.
- `.sidebar__theme-toggle:focus-visible`, moved to `sidebar.css`.
- `.nav-float__link:focus-visible`, `.home-hero__cta-link:focus-visible`, `.contact__data:focus-visible`, `.footer__link:focus-visible`, `.footer__social-link:focus-visible` in `sidebar.css`.

Do not introduce focus outline suppression. ThemeToggle remains a native `<button>` with an accessible `aria-label` in `ThemeToggle.tsx`; no React changes are needed.

### Dark mode flash avoidance

Do not modify `src/app/layout.tsx` dark-mode inline script, `suppressHydrationWarning`, or `ThemeToggle.tsx` mount-placeholder pattern. Keep `dark-mode.css` last in `index.css` so `[data-theme="dark"]` variable overrides apply before first meaningful paint after the inline script sets the attribute.

## Risks and tradeoffs

| Risk/tradeoff | Impact | Mitigation |
| --- | --- | --- |
| Cascade regression from shared `responsive-foundation.css` | Medium/high: tablet/mobile shell could shift if a moved declaration stops applying. | Import before tablet/mobile/small files; move only declarations already duplicated across tablet and mobile; verify viewport matrix before commit. |
| `:has()` behavior | Medium: home shell behavior depends on `:has(.content__page--home)`, and route changes can alter matching dynamically. | Do not introduce new `:has()` patterns beyond co-locating existing shell selectors; manually verify home and non-home routes after navigation. |
| Body overflow model | Medium/high: desktop uses `body { overflow: hidden }` and `.layout__main` scroll; responsive unlocks body scroll. | Keep desktop body overflow unchanged; move existing responsive unlock to shared foundation; keep mobile home body/layout exceptions. |
| Page-specific responsive rules are intentionally not touched | Tradeoff: responsive files remain partly mixed after Unit 1. | Accept as scope boundary to stay below review budget and avoid accidental page retuning. Future units can migrate page-specific rules more deliberately. |
| ThemeToggle changes owner while `dark-mode.css` remains last | Medium: moving styles can expose cascade differences. | Move the complete structural block to `sidebar.css`; keep dark-mode last only for true theme overrides; test light/dark at all breakpoints. |
| Global reduced-motion baseline may make existing transition-only media blocks redundant | Low: redundant rules are harmless. | Remove only foundation transition-duration-only redundancies if convenient; leave page-specific CSS untouched. |
| Safe-area token replacement misses a direct `env()` | Low/medium. | Grep `env(safe-area` after implementation; any remaining occurrence must be deliberate and documented by apply/verify. |

## Verification checklist

### Automated checks

- [ ] `npm run build` exits 0 with no new Unit 1-attributable warnings/errors.
- [ ] `npm run lint` exits 0 with no new violations.
- [ ] Grep `env(safe-area` and confirm remaining occurrences are intentional or absent from touched foundation paths.
- [ ] Inspect `index.css` import order and confirm `responsive-foundation.css` loads before tablet/mobile/small and `dark-mode.css` remains last.

### Manual viewport matrix

| Viewport | Pages/routes | Expected shell behavior |
| --- | --- | --- |
| Desktop 1280px+ | Home and at least one non-home page | Floating 75% card, left sidebar, desktop floating nav, `.layout__main` owns non-home scroll, desktop home footer hidden. |
| Tablet ~800px | Home and one content-heavy page such as curriculum/contact | One-column layout, sticky top header with avatar and role visible, bottom nav fixed, no horizontal overflow, tablet page-specific rules unchanged. |
| Mobile ~375px | Home, curriculum/contact, portfolio | Compact sticky header, avatar hidden, role hidden, social icons fit, ThemeToggle fits, bottom nav clears content, no horizontal overflow. |
| Small mobile 360px and/or ≤480px | Home and one non-home page | Small font-size override works, compact social/nav sizing works, home bottom padding clears fixed nav, content remains readable. |
| Notched mobile simulation | Home and non-home | Header uses `--safe-top`; bottom nav and home shell use `--safe-bottom`; no controls are clipped. |

### Manual interaction checks

- [ ] ThemeToggle switches light/dark at desktop, tablet, mobile, and small-mobile widths.
- [ ] Reload in dark mode shows no light flash before hydration.
- [ ] ThemeToggle focus-visible outline is visible and not clipped.
- [ ] Skip link appears on first keyboard Tab and moves focus to `#main-content`.
- [ ] Navigation links retain focus-visible outline and active styling.
- [ ] `ScrollToTop` resets both `.layout__main` and window scroll on route changes.
- [ ] With `prefers-reduced-motion: reduce`, page entrance animations and home decorative animations are minimized/disabled, and smooth scroll is disabled.

## Review workload forecast

Target budget: **≤300 changed lines** for Unit 1.

Forecasted implementation review load:

| File | Estimated changed lines | Notes |
| --- | ---: | --- |
| `src/styles/responsive-foundation.css` | +65 to +90 | New shared foundation file. |
| `src/styles/index.css` | +1 | Add import. |
| `src/styles/variables.css` | +2 to +4 | Safe-area tokens. |
| `src/styles/reset.css` | +8 to +12, -3 to -5 | Replace skip-link-only reduced-motion block with global baseline. |
| `src/styles/sidebar.css` | +35 to +55, small removals possible | ThemeToggle structural styles and optional reduced-motion cleanup. |
| `src/styles/dark-mode.css` | -40 to -60 | Remove ThemeToggle structural ownership. |
| `src/styles/layout.css` | 0 to +3 | Comment clarification only; keep behavior. |
| `src/styles/responsive-tablet.css` | -50 to -80, +1 to +3 | Remove duplicated foundation; safe-area token substitution. |
| `src/styles/responsive-mobile.css` | -60 to -95, +2 to +5 | Remove duplicated foundation; safe-area token substitution. |
| `src/styles/responsive-small.css` | 0 to +1 | Only safe-area token substitution if touched. |

Expected total review load: **~190–260 changed lines**, within the 300-line budget.

If apply-time edits forecast or exceed 300 changed lines, pause before implementation and split into two units:

1. `responsive-foundation.css` extraction and import order.
2. ThemeToggle ownership, safe-area tokens, and reduced-motion baseline.

## Rollback notes

Rollback is CSS-only and does not involve data, routes, or React behavior.

1. Remove `@import "./responsive-foundation.css";` from `src/styles/index.css`.
2. Delete `src/styles/responsive-foundation.css`.
3. Restore duplicated shell/sidebar/nav responsive blocks in `responsive-tablet.css` and `responsive-mobile.css` from the pre-change revision.
4. Move `.sidebar__theme-toggle` structural and mobile rules back from `sidebar.css` to `dark-mode.css` if ownership causes regressions.
5. Replace `var(--safe-top)` and `var(--safe-bottom)` usages with direct `env(safe-area-inset-*, 0px)` expressions and remove the tokens from `variables.css` if necessary.
6. Remove the global reduced-motion baseline from `reset.css` and restore the skip-link-specific media block if the baseline causes unexpected regressions.
7. Re-run `npm run build`, `npm run lint`, and the manual viewport matrix after rollback.

## Implementation contract for the next phase

- MUST keep changes within raw global CSS.
- MUST NOT modify React components, routes, data modules, Tailwind configuration, or page CSS files outside the listed foundation files.
- MUST keep page-specific responsive selectors intact.
- MUST preserve `src/app/layout.tsx` dark-mode inline script and skip-link markup.
- MUST verify with build, lint, and manual viewport matrix.
- SHOULD stay at or below 300 changed lines; otherwise pause for delivery/splitting decision.
