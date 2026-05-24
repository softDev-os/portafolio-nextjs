# Tasks: Visual Proof and Credentials Polish

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~145 (±15) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

```
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low
```

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | CSS timeline, spacing, and scan-anchor polish | PR 1 (single) | Standalone; all CSS + data-model + markup in one PR |

## Phase 1: Data Model — Evidence Metadata Labels

- [x] 1.1 Add optional `metadataLabel?: string` to `CaseStudy` interface in `src/data/projects.ts`
- [x] 1.2 Populate `metadataLabel` on two flagship entries (e.g., `"Automatización"` on WhatsApp lead intake, `"IA Aplicada"` on Agent Memory)

## Phase 2: CSS Polish — Timeline, Spacing, Scan Anchors

- [x] 2.1 Remove first `≤767px` curriculum block (lines ~1969–2043) from `src/styles/globals.css` — this block's horizontal split overrides the correct vertical stacking in responsive-fixes
- [x] 2.2 Remove `≤480px` timeline horizontal overrides (lines ~2212–2245) from `src/styles/globals.css` — `≤480px` now inherits vertical stacking from the `≤767px` responsive-fixes block
- [x] 2.3 Consolidate certificate gap: keep `gap:1.6rem` at `≤767px` responsive-fixes block; remove the `gap:1rem` override at `≤480px` (lines ~3060–3065 area — verify exact location)
- [x] 2.4 Split `.portfolio__notice, .portfolio__case-card, .portfolio__next-step` combined selector (line ~872): give `.portfolio__case-card` its own rule *without* `margin-top` so the parent grid `gap:1.6rem` is the sole spacing driver
- [x] 2.5 Bump `.portfolio__case-grid h3` from `font-size:1.25rem` to a more prominent value (e.g., `1.35rem`) for stronger scan-anchor presence
- [x] 2.6 Add `.portfolio__metadata-badge` pill style: inline-flex, ~0.35rem/0.9rem padding, `999px` radius, matching the `.portfolio__case-index` color palette

## Phase 3: Page Integration — Badge Rendering

- [x] 3.1 In `src/app/portafolio/page.tsx`, render an optional `<span className="portfolio__metadata-badge">` before the `<h2 className="portfolio__case-title">` on each case card, conditionally gated on `caseStudy.metadataLabel`

## Phase 4: Verification

- [x] 4.1 Run `npm run build` — must pass with zero TS/ESLint errors
- [x] 4.2 Visual check at 320px, 480px, 768px, 1280px on `/curriculum`: timeline is vertical stacked everywhere ≤767px, divider visible, no horizontal split at 480px
- [x] 4.3 Visual check at same viewports on `/portafolio`: case-card spacing uniform, h3 headings prominent, metadata badge renders inline, absent badge causes no layout shift
- [x] 4.4 Visual check at 480px: certificate gap consistent with `1.6rem`, card padding uniform
