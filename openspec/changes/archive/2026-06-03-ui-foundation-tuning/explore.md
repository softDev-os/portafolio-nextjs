# Explore: ui-foundation-tuning — Unit 1 Foundation

## 1. Current Foundation Contract

The foundation is a **floating card layout** with sidebar + content grid:

| Concern | Owner | Mechanism |
|---------|-------|-----------|
| Page width/scroll | `layout.css` | `body { overflow: hidden }` + `.layout { position: absolute; top: 10vh; width: 75%; height: 85vh }` + `.layout__main { overflow-y: auto }` |
| Sidebar/Nav | `sidebar.css` + `responsive-*.css` | Desktop: 30% grid area `aside`. Tablet/Mobile: collapses to sticky top bar + fixed bottom nav |
| Dark mode | `dark-mode.css` + `layout.tsx` | SSR inline script sets `[data-theme]` on `<html>` to prevent flash; `ThemeToggle.tsx` toggles client-side |
| Safe-area | `responsive-mobile.css` | `env(safe-area-inset-top/bottom, 0px)` scattered in sidebar padding and nav list padding |
| Responsive breakpoints | Three files | `responsive-tablet.css` (768–1023px), `responsive-mobile.css` (≤767px), `responsive-small.css` (≤480px) |
| Typography scale | `variables.css` | Fluid `clamp()` tokens: `--font-size-body`, `--font-size-heading-sm/md/lg` |
| Scroll-to-top | `ScrollToTop.tsx` | Client component resets `.layout__main.scrollTop` and `window` on pathname change |
| Skip link | `reset.css` + `layout.tsx` | `a.skip-link` with CSS `:focus-visible` reveal + `tabIndex={-1}` on `<main>` |
| Reduced motion | Spread across files | `@media (prefers-reduced-motion: reduce)` in `reset.css`, `layout.css`, `sidebar.css`, `footer.css`, `dark-mode.css` |

### File ownership map

```txt
variables.css    → tokens (colors, typography, shadows, easings)
reset.css        → box-sizing, body defaults, skip-link, list/link resets
layout.css       → .layout grid, .layout__main scroll, .content__page, page animation
sidebar.css      → sidebar desktop panel, social pills, nav-float desktop
dark-mode.css    → [data-theme="dark"] overrides + .sidebar__theme-toggle + component dark rules
responsive-tablet.css  → tablet layout reset + sidebar→header + nav→bottom bar + PAGE-SPECIFIC rules
responsive-mobile.css  → mobile layout reset + sidebar→header + nav→bottom bar + PAGE-SPECIFIC rules
responsive-small.css   → small mobile fine-tuning + PAGE-SPECIFIC rules
```

---

## 2. What Is Good and Should Be Preserved

1. **Zero-flash dark mode**: The inline SSR script in `layout.tsx` reads `localStorage`/`prefers-color-scheme` and sets `data-theme` before first paint. This is correct and must not be broken.

2. **CSS custom property architecture**: `variables.css` cleanly defines all tokens. Dark mode overrides only variables. This is a solid pattern.

3. **Fluid typography via clamp()**: The four heading/body tokens scale smoothly without breakpoints. Well-done.

4. **Reduced motion support**: Every animated element has a `prefers-reduced-motion: reduce` fallback. Good a11y.

5. **Skip link + focus management**: `a.skip-link` with progressive reveal on focus, `tabIndex={-1}` on main for programmatic focus. Correct pattern.

6. **Mobile → sidebar transformation**: The sidebar gracefully collapses from a left panel to a sticky top bar (avatar hidden, name only, social icons compact) across breakpoints. The nav transforms from a floating side panel to a fixed bottom bar. This is well-architected.

7. **Safe-area awareness**: Bottom nav respects `env(safe-area-inset-bottom)` for notched iPhones. Good.

8. **ScrollToTop**: Resets both `.layout__main` and `window` scroll on navigation. Prevents stale scroll positions.

9. **ThemeToggle hydration pattern**: Uses `mounted` state to avoid hydration mismatch, renders placeholder during SSR. Clean.

---

## 3. What Is Fragile, Duplicated, or Likely to Break

### 3a. Foundation rules mixed with page-specific rules in responsive files

**The #1 fragility.** `responsive-tablet.css` and `responsive-mobile.css` both contain:
- ✅ Foundation: layout grid reset, sidebar→header transform, nav→bottom bar
- ❌ Page-specific: `.method__steps`, `.portfolio__case-grid`, `.contact__container`, `.curriculum__container`, `.about__personal-info`, `.services__service`, `.reviews__review`, `.prices__box`, etc.

This means **any foundation tuning risks touching page-specific code**, and page tuning risks breaking foundation. They must be separated before further work.

**Affected areas:**
- `responsive-tablet.css`: roughly 60% page-specific rules
- `responsive-mobile.css`: roughly 55% page-specific rules
- `responsive-small.css`: roughly 50% page-specific rules

### 3b. Duplicated layout reset across tablet and mobile

Both files repeat nearly identical foundation blocks:

```css
/* Appears in both tablet (768–1023) and mobile (≤767) */
body { overflow-y: auto; }
.layout { position: static; top: auto; left: auto; transform: none; width: 100%; height: auto; min-height: 100vh; margin: 0; grid-template-areas: "aside" "content"; grid-template-columns: 1fr; border-radius: 0; }
.layout__main { border-radius: 0; /* padding differs per breakpoint */ }
.sidebar { border-radius: 0; height: auto; min-height: unset; flex-direction: row; flex-wrap: wrap; /* ... */ position: sticky; top: 0; z-index: 10; }
.nav-float { position: fixed; right: 0; left: 0; bottom: 0; top: auto; width: 100%; z-index: 100; }
.nav-float__list { flex-direction: row; width: 100%; min-height: unset; border-radius: 0; }
.nav-float__overlay { display: none; }
```

This duplication will drift during future edits.

### 3c. Home page special-case rules are spread across 3 files

`body:has(.content__page--home)` and `.layout__main:has(.content__page--home)` appear in:
1. `layout.css` (desktop: `padding: 0; overflow: hidden auto`)
2. `responsive-tablet.css` (tablet: `padding: 0; overflow: visible; height: auto`)
3. `responsive-mobile.css` (mobile: `padding: 0; overflow: visible; height: auto` + extra `body:has` and `.layout:has` rules)

Any change to home scroll behavior requires editing 3+ places.

### 3d. Theme toggle positioning in wrong file

`.sidebar__theme-toggle` base styles live in `dark-mode.css`, but it is a structural sidebar component, not a dark-mode override. Its mobile position override is also in `dark-mode.css` inside a `@media` block. This makes sidebar layout harder to reason about.

### 3e. `body { overflow: hidden }` creates cascading complexity

The base desktop layout locks body scroll and delegates scrolling to `.layout__main`. Then every responsive breakpoint must undo this (`overflow-y: auto`), and the home page needs additional special handling. This is functional but fragile.

### 3f. `!important` on avatar dimensions

```css
.sidebar__avatar { width: 100% !important; height: auto !important; }
```

This suggests a specificity conflict that was force-resolved rather than properly scoped.

---

## 4. Non-Goals for Unit 1

To keep the diff under **300 changed lines**, Unit 1 must NOT:

| Non-goal | Reason |
|----------|--------|
| Page-specific responsive rules (contact, curriculum, about, services, reviews, prices, portfolio, blog) | Leave untouched per scope decision |
| Sidebar social nth-child selectors | User decision: leave as-is (not foundation) |
| Component-specific dark mode overrides (portfolio cards, curriculum blocks, certificates, capability cards) | Not foundation; future unit |
| Page CSS files (home.css, portfolio.css, blog.css, contact.css, etc.) | No page-specific tuning in Unit 1 |
| Scrollbar styling (`::-webkit-scrollbar` pseudo-elements) | Cosmetic, not structural foundation |
| Page enter animation (`@keyframes pageEnter`) | Working correctly, not a foundation concern |
| Footer component or footer CSS | Stable and separate concern |
| Avatar `!important` specificity fix | Requires testing visual regression; defer |

---

## 5. Proposed SDD Change Boundaries for Unit 1

### Unit 1: Foundation Layer Cleanup

**Estimated diff: ~180–250 lines changed** (net addition ~40–60 lines after deduplication)

#### Change A: Extract shared responsive foundation (NEW FILE)

Create `src/styles/responsive-foundation.css`:
- Shared non-home layout reset: body overflow, `.layout` static/1col/grid-areas, border-radius reset
- Shared sidebar→sticky-header transform base
- Shared nav-float→fixed-bottom-bar base
- Shared `.nav-float__overlay { display: none }`

Then `responsive-tablet.css` and `responsive-mobile.css` keep only:
- breakpoint-specific overrides (font-size, padding values, gap sizes)
- page-specific rules (unchanged for now)

#### Change B: Centralize safe-area tokens in variables.css

Add to `variables.css`:

```css
--safe-top: env(safe-area-inset-top, 0px);
--safe-bottom: env(safe-area-inset-bottom, 0px);
```

Replace scattered `env(safe-area-inset-*, 0px)` in:
- `responsive-mobile.css` `.sidebar` padding-top
- `responsive-mobile.css` `.nav-float__list` padding-bottom
- `responsive-mobile.css` `.content__page--home` padding-bottom
- `responsive-tablet.css` `.content__page--home` padding-bottom

#### Change C: Relocate theme toggle styles to sidebar.css

Move `.sidebar__theme-toggle` base styles from `dark-mode.css` to `sidebar.css`. Keep only dark-mode-specific overrides in `dark-mode.css` if needed.

#### Change D: Consolidate home-page scroll foundation rules

Co-locate the home scroll rules (`body:has(.content__page--home)` / `.layout__main:has(.content__page--home)`) in a dedicated foundation section so home scroll behavior has one conceptual owner.

#### Change E: Add foundation reduced-motion block to reset.css

Add a global reduced-motion baseline in `reset.css`:

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

Keep component overrides that do more than duration (for example `transform: none`).

### What Unit 1 does NOT touch

- All page-specific responsive rules stay where they are
- Social nth-child selectors untouched
- Page CSS files untouched
- Component dark mode overrides untouched
- Avatar `!important` untouched
- Scrollbar pseudo-elements untouched

---

## 6. Verification Evidence Required

| Check | Method | Pass criteria |
|-------|--------|---------------|
| `npm run build` | CLI | Exit 0, no errors or new warnings |
| `npm run lint` | CLI | Exit 0, no new violations |
| Manual viewport checks | Browser devtools | Desktop (1280+): floating card renders correctly. Tablet (800px): sticky header + bottom bar. Mobile (375px): compact header + bottom bar. Small (360px): no overflow, readable |
| Dark mode toggle check | Browser | Toggle switches theme without flash on reload. All CSS variables update. Social pills remain visible in both modes |
| Safe-area check | Browser devtools (iPhone notch simulation) | Bottom nav respects safe-area-inset-bottom. Top bar respects safe-area-inset-top on mobile |

### Additional foundation-specific checks

- Home page scroll: hero section scrollable on all breakpoints, footer hidden on desktop home
- Sidebar gradient: renders correctly in both light/dark at all breakpoints
- Skip link: visible on Tab focus, hidden otherwise
- `ScrollToTop`: navigation resets scroll position in `.layout__main`
- Reduced motion: no visible animations when OS setting is enabled

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Shared responsive-foundation.css breaks tablet or mobile layout | Medium | High | Build + manual viewport check at 4 widths before committing |
| Home page scroll breaks after consolidation | Low | High | Verify home page on all 3 breakpoints |
| Safe-area var replacement misses an edge case | Low | Medium | Grep for remaining `env(safe-area` after replacement |
| Theme toggle relocating breaks focus/hover states | Low | Medium | Test toggle at all breakpoints in both themes |
| Reduced-motion consolidation removes needed `transform: none` | Medium | Low | Keep component overrides that do more than duration |

---

## Summary

The foundation is fundamentally sound — dark mode flash prevention, fluid typography, accessibility basics, and the sidebar→header transformation are well-built. The primary fragility is **page-specific responsive rules mixed into foundation files** and **duplicated layout resets across breakpoints**. Unit 1 should address these by extracting a shared responsive foundation, centralizing tokens, and co-locating home scroll rules while staying under the 300-line budget.
