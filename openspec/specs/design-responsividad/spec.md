# Design & Responsiveness Overhaul Specification

## Purpose

Systematically improve the CSS architecture, responsive behaviour, accessibility, and typography of the portafolio-nextjs site through four incremental phases. Each phase MUST be shippable as an independent PR with zero regressions in visual output (except where the spec explicitly allows improvement). The work addresses three structural problems: monolithic CSS files that hinder maintenance, incomplete `prefers-reduced-motion` coverage, missing intermediate grid breakpoints, and typography that jumps at breakpoint boundaries instead of scaling fluidly.

## Non-Goals

- Migrating from plain CSS to Tailwind, CSS-in-JS, or any other styling framework.
- Redesigning the visual identity, colour palette, or component structure.
- Adding a test runner (the project currently has none; verification relies on `npm run build` and manual/Lighthouse checks).
- Converting the desktop-first cascade to mobile-first (Phase 4 is conditional and deferred until Phases 1–3 are merged and validated).
- Touching non-CSS files except where explicitly stated (e.g. `error.tsx`, blog page components).
- Changing the BEM-like naming convention or CSS custom property names.

## Existing CSS Architecture

| File | Lines | Role |
|---|---|---|
| `src/styles/index.css` | 12 | Cascade entry point (`@import` chain) |
| `src/styles/variables.css` | 50 | `:root` custom properties |
| `src/styles/responsive.css` | 913 | Three `@media` blocks: tablet (768–1023px), mobile (≤767px), small (≤480px) |
| `src/styles/pages.css` | 860 | Interior page overrides, headers, method, principles, pricing, extras, clients, knowledge |
| `src/styles/dark-mode.css` | — | `[data-theme="dark"]` overrides |
| `src/styles/home.css` | — | Hero, CTA, animations, `@keyframes` |
| `src/styles/portfolio.css` | — | Portfolio cards, gallery, transitions |
| `src/styles/contact.css` | — | Contact form, float animation |

Breakpoints (desktop-first, `max-width`):
- Tablet: `min-width: 768px and max-width: 1023px`
- Mobile: `max-width: 767px`
- Small: `max-width: 480px`

---

## Phase 1 — CSS File Split (PR #1)

**Goal:** Split `responsive.css` (913 lines) and `pages.css` (860 lines) into smaller, focused files without changing any visual output.

### Requirement: Split `responsive.css` by breakpoint

The system MUST split `src/styles/responsive.css` into separate files, one per breakpoint, and MUST preserve every rule verbatim (no selector changes, no property changes).

New files to create under `src/styles/`:
- `responsive-tablet.css` — rules from the `@media (min-width: 768px) and (max-width: 1023px)` block (currently lines ~6–308)
- `responsive-mobile.css` — rules from the `@media (max-width: 767px)` block (currently lines ~309–717)
- `responsive-small.css` — rules from the `@media (max-width: 480px)` block (currently lines ~718–913)

The original `responsive.css` MUST be deleted after migration.

#### Scenario: Tablet rules render identically after split

- GIVEN the site is viewed at viewport width 900px (tablet range)
- WHEN `responsive-tablet.css` is loaded via `index.css`
- THEN every layout, font-size, grid, and spacing override matches the pre-split output exactly

#### Scenario: Mobile rules render identically after split

- GIVEN the site is viewed at viewport width 400px (mobile range)
- WHEN `responsive-mobile.css` is loaded via `index.css`
- THEN sidebar, layout, home hero, portfolio, pages, and footer overrides match the pre-split output exactly

#### Scenario: Small-screen rules render identically after split

- GIVEN the site is viewed at viewport width 360px (small range)
- WHEN `responsive-small.css` is loaded via `index.css`
- THEN all small-screen overrides match the pre-split output exactly

### Requirement: Split `pages.css` by domain

The system MUST split `src/styles/pages.css` into domain-focused files and MUST preserve every rule verbatim.

New files to create under `src/styles/`:
- `pages-headers.css` — shared section headers, `__title::after` decorations, `__header` spacing (roughly lines ~1–60)
- `pages-profile.css` — about/curriculum content sections (roughly lines ~60–260)
- `pages-method.css` — method steps, principles list (roughly lines ~260–400)
- `pages-pricing.css` — pricing boxes, extras, clients, knowledge, reviews (roughly lines ~400–700)
- `pages-misc.css` — not-found, CTA, remaining page-specific overrides (roughly lines ~700–860)

The original `pages.css` MUST be deleted after migration.

#### Scenario: Profile page renders identically after split

- GIVEN the `/sobre-mi` page is loaded
- WHEN `pages-headers.css` and `pages-profile.css` are imported via `index.css`
- THEN header decorations, content layout, and spacing match the pre-split output exactly

#### Scenario: Method and principles render identically after split

- GIVEN the curriculum page method section is visible at desktop width
- WHEN `pages-method.css` is loaded via `index.css`
- THEN the 3-column grid, step cards, and principles list match the pre-split output exactly

### Requirement: Update cascade entry point

The system MUST update `src/styles/index.css` to import the new split files in the correct cascade order, replacing the old `responsive.css` and `pages.css` imports. The order MUST preserve the original cascade semantics (responsive overrides after component styles, dark-mode last).

#### Scenario: Cascade order is correct

- GIVEN all split files are imported in `index.css`
- WHEN the site renders at any viewport width
- THEN responsive overrides correctly layer over component styles
- AND `dark-mode.css` remains last in the cascade

### Requirement: No functional code changes

Phase 1 MUST NOT modify any `.tsx`, `.ts`, `.js`, or non-CSS file. Phase 1 MUST NOT add, remove, or rename any CSS class, custom property, or selector. The `npm run build` command MUST complete without errors.

#### Scenario: Build succeeds

- GIVEN the CSS split is complete
- WHEN `npm run build` is run
- THEN the build exits with code 0
- AND no new lint or TypeScript errors are introduced

---

## Phase 2 — Quick Wins (PR #2)

**Goal:** Fix accessibility gaps (`prefers-reduced-motion`, colour contrast), add an intermediate tablet grid, improve blog image semantics, and eliminate inline styles in `error.tsx`.

### Requirement: Complete `prefers-reduced-motion` coverage

The system MUST add `@media (prefers-reduced-motion: reduce)` blocks to disable or shorten animations and transitions in the following files where coverage is currently missing:

| File | Target selectors |
|---|---|
| `portfolio.css` | `.portfolio__link`, `.portfolio__case-card`, `.portfolio__case-stack li`, `.gallery__item`, `.gallery__image`, `.gallery__category`, `.gallery__icon` transitions |
| `contact.css` | `.contact__data`, `contactFloat` animation, `.form__input`, `.form__button` transitions |
| `pages.css` (or its split successors) | `.clients__link`, `.prices__box`, `.prices__btn`, `.extra__info`, `.knowledges__option`, `.not-found__link` transitions |

Within each `prefers-reduced-motion: reduce` block, transitions and animations MUST be set to `none` or `0ms`. This follows the pattern already established in `dark-mode.css:97`, `home.css:225`, `layout.css:87`, and `sidebar.css:244`.

#### Scenario: Portfolio hover effects respect reduced motion

- GIVEN a user has `prefers-reduced-motion: reduce` enabled
- WHEN they hover a portfolio card or gallery item
- THEN no transition or animation is visually active
- AND layout and content remain fully accessible

#### Scenario: Contact floating animation stops

- GIVEN a user has `prefers-reduced-motion: reduce` enabled
- WHEN the contact page renders
- THEN the `contactFloat` keyframe animation is disabled
- AND contact data items do not animate

### Requirement: Intermediate tablet grid for method and principles

The system MUST add a 2-column grid rule for `method__steps` and `principles__list` within the existing tablet breakpoint (`768px–1023px`). The current cascade goes directly from 3-column (desktop) to 1-column (mobile ≤767px). The tablet rule MUST set `grid-template-columns: repeat(2, 1fr)`.

#### Scenario: Method steps show 2 columns on tablet

- GIVEN the curriculum page is viewed at viewport width 900px
- WHEN the method section renders
- THEN `method__steps` displays a 2-column grid
- AND the 3rd item wraps to a second row

#### Scenario: Principles list shows 2 columns on tablet

- GIVEN the curriculum page is viewed at viewport width 900px
- WHEN the principles section renders
- THEN `principles__list` displays a 2-column grid

### Requirement: Blog 1-column fallback at ≤480px

The system MUST ensure blog article cards render in a single column at viewport widths ≤480px. If the blog grid uses `grid-template-columns` or `repeat(auto-fill, ...)`, a `max-width: 480px` media query MUST force `grid-template-columns: 1fr`.

#### Scenario: Blog grid collapses on small screens

- GIVEN the blog index is viewed at viewport width 360px
- WHEN article cards render
- THEN they stack in a single column
- AND no horizontal overflow occurs

### Requirement: Fix `error.tsx` inline styles

The system MUST extract all inline `style={}` props from `src/app/error.tsx` into CSS classes. The new classes MUST be placed in a new file `src/styles/error.css` (or added to an appropriate existing file). The classes MUST support dark mode via the existing `[data-theme="dark"]` variable system.

Specific inline styles to extract:
- Container: `display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 1.6rem; padding: 2rem; text-align: center`
- Title: `font-size: 2.4rem; color: var(--color-titles)`
- Message: `font-size: 1.6rem; max-width: 48rem`
- Button group: `display: flex; gap: 1.2rem; margin-top: 1rem`
- Primary button: `padding, border-radius, border, background, color, font-weight, font-size, cursor`
- Secondary link: `padding, border-radius, border, color, font-weight, font-size, text-decoration`

#### Scenario: Error page renders with CSS classes

- GIVEN an error is triggered on any page
- WHEN the `error.tsx` component renders
- THEN all styling comes from CSS classes, not inline styles
- AND the `style` attribute is absent from all rendered elements

#### Scenario: Error page supports dark mode

- GIVEN dark mode is active (`data-theme="dark"`)
- WHEN the error page renders
- THEN button backgrounds, text colours, and borders adapt via CSS custom properties
- AND no hardcoded colour values bypass the theme system

### Requirement: Fix certificate date contrast

The system MUST ensure certificate date text meets WCAG AA contrast ratio (4.5:1) against its background. The current `--color-subtitles: #888` or similar value on date elements MUST be darkened or replaced to pass contrast checks.

#### Scenario: Certificate date passes Lighthouse contrast audit

- GIVEN the credentials/curriculum page is loaded
- WHEN Lighthouse Accessibility audit runs
- THEN certificate date text achieves a contrast ratio ≥ 4.5:1 against its background
- AND no contrast warning is flagged for date elements

### Requirement: Add `aspect-ratio` to blog listing images

The system MUST add `aspect-ratio` to `.article__image` (blog listing) in the blog CSS to prevent layout shift. The value SHOULD match the existing `width`/`height` ratio (400/185 ≈ 2.16:1 or a sensible rounded value like `16 / 7`). The detail page `.blog-article__image` already has `priority` set; only the listing needs the aspect ratio fix.

#### Scenario: Blog listing images reserve space before load

- GIVEN the blog index page loads with network-throttled images
- WHEN images have not yet loaded
- THEN the card layout does not shift as images load
- AND the reserved space matches the `aspect-ratio` value

### Requirement: Add `priority` to LCP hero image

The system MUST verify that the LCP (Largest Contentful Paint) hero image on the homepage has the `priority` prop on the Next.js `<Image>` component. If it does not already have it, the system MUST add `priority`. The blog detail page already sets `priority` (confirmed in `src/app/blog/[slug]/page.tsx:69`); this requirement covers the homepage hero only.

#### Scenario: Hero image has priority for LCP

- GIVEN the homepage is loaded
- WHEN the browser begins rendering
- THEN the hero `<Image>` component includes the `priority` prop
- AND Next.js generates a preload link for the hero image in `<head>`

---

## Phase 3 — Fluid Typography (PR #3)

**Goal:** Replace fixed `font-size` values with `clamp()` for body text, section titles, page names, and headings, eliminating breakpoint-driven typography jumps.

### Requirement: Define fluid typography custom properties

The system MUST add the following CSS custom properties to `src/styles/variables.css` (or a new `src/styles/typography.css`), using `clamp()` to scale between the smallest and largest viewport-specific values currently in use:

| Property | Min (≤480px) | Max (desktop ≥1024px) | Target selectors |
|---|---|---|---|
| `--font-size-body` | `1.4rem` | `1.6rem` | General body/paragraph text |
| `--font-size-heading-sm` | `1.6rem` | `2.0rem` | Sub-headings, card titles |
| `--font-size-heading-md` | `2.0rem` | `2.8rem` | Section subtitles |
| `--font-size-heading-lg` | `2.4rem` | `3.2rem` | Page titles (`__title`) |
| `--font-size-hero` | `3.0rem` | `4.0rem` | Homepage hero heading |

The `clamp()` formula SHOULD use the pattern: `clamp(min, preferred, max)` where preferred is a `vw`-based value that produces the desired scaling between 320px and 1280px viewports.

#### Scenario: Body text scales smoothly between breakpoints

- GIVEN the viewport is continuously resized from 320px to 1280px
- WHEN body text is rendered
- THEN `font-size` transitions smoothly via `clamp()` with no visible jump at 480px, 768px, or 1024px boundaries

#### Scenario: Page titles scale smoothly

- GIVEN the `/sobre-mi` page title is rendered
- WHEN the viewport is continuously resized from 320px to 1280px
- THEN the title `font-size` scales from ~2.4rem to ~3.2rem without discrete jumps

### Requirement: Apply fluid properties to existing selectors

The system MUST replace hardcoded `font-size` values in the following contexts with `var(--font-size-*)` references:

- Body/paragraph text in `layout.css`, `home.css`, `pages.css`
- Section titles in `pages-headers.css` (post Phase 1 split) — `.about__title`, `.curriculum__title`, `.portfolio__title`, `.blog__title`, `.contact__title`
- Page headings throughout `responsive.css` breakpoints
- Homepage hero heading in `home.css`

The system MUST NOT remove the `html { font-size: 56% }` and `html { font-size: 50% }` declarations in responsive breakpoints until Phase 4 (if it proceeds). These serve as fallbacks for `rem`-based values.

#### Scenario: Section titles use fluid variable

- GIVEN any interior page is viewed
- WHEN the section title renders
- THEN its `font-size` is set via `var(--font-size-heading-lg)`
- AND the value comes from `clamp()`, not a fixed `rem` value

#### Scenario: Responsive breakpoint font-size overrides are removed

- GIVEN the responsive CSS files still contain breakpoint-specific `font-size` overrides for elements now using fluid variables
- WHEN the fluid typography is applied
- THEN the redundant breakpoint `font-size` declarations for those elements are removed
- AND the `html { font-size }` overrides remain as rem-basis fallbacks

### Requirement: Maintain visual parity at key viewports

After applying fluid typography, the system MUST ensure that text sizes at 360px, 768px, and 1280px viewports are visually equivalent (±0.1rem) to the pre-change sizes at those same viewports. The improvement is in the *transitions between* breakpoints, not in changing the endpoint sizes.

#### Scenario: No visible regression at 360px

- GIVEN the homepage is viewed at 360px
- WHEN all text elements render
- THEN heading and body sizes match the pre-Phase-3 output within ±0.1rem

#### Scenario: No visible regression at 1280px

- GIVEN the homepage is viewed at 1280px
- WHEN all text elements render
- THEN heading and body sizes match the pre-Phase-3 output within ±0.1rem

### Requirement: `npm run build` succeeds

The system MUST ensure `npm run build` exits with code 0 after Phase 3 changes.

---

## Phase 4 — Mobile-First Rewrite (PR #4) — DEFERRED / CONDITIONAL

**Status:** This phase is deferred. It SHOULD be evaluated only after Phases 1–3 are merged, deployed, and validated in production. The decision to proceed MUST be confirmed by the project owner.

**Goal:** Invert the CSS cascade from desktop-first (`max-width` queries) to mobile-first (`min-width` queries), so the base styles serve mobile and desktop enhancements are layered via `@media (min-width:)`.

### Requirement: Invert the cascade direction

The system MUST rewrite the responsive CSS files so that:
- Base (un-queried) styles target the smallest viewport (mobile).
- `@media (min-width: 481px)` replaces `@media (max-width: 480px)` for small-screen overrides.
- `@media (min-width: 769px)` replaces `@media (max-width: 767px)` for mobile overrides.
- `@media (min-width: 1024px)` replaces `@media (min-width: 768px) and (max-width: 1023px)` for tablet overrides.

#### Scenario: Mobile renders without any media query

- GIVEN the base CSS (no media queries) is applied
- WHEN the site is viewed at 360px
- THEN all mobile layout, typography, and spacing render correctly
- AND no desktop-only styles leak into the base

#### Scenario: Desktop styles layer via min-width

- GIVEN the base CSS plus `@media (min-width: 1024px)` overrides are applied
- WHEN the site is viewed at 1280px
- THEN the desktop layout (sidebar, 3-column grids, larger typography) renders correctly

### Requirement: Visual parity across all viewports

After the rewrite, the system MUST produce identical visual output at 360px, 768px, and 1280px compared to the pre-rewrite state. This is a pure structural refactor of the cascade direction, not a redesign.

#### Scenario: Tablet layout unchanged

- GIVEN the site is viewed at 900px after the rewrite
- WHEN all components render
- THEN layout, grids, typography, and spacing match the pre-rewrite tablet output exactly

### Requirement: Build and Lighthouse pass

The system MUST ensure `npm run build` exits with code 0 and Lighthouse scores do not regress from the Phase 3 baseline.

---

## Verification Strategy

### Build Verification (all phases)

Every phase MUST pass `npm run build` with exit code 0 before the PR is considered complete. No phase introduces changes that break the Next.js production build.

### Visual Comparison (all phases)

For Phases 1–3, the implementer MUST perform a visual comparison at three key viewports (360px, 768px, 1280px) before and after changes:
- Phase 1: output MUST be identical (pixel-level parity expected).
- Phase 2: output MUST be identical except for the intentional improvements (2-col tablet grid, reduced-motion suppression, contrast fix, error page styling).
- Phase 3: output MUST be visually equivalent at the three key viewports (±0.1rem tolerance) with smoother transitions between them.

### Lighthouse Audit (Phase 2)

After Phase 2, run Lighthouse on:
- Homepage (`/`)
- Blog index (`/blog`)
- Credentials page (`/curriculum`)

Target improvements:
- Accessibility score: no contrast warnings for certificate dates.
- Best Practices: no inline style warnings for error page.
- Performance: LCP improvement from `priority` hero image (if measurable).

### Lighthouse Audit (Phase 3)

After Phase 3, verify that no Lighthouse regression has occurred compared to the Phase 2 baseline.

### Rollback Strategy

Each phase is an independent PR. If a phase introduces visual regressions:
1. Revert the PR.
2. File the specific regression as a new issue.
3. Do not proceed to the next phase until the regression is resolved.
