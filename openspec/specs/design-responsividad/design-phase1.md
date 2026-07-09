# Design — Phase 1: CSS File Split

## Objective

Split `responsive.css` (913 lines) and `pages.css` (860 lines) into smaller, domain-focused files. Zero visual changes. Pure structural refactor.

## Current State

### responsive.css — 3 breakpoint blocks

| Block | Lines | Breakpoint | Size |
|-------|-------|------------|------|
| Tablet | 6–308 | `@media (min-width: 768px) and (max-width: 1023px)` | 303 lines |
| Mobile | 309–717 | `@media (max-width: 767px)` | 409 lines |
| Small | 718–913 | `@media (max-width: 480px)` | 196 lines |

### pages.css — Section boundaries (by comment markers)

| Section | Lines | Content |
|---------|-------|---------|
| Page content overrides + headers | 1–60 | `.content__page` resets, section headers, `__title::after` |
| About/Profile | 61–260 | `.about__*` selectors, curriculum sections |
| Method/Principles | 261–301 | `.method__steps`, `.principles__list`, method step cards |
| Services | 302–362 | `.services__container`, service cards |
| Reviews | 363–423 | `.reviews__containers`, review cards |
| Clients | 424–447 | `.clients__container`, client links |
| Prices | 448–529 | `.prices__box`, price cards, buttons |
| Info extra | 530–700 | `.extra__container`, knowledge, extras |
| Misc (not-found, CTA) | 701–860 | `.not-found__*`, `.cta__*`, remaining overrides |

### index.css — Current cascade order

```css
@import "./variables.css";
@import "./reset.css";
@import "./layout.css";
@import "./sidebar.css";
@import "./home.css";
@import "./portfolio.css";
@import "./blog.css";
@import "./contact.css";
@import "./pages.css";
@import "./footer.css";
@import "./responsive.css";
@import "./dark-mode.css";
```

## Design Decisions

### Decision 1: Split responsive.css by breakpoint (not by component)

**Chosen**: One file per breakpoint (`responsive-tablet.css`, `responsive-mobile.css`, `responsive-small.css`).

**Alternative considered**: Split by component (e.g., `responsive-sidebar.css`, `responsive-home.css`).

**Tradeoff**:
- By breakpoint: 3 files, easy to find "what happens at 768px?", natural mental model for responsive work.
- By component: 10+ files, easy to find "what's the sidebar on mobile?", but fragments responsive logic across many files.

**Rationale**: The breakpoint approach matches how developers think about responsive design ("I need to fix the tablet layout") and keeps each file self-contained. The component approach would scatter related rules across files and make it harder to see the full picture at a given viewport.

### Decision 2: Split pages.css by domain section

**Chosen**: 5 files matching the natural comment boundaries:

| New file | Source lines | Content |
|----------|-------------|---------|
| `pages-headers.css` | 1–60 | Page content resets, section headers, title decorations |
| `pages-profile.css` | 61–301 | About, curriculum, method, principles |
| `pages-services.css` | 302–447 | Services, reviews, clients |
| `pages-pricing.css` | 448–529 | Pricing boxes, buttons, rewards |
| `pages-misc.css` | 530–860 | Info extra, knowledge, not-found, CTA |

**Alternative considered**: Fewer files (e.g., merge services+pricing into `pages-commerce.css`).

**Tradeoff**: 5 files keeps each under 250 lines and matches the visual sections of the site. Merging would reduce file count but lose the 1:1 mapping between CSS file and page section.

### Decision 3: Cascade order for new files

**Chosen**: Insert responsive files after all component files, before dark-mode. Maintain the same relative order (tablet → mobile → small).

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
@import "./responsive-tablet.css";
@import "./responsive-mobile.css";
@import "./responsive-small.css";
@import "./dark-mode.css";
```

**Rationale**: The cascade semantics are preserved. Responsive overrides still come after component styles. Dark-mode still overrides everything. The pages split doesn't change ordering — it just replaces one import with five.

### Decision 4: Preserve comment headers in split files

**Chosen**: Each new file starts with the original comment block header (e.g., `/* ===================== Responsive — Tablet ===================== */`).

**Rationale**: Maintains visual consistency with the existing codebase style and makes files self-documenting.

## Implementation Plan

### Step 1: Create the 3 responsive files

1. Create `src/styles/responsive-tablet.css` — lines 6–308 from responsive.css
2. Create `src/styles/responsive-mobile.css` — lines 309–717 from responsive.css
3. Create `src/styles/responsive-small.css` — lines 718–913 from responsive.css
4. Each file gets its own comment header

### Step 2: Create the 5 pages files

1. Create `src/styles/pages-headers.css` — lines 1–60 from pages.css
2. Create `src/styles/pages-profile.css` — lines 61–301 from pages.css
3. Create `src/styles/pages-services.css` — lines 302–447 from pages.css
4. Create `src/styles/pages-pricing.css` — lines 448–529 from pages.css
5. Create `src/styles/pages-misc.css` — lines 530–860 from pages.css

### Step 3: Update index.css

Replace the two old imports with the eight new imports in the correct cascade position.

### Step 4: Delete old files

Remove `responsive.css` and `pages.css`.

### Step 5: Verify

1. `npm run build` — must exit 0
2. `npm run lint` — no new errors
3. Visual comparison at 360px, 768px, 1280px — pixel-level parity

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong line boundaries → missing/ duplicate rules | Visual regression | Verify line counts: 303 + 409 + 196 = 908 (responsive), 60 + 241 + 146 + 82 + 331 = 860 (pages). Count must match originals. |
| Import order change → cascade breaks | Specificity issues | New imports go in exact same position as old imports. Verify dark-mode remains last. |
| Missed comment boundaries in pages.css | Wrong split | Grep for `^/\*` markers and verify boundaries match before cutting. |

## Files Affected

| Action | File |
|--------|------|
| CREATE | `src/styles/responsive-tablet.css` |
| CREATE | `src/styles/responsive-mobile.css` |
| CREATE | `src/styles/responsive-small.css` |
| CREATE | `src/styles/pages-headers.css` |
| CREATE | `src/styles/pages-profile.css` |
| CREATE | `src/styles/pages-services.css` |
| CREATE | `src/styles/pages-pricing.css` |
| CREATE | `src/styles/pages-misc.css` |
| MODIFY | `src/styles/index.css` |
| DELETE | `src/styles/responsive.css` |
| DELETE | `src/styles/pages.css` |
