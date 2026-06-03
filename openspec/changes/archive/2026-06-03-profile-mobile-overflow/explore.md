# Explore — `/perfil` 360px Horizontal Overflow

**Status:** exploration complete — ready for Proposal
**Date:** 2026-06-03
**Branch:** `origin/main` @ `1281b2c`
**Scope:** read-only diagnostic; no source changes

---

## 1. Purpose

Diagnose and document the known small-mobile horizontal overflow (~6px at 360px viewport) on `/perfil`. This is the recommended Unit 3 change after Unit 1 (`ui-foundation-tuning`) and Unit 2 (`ui-visual-primitives`) are complete and archived.

---

## 2. Reproduction Loop

### 2.1 Automated Detection Script

```bash
# Saved as openspec/changes/profile-mobile-overflow/overflow-check.mjs
# Run: node openspec/changes/profile-mobile-overflow/overflow-check.mjs
```

The following Playwright script provides a deterministic, repeatable feedback loop for detecting horizontal overflow:

```javascript
// openspec/changes/profile-mobile-overflow/overflow-check.mjs
import { chromium } from "@playwright/test";

const ROUTES = ["/perfil", "/", "/contacto"];
const VIEWPORTS = [
  { width: 360, height: 800, label: "360px" },
  { width: 375, height: 800, label: "375px" },
  { width: 414, height: 800, label: "414px" },
];

async function checkOverflow(page, route, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });

  // Core measurement
  const metrics = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    const overflow = Math.max(docWidth, bodyWidth) - viewportWidth;

    // Find culprit elements
    const culprits = [];
    const allElements = document.querySelectorAll("*");
    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth + 1 || rect.left < -1) {
        culprits.push({
          tag: el.tagName.toLowerCase(),
          classes: el.className.toString().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          overflow: Math.round(rect.right - viewportWidth),
        });
      }
    }

    // Sort by overflow amount descending
    culprits.sort((a, b) => b.overflow - a.overflow);

    // Scroll test
    window.scrollTo(9999, 0);
    const scrollX = window.scrollX;
    window.scrollTo(0, 0);

    return {
      docWidth,
      bodyWidth,
      viewportWidth,
      overflow,
      scrollX,
      culpritCount: culprits.length,
      topCulprits: culprits.slice(0, 10),
    };
  });

  return { route, viewport: viewport.label, ...metrics };
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      const result = await checkOverflow(page, route, viewport);
      results.push(result);
      const status = result.overflow > 0 ? "❌ OVERFLOW" : "✅ OK";
      console.log(
        `${status} ${route} @ ${viewport.label}: ` +
        `overflow=${result.overflow}px, ` +
        `scrollX=${result.scrollX}, ` +
        `culprits=${result.culpritCount}`
      );
      if (result.topCulprits.length > 0) {
        console.log("  Top culprits:");
        for (const c of result.topCulprits.slice(0, 5)) {
          console.log(
            `    <${c.tag} class="${c.classes}"> ` +
            `right=${c.right} overflow=${c.overflow}px`
          );
        }
      }
    }
  }

  await browser.close();

  // Write JSON for downstream analysis
  const fs = await import("fs");
  fs.writeFileSync(
    "openspec/changes/profile-mobile-overflow/overflow-report.json",
    JSON.stringify(results, null, 2)
  );
  console.log("\nReport written to overflow-report.json");
}

main().catch(console.error);
```

### 2.2 How to Run

```bash
# 1. Start dev server in background
npm run dev &

# 2. Wait for server
npx wait-on http://localhost:3000 --timeout 30000

# 3. Run overflow check
node openspec/changes/profile-mobile-overflow/overflow-check.mjs

# 4. (Optional) Run dark mode variant:
#    Add `?theme=dark` or set data-theme before measurement
```

### 2.3 Measurement Method

| Signal | How Measured | What It Tells |
|--------|-------------|---------------|
| `document.documentElement.scrollWidth` | Browser API | Total content width including overflow |
| `document.body.scrollWidth` | Browser API | Body content width |
| `window.innerWidth` | Browser API | Viewport width (no scrollbar) |
| `scrollWidth - innerWidth` | Computed | Overflow amount in CSS px |
| `scrollX after scrollTo(9999,0)` | Browser API | Whether page actually scrolls horizontally |
| `getBoundingClientRect()` | Per-element | Which specific elements exceed viewport |

---

## 3. Observed Evidence

### 3.1 CSS Cascade at 360px

At 360px viewport, the CSS cascade resolves as follows:

| Source | `html` font-size | `body` overflow | `.layout__main` overflow | `.layout__main` padding |
|--------|------------------|-----------------|--------------------------|------------------------|
| `reset.css` | 62.5% | `overflow: hidden` | — | — |
| `responsive-foundation.css` (≤1023px) | — | `overflow-y: auto` | `width: 100%` | — |
| `responsive-mobile.css` (≤767px) | 56% | — | `overflow: visible` | `1.5rem 1.15rem` |
| `responsive-small.css` (≤480px) | **50%** | — | — | **`1.2rem 0.8rem`** |

**Effective values at 360px:**
- `html { font-size: 50% }` → 1rem = 10px
- `body { overflow-x: hidden; overflow-y: auto }`
- `.layout__main` { width: 100%; overflow: visible; padding: 12px 8px }
- Available content width: 360 - 16 = **344px**

### 3.2 Profile Page Structure

```
.layout (100% width, grid: 1fr)
├── .sidebar (sticky header, 100% width, flex-direction: row)
│   └── theme-toggle (absolute, right: 1.6rem)
└── .layout__main (100%, overflow: visible, padding: 12px 8px)
    └── .content__page.content__about (display: block, width: 100%)
        ├── .about__header
        │   └── .about__title (inline-block, padding-right: 1.2rem)
        │       └── ::after (absolute, right: -1.5rem, width: 3rem) ← RESPONSIVE OVERRIDE
        ├── .profile__hero (width: 100%, padding: 2.4rem, border: 0.1rem)
        │   ├── .profile__eyebrow (letter-spacing: 0.12em)
        │   ├── .profile__headline (max-width: 76rem, clamp font)
        │   ├── .profile__summary (max-width: 72rem)
        │   └── .profile__actions (flex, gap: 1.2rem, flex-wrap: wrap)
        │       ├── CTA primary (padding: 1rem 2.4rem, border-radius: 3.2rem)
        │       └── CTA secondary (padding: 1rem 2.4rem, border: 2px)
        ├── .about__method
        │   ├── .method__header
        │   │   └── .method__title (inline-block, padding-right: 1.2rem)
        │   │       └── ::after (absolute, top: 1.5rem, right: 0, width: 3rem)
        │   └── .method__steps (grid: 1fr, gap: 1.4rem)
        │       └── .method__step (border, padding: 1.8rem)
        ├── .about__services
        │   ├── .services__header → .services__title (like method)
        │   └── .services__container (flex-direction: column)
        │       └── .services__service (flex-direction: column, flex-basis: 100%)
        ├── .about__principles
        │   └── .principles__list (grid: 1fr)
        │       └── .principles__item (border, padding: 1.8rem)
        └── .about__trust
            └── .trust__list (grid, gap: 1.2rem)
                └── .trust__item (padding: 1.5rem 1.5rem 1.5rem 3.4rem, border)
```

### 3.3 Key Observations

1. **All profile sections use `width: 100%`** with `box-sizing: border-box` (global reset). This should constrain everything to the parent's content box.

2. **The `::after` title decorations** on section titles use `position: absolute` with responsive overrides in `responsive-small.css` setting `right: -1.5rem` and `width: 3rem`. These extend ~30px past the parent's right edge but are absolutely positioned (out of flow).

3. **The `.trust__item` elements** use `padding: 1.5rem 1.5rem 1.5rem 3.4rem` (34px left padding for the bullet dot). Content width = 344 - 30 - 34 = 280px. Adequate.

4. **The `.method__steps` and `.principles__list` grids** collapse to `grid-template-columns: 1fr` on mobile. Without `min-width: 0` on the grid items, text content could force items wider than the track.

5. **The `.services__container` with `flex-direction: column`** means `.services__service` flex items default to `min-width: auto`. If any child content has a minimum intrinsic width exceeding the parent, the flex item would expand.

6. **Body has `overflow-x: hidden`** from `reset.css`. This means the browser won't show a horizontal scrollbar, but `scrollWidth` can still report values > `innerWidth`. The ~6px was likely measured programmatically.

---

## 4. Root Cause Analysis

### Confirmed root cause: small-breakpoint title decoration offset

The deterministic Playwright loop reproduced the issue and isolated the cause to section title `::after` decorations on `/perfil` at small-mobile widths.

Evidence from `/perfil` at 360px:

| Probe | Result |
| --- | --- |
| Baseline | `docWidth=366`, `bodyWidth=366`, `innerWidth=360`, `scrollX=6` |
| `*::after { display: none !important }` | `docWidth=360`, `scrollX=0` |
| Only profile title dots disabled | `docWidth=360`, `scrollX=0` |
| Only profile title dots forced to `right: 0 !important` | `docWidth=360`, `scrollX=0` |
| Header overflow clipped | `docWidth=360`, `scrollX=0` |

Cross-route evidence:

| Route | 360px | 375px | 414px |
| --- | --- | --- | --- |
| `/perfil` | overflow 6px | overflow 6px | OK |
| `/` | OK | OK | OK |
| `/contacto` | OK | OK | OK |

The DOM element scan reported zero overflowing real elements, which is consistent with pseudo-element overflow: `getBoundingClientRect()` over normal DOM nodes cannot see generated `::after` boxes.

The relevant CSS is in `src/styles/responsive-small.css`:

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

At the small breakpoint (`html { font-size: 50% }`), this negative right offset lets generated title decorations extend beyond the document width on `/perfil`. Setting the relevant title decorations to `right: 0` removes the overflow without changing DOM structure.

### Superseded hypothesis 1: Flex/Grid children missing `min-width: 0` (ruled out for current symptom)

**Evidence for:**
- `.services__service` inside a flex column container with `flex-basis: 100%` but no explicit `min-width: 0`
- `.method__step` and `.principles__item` inside `grid-template-columns: 1fr` without `min-width: 0`
- Flex/grid items default to `min-width: auto`, preventing shrinking below content intrinsic width
- Long Spanish words (e.g., "automatización", "calificación") at 14px could have intrinsic min-widths that exceed the track width by a few pixels

**Evidence against:**
- The profile hero uses `width: 100%` (not flex-basis), which should constrain regardless
- Service items are stacked vertically at 360px (flex-direction: column)

**Falsifiable prediction:** If this is the cause, adding `min-width: 0` to `.services__service`, `.method__step`, and `.principles__item` at mobile breakpoints will reduce `scrollWidth` to ≤ `innerWidth`.

### Hypothesis 2: `::after` title decoration extending past content box (LOW-MEDIUM confidence)

**Evidence for:**
- In `responsive-small.css`, `.about__title::after` has `right: -1.5rem; width: 3rem` — extends 30px right of the title
- The title has `display: inline-block; padding-right: 1.2rem`
- On mobile with `display: block` parent, the pseudo-element extends past the content box

**Evidence against:**
- `position: absolute` removes from document flow — should not affect `scrollWidth`
- The body has `overflow-x: hidden` which clips visual overflow
- Other routes would likely show similar decoration-based overflow if this were the cause

**Falsifiable prediction:** If this is the cause, temporarily hiding all `::after` pseudo-elements (`*::after { display: none !important }`) will eliminate the overflow on `/perfil` AND on all other routes with decorated titles.

### Hypothesis 3: `profile__headline` or `profile__summary` max-width interaction (LOW confidence)

**Evidence for:**
- `.profile__headline { max-width: 76rem }` = 760px at 50% font-size — exceeds parent width
- `.profile__summary { max-width: 72rem }` = 720px at 50% font-size

**Evidence against:**
- `max-width` is an upper bound, not a forced width
- Content wraps naturally within the parent's content box
- These elements have no `min-width`, `white-space: nowrap`, or `flex-shrink: 0` that would prevent shrinking

**Falsifiable prediction:** If this is the cause, removing `max-width` from these elements will eliminate the overflow.

### Hypothesis 4: Global body overflow-x: hidden masking a real overflow (LOW confidence)

**Evidence for:**
- `body { overflow-x: hidden }` from `reset.css` clips visual overflow
- `.layout__main { overflow: visible }` on mobile allows children to extend past
- The ~6px measurement might come from `scrollWidth > innerWidth` even though no scrollbar appears

**Evidence against:**
- This doesn't explain WHY content overflows — it only explains why it might not be visually visible
- The detection method uses `scrollWidth` which would still detect the issue

**Falsifiable prediction:** This is a contributing factor to the detection method but not the root cause. Setting `overflow-x: hidden` on `.layout__main` would hide the symptom without fixing it.

### Hypothesis 5: Specific long word or element causing text overflow (LOW confidence)

**Evidence for:**
- At 360px with 50% font-size, content width inside profile hero is ~296px
- Spanish words like "automatización" (~196px at 24px headline font) are within bounds
- But compound expressions or specific elements might push slightly

**Evidence against:**
- All text containers allow wrapping (no `white-space: nowrap`)
- Font sizes are reasonable for the available width

**Falsifiable prediction:** If this is the cause, adding `overflow-wrap: anywhere` to profile text elements will eliminate the overflow.

---

## 5. Likely Affected Files/Selectors

| File | Selectors | Why |
|------|-----------|-----|
| `src/styles/responsive-small.css` | `.about__title::after`, `.services__title::after`, `.method__title::after`, `.principles__title::after`, `.trust__title::after` and related small-breakpoint title decorations | Confirmed source of pseudo-element document overflow at 360/375px. |
| `src/styles/primitives.css` | `.title-dot::after`, `.title-dot--sm::after` | Defines the base title decoration, but should remain unchanged unless the small-breakpoint override cannot solve the issue. |
| `src/styles/pages-profile.css` | Profile section title selectors | Consumers of the title-dot pattern; should not need source changes if the responsive override is fixed. |

---

## 6. Recommended Unit 3 Boundary

### In Scope
- Fix horizontal overflow on `/perfil` at 360px and 375px while preserving 414px+ behavior.
- Adjust only the confirmed small-breakpoint title decoration offset, preferably in `src/styles/responsive-small.css`.
- Keep the title dot decoration visible and visually close to the current design.
- Keep `primitives.css` unchanged unless a later phase proves the base primitive must change.
- Preserve page layout, markup, dark mode, reduced motion, and responsive foundation behavior.
- Keep `openspec/changes/profile-mobile-overflow/overflow-check.mjs` as the deterministic regression loop.
- Verify no regression on `/`, `/contacto`, and representative profile sections at small widths.

### Explicit Non-Goals
- **No foundation/primitives changes** unless proven necessary by diagnostic evidence
- **No page redesign** — this is a narrow overflow fix, not a layout change
- **No Tailwind/shadcn migration** — raw CSS only
- **No design-responsividad work** — `openspec/specs/design-responsividad/` remains untouched
- **No broad responsive retuning** — only selectors directly involved in the overflow
- **No dark-mode changes** unless the fix introduces a dark-mode regression
- **No changes to React component structure, routes, or data modules**

---

## 7. Proposed Verification Plan

### 7.1 Automated
1. **Playwright overflow regression:** run `node openspec/changes/profile-mobile-overflow/overflow-check.mjs` against `/perfil`, `/`, and `/contacto` at 360px, 375px, and 414px. Assert `scrollWidth ≤ innerWidth` and `scrollX === 0` for all checked route/viewport combinations after the fix.
2. **Probe regression:** verify that removing the negative title-dot offset, not hiding overflow, is what resolves the bug.
3. **Lint:** `npm run lint` — no new violations.
4. **Build:** `npm run build` — successful with no new warnings.

### 7.2 Manual Smoke
1. **Route/viewport smoke:** `/perfil` at 360px, 375px, 414px, 768px, 1024px, 1440px — no horizontal scroll, content readable.
2. **Compare routes:** `/`, `/contacto`, `/casos-reales` at 360px — no regression.
3. **Dark mode:** Toggle dark mode on `/perfil` at 360px — visual parity.
4. **Reduced motion:** Enable `prefers-reduced-motion: reduce` — no animation regression.
5. **Keyboard focus:** Tab through profile page at 360px — focus indicators visible.

### 7.3 Review Budget Forecast
- **Estimated changed lines:** 5–25 for the CSS fix, plus OpenSpec artifacts.
- **Files likely touched:** `src/styles/responsive-small.css` and OpenSpec change artifacts.
- **Risk:** LOW — isolated pseudo-element positioning fix with clear regression loop.

---

## 8. Next Recommendation

**Proposal** — exploration is sufficient to proceed. The root cause is confirmed: small-breakpoint title decoration pseudo-elements extend document width on `/perfil`. The fix is expected to be very narrow and CSS-only (~5–25 source changed lines). Direct Spec is also viable, but keep the SDD gate sequence unless the user explicitly asks to skip.

---

## 9. Diagnostic Playwright Script

The diagnostic script is saved at `openspec/changes/profile-mobile-overflow/overflow-check.mjs` and should be run during Apply and Verify phases. It provides:
- Deterministic overflow detection at multiple viewports
- Per-element culprit identification with bounding box analysis
- Cross-route comparison to confirm page-specificity
- JSON output for downstream analysis
