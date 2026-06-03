# Tasks: ui-visual-primitives

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~135–155 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

```
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low
```

**Forecast breakdown by file**:

| File | Action | Est. net Δ |
|------|--------|-----------|
| `src/styles/primitives.css` | **New file** | +50 |
| `src/styles/index.css` | Add 1 import line | +1 |
| `src/styles/pages-headers.css` | Group 4 titles into `.title-dot`, remove 4 `::after` blocks | −24 |
| `src/styles/pages-profile.css` | Group 8 subsection titles into `.title-dot--sm`, remove 8 `::after` blocks | −32 |
| `src/styles/pages-misc.css` | Remove surface declarations from 5 card selectors; remove badge declarations from 1 selector | −25 |
| `src/styles/portfolio.css` | Remove badge declarations from 2 selectors | −14 |
| `src/styles/blog.css` | Remove badge declarations from 1 selector | −9 |
| **Total** | | **~135–155** |

**Headroom**: ~145–165 lines remain under the 300-line budget. Minimal focus-visible (~5 lines, already included in primitives.css estimate) is included. Full button primitive is **deferred**.

---

## Dependency Map

```
Task 1 (Pre-apply safety) ──► Task 2 (Create primitives.css + import)
       │                              │
       │                     ┌────────┴────────────┐
       │                     ▼                      ▼
       │              Task 3 (Title dots)    Task 4 (Card surfaces)
       │                     │                      │
       │                     └──────────┬───────────┘
       │                                ▼
       │                         Task 5 (Badges/tags)
       │                                │
       │                                ▼
       │                    ┌────── Task 6 (Full verification) ──────┐
       │                    │            │                            │
       ▼                    ▼            ▼                            ▼
  Task 0 (Rollback)    Task 7 (Review)  Task 8 (Commit)        Task 9 (Verify commit)
```

---

## Task 0 — Pre-apply Safety and State

**Goal**: Capture clean baseline state before any code changes.

**Steps**:

1. **Git status snapshot**
   ```bash
   cd /home/softdev/work/portafolio-nextjs
   git status
   git diff --stat
   git stash list
   ```
   Confirm working tree is clean. If not, report uncommitted changes and discuss with the user before proceeding.

2. **Baseline lint/build**
   ```bash
   npm run lint
   npm run build
   ```
   Both MUST exit 0. Record any pre-existing warnings (they are not blockers but should be noted).

3. **Note `openspec/specs/design-responsividad/` boundary**
   This spec and its directory MUST NOT be touched in this change. Add a note that any accidental modification would violate the scope contract.

4. **Verify dark-mode.css import position**
   Confirm `dark-mode.css` imports last in `src/styles/index.css` (line 20). This is critical for the dark-mode strategy — primitives will be loaded before dark-mode overrides, and no dark blocks will be added to `primitives.css`.

5. **Verify no in-progress responsive retuning**
   Check that no responsive files (`responsive-*.css`) have local unstaged changes. This change does NOT touch responsive files.

**Deliverable**: Confirmation of clean baseline with lint + build passing. Report any issues found before proceeding to Task 1.

---

## Task 1 — Create `src/styles/primitives.css` and Wire Import

**Goal**: Create the new primitive layer stylesheet and integrate it into the global CSS cascade.

### 1.1 Create `src/styles/primitives.css`

Write the file with the following exact primitive definitions. Refer to the Design document for exact CSS values.

**Primitives required** (in order):

1. **`.title-dot`** — Section title decoration (large, page-level)
   - `position: relative; padding-right: 2.5rem;`
   - `::after`: `content: ""; position: absolute; top: 2rem; right: 0; width: 5rem; height: 3rem; background-image: repeating-radial-gradient(...); background-size: 6px 6px; opacity: 0.5;`

2. **`.title-dot--sm`** — Subsection title decoration (small)
   - `padding-right: 1.2rem;`
   - `::after`: same gradient pattern, but `top: 1.5rem; width: 3rem; height: 2rem; opacity: 0.6;`

3. **`.card-surface`** — Card/panel surface base
   - `border: 1px solid var(--color-border-reviews); border-radius: 1.4rem; background: var(--color-principal);`

4. **`.card-surface--alt`** — Alternate background
   - `background: var(--background-color-contact);`

5. **`.card-surface--interactive`** — Interactive card with hover
   - `transition: border-color 0.2s ease, box-shadow 0.2s ease;`
   - `&:hover`: `border-color: rgba(247, 185, 53, 0.35); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);`
   - `&:focus-visible`: `outline: 2px solid var(--principal-color); outline-offset: 2px;`

6. **`.badge`** — Inline pill/tag
   - `display: inline-block; padding: 0.3rem 0.8rem; border-radius: 999px; font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--terciario-color); background: rgba(247, 185, 53, 0.18);`

7. **`.badge--index`** — Numeric index badge variant
   - `background: rgba(247, 185, 53, 0.12);`

**Constraints** (enforced by grep in verification):
- NO `[data-theme="dark"]` blocks anywhere in `primitives.css`.
- NO `@media` queries (responsive breakpoints) in `primitives.css`.
- NO page-specific layout, spacing, or flex/grid rules.
- NO button shape/radius/sizing primitives (deferred).

### 1.2 Wire Import in `src/styles/index.css`

Add one line after `@import "./reset.css";` and before `@import "./layout.css";`:

```css
@import "./primitives.css";
```

**Resulting section in index.css**:
```css
@import "./variables.css";
@import "./reset.css";
@import "./primitives.css";    /* NEW */
@import "./layout.css";
/* ... rest unchanged ... */
@import "./dark-mode.css";
```

**Verification**:
- `npm run lint` passes.
- `npm run build` passes.
- `grep "@import" src/styles/index.css` shows `primitives.css` between reset and layout.

---

## Task 2 — Migrate Section Title Decorations

**Goal**: Consolidate duplicated `::after` dot decorations for page-level and subsection titles using CSS selector grouping. **No TSX changes required.**

### 2.1 Migrate `pages-headers.css`

**Before** (current state):
```css
.about__title,
.curriculum__title,
.portfolio__title,
.blog__title,
.contact__title {
	display: inline-block;
	font-size: var(--font-size-heading-lg);
	position: relative;
}

.about__title::after,
.curriculum__title::after,
.blog__title::after,
.contact__title::after {
	content: "";
	position: absolute;
	top: 2rem;
	right: -2.5rem;
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
```

**After**:
```css
.about__title,
.curriculum__title,
.portfolio__title,
.blog__title,
.contact__title {
	display: inline-block;
	font-size: var(--font-size-heading-lg);
}

/* Title dot decoration grouped into primitive */
.about__title,
.curriculum__title,
.blog__title,
.contact__title {
	/* .title-dot owns position: relative; and ::after */
}
```

Changes:
1. Remove `position: relative` from the shared multi-title selector.
2. Remove the entire `::after` block (4 selectors × full declaration).
3. Keep `.portfolio__title` separate — it has a different pattern with inner `.title__color` span and is NOT migrated in this unit.

**Important**: After removing `::after` and `position: relative`, `.about__title`, `.curriculum__title`, `.blog__title`, `.contact__title` rely entirely on `.title-dot` grouping in the second block. The `position: relative` is owned by `.title-dot` in `primitives.css`. The `padding-right: 2.5rem` is also owned by `.title-dot`.

### 2.2 Migrate `pages-profile.css`

**Before** (current state):
```css
.services__title::after,
.method__title::after,
.principles__title::after,
.reviews__title::after,
.clients__title::after,
.prices__title::after,
.extra__title::after,
.trust__title::after {
	content: "";
	position: absolute;
	top: 1.5rem;
	right: 0;
	width: 3rem;
	height: 2rem;
	background-image: repeating-radial-gradient(
		circle,
		var(--principal-color),
		var(--principal-color) 1px,
		transparent 0,
		transparent 100%
	);
	background-size: 6px 6px;
	opacity: 0.6;
}
```

**After**: Remove the entire `::after` block above. Add a selector group referencing `.title-dot--sm`:

```css
/* Section title ::after decoration — delegated to title-dot--sm primitive */
.services__title,
.method__title,
.principles__title,
.reviews__title,
.clients__title,
.prices__title,
.extra__title,
.trust__title {
	/* .title-dot--sm owns ::after dot decoration */
}
```

The existing parent selectors (`services__header` etc.) already provide `position: relative`. The `.services__title` etc. selectors already have `position: relative` and `padding-right: 1.2rem` in their individual definitions — these should remain because the primitive `.title-dot--sm` owns them, but the existing definitions provide backup specificity.

**NOT migrated** (keep as-is):
- `.portfolio__title .title__color::after` — inner span positioning, different pattern
- `.curriculum__subtitle .title__color::after` / `.form-header__title .title__color::after` — inner span, subsection pattern

**Verification**:
- `grep -rn "repeating-radial-gradient" src/styles/` should only return: `primitives.css`, `sidebar.css`, `pages-profile.css` (for `portfolio__title .title__color::after` and `curriculum__subtitle .title__color::after` / `form-header__title .title__color::after`)
- Visual smoke: `/`, `/perfil`, `/credenciales`, `/contacto` — check dot decorations at desktop + mobile

---

## Task 3 — Migrate Card Surfaces

**Goal**: Consolidate near-identical card/panel surface declarations in `pages-misc.css`. **No TSX changes required.**

### 3.1 Migrate `pages-misc.css`

Five selectors in `pages-misc.css` have near-identical surface declarations to consolidate:

| Selector | Current surface | Action |
|----------|----------------|--------|
| `.curriculum__left` | `border: 1px solid var(--color-border-reviews); border-radius: 1.6rem; background: var(--color-principal);` | Group into `.card-surface`; keep `padding: 2.4rem` |
| `.curriculum__right` | Same as `.curriculum__left` | Group into `.card-surface`; keep `padding: 2.4rem` |
| `.timelines__timeline` | `border: 1px solid ...; border-radius: 1.4rem; background: var(--background-color-contact); box-shadow: 0 1px 3px ...;` | Group into `.card-surface.card-surface--alt.card-surface--interactive`; keep ALL layout declarations (padding, flex, min-width, margin, position, width) and `box-shadow` |
| `.capability-card` | Same surface as `.timelines__timeline` | Group into `.card-surface.card-surface--alt.card-surface--interactive`; keep ALL layout (padding, min-width) and `box-shadow` |
| `.certificates__certificate` | `border: 1px solid ...; border-radius: 1.2rem; background: var(--color-principal);` | Group into `.card-surface`; keep ALL layout (grid, overflow) and hover border-color |

**Implementation pattern**:
For each migrated selector:
1. Remove the `border`, `border-radius`, and `background` declarations.
2. Add a grouped selector that includes the primitive class.
3. Keep all page-specific layout, padding, spacing, transitions, hover effects, and `box-shadow` declarations.

**Example — Before**:
```css
.timelines__timeline {
	position: relative;
	width: 100%;
	min-width: 0;
	margin-bottom: 1.6rem;
	display: flex;
	flex-direction: row;
	padding: 2rem;
	border: 1px solid var(--color-border-reviews);
	border-radius: 1.4rem;
	background: var(--background-color-contact);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	transition:
		border-color 0.2s ease,
		box-shadow 0.2s ease;
}
```

**Example — After**:
```css
.timelines__timeline {
	position: relative;
	width: 100%;
	min-width: 0;
	margin-bottom: 1.6rem;
	display: flex;
	flex-direction: row;
	padding: 2rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	transition:
		border-color 0.2s ease,
		box-shadow 0.2s ease;
}

.timelines__timeline,
.capability-card {
	/* .card-surface .card-surface--alt .card-surface--interactive owns border, border-radius, background, hover, focus-visible */
}
```

**NOT migrated** (intentionally different card treatments):
- `.portfolio__case-card` — has `border-left: 4px solid var(--principal-color)` (accent left border)
- `.prices__box` — has `border: 2px`, `border-radius: 1.5rem`, `translateY(-1rem)` hover
- `.reviews__review` — has `border: 2px`, `border-radius: 2rem`, negative margin offset
- `.control-room`, `.case-card` (home) — unique home treatments
- `.profile__hero` — gradient background
- `.trust__item` — unique layout with `::before` dot
- `.contact__data`, `.contact__qualified-box` — different radii
- `.home-pipeline` — heavily customized
- `.extra__info` — `border: 2px`, `border-radius: 1rem` (different style)

### 3.2 Dark-mode verification (no changes needed)

Existing dark-mode selectors in `dark-mode.css` target page selectors (`.curriculum__left`, `.timelines__timeline`, etc.). These continue to work because:
- The primitive classes are **additive** — existing selectors still match the same elements.
- `dark-mode.css` imports last and wins in cascade.
- **No changes to `dark-mode.css` are required.**

**Verification**:
- `npm run lint && npm run build` passes.
- Visual smoke on `/credenciales` — curriculum panels, timeline cards, capability cards, certificates at desktop + mobile.
- Dark mode toggle on `/credenciales` — dark backgrounds and borders match pre-migration behavior.

---

## Task 4 — Migrate Badges/Tags

**Goal**: Consolidate near-identical inline pill/chip declarations in `portfolio.css`, `blog.css`, and `pages-misc.css`. **No TSX changes required.**

### 4.1 Migrate `portfolio.css`

**Selectors**:
- `.portfolio__metadata-badge` → group into `.badge`
- `.portfolio__case-index` → group into `.badge.badge--index`

**Before** (`.portfolio__metadata-badge`):
```css
.portfolio__metadata-badge {
	display: inline-flex;
	padding: 0.35rem 0.9rem;
	border-radius: 999px;
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: var(--terciario-color);
	background: rgba(247, 185, 53, 0.18);
	margin-bottom: 0.4rem;
}
```

**After**: Remove all badge-shape properties. Keep only page-specific `margin-bottom: 0.4rem`:
```css
.portfolio__metadata-badge {
	margin-bottom: 0.4rem;
}

.portfolio__metadata-badge,
.blog-article__category {
	/* .badge owns display, padding, border-radius, font-size, font-weight, text-transform, letter-spacing, color, background */
}
```

**Before** (`.portfolio__case-index`):
```css
.portfolio__case-index {
	display: inline-flex;
	margin-bottom: 0.8rem;
	padding: 0.35rem 0.9rem;
	border-radius: 999px;
	background: rgba(247, 185, 53, 0.12);
}
```

**After**: Remove badge-shape properties. Keep `margin-bottom: 0.8rem`:
```css
.portfolio__case-index {
	margin-bottom: 0.8rem;
}

.portfolio__case-index,
.capability-card__tools li {
	/* .badge .badge--index owns pill shape and background */
}
```

### 4.2 Migrate `blog.css`

**Selector**: `.blog-article__category`

**After**: Remove badge-shape properties. Keep `margin-bottom: 0.8rem`:
```css
.blog-article__category {
	margin-bottom: 0.8rem;
}
```
(Grouped in 4.1 with `.portfolio__metadata-badge`.)

### 4.3 Migrate `pages-misc.css`

**Selector**: `.capability-card__tools li`

**After**: Remove `border-radius`, `background`, `color`, `font-size`, `font-weight`. Keep page-specific:
- `max-width: 100%`
- `border: 1px solid rgba(247, 185, 53, 0.18)`
- `overflow-wrap: anywhere`

```css
.capability-card__tools li {
	max-width: 100%;
	border: 1px solid rgba(247, 185, 53, 0.18);
	overflow-wrap: anywhere;
}
```

**NOT migrated** (intentionally different):
- `.case-card__badge` — `border-radius: 4px` (square, not pill)
- `.case-card__stack li` — outline style, no accent background
- `.portfolio__case-stack li` — outline style
- `.knowledges__option` — `border-radius: 0.3rem`, solid background
- `.article__category` (blog listing) — absolute positioning, overlay

**Dark-mode verification**: `dark-mode.css` already has `[data-theme="dark"] .capability-card__tools li` — this continues to work because the page selector still matches.

**Verification**:
- `npm run lint && npm run build` passes.
- Visual smoke on `/casos-reales`, `/blog`, `/credenciales` — check badge rendering.
- Dark mode check on `/credenciales` — capability-card tool badges.

---

## Task 5 — Full Verification

**Goal**: Comprehensive verification before review and commit.

### 5.1 Automated checks

```bash
npm run lint              # must exit 0, no new violations
npm run build             # must exit 0, no new errors/warnings
git diff --check          # must exit 0, no whitespace/conflict issues
```

### 5.2 Grep checks

```bash
# 1. No dark blocks in primitives.css
grep -n "data-theme" src/styles/primitives.css
# → MUST return zero matches

# 2. No responsive breakpoints in primitives.css
grep -n "@media" src/styles/primitives.css
# → MUST return zero matches

# 3. Reduced title dot duplication (should only remain in primitives.css + inner-span patterns)
grep -rn "repeating-radial-gradient" src/styles/ | grep -v "node_modules"
# → MUST only appear in: primitives.css, sidebar.css,
#    pages-profile.css (portfolio__title .title__color::after,
#                      curriculum__subtitle .title__color::after,
#                      form-header__title .title__color::after)

# 4. Primitive import order
grep "@import" src/styles/index.css
# → primitives.css MUST be after reset.css, before layout.css

# 5. Expected primitive classes exist in primitives.css
grep -n "\.title-dot" src/styles/primitives.css
grep -n "\.card-surface" src/styles/primitives.css
grep -n "\.badge" src/styles/primitives.css
# → All expected class names present

# 6. No global button primitives
grep -n "\.btn" src/styles/primitives.css
# → MUST return zero matches (full button primitive deferred)
```

### 5.3 Route/viewport smoke matrix

Check the following routes at **desktop**, **tablet (≤1023px)**, **mobile (≤767px)**, and **small mobile (≤480px)**:

| Route | What to verify |
|-------|---------------|
| `/` | Home hero and shell unaffected (no primitives used here yet) |
| `/perfil` | Section title decorations (`.services__title`, `.method__title`, etc.) render correctly. Dot position, size, opacity match pre-migration. |
| `/credenciales` | Card surfaces (curriculum panels, timeline cards, capability cards, certificates). Badge migration for `.capability-card__tools li`. |
| `/contacto` | Section title decoration (`.contact__title`). Contact page layout unaffected. |
| `/casos-reales` | Badge migration for `.portfolio__metadata-badge` and `.portfolio__case-index`. |
| `/blog` | Badge migration for `.blog-article__category`. Blog listing page and any article detail page. |

Checklist per route/viewport:
- [ ] Title dot decorations: correct size, position, color, no layout shift
- [ ] Card surfaces: correct border, radius, background, no layout regression
- [ ] Badges: correct pill shape, accent background, typography
- [ ] No horizontal overflow or cutoff

### 5.4 Dark mode checks

- Toggle dark mode on `/credenciales` (heaviest card/badge migration).
- Verify: curriculum panels, timeline cards, capability cards, certificates show correct dark backgrounds and borders.
- Verify: `.capability-card__tools li` shows dark-mode badge styling from `dark-mode.css`.
- Verify: no flashing or wrong colors for section title dots (should stay `var(--principal-color)`).

### 5.5 Keyboard focus check

- Navigate to `/credenciales`.
- Tab through interactive card elements (`.timelines__timeline` and `.capability-card` — these have `.card-surface--interactive`).
- Verify `:focus-visible` shows a visible 2px gold outline with 2px offset.
- Verify tab order is logical and no focus is trapped.

### 5.6 Reduced motion check

- Enable OS-level reduced motion.
- Load `/credenciales`.
- Verify card hover transitions are minimized by global baseline.
- No transform-based motion artifacts from primitive classes.

### 5.7 Visual comparison (if screenshots available)

- Compare before/after screenshots for:
  1. Section title decorations (page-level and subsection) at desktop
  2. Card surfaces at `/credenciales` (curriculum panels, timeline cards, capability cards, certificates)
  3. Badges at `/casos-reales`, `/blog`, `/credenciales`
  4. Dark-mode versions of the above

---

## Task 6 — Review (Judgment Day)

**Goal**: Fresh review pass before commit. Review scope = code changed across Tasks 1–4.

### 6.1 Diff review checklist

- [ ] **Scope audit**: No changes to `openspec/specs/design-responsividad/`, no Tailwind/shadcn, no full page redesign, no `/perfil` overflow fix, no broad token migration.
- [ ] **TSX audit**: No TSX files were changed (confirmed by design — all migrations use CSS selector grouping).
- [ ] **Dark-mode audit**: `primitives.css` has zero `[data-theme="dark"]` blocks.
- [ ] **Responsive audit**: `primitives.css` has zero `@media` breakpoints.
- [ ] **Button audit**: `primitives.css` has no `.btn` class. Full button primitive is deferred.
- [ ] **Import order**: `primitives.css` is after `reset.css` and before `layout.css` in `index.css`.
- [ ] **`pages-headers.css`**: `::after` blocks removed for `.about__title`, `.curriculum__title`, `.blog__title`, `.contact__title`. `.portfolio__title` kept unchanged. `position: relative` removed from the shared title selector.
- [ ] **`pages-profile.css`**: `::after` blocks removed for 8 subsection titles. `.portfolio__title .title__color::after` and `.curriculum__subtitle .title__color::after` / `.form-header__title .title__color::after` kept unchanged.
- [ ] **`pages-misc.css`**: `border`/`border-radius`/`background` removed from 5 card selectors. Page-owned layout preserved. Page-specific hover/transition preserved.
- [ ] **`portfolio.css`**: Badge properties removed from 2 selectors. Page-specific margins preserved.
- [ ] **`blog.css`**: Badge properties removed from 1 selector. Page-specific margin preserved.
- [ ] **`pages-misc.css` (badges)**: Badge properties removed from `.capability-card__tools li`. Page-specific border/overflow preserved.
- [ ] **Dark-mode continuity**: Existing dark selectors in `dark-mode.css` still target same page selectors.
- [ ] **Reduced-motion continuity**: Existing `@media (prefers-reduced-motion: reduce)` blocks in page files preserved. No added in primitives.css.
- [ ] **Estimated Δ**: ~135–155 lines verified (well under 300-line budget).

### 6.2 If review passes

Proceed to commit.

### 6.3 If review finds issues

- For minor issues: fix directly.
- For issues requiring scope changes or exceeding budget: pause and discuss with user before proceeding.
- For visual regressions: investigate cascade order. Page selectors should win due to later import order.

---

## Task 7 — Commit

**Goal**: Single commit with the full implementation.

**Commit strategy**: Single commit (Δ is ~135–155 lines, well within single-review-unit budget).

```bash
git add -A
git commit -m "feat(ui): add visual primitives layer (title-dot, card-surface, badge)

- Create src/styles/primitives.css with .title-dot, .card-surface, .badge classes
- Wire import in index.css after reset.css, before layout.css
- Migrate section title ::after dot decorations in pages-headers.css (x4) and pages-profile.css (x8) to .title-dot / .title-dot--sm selector grouping
- Migrate 5 card surface selectors in pages-misc.css to .card-surface / .card-surface--alt / .card-surface--interactive
- Migrate 4 badge selectors across portfolio.css, blog.css, pages-misc.css to .badge / .badge--index
- Include :focus-visible normalization for interactive card surfaces
- Defer full button primitive to future unit
- No TSX changes, no dark-mode blocks, no responsive breakpoints

Verified: lint+build clean, dark-mode continuity confirmed,
reduced-motion baseline preserved, 300-line budget respected (~135 net Δ)."
```

---

## Task 8 — Post-Commit Verification

**Goal**: Confirm the commit is clean and the application works correctly.

1. **Re-run verification**:
   ```bash
   npm run lint
   npm run build
   git diff --check HEAD~1
   ```

2. **Quick smoke check**: `/`, `/perfil`, `/credenciales`, `/contacto` at desktop.

3. **Dark mode quick check**: `/credenciales` with dark mode toggled.

4. **Final git log check**:
   ```bash
   git log --oneline -1
   git diff --stat HEAD~1 HEAD
   ```

---

## Rollback Plan

If the commit needs to be reverted for any reason:

### Quick revert (recommended)
```bash
git revert HEAD --no-edit
git push                   # if pushing
```
Verify with `npm run lint && npm run build` and visual smoke.

### Manual rollback (if revert has conflicts)
1. Remove `@import "./primitives.css";` from `src/styles/index.css`.
2. Delete `src/styles/primitives.css`.
3. Restore `pages-headers.css`: undo the selector group changes, restore `::after` block for 4 titles, restore `position: relative` on the shared title selector.
4. Restore `pages-profile.css`: undo selector group, restore `::after` block for 8 subsection titles.
5. Restore `pages-misc.css`: restore removed `border`/`border-radius`/`background` for 5 card selectors, restore badge declarations for 1 selector.
6. Restore `portfolio.css`: restore badge declarations for 2 selectors.
7. Restore `blog.css`: restore badge declarations for 1 selector.
8. Verify: `npm run lint && npm run build && git diff --check`.

Estimated rollback effort: ~15 minutes.

---

## Non-Goal Enforcement Checklist

- [ ] No Tailwind/shadcn imports or utilities
- [ ] No full page redesign
- [ ] No page-specific responsive retuning
- [ ] No `/perfil` 360px overflow fix
- [ ] No broad spacing/shadow/radius/border-width token migration
- [ ] No changes to `openspec/specs/design-responsividad/`
- [ ] No React component, route, data, or metadata changes
- [ ] No TSX file changes
- [ ] No full button primitive (`.btn` class) in primitives.css
- [ ] No `[data-theme="dark"]` blocks in primitives.css
- [ ] No `@media` breakpoints in primitives.css
