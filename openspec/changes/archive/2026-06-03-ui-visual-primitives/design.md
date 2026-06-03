# Design: ui-visual-primitives

## Status

Design complete. No source app/CSS/TSX files were changed.

---

## 1. Architecture Overview

### 1.1 Primitive Layer Ownership

A new `src/styles/primitives.css` file owns **reusable visual-treatment primitive classes only**:

- Section title dot decoration (the `::after` repeating-radial-gradient pattern)
- Card/panel surface base (border, border-radius, background)
- Badge/tag/pill base (inline pill shape with accent background)
- Optional focus-visible normalization for interactive elements touched by migration

`primitives.css` MUST NOT own page-specific layout, spacing, responsive breakpoints, grid/flex structure, animation keyframes, or content styling.

### 1.2 Import Order in `src/styles/index.css`

```
@import "./variables.css";     /* tokens */
@import "./reset.css";         /* global reset + reduced-motion baseline */
@import "./primitives.css";    /* NEW — visual primitives layer */
@import "./layout.css";        /* application shell */
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
@import "./dark-mode.css";     /* imports last — owns dark visual overrides */
```

**Cascade behavior**: `primitives.css` loads after reset/tokens but before all page styles. Because page selectors appear later in the cascade and often have equal or higher specificity (e.g., `.timelines__timeline` = 1 class vs `.card-surface` = 1 class — later wins), intentional page-specific overrides naturally prevail without `!important`.

### 1.3 Interaction with Page CSS and `dark-mode.css`

- **Page CSS**: Page stylesheets continue to own internal layout, padding, spacing, responsive breakpoints, transitions, hover specifics, and any page-specific design variations. After migration, page files keep only their **page-specific** declarations; the shared visual surface/shape comes from the primitive.
- **`dark-mode.css`**: Because it imports last, `[data-theme="dark"]` selectors for card surfaces and badges automatically override primitive declarations via cascade order. No dark-mode overrides are added to `primitives.css`. No changes to `dark-mode.css` are required — existing dark-mode selectors continue to target the same page selectors (e.g., `[data-theme="dark"] .timelines__timeline`) which will now also have the `.card-surface` class, so both selectors match the same elements.

---

## 2. Exact Primitive API/Naming Proposal

### 2.1 Section Title Decoration — `.title-dot`

**Purpose**: Consolidate the duplicated `::after` dotted-underline decoration for section headings.

**Naming**: `.title-dot` (page-level, larger decoration), `.title-dot--sm` (subsection, smaller decoration).

**CSS definition** (to live in `primitives.css`):

```css
/* =====================
   Section Title Dot Decoration
   ===================== */

.title-dot {
  position: relative;
  padding-right: 2.5rem;
}

.title-dot::after {
  content: "";
  position: absolute;
  top: 2rem;
  right: 0;
  width: 5rem;
  height: 3rem;
  background-image: repeating-radial-gradient(
    circle,
    var(--principal-color),
    var(--principal-color) 1px,
    transparent 0,
    transparent 100%
  );
  background-size: 6px 6px;
  opacity: 0.5;
}

.title-dot--sm {
  padding-right: 1.2rem;
}

.title-dot--sm::after {
  top: 1.5rem;
  width: 3rem;
  height: 2rem;
  opacity: 0.6;
}
```

**Behavior notes**:
- Both variants use `var(--principal-color)` for the dot color and `6px 6px` background-size.
- `--sm` reduces the dot area (3rem × 2rem vs 5rem × 3rem) and moves it closer to the text (top: 1.5rem vs 2rem).
- No responsive breakpoints. Responsive adjustments remain in existing responsive files.
- No dark-mode blocks. The dot color uses `var(--principal-color)` which does not change in dark mode.

### 2.2 Card Surface — `.card-surface`

**Purpose**: Consolidate the shared border + border-radius + background for near-identical card/panel shells.

**Naming**: `.card-surface` (base), `.card-surface--alt` (alternate background variable), `.card-surface--interactive` (adds hover border-color transition).

**CSS definition** (to live in `primitives.css`):

```css
/* =====================
   Card / Panel Surface
   ===================== */

.card-surface {
  border: 1px solid var(--color-border-reviews);
  border-radius: 1.4rem;
  background: var(--color-principal);
}

.card-surface--alt {
  background: var(--background-color-contact);
}

.card-surface--interactive {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.card-surface--interactive:hover {
  border-color: rgba(247, 185, 53, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

**Behavior notes**:
- The base class owns **only** the three shared visual properties. It does NOT own padding, display, flex/grid, margin, or box-shadow.
- `--alt` switches the background to `var(--background-color-contact)` for cards that use the alternate surface variable.
- `--interactive` adds the transition + hover border-color/shadow seen in `timelines__timeline` and `capability-card`.
- Hover behavior for cards with **different** hover effects (e.g., `portfolio__case-card` with `box-shadow: 0 4px 16px`, `.prices__box` with `translateY(-1rem)`) remains page-owned. Those page selectors continue to win via cascade.
- No dark-mode blocks. Dark surface overrides remain in `dark-mode.css` targeting existing page selectors.
- No responsive breakpoints.

### 2.3 Badge/Tag — `.badge`

**Purpose**: Consolidate the shared inline pill shape, accent background, and typography for tags/chips.

**Naming**: `.badge` (base shared pill), `.badge--index` (numeric index variant with lower opacity).

**CSS definition** (to live in `primitives.css`):

```css
/* =====================
   Badge / Tag / Pill
   ===================== */

.badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--terciario-color);
  background: rgba(247, 185, 53, 0.18);
}

.badge--index {
  background: rgba(247, 185, 53, 0.12);
}
```

**Behavior notes**:
- The base badge owns pill shape (`border-radius: 999px`), accent background (`rgba(247,185,53,0.18)`), text-transform, letter-spacing, and font-weight.
- Page-specific padding, margin, font-size, and color overrides remain page-owned and win via cascade.
- `--index` uses the lower-opacity background (0.12) for numeric index badges.
- No dark-mode blocks. Badge dark overrides remain in `dark-mode.css` or existing page dark blocks.
- No responsive breakpoints.

### 2.4 Focus-Visible Primitive (included)

**Purpose**: Normalize `:focus-visible` outline for interactive elements directly touched by the primitive migration, improving keyboard accessibility for migrated card and badge surfaces.

**Naming**: Applied via `.card-surface--interactive`.

**CSS definition** (appended to the interactive card variant in `primitives.css`):

```css
.card-surface--interactive:focus-visible {
  outline: 2px solid var(--principal-color);
  outline-offset: 2px;
}
```

**Behavior notes**:
- Only targets elements that use `.card-surface--interactive`, not all links or buttons globally.
- Does NOT restyle button shapes, sizes, radii, or hover-lift effects — those remain page-owned.
- A minimal focused addition that stays well within the review budget (~5 lines).
- Full button shape primitive (`.btn`, `.btn--primary`, etc.) is **deferred** to a future unit.

---

## 3. Migration Plan with Exact Selector/File Candidates

### 3.1 Section Title Selectors to Migrate/Reduce

All migrations use **selector grouping** (no TSX class changes required). The existing selectors are grouped to reference the shared `::after` pattern, then individual `::after` declarations are removed where they are identical to the grouped version.

| Current selector | Primitive applied | Action |
|---|---|---|
| `.about__title::after` | group into `.title-dot::after` | Remove individual `::after` block |
| `.curriculum__title::after` | group into `.title-dot::after` | Remove individual `::after` block |
| `.blog__title::after` | group into `.title-dot::after` | Remove individual `::after` block |
| `.contact__title::after` | group into `.title-dot::after` | Remove individual `::after` block |
| `.services__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.method__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.principles__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.reviews__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.clients__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.prices__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.extra__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |
| `.trust__title::after` | group into `.title-dot--sm::after` | Remove individual `::after` block |

**NOT migrated in this unit**:
- `.portfolio__title .title__color::after` — positioned differently (`right: 0` relative to `.title__color`, not the title itself); the `::after` is on the inner `.title__color` span. Keep page-owned.
- `.curriculum__subtitle .title__color::after` / `.form-header__title .title__color::after` — same pattern, positioned relative to inner `.title__color` span with `top: 1.5rem` and `opacity: 0.6`. These use the `--sm` values but are on the inner span, not the title. Keep page-owned for now to avoid TSX changes.

**Files touched**:

| File | Change |
|---|---|
| `pages-headers.css` | Add `.about__title, .curriculum__title, .blog__title, .contact__title` to `.title-dot` group. Remove their `::after` block. Remove the `position: relative` from the individual title selector (`.title-dot` owns it). |
| `pages-profile.css` | Add `.services__title, .method__title, .principles__title, .reviews__title, .clients__title, .prices__title, .extra__title, .trust__title` to `.title-dot--sm` group. Remove their `::after` block. |

### 3.2 Card Selectors to Migrate

| Current selector | Primitive applied | Additional page-specific kept |
|---|---|---|
| `.curriculum__left` | `.card-surface` | `padding: 2.4rem` (page-owned) |
| `.curriculum__right` | `.card-surface` | `padding: 2.4rem` (page-owned) |
| `.timelines__timeline` | `.card-surface .card-surface--alt .card-surface--interactive` | `padding: 2rem`, `box-shadow: 0 1px 3px`, `display: flex`, `flex-direction: row`, `min-width: 0`, `margin-bottom: 1.6rem`, `position: relative`, `width: 100%` (page-owned layout) |
| `.capability-card` | `.card-surface .card-surface--alt .card-surface--interactive` | `padding: 2rem`, `box-shadow: 0 1px 3px`, `min-width: 0` (page-owned) |
| `.certificates__certificate` | `.card-surface` | `display: grid`, `grid-template-columns: auto 1fr`, `overflow: hidden` (page-owned layout) |

**NOT migrated** (intentionally different):
- `.portfolio__case-card` — has `border-left: 4px solid var(--principal-color)` (accent left border, different design intent)
- `.prices__box` — has `border: 2px`, `border-radius: 1.5rem`, `text-align: center`, `flex-basis: 50%`, `translateY(-1rem)` hover (completely different card treatment)
- `.reviews__review` — has `border: 2px`, `border-radius: 2rem`, margin with negative top offset for image (unique design)
- `.control-room` — heavily customized with `::before` gradient bar, animated pulse dots, connection lines (too unique)
- `.case-card` (home) — has `border: 1px solid rgba(...)` with custom hex, different shadow, animation delays (unique home treatment)
- `.profile__hero` — has gradient background, specific padding/spacing (unique hero treatment)
- `.trust__item` — has `::before` dot indicator, specific padding-left (unique layout)
- `.contact__data` — has float animation, specific hover `translateY` (unique interactive treatment)
- `.contact__qualified-box` — has `border-radius: 1.6rem` (different radius)
- `.home-pipeline` — heavily customized flex layout with animated elements (unique)

**Files touched**:

| File | Change |
|---|---|
| `pages-misc.css` | Add `.card-surface` class reference to `.curriculum__left`, `.curriculum__right`, `.timelines__timeline`, `.capability-card`, `.certificates__certificate` selectors. Remove duplicated `border`, `border-radius`, `background` declarations from each. |
| `dark-mode.css` | No changes needed. Existing dark selectors (e.g., `[data-theme="dark"] .timelines__timeline`) continue to work. |

### 3.3 Badge/Tag Selectors to Migrate

| Current selector | Primitive applied | Page-specific kept |
|---|---|---|
| `.portfolio__metadata-badge` | `.badge` | `margin-bottom: 0.4rem` (page-owned) |
| `.blog-article__category` | `.badge` | `margin-bottom: 0.8rem` (page-owned) |
| `.portfolio__case-index` | `.badge .badge--index` | `margin-bottom: 0.8rem` (page-owned) |
| `.capability-card__tools li` | `.badge .badge--index` | `margin-top: 1.4rem`, `border-top`, `padding-top` on parent (page-owned); `max-width: 100%`, `border: 1px solid rgba(247, 185, 53, 0.18)`, `overflow-wrap: anywhere` (page-owned) |

**NOT migrated** (intentionally different):
- `.case-card__badge` — has `border-radius: 4px` (square, not pill), `padding: 0.2rem 0.7rem` (smaller), `margin-bottom: 0.6rem` — fundamentally different shape
- `.case-card__stack li` — has `border: 1px solid rgba(12, 13, 28, 0.08)` with no accent background (outline style)
- `.portfolio__case-stack li` — has `border: 1px solid var(--color-border-reviews)` outline style
- `.knowledges__option` — has `border-radius: 0.3rem` (square), solid background, `cursor: default` — completely different pattern
- `.article__category` (blog listing) — has `position: absolute`, `z-index: 3` overlay positioning (positioning, not inline pill)

**Files touched**:

| File | Change |
|---|---|
| `portfolio.css` | Remove `display`, `border-radius`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, `color`, `background` from `.portfolio__metadata-badge`. Remove same from `.portfolio__case-index`. |
| `blog.css` | Remove `display`, `padding`, `border-radius`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, `color`, `background` from `.blog-article__category`. |
| `pages-misc.css` | Remove `border-radius`, `background`, `color`, `font-size`, `font-weight` from `.capability-card__tools li`. |

### 3.4 TSX Additive Class Candidates

**No TSX changes are required** for this design. All migrations use CSS selector grouping for title dots, and the card/badge migrations use selector-based approach (the page selectors reference `.card-surface` in the grouped selector).

If the implementation team prefers additive class names in TSX for clarity (optional), the following are candidates — but they are **not required** by this design:

| File | Optional class addition |
|---|---|
| Page components with section headings | Additive `.title-dot` or `.title-dot--sm` class (reduces selector grouping complexity) |
| Credential/timeline card elements | Additive `.card-surface .card-surface--alt .card-surface--interactive` classes |

**Recommendation**: Use pure CSS selector grouping for this first unit. Evaluate additive TSX classes in a future unit if the primitive layer stabilizes.

---

## 4. Dark Mode Strategy

### 4.1 No `[data-theme="dark"]` Blocks in `primitives.css`

`primitives.css` MUST NOT contain any `[data-theme="dark"]` selector blocks. The file owns only light-mode primitive definitions using CSS custom properties.

### 4.2 Existing Dark-Mode Selectors Continue to Work

Because `dark-mode.css` imports last in the cascade, existing dark-mode selectors continue to apply:

| Dark-mode selector | Target elements | Status |
|---|---|---|
| `[data-theme="dark"] .timelines__timeline` | Credential timeline cards | **No change** — selector matches elements with `.card-surface` class |
| `[data-theme="dark"] .capability-card` | Capability cards | **No change** |
| `[data-theme="dark"] .capability-card__tools li` | Badge inside capability cards | **No change** |
| `[data-theme="dark"] .certificates__certificate` | Certificate cards | **No change** |
| `[data-theme="dark"] .curriculum__left` / `.right` | Curriculum panels | **No change** |
| `[data-theme="dark"] .portfolio__case-stack li` | Portfolio stack badges | **No change** (these badges are NOT migrated) |
| `[data-theme="dark"] .portfolio__case-card` | Portfolio case cards | **No change** (not migrated) |

### 4.3 Key Principle

Dark-mode visual overrides for primitive-owned treatments (card surfaces, badges) **remain** in `dark-mode.css` or in their existing page stylesheet dark-mode blocks. The primitive class is purely additive; it does not replace the selector chain that `dark-mode.css` targets.

---

## 5. Reduced-Motion Strategy

### 5.1 Global Baseline Preserved

The existing global reduced-motion baseline in `reset.css` is preserved:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This baseline minimizes all `transition-duration` values globally, including any transitions introduced by `.card-surface--interactive`.

### 5.2 No Primitive-Specific Reduced-Motion Block Required

The primitives introduce only `transition` properties (border-color, box-shadow) that are duration-based and fully covered by the global baseline. No transform-based or opacity-based animations are introduced by the primitive classes.

Therefore: **no `@media (prefers-reduced-motion: reduce)` block is needed in `primitives.css`**.

### 5.3 Page-Specific Reduced-Motion Blocks Preserved

| File | Reduced-motion block | Status |
|---|---|---|
| `pages-misc.css` | `.extra__info`, `.timelines__timeline`, `.capability-card`, `.certificates__certificate` transitions | **Preserved** — these elements keep their page-specific reduced-motion handling |
| `portfolio.css` | `.portfolio__link`, `.portfolio__case-card`, `.portfolio__case-stack li`, `.gallery__item` transitions | **Preserved** — not migrated, untouched |
| `pages-pricing.css` | `.prices__box`, `.prices__btn` transitions | **Preserved** — not migrated |
| `contact.css` | `.contact__data`, `.form__input`, `.form__button` transitions | **Preserved** — not migrated |
| `pages-services.css` | `.clients__link` transition | **Preserved** — not migrated |
| `error.css` | `.error-btn-primary`, `.error-btn-secondary` transitions | **Preserved** — not migrated |

---

## 6. Responsive Strategy

### 6.1 Primitives.css Has No Breakpoints

`primitives.css` contains zero `@media` queries. All responsive adjustments remain in:
- `responsive-foundation.css` (shared shell)
- `responsive-tablet.css` (≤1023px)
- `responsive-mobile.css` (≤767px)
- `responsive-small.css` (≤480px)
- Individual page CSS files for component-level responsive rules

### 6.2 Responsive Adjustments Remain in Responsive Files

The migration does not touch any responsive files. Page-specific responsive rules for migrated elements (e.g., `@media (max-width: 1023px) { .method__steps { grid-template-columns: 1fr; } }`) continue to apply unchanged.

---

## 7. Review Workload Forecast

### 7.1 Estimated Changed Lines by File

| File | Action | Net changed lines (est.) |
|---|---|---|
| `src/styles/primitives.css` | **New file** | **+50** |
| `src/styles/index.css` | Add 1 import line | **+1** |
| `src/styles/pages-headers.css` | Group title selectors into `.title-dot`, remove 4 `::after` blocks, remove `position: relative` from titles | **−24** |
| `src/styles/pages-profile.css` | Group 8 subsection title selectors into `.title-dot--sm`, remove 8 `::after` blocks | **−32** |
| `src/styles/pages-misc.css` | Remove surface declarations from 5 card selectors, remove badge declarations from 1 selector | **−25** |
| `src/styles/portfolio.css` | Remove badge declarations from 2 selectors | **−14** |
| `src/styles/blog.css` | Remove badge declarations from 1 selector | **−9** |

**Total estimated net changed lines: ~135** (well within the 300-line budget).

### 7.2 Budget Headroom Analysis

| Slice | Lines | Running total |
|---|---|---|
| `primitives.css` (new) | +50 | 50 |
| `index.css` (import) | +1 | 51 |
| `pages-headers.css` (title migration) | −24 | 75 |
| `pages-profile.css` (title migration) | −32 | 107 |
| `pages-misc.css` (card + badge migration) | −25 | 132 |
| `portfolio.css` (badge migration) | −14 | 146 |
| `blog.css` (badge migration) | −9 | 155 |

**Headroom remaining: ~145 lines** (of 300 budget). The button/focus primitive is included as a minimal addition (~5 lines) because of the generous headroom.

### 7.3 Button/Focus Decision

**Decision: Include minimal focus-visible normalization** for `.card-surface--interactive` elements only. **Defer full button shape primitive** to a future unit.

Rationale:
- The base slice is ~155 lines — well under 300.
- Adding `:focus-visible { outline: 2px solid var(--principal-color); outline-offset: 2px; }` to `.card-surface--interactive` adds ~5 lines.
- Full button primitive (`.btn`, `.btn--primary`, `.btn--secondary`) with sizing, radius, hover-lift normalization would add 45–90 lines and is unnecessary for this unit's scope.
- Button styling remains page-owned as before.

---

## 8. Verification Design

### 8.1 Automated Checks

| Check | Command | Pass criteria |
|---|---|---|
| Lint | `npm run lint` | Exit 0, no new violations |
| Build | `npm run build` | Exit 0, no new errors/warnings |
| Whitespace/conflict | `git diff --check` | Exit 0 |

### 8.2 Grep Checks

| Check | Pattern | Pass criteria |
|---|---|---|
| Duplicated title dot patterns | `grep -rn "repeating-radial-gradient" src/styles/` | Only `primitives.css`, `portfolio__title .title__color::after`, `curriculum__subtitle .title__color::after`, `form-header__title .title__color::after` should remain |
| No dark blocks in primitives | `grep -n "data-theme" src/styles/primitives.css` | Zero matches |
| Primitive classes exist | `grep -n "title-dot\|card-surface\|badge" src/styles/primitives.css` | All expected classes present |

### 8.3 Representative Route/Viewport Smoke Matrix

| Route | Desktop | Tablet (≤1023) | Mobile (≤767) | Small (≤480) |
|---|---|---|---|---|
| `/` | ✓ | ✓ | ✓ | ✓ |
| `/perfil` | ✓ | ✓ | ✓ | ✓ |
| `/credenciales` | ✓ | ✓ | ✓ | ✓ |
| `/contacto` | ✓ | ✓ | ✓ | ✓ |
| `/casos-reales` | ✓ | ✓ | ✓ | ✓ |
| `/blog` | ✓ | ✓ | ✓ | ✓ |

**What to verify at each route/viewport**:
- Section title decorations render correctly (dot size, position, color)
- Card surfaces render correct border, radius, and background
- Badges render correct pill shape, accent background, and typography
- No layout shifts or visual regressions

### 8.4 Theme, Focus, and Motion Checks

| Check | Scope | Pass criteria |
|---|---|---|
| **Dark mode toggle** | `/perfil`, `/credenciales` (migrated cards/badges) | Dark surface backgrounds, borders, and badge colors match pre-migration behavior |
| **Keyboard focus** | `/credenciales` (`.card-surface--interactive` elements: timelines, capability cards) | `Tab` reveals visible focus outline (2px solid gold, 2px offset) |
| **Reduced motion** | All routes with migrated elements | Transitions minimized by global baseline; no new animation artifacts |

### 8.5 Visual Diff Comparison

Before and after screenshots for:
1. Section title decorations (page-level and subsection) at desktop and mobile
2. Card surfaces (curriculum panels, timeline cards, capability cards, certificates) at desktop
3. Badges (portfolio metadata, blog article category, capability tools) at desktop
4. Dark mode versions of the above

---

## 9. Risks/Tradeoffs and Rollback Plan

### 9.1 Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Cascade regression** — page selector loses to primitive for unintended property | Low | Medium | Primitive classes are low-specificity (single class). Page selectors are later in cascade and often equal or higher specificity. Verify visually. |
| **Visual regression from radius normalization** — `.curriculum__left` goes from `1.6rem` to `1.4rem` border-radius | Low | Low | 1.6rem → 1.4rem is a minor change. Can add `.card-surface { border-radius: 1.6rem; }` override in `pages-misc.css` if visually unacceptable. |
| **Badge `text-transform: uppercase` and `letter-spacing: 0.04em` applied to previously unstyled badges** | Low | Low | All migrated badges already use uppercase or are naturally short text. The letter-spacing is subtle. If problematic, add `text-transform: none; letter-spacing: normal;` page override. |
| **Selector grouping specificity conflict** — adding titles to `.title-dot` group alongside other selectors creates unexpected cascade | Very Low | Low | All title selectors are single-class (specificity 0,1,0). Grouping them maintains equal specificity. |
| **Missing migrated selector causes visual difference** | Low | Medium | Grep verification for `repeating-radial-gradient` ensures all expected patterns are consolidated. |

### 9.2 Tradeoffs

| Tradeoff | Decision | Rationale |
|---|---|---|
| **Selector grouping vs additive TSX classes** | Selector grouping | Avoids touching TSX files. Lower risk, lower line count. TSX additive classes can be added later. |
| **Single `.card-surface` class vs multiple card variants** | Single base + modifiers | Keeps primitive minimal. Page-specific overrides handle variations. |
| **Include focus-visible vs defer entirely** | Include minimal | Budget headroom is generous (~145 lines). Focus-visible for interactive cards improves a11y for migrated elements. |
| **Normalize border-radius (1.6rem → 1.4rem for curriculum panels)** | Accept minor normalization | The 0.2rem difference is visually negligible and reduces drift. |

### 9.3 Rollback Plan

Rollback is straightforward because the change is CSS-only with no TSX modifications:

1. **Remove the import** from `src/styles/index.css` (`@import "./primitives.css";`).
2. **Delete** `src/styles/primitives.css`.
3. **Restore** pre-change selectors in `pages-headers.css` (un-group the `::after` blocks back to individual selectors).
4. **Restore** pre-change selectors in `pages-profile.css` (un-group the subsection `::after` blocks).
5. **Restore** removed surface declarations in `pages-misc.css`, `portfolio.css`, `blog.css`.
6. **Re-run** `npm run lint && npm run build && git diff --check`.
7. **Visual smoke** check representative routes to confirm pre-migration state is restored.

Estimated rollback effort: ~15 minutes (git revert of implementation commits).

---

## 10. Recommendation for Tasks

### Recommended Task Decomposition

**Task 1: Create `primitives.css` and wire import** (~55 lines)
- Create `src/styles/primitives.css` with `.title-dot`, `.title-dot--sm`, `.card-surface`, `.card-surface--alt`, `.card-surface--interactive`, `.badge`, `.badge--index` definitions.
- Add `@import "./primitives.css";` to `src/styles/index.css` after `reset.css`.
- Verify: `npm run lint && npm run build`.

**Task 2: Migrate section title decorations** (~56 changed lines)
- In `pages-headers.css`: group `.about__title`, `.curriculum__title`, `.blog__title`, `.contact__title` into `.title-dot` selector group. Remove individual `::after` blocks. Remove `position: relative` from individual title selectors.
- In `pages-profile.css`: group `.services__title` through `.trust__title` into `.title-dot--sm` selector group. Remove individual `::after` blocks.
- Verify: grep for remaining `repeating-radial-gradient` occurrences. Visual smoke on `/`, `/perfil`, `/credenciales`, `/contacto`.

**Task 3: Migrate card surfaces** (~25 changed lines)
- In `pages-misc.css`: remove `border`, `border-radius`, `background` from `.curriculum__left`, `.curriculum__right`, `.timelines__timeline`, `.capability-card`, `.certificates__certificate`. Group into `.card-surface` (and `--alt`, `--interactive` as appropriate).
- Verify: visual smoke on `/credenciales`. Dark mode check.

**Task 4: Migrate badges** (~23 changed lines)
- In `portfolio.css`: remove badge properties from `.portfolio__metadata-badge` and `.portfolio__case-index`. Group into `.badge` / `.badge--index`.
- In `blog.css`: remove badge properties from `.blog-article__category`. Group into `.badge`.
- In `pages-misc.css`: remove badge properties from `.capability-card__tools li`. Group into `.badge .badge--index`.
- Verify: visual smoke on `/casos-reales`, `/blog`, `/credenciales`.

**Task 5: Full verification** (~0 code changes)
- Run `npm run lint && npm run build`.
- Run grep checks for duplicated patterns and dark blocks.
- Full route/viewport smoke matrix.
- Dark mode toggle check.
- Keyboard focus check on `/credenciales` interactive cards.
- Reduced-motion smoke.

### Alternative: Single-Commit Approach

Given the small total changed lines (~135), all five tasks could be combined into a single implementation + review unit if the reviewer prefers one pass. The decomposition above is for incremental safety, not strict necessity.

---

## Appendix A: Exact Current Selector Values (Reference)

### A.1 Page-Level Title `::after` Values

From `pages-headers.css`:
```css
/* Applied to: .about__title, .curriculum__title, .blog__title, .contact__title */
content: "";
position: absolute;
top: 2rem;
right: -2.5rem;     /* Note: negative right offset */
width: 5rem;
height: 3rem;
background-image: repeating-radial-gradient(circle, var(--principal-color), var(--principal-color) 1px, transparent 0, transparent 100%);
background-size: 6px 6px;
opacity: 0.5;
```

**Design note**: The current page-level titles use `right: -2.5rem` (extends beyond the title's right edge). The primitive uses `right: 0` (contained within the title's padding). This requires the title element to have `padding-right: 2.5rem` (provided by `.title-dot`). The visual position of the dots should be identical — the primitive approach is cleaner because the dots don't overflow the title's box.

### A.2 Subsection Title `::after` Values

From `pages-profile.css`:
```css
/* Applied to: .services__title through .trust__title */
content: "";
position: absolute;
top: 1.5rem;
right: 0;
width: 3rem;
height: 2rem;
background-image: repeating-radial-gradient(circle, var(--principal-color), var(--principal-color) 1px, transparent 0, transparent 100%);
background-size: 6px 6px;
opacity: 0.6;
```

### A.3 Card Surface Declarations (Candidates)

| Selector | border | border-radius | background | Other surface |
|---|---|---|---|---|
| `.curriculum__left` | `1px solid var(--color-border-reviews)` | `1.6rem` | `var(--color-principal)` | — |
| `.curriculum__right` | `1px solid var(--color-border-reviews)` | `1.6rem` | `var(--color-principal)` | — |
| `.timelines__timeline` | `1px solid var(--color-border-reviews)` | `1.4rem` | `var(--background-color-contact)` | `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` |
| `.capability-card` | `1px solid var(--color-border-reviews)` | `1.4rem` | `var(--background-color-contact)` | `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` |
| `.certificates__certificate` | `1px solid var(--color-border-reviews)` | `1.2rem` | `var(--color-principal)` | — |

### A.4 Badge Declarations (Candidates)

| Selector | border-radius | background | font-weight | text-transform | letter-spacing | Other |
|---|---|---|---|---|---|---|
| `.portfolio__metadata-badge` | `999px` | `rgba(247,185,53,0.18)` | `600` | `uppercase` | `0.04em` | — |
| `.blog-article__category` | `999px` | `rgba(247,185,53,0.18)` | `600` | `uppercase` | `0.04em` | — |
| `.portfolio__case-index` | `999px` | `rgba(247,185,53,0.12)` | `600` | (inherits) | (inherits) | — |
| `.capability-card__tools li` | `999px` | `rgba(247,185,53,0.14)` | `500` | — | — | `border: 1px solid rgba(247,185,53,0.18)` |
