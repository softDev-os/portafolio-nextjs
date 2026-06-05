# Explore: ui-button-focus-primitives

## Purpose

Explore a focused Unit 4 for button/CTA shape primitives and focus-visible normalization, deferred from Unit 2's budget gate.

---

## 1. Current-State Inventory

### 1.1 CTA Link Buttons (`.home-hero__cta-link`)

**Defined in:** `src/styles/home.css` lines ~150-185
**Used in TSX:** 6 pages × 2 variants (primary + secondary)

| File | Elements |
|------|----------|
| `app/page.tsx` | primary + secondary |
| `app/perfil/page.tsx` | primary + secondary |
| `app/contacto/page.tsx` | primary + secondary |
| `app/blog/page.tsx` | primary + secondary |
| `app/blog/[slug]/page.tsx` | primary + secondary |
| `app/casos-reales/page.tsx` | secondary only |

Base properties: `inline-flex`, `align-items: center`, `gap: 0.6rem`, `padding: 1rem 2.4rem`, `border-radius: 3.2rem`, `font-size: 1.3rem`, `font-weight: 500`, `text-decoration: none`.

| Variant | Background | Color | Border | Hover/Focus |
|---------|-----------|-------|--------|-------------|
| `--primary` | `var(--principal-color)` | `#0c0d1c` | none | `translateY(-3px)`, elevated shadow |
| `--secondary` | transparent | `var(--terciario-color)` | `2px solid var(--terciario-color)` | `translateY(-3px)`, fills with accent |

Both variants have `:hover` and `:focus-visible` grouped in the same rule.

### 1.2 Contact Form Submit Button (`.form__button`)

**Defined in:** `src/styles/contact.css` lines ~178-194
**Used in:** `app/contacto/page.tsx`

Properties: `padding: 1rem 2.5rem`, `font-size: 1.5rem`, `border: 0.2rem solid var(--principal-color)`, `border-radius: 4rem`, `cursor: pointer`, `transition: all 0.3s ease-in-out`.

Hover: fills with accent, `translateY(-0.17rem)`. **No `:focus-visible` rule.** This is an accessibility gap.

### 1.3 Error Page Buttons (`.error-btn-primary`, `.error-btn-secondary`)

**Defined in:** `src/styles/error.css`
**Used in:** `app/error.tsx`

| Selector | Background | Border | Radius | Focus-visible |
|----------|-----------|--------|--------|---------------|
| `.error-btn-primary` | `var(--principal-color)` | none | `0.8rem` | **Missing** |
| `.error-btn-secondary` | transparent | `2px solid var(--principal-color)` | `0.8rem` | **Missing** |

Both use `transition: opacity 0.2s ease` and `:hover { opacity: 0.85 }`.

### 1.4 Not-Found Link (`.not-found__link`)

**Defined in:** `src/styles/pages-misc.css` lines ~381-398
**Used in:** `app/not-found.tsx`

Properties: `display: inline-block`, `padding: 1rem 2.4rem`, `background: var(--principal-color)`, `border-radius: 999px`, `color: #fff`, `font-weight: 600`. **No `:focus-visible` rule.** Hover uses opacity.

### 1.5 Portfolio Filter Links (`.portfolio__link`)

**Defined in:** `src/styles/portfolio.css` lines ~31-45
**Used in:** `app/casos-reales/page.tsx`

Properties: `padding: 0.8rem 1.5rem`, `border: 2px solid var(--color-subtitles)`, `border-radius: 2rem`, `cursor: pointer`. Hover fills with accent, lifts. **No `:focus-visible` rule.** These are `<Link>` elements acting as filter buttons.

### 1.6 Already-Covered Focus-Visible

| Selector | File | Method |
|----------|------|--------|
| `.skip-link` | `reset.css` | Standalone `:focus-visible` |
| `.sidebar__theme-toggle` | `sidebar.css` | Standalone `:focus-visible` |
| `.card-surface--interactive`, `.timelines__timeline`, `.capability-card` | `primitives.css` | Grouped `:focus-visible` |
| `.nav-float__link`, `.home-hero__cta-link`, `.contact__data`, `.footer__link`, `.footer__social-link` | `sidebar.css` lines ~427-435 | Grouped `:focus-visible` (gold ring + glow) |

---

## 2. Accessibility Gap Map

### 2.1 Interactive Selectors Missing Explicit `:focus-visible`

| Selector | File | Element Type | Keyboard Accessible? | Priority |
|----------|------|-------------|---------------------|----------|
| `.form__button` | `contact.css` | `<button>` submit | Yes | **Critical** — form submit |
| `.error-btn-primary` | `error.css` | `<button>` | Yes | **Serious** — recovery action |
| `.error-btn-secondary` | `error.css` | `<Link>` | Yes | **Serious** — recovery action |
| `.not-found__link` | `pages-misc.css` | `<Link>` | Yes | **Serious** — primary recovery |
| `.portfolio__link` | `portfolio.css` | `<Link>` filter | Yes | **Moderate** — filter navigation |
| `.blog-article__back` | `blog.css` | `<Link>` | Yes | **Moderate** — back navigation |
| `.article__link` | `blog.css` | `<Link>` | Yes | **Moderate** — card navigation |

### 2.2 Elements That Use `:focus` Instead of `:focus-visible`

| Selector | File | Issue |
|----------|------|-------|
| `.form__input:focus` | `contact.css` | Uses `:focus` for border — acceptable for inputs, but consider adding `:focus-visible` fallback |

### 2.3 WCAG 2.4.7 (Focus Visible) Compliance

The project currently has **7 interactive selectors** across the app that lack any `:focus-visible` treatment. All are keyboard-accessible elements that receive focus via Tab navigation. This fails WCAG 2.4.7 Level AA.

---

## 3. Duplication / Opportunity Map

### 3.1 Button Shape Duplication

Three distinct "pill button" patterns exist with overlapping properties:

| Property | `.home-hero__cta-link` | `.form__button` | `.not-found__link` |
|----------|----------------------|-----------------|-------------------|
| `padding` | `1rem 2.4rem` | `1rem 2.5rem` | `1rem 2.4rem` |
| `border-radius` | `3.2rem` | `4rem` | `999px` |
| `font-size` | `1.3rem` | `1.5rem` | `1.5rem` |
| `font-weight` | `500` | (implicit) | `600` |
| `text-decoration` | `none` | (n/a) | `none` |
| `display` | `inline-flex` | (block by default) | `inline-block` |
| `align-items` | `center` | (n/a) | (n/a) |
| `cursor` | (implicit) | `pointer` | (implicit) |

The base shape (inline pill with centered content, padding, radius, font treatment) is repeated but with inconsistent values. A primitive would normalize the shared shape and allow variants to override only the differing properties.

### 3.2 Focus-Visible Rule Fragmentation

Current state: the grouped rule in `sidebar.css` lines ~427-435 covers 5 selectors with one focus-visible treatment. This is already a partial consolidation, but it lives in `sidebar.css` (wrong ownership) and misses 7 other interactive selectors.

**Opportunity:** Move the shared focus-visible ring to `primitives.css` and extend it to cover all interactive elements that need the gold-ring treatment. The sidebar-specific overrides (like `sidebar__theme-toggle`'s white outline) would remain in `sidebar.css`.

### 3.3 Hover Pattern Inconsistency

| Pattern | Selectors | Method |
|---------|-----------|--------|
| Lift + shadow | `.home-hero__cta-link`, `.contact__data`, `.portfolio__case-card` | `translateY()` + `box-shadow` |
| Fill with accent | `.home-hero__cta-link--secondary`, `.portfolio__link`, `.form__button` | Background + color swap |
| Opacity reduction | `.error-btn-*`, `.not-found__link` | `opacity: 0.85` |
| Scale | `.sidebar__theme-toggle` | `scale(1.08)` |

These are intentionally different page-level design decisions. A button primitive should **not** normalize hover behavior — it should own the base shape and let pages keep their hover intent.

---

## 4. Architecture Options

### Option A: CSS Selector Grouping Only

**Approach:** Define `.btn` base shape in `primitives.css`. Add `.btn` class to existing TSX elements. Focus-visible normalization via a single grouped rule in `primitives.css`.

**Pros:**
- Minimal TSX churn (additive class names only)
- Focus-visible normalization is purely CSS
- Shape consolidation reduces future duplication

**Cons:**
- Requires touching 11+ TSX elements to add `.btn` class
- Without TSX changes, only focus-visible can be consolidated (selectors already exist)

**Estimated lines:** ~60-80 CSS + ~12 TSX

### Option B: Additive TSX Primitive Classes (No New CSS Primitives)

**Approach:** Don't create a shared `.btn` shape. Instead, only normalize `:focus-visible` via a CSS utility rule targeting known interactive selectors. Add `:focus-visible` where missing in existing page stylesheets.

**Pros:**
- Zero new CSS files or primitives
- Pure accessibility fix, minimal scope creep
- Smallest diff

**Cons:**
- No shape consolidation — duplication remains
- New buttons will still need manual focus-visible treatment
- Does not build on Unit 2's primitive layer

**Estimated lines:** ~25-35 CSS, ~0 TSX

### Option C: Hybrid Minimal First Slice (Recommended)

**Approach:** Define `.btn` and `.btn--primary`/`.btn--outline` shape primitives in `primitives.css`. Add `.btn` class to existing TSX elements additively. Consolidate focus-visible into a single `primitives.css` rule covering `.btn` and other interactive elements. Add `:focus-visible` to selectors that currently lack it. Keep page-specific hover, color, and sizing overrides in page stylesheets.

**Pros:**
- Builds on Unit 2's primitive layer consistently
- Shape consolidation for future button additions
- Focus-visible normalization fixes WCAG 2.4.7
- Page-specific design intent preserved (hover, color)
- Fits within 300-line budget

**Cons:**
- Requires touching ~11 TSX files (additive only)
- `.btn` base + variant definitions need careful specificity to avoid cascade conflicts
- `.error-btn-*` border-radius (`0.8rem`) differs from CTA buttons (`3.2rem`) — variant needed

**Estimated lines:** ~80-100 CSS + ~12 TSX ≈ **92-112 total**

---

## 5. Recommended First Work Unit (≤ 300 Lines)

### Scope

| Category | What | Lines (est.) |
|----------|------|-------------|
| CSS — `.btn` base shape | `primitives.css` — inline-flex pill shape | ~12 |
| CSS — `.btn--primary` variant | Filled accent treatment | ~8 |
| CSS — `.btn--outline` variant | Transparent + border treatment | ~8 |
| CSS — `.btn--subtle` variant | Error/not-found opacity-hover treatment | ~6 |
| CSS — Focus-visible normalization | Single grouped `:focus-visible` rule for `.btn`, `.portfolio__link`, `.blog-article__back`, `.article__link` | ~10 |
| CSS — Missing `:focus-visible` | Add to `.form__button`, `.error-btn-primary`, `.error-btn-secondary`, `.not-found__link` | ~15 |
| CSS — Reduced-motion | Cover `.btn` transitions in existing global baseline | ~3 |
| TSX — Add `.btn` class | Additive `className` to 11 elements across 6 files | ~12 |
| **Total** | | **~74-85** |

### Non-Goals for This Slice

- No `.btn--ghost` variant (no existing pattern to consolidate)
- No hover behavior normalization (pages keep their own hover intent)
- No responsive retuning of button sizes
- No dark-mode button overrides (currently none exist; not introduced)
- No consolidation of form input `:focus` styles (separate concern)
- No Tailwind/shadcn migration
- No page redesign, route changes, or data module changes
- No `openspec/specs/design-responsividad/` changes

### Files to Touch

| File | Change Type | Details |
|------|------------|---------|
| `src/styles/primitives.css` | Edit | Add `.btn` base, variants, focus-visible grouped rule |
| `src/styles/home.css` | Edit | Remove duplicated base properties from `.home-hero__cta-link` (keep variant-specific) |
| `src/styles/contact.css` | Edit | Add `:focus-visible` to `.form__button` |
| `src/styles/error.css` | Edit | Add `:focus-visible` to `.error-btn-primary`, `.error-btn-secondary` |
| `src/styles/pages-misc.css` | Edit | Add `:focus-visible` to `.not-found__link` |
| `src/styles/portfolio.css` | Edit | Add `:focus-visible` to `.portfolio__link` |
| `src/styles/blog.css` | Edit | Add `:focus-visible` to `.blog-article__back`, `.article__link` |
| `src/styles/sidebar.css` | Edit | May simplify the grouped focus-visible rule (move to primitives) |
| `src/app/page.tsx` | Edit | Add `.btn` class to CTA links |
| `src/app/perfil/page.tsx` | Edit | Add `.btn` class to CTA links |
| `src/app/contacto/page.tsx` | Edit | Add `.btn` class to CTA links + form button |
| `src/app/blog/page.tsx` | Edit | Add `.btn` class to CTA links |
| `src/app/blog/[slug]/page.tsx` | Edit | Add `.btn` class to CTA links |
| `src/app/casos-reales/page.tsx` | Edit | Add `.btn` class to CTA link |
| `src/app/error.tsx` | Edit | Add `.btn` class to error buttons |
| `src/app/not-found.tsx` | Edit | Add `.btn` class to not-found link |

**Total files:** 16 (9 CSS, 7 TSX)

---

## 6. Risks

### 6.1 Cascade / Specificity

**Risk:** Adding `.btn` as a low-specificity primitive could be overridden by existing page selectors with higher specificity (e.g., `.home-hero__cta-link--primary` has class specificity `0-1-0` which matches `.btn`). If `.btn` sets properties that page selectors also set, the page wins (same specificity, later in cascade) — which is the intended behavior. If `.btn` sets properties the page does NOT set, those become additive — also intended.

**Mitigation:** `.btn` should only set properties that are truly shared (display, align-items, gap, text-decoration, cursor, transition-base). Variant-specific properties (background, color, border) belong in variant classes or remain page-owned.

### 6.2 Visual Regression

**Risk:** If `.btn` introduces properties that existing page selectors don't override, visual changes could appear (e.g., adding `align-items: center` to elements that don't currently have it).

**Mitigation:** Audit each TSX element's existing CSS chain before adding `.btn`. Only add `.btn` where the base properties are already present or safely additive. Test each page at desktop + mobile.

### 6.3 Dark Mode

**Risk:** Currently no dark-mode overrides exist for any button selectors. Adding `.btn` doesn't change this — but if `.btn` sets `background` or `color`, dark-mode might need future overrides.

**Mitigation:** `.btn` base should NOT set background or color. Those belong in variant classes or page selectors. Dark-mode continues to own nothing new.

### 6.4 Reduced Motion

**Risk:** `.home-hero__cta-link` has `transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease`. The global `reset.css` baseline already minimizes `transition-duration` for `prefers-reduced-motion: reduce`. `.form__button` has `transition: all 0.3s ease-in-out`. Both are covered.

**Mitigation:** Verify that the global baseline covers all transition properties introduced by `.btn`. The `translateY()` transforms on hover are the main motion concern — they are already suppressed by the global baseline's `transition-duration: 0.01ms`.

### 6.5 Keyboard Focus

**Risk:** Adding `:focus-visible` where it was missing could cause visual regressions for keyboard users who see a ring they didn't see before. This is an **intentional improvement**, not a regression.

**Mitigation:** The gold-ring treatment (`outline: 0.3rem solid var(--principal-color)`) is already established by the existing grouped rule in `sidebar.css`. New `:focus-visible` rules should match this established pattern.

### 6.6 Review Workload

**Risk:** 16 files touched is a moderately wide diff. However, most changes are additive (adding class names, adding `:focus-visible` rules).

**Mitigation:** Total estimated lines (~85) is well under the 300-line budget. Changes are mechanical and follow established patterns. Group by concern in the diff: CSS primitives first, then CSS focus-visible fixes, then TSX class additions.

### 6.7 TSX Churn

**Risk:** Touching 7 TSX files for class name additions could conflict with other in-flight work.

**Mitigation:** All TSX changes are additive (`className` additions only). No logic, structure, or content changes. Merge-safe.

---

## 7. Verification Ideas

### 7.1 Automated

- `npm run lint` — must pass with no new violations
- `npm run build` — must succeed with no new warnings
- Diff review: no non-additive TSX changes, no new dark-mode rules, no responsive retuning

### 7.2 Keyboard Focus Checks

- Tab through `/`, `/perfil`, `/contacto`, `/casos-reales`, `/blog`, `/blog/[slug]`
- Verify gold focus ring appears on: CTA buttons, form submit, filter links, article links, back link
- Tab through `/error` boundary (trigger error) — verify error buttons have focus ring
- Tab to `/not-found` — verify recovery link has focus ring
- Verify focus ring does NOT appear on mouse click (`:focus-visible` only)

### 7.3 Dark Mode

- Toggle dark mode on each page with CTA buttons
- Verify button backgrounds, colors, and borders remain correct
- Verify focus ring is visible against dark backgrounds (gold on dark)

### 7.4 Reduced Motion

- Enable `prefers-reduced-motion: reduce`
- Verify CTA hover transforms are suppressed
- Verify form button hover transform is suppressed
- Verify no other unexpected motion

### 7.5 Route / Viewport Matrix

| Route | Desktop | Tablet | Mobile | Small-mobile |
|-------|---------|--------|--------|-------------|
| `/` | CTA primary + secondary | | | |
| `/perfil` | CTA primary + secondary | | | |
| `/contacto` | CTA + form submit | | | |
| `/casos-reales` | CTA secondary + filter links | | | |
| `/blog` | CTA primary + secondary | | | |
| `/blog/[slug]` | CTA primary + secondary + back link | | | |

---

## 8. Next Recommendation

**Run Proposal phase.** The explore findings support a clean, bounded Unit 4:

1. **Propose** a `.btn` shape primitive (base + 3 variants) in `primitives.css` following Unit 2's pattern.
2. **Propose** a consolidated `:focus-visible` rule in `primitives.css` covering `.btn` and other interactive selectors.
3. **Propose** adding `:focus-visible` to 5 selectors that currently lack it (`.form__button`, `.error-btn-primary`, `.error-btn-secondary`, `.not-found__link`, `.portfolio__link`).
4. **Propose** additive `.btn` class names in 7 TSX files.
5. **Explicit non-goals:** no hover normalization, no ghost variant, no dark-mode additions, no responsive retuning, no Tailwind/shadcn, no content/route changes.

The proposal should confirm whether `.btn` base shape consolidation (CSS property dedup) is in scope or whether this unit should be focus-visible only (Option B). The recommendation is Option C (hybrid) given the 300-line budget has ample room.
