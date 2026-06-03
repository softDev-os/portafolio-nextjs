# Design: profile-mobile-overflow

## Status

**Phase:** Design
**Date:** 2026-06-03
**Author:** MiMo SDD Design Executor

---

## 1. Diagnosis Summary and Root Cause

### Symptom

The `/perfil` route exhibits a **6px horizontal document overflow** at 360px and 375px viewports, detected by `document.documentElement.scrollWidth` exceeding `window.innerWidth` and confirmed by `scrollX > 0` after programmatic horizontal scroll. The overflow is invisible to users (body has `overflow-x: hidden`) but constitutes a real document-width anomaly.

### Root Cause

At the small-mobile breakpoint (`html { font-size: 50% }` in `responsive-small.css`), the shared title decoration rule applies:

```css
/* responsive-small.css — current */
.about__title::after,
.curriculum__title::after,
.services__title::after,
.reviews__title::after,
.clients__title::after,
.prices__title::after {
    right: -1.5rem;   /* → -15px at 50% */
    width: 3rem;       /* → 30px at 50%  */
    height: 2rem;      /* → 20px at 50%  */
}
```

The base primitive in `primitives.css` positions all title `::after` decorations at `right: 0`, keeping them within the parent element's padding box. The small breakpoint override shifts the decoration **outward** with `right: -1.5rem` (-15px), allowing the generated `::after` box to extend 15px past the parent's right padding edge into the viewport's right margin.

On `/perfil` at 360px:
- Available content width: `360 - (2 × 8px padding)` = **344px**
- The `.about__title` inline-block parent ends within this 344px
- The `::after` pseudo extends **15px** past the parent → reaches **~359px**, which exceeds the content boundary
- This pushes `document.documentElement.scrollWidth` to **366px** (6px overflow)

### Confirmed by Diagnostic Probes

| Probe | Result |
|-------|--------|
| Baseline at 360px | `docWidth=366`, `scrollX=6` |
| `*::after { display: none !important }` | `docWidth=360`, `scrollX=0` |
| Only title dots disabled | `docWidth=360`, `scrollX=0` |
| Title dots forced to `right: 0 !important` | `docWidth=360`, `scrollX=0` |

Cross-route: `/` and `/contacto` show zero overflow at all checked viewports, confirming the issue is route-specific to `/perfil` (which uses the affected `.about__title` selector).

### Why `position: absolute` Doesn't Prevent the Issue

Absolute positioning removes the `::after` from normal document flow, so it doesn't affect sibling layout. However, the browser still accounts for absolutely-positioned boxes that extend past the `<html>` element when computing `document.documentElement.scrollWidth`. Since `overflow-x: hidden` is on `<body>` but not on `<html>`, the document element's scroll width reflects the extended pseudo-element.

---

## 2. Candidate Fixes Evaluated

### Candidate A: `right: 0` (reset to base primitive behavior)

**Mechanism:** Remove the negative offset entirely, setting `right: 0` to match the base primitive in `primitives.css`.

**Pros:**
- Simplest change — single property value reverts to known-good base behavior
- No overflow risk: decoration right edge aligns with parent's padding edge, well within content area
- Consistent with how the base primitive already works at all other viewports
- At 360px with `width: 3rem` (30px), decoration sits within the `padding-right: 1.2rem` (12px) zone plus 18px of content area — fully contained
- Self-healing against future parent sizing changes

**Cons:**
- Loses the slight outward decorative extension that the small-breakpoint override provided (aesthetic-only loss)
- At small widths the decoration appears slightly more inward than at larger mobile widths

**Overflow risk:** None — `right: 0` guarantees the pseudo cannot exceed the parent's padding box.

### Candidate B: Partial offset adjustment (`right: -0.6rem; width: 2.4rem`)

**Mechanism:** Reduce the negative offset proportionally while keeping some outward extension.

**Pros:**
- Preserves partial decorative extension aesthetic
- At 360px: pseudo extends 6px past parent padding edge, stays within content boundary

**Cons:**
- Still introduces a negative offset that could overflow if parent sizing changes
- Proportional reduction is harder to reason about across different viewport widths
- More complex to verify — must confirm 6px extension stays safe at all three viewports (360, 375, 414)

**Overflow risk:** Low but non-zero — depends on parent element's exact position within the content area.

### Candidate C: Adjust `padding-right` on parent

**Mechanism:** Increase the parent title's `padding-right` to create room for the outward-extending decoration.

**Pros:**
- Keeps the decoration's visual position similar

**Cons:**
- Reduces usable text width at small viewports where space is already tight (344px → ~326px)
- Affects text wrapping behavior and line count on titles
- Changes more than just the pseudo-element positioning
- Violates the "smallest change that fixes the overflow" principle

**Overflow risk:** Low if padding is increased sufficiently, but introduces layout side effects.

### Candidate D: Hide overflow on the decoration container

**Mechanism:** Add `overflow: hidden` to `.about__header` or a similar parent to clip the extending pseudo-element.

**Pros:**
- Quick visual fix

**Cons:**
- Spec explicitly states the fix MUST NOT use `overflow-x: hidden` as primary remediation
- Hides the symptom rather than fixing the positioning
- Decoration could be clipped at the right edge, losing visual quality
- Risk of clipping other content within the header

**Overflow risk:** Eliminates visual overflow but does not fix `scrollWidth` anomaly.

### Candidate E: Touch `primitives.css` base decoration

**Mechanism:** Change the base primitive's positioning to prevent any viewport from having overflow.

**Pros:**
- Could fix the issue globally

**Cons:**
- Violates the explicit scope constraint: "No primitives.css changes unless design proves necessary"
- Affects all viewports, not just the small breakpoint
- Wider blast radius — changes decoration positioning for desktop, tablet, and all mobile widths
- Out of scope for this narrow CSS-only fix

**Overflow risk:** Not applicable — wrong scope.

---

## 3. Chosen Design

### Decision: Candidate A — `right: 0`

**Rationale:**

Setting `right: 0` is the smallest, safest change that deterministically eliminates the overflow. It resets the small-breakpoint override to match the base primitive's proven positioning, guarantees zero overflow risk at any viewport width, and requires changing only a single CSS property value.

The aesthetic cost is minimal: at small-mobile widths, the decoration moves ~15px inward (from extending past the right edge to sitting at the content boundary). Given that the decoration is a subtle dotted pattern at 50% opacity, this positional shift is barely perceptible and preserves the design intent.

### Exact CSS Change

**File:** `src/styles/responsive-small.css`

**Before (current):**
```css
.about__title::after,
.curriculum__title::after,
.services__title::after,
.reviews__title::after,
.clients__title::after,
.prices__title::after {
	right: -1.5rem;
	width: 3rem;
	height: 2rem;
}
```

**After (proposed):**
```css
.about__title::after,
.curriculum__title::after,
.services__title::after,
.reviews__title::after,
.clients__title::after,
.prices__title::after {
	right: 0;
	width: 3rem;
	height: 2rem;
}
```

**Change:** One property value: `right: -1.5rem` → `right: 0`. All other properties (`width: 3rem`, `height: 2rem`) remain unchanged.

### Why Not a Partial Offset?

A partial offset like `right: -0.6rem` preserves the aesthetic extension but introduces a fragile dependency on the parent element's exact position within the content area. At 360px, the parent's right edge is at 344px, and extending 6px past it reaches exactly 350px — safe but with zero margin for error. If future CSS changes alter the parent's positioning or padding, the overflow could return. `right: 0` eliminates this fragility entirely.

---

## 4. Affected Files and Selectors

### Source File Change

| File | Change | Lines Changed |
|------|--------|---------------|
| `src/styles/responsive-small.css` | `right: -1.5rem` → `right: 0` in the title decoration rule | 1 line modified |

### Affected Selectors

The following title decoration `::after` selectors are affected by the shared rule in `responsive-small.css`:

| Selector | Pages Used | Impact |
|----------|------------|--------|
| `.about__title::after` | `/perfil` (about section) | **Primary** — fixes the confirmed overflow |
| `.curriculum__title::after` | `/perfil` (curriculum section), `/credenciales` | Decoration moves inward at small widths |
| `.services__title::after` | `/perfil` (services section), `/servicios` | Decoration moves inward at small widths |
| `.reviews__title::after` | `/perfil` (reviews section) | Decoration moves inward at small widths |
| `.clients__title::after` | `/perfil` (clients section) | Decoration moves inward at small widths |
| `.prices__title::after` | `/perfil` (prices section), `/precios` | Decoration moves inward at small widths |

### Non-Affected Files (explicit non-touch)

| File | Reason |
|------|--------|
| `src/styles/primitives.css` | Base decoration primitive unchanged — small breakpoint override is sufficient |
| `src/styles/pages-profile.css` | Page-specific title declarations unchanged |
| `src/styles/responsive-foundation.css` | Foundation/layout unchanged |
| `src/styles/responsive-mobile.css` | No title decoration overrides in this file |
| `src/styles/reset.css` | Reset/body overflow behavior unchanged |
| `src/styles/dark-mode.css` | Dark-mode variables unchanged |
| `src/styles/layout.css` | Layout grid unchanged |
| All `.tsx` files | No React component changes |
| All route/data files | No route or data changes |

---

## 5. Non-Goal Enforcement

The following are **explicitly out of scope** for this design and MUST NOT appear in the implementation:

| Non-Goal | Rationale |
|----------|-----------|
| Page redesign | This is a narrow overflow fix, not a layout change |
| `primitives.css` changes | The base decoration primitive is correct; only the small-breakpoint override needs fixing |
| Foundation/layout/reset/dark-mode changes | No overflow source identified in these files |
| TSX component changes | No React component changes needed |
| Route or data changes | No route or data changes needed |
| Broad responsive retuning | Only the confirmed title decoration rule is affected |
| Tailwind/shadcn migration | Raw CSS only |
| `openspec/specs/design-responsividad/` changes | Out of scope for this unit |
| Text/content rewrite | No content changes needed |
| `overflow-x: hidden` as primary fix | Spec explicitly prohibits this approach |
| Hiding `::after` pseudo-elements | Spec requires decorations remain visible |

---

## 6. Verification Design

### 6.1 Automated Overflow Script (Before/After)

**Tool:** `node openspec/changes/profile-mobile-overflow/overflow-check.mjs`

**Before fix (expected):**
| Route | 360px | 375px | 414px |
|-------|-------|-------|-------|
| `/perfil` | ❌ overflow=6 | ❌ overflow=6 | ✅ OK |
| `/` | ✅ OK | ✅ OK | ✅ OK |
| `/contacto` | ✅ OK | ✅ OK | ✅ OK |

**After fix (expected):**
| Route | 360px | 375px | 414px |
|-------|-------|-------|-------|
| `/perfil` | ✅ overflow=0 | ✅ overflow=0 | ✅ OK |
| `/` | ✅ OK | ✅ OK | ✅ OK |
| `/contacto` | ✅ OK | ✅ OK | ✅ OK |

**Pass criteria:** All 9 route/viewport combinations MUST report `overflow <= 0` and `scrollX === 0`.

### 6.2 Lint and Build

```bash
npm run lint   # No new violations
npm run build  # No new warnings or errors
```

### 6.3 Diff and Whitespace Check

```bash
git diff -- src/styles/responsive-small.css
git diff --check
```

**Expected diff:** 1 line modified in `src/styles/responsive-small.css` — `right: -1.5rem` → `right: 0`.

### 6.4 Manual Smoke Checks

| Check | Viewport | Route | Pass Criteria |
|-------|----------|-------|---------------|
| No horizontal scroll | 360px, 375px, 414px | `/perfil` | Page doesn't scroll horizontally |
| Title dots visible | 360px | `/perfil` | Dotted decoration visible on all section titles |
| Title dots position | 360px | `/perfil` | Decoration sits near the right edge of title text, not floating far right |
| Cross-route no overflow | 360px | `/`, `/contacto` | No regression |
| Dark mode parity | 360px | `/perfil` | Title dots visible and correctly colored in dark mode |
| Keyboard focus | 360px | `/perfil` | Focus indicators visible, not clipped |
| Reduced motion | 360px | `/perfil` | No animation regression |
| Larger viewports | 768px, 1024px, 1440px | `/perfil` | No regression at tablet or desktop |

---

## 7. Review Workload Forecast

| Metric | Forecast |
|--------|----------|
| Source files changed | 1 (`responsive-small.css`) |
| Source lines modified | 1 |
| Source lines added | 0 |
| Source lines removed | 0 |
| **Total source changed lines** | **1** |
| OpenSpec artifacts | Design doc + tasks (not counted in source budget) |
| Unit budget target | ≤25 source changed lines |
| **Budget compliance** | ✅ **Well within budget** (1/25 = 4%) |

---

## 8. Risks and Tradeoffs

### Risk 1: Decoration Aesthetic Shift

| Aspect | Detail |
|--------|--------|
| Likelihood | Certain — the decoration WILL move inward |
| Impact | Low — visual change is subtle at small widths |
| Mitigation | Manual smoke check confirms the decoration remains visible and positions correctly near the title text |

### Risk 2: Shared Selector Group Affects Other Pages

| Aspect | Detail |
|--------|--------|
| Likelihood | Certain — the rule targets 6 title selectors |
| Impact | Low — `/`, `/contacto`, `/credenciales`, `/servicios`, `/precios` all remain overflow-free; decoration simply moves inward |
| Mitigation | Overflow script covers `/` and `/contacto`; manual smoke on additional decorated routes |

### Risk 3: Future Regression if Offset Reintroduced

| Aspect | Detail |
|--------|--------|
| Likelihood | Low — the `right: 0` value is self-documenting |
| Impact | Medium — overflow could return if someone re-adds a negative offset |
| Mitigation | Overflow script serves as regression guard; add a CSS comment documenting the constraint |

### Tradeoff: Decorative Extension Lost

The original small-breakpoint override added a slight outward decorative extension (`right: -1.5rem`) that gave the title dots a "floating past the edge" visual effect. The `right: 0` fix removes this extension at small widths. This is an acceptable tradeoff because:
- The extension was causing a measurable bug (6px overflow)
- At small-mobile widths, the effect was barely visible (30px dot pattern at 50% opacity)
- The decoration remains visible and functional at `right: 0`
- Larger breakpoints (>480px) retain the base primitive's `right: 0` positioning, so the small breakpoint was actually the outlier

---

## 9. Rollback Plan

Rollback is straightforward:

1. **Single-line revert:** Change `right: 0` back to `right: -1.5rem` in `src/styles/responsive-small.css`.
2. **Verify rollback:** Re-run `overflow-check.mjs` to confirm the prior 6px overflow behavior is restored (if desired for comparison).
3. **No cascading rollback needed:** The fix is isolated to one CSS property value — no data, route, component, or migration rollback is required.

---

## 10. Recommendation for Tasks

### Implementation Task

**Single task:** Modify `right: -1.5rem` → `right: 0` in the small-breakpoint title decoration rule in `src/styles/responsive-small.css`.

### Verification Tasks

1. **Run overflow script** — confirm all 9 route/viewport combinations pass.
2. **Run lint and build** — confirm no new errors.
3. **Manual smoke** — confirm title dots visible at 360px, no overflow on `/perfil`, `/`, `/contacto`.
4. **Dark mode check** — confirm parity.
5. **Diff review** — confirm only 1 line changed in 1 source file.

### Estimated Effort

- Implementation: ~1 minute (single property value change)
- Verification: ~5 minutes (script run + manual smoke)
- Total: ~6 minutes

### Suggested Commit Message

```
fix(perfil): eliminate 6px horizontal overflow at 360/375px viewports

Set small-breakpoint title decoration `right` to `0` instead of
`-1.5rem` to prevent `::after` pseudo-elements from extending past
the document width. Matches base primitive positioning in
primitives.css.

Verified with overflow-check.mjs: all 9 route/viewport combinations
report zero overflow. Title dots remain visible at small widths.
```
