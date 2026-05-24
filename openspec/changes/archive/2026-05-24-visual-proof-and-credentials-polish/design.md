# Design: Visual Proof and Credentials Polish

## Technical Approach

CSS + lightweight markup changes only. Keep existing component architecture and data-model shape. Prioritize Credenciales mobile timeline readability (highest pain), then case-card scan anchors and spacing dedup. Consolidate three overlapping responsive sections into two clean breakpoint blocks.

## Architecture Decisions

### Decision: Timeline vertical stacking at ≤767px (not ≤480px)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Add ≤480px-only column layout | New code, conflicts with existing ≤767px stacking already working in responsive-fixes block | **Rejected** |
| Preserve existing ≤767px vertical stacking and remove conflicting ≤480px horizontal overrides | One source of truth; ≤480px inherits from ≥480px ≤767px cascade | **Chosen** |

**Rationale**: The codebase already has a working `flex-direction: column` timeline at ≤767px (lines 3126–3178). Two earlier blocks (first ≤767px at 1969–2043 and ≤480px at 2212–2245) override it back to horizontal split. Removing those overrides lets the correct vertical stacking cascade down, with zero new CSS. The spec's ≤480px criterion is met because ≤480px is within the ≤767px range.

### Decision: Remove curriculum section from first ≤767px block

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep both blocks and add specificity hacks | Fragile, future edits easily break | **Rejected** |
| Delete lines ~1969–2043 (first block) and keep ~3126–3178 + font-size cascade | Single source of truth; `html {font-size:56%}` at ≤767px scales rem values proportionally | **Chosen** |

**Rationale**: The first ≤767px curriculum section (flex-basis/width horizontal split) is flatly wrong for the intended mobile behavior. The responsive-fixes block already has correct vertical stacking. Font-size declarations removed with it are unnecessary because the 56% base font-size at ≤767px scales all rem values proportionally from desktop base.

### Decision: Certificate gap — two tiers only

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep per-breakpoint gap (3rem → 1.5rem → 1.6rem → 1rem) | Four declarations, three override points for one property | **Rejected** |
| Desktop: 3rem, ≤767px: 1.6rem, remove ≤480px override | Two declarations, ≤480px inherits from ≤767px | **Chosen** |

**Rationale**: Second ≤767px block (responsive fixes) already sets `gap:1.6rem` for certificates. The ≤480px `gap:1rem` is removed as unnecessary — 1.6rem at the ≤480px font scale provides equivalent visual density.

### Decision: Case-card spacing — grid gap as single driver

Remove `margin-top` from `.portfolio__case-card` (currently bundled with `.portfolio__notice` and `.portfolio__next-step`). The parent `.portfolio__case-list` grid already provides `gap:1.6rem`. The margin double-applies, creating ~3.2rem effective spacing. Separate the selector.

### Decision: Metadata badges — inline flow, no layout shift

Add optional `metadataLabel?:string` to `CaseStudy`. Render conditionally as a `<span>` pill before the card title. The parent uses inline-flex/natural flow; absent field → no element → zero shift.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/styles/globals.css` | Modify | Remove curriculum section from first ≤767px block (~1969–2043); remove horizontal timeline overrides from ≤480px (~2212–2245); consolidate certificate gap; remove card margin-top overlap; bump h3 scan-anchor size |
| `src/data/projects.ts` | Modify | Add optional `metadataLabel?: string` to `CaseStudy`; populate on two flagship entries |
| `src/app/portafolio/page.tsx` | Modify | Render metadata badge as inline pill before card title |
| `src/app/curriculum/page.tsx` | None | No markup changes — CSS cascade handles timeline stacking |

## Data Flow

```
projects.ts (CaseStudy.metadataLabel) → portafolio/page.tsx renders <span> badge
                                              → CSS .portfolio__metadata-badge (pill style)

globals.css responsive cascade:
  Desktop base → ≤767px (vertical timeline, 1.6rem gap) → ≤480px (inherits, no re-split)
```

## Interfaces / Contracts

```typescript
// In src/data/projects.ts — additive only
export interface CaseStudy {
  // ...existing fields
  metadataLabel?: string; // new: optional proof-type badge, e.g. "Automatización"
}
```

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Visual | Timeline vertical stacking at 320px, 480px, 768px | Manual viewport resize + screenshot comparison |
| Visual | Certificate gap uniform at ≤480px | Manual check |
| Visual | Case-card scan anchors (h3 prominence) | Manual review |
| Visual | Metadata badge renders inline, absent badge → no shift | Manual check & DevTools layout |
| Build | TypeScript + ESLint | `npm run build` |
| Regression | All viewport widths: 320px, 480px, 768px, 1280px | Manual check for both pages |

## Migration / Rollout

No migration required. Single commit with CSS + data-model changes.

## Open Questions

None.
