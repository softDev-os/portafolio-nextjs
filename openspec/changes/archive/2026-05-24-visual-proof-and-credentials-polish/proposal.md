# Proposal: Visual Proof and Credentials Polish

## Intent

Improve visual hierarchy, scanability, and mobile legibility for `Casos reales` (`/portafolio`) and `Credenciales` (`/curriculum`) while preserving the existing proof-first narrative and information architecture. The Credenciales page is the higher-priority pain point on smaller viewports.

## Scope

### In Scope
- Timeline responsive layout: break the left-year/right-description split on narrow viewports for a readable stacked layout.
- Certificate and capability card spacing rhythm: consistent gaps, visual grouping, and breathing room.
- Case-card scan anchors: lightweight visual hooks (labels, badges, section markers) for faster skimming.
- Duplicate breakpoint rules consolidation: deduplicate media-query blocks in globals.css.
- Data-model support (projects.ts, experience.ts): light shape adjustments to enable the visual hooks above.

### Out of Scope
- Navigation or page architecture changes (routes, IA, sidebar).
- Content rewrites or data restructuring beyond metadata labels.
- Template redesign or theme changes.
- New page sections or capabilities.

## Capabilities

### New Capabilities
None — this change introduces no new spec-level capabilities.

### Modified Capabilities
None — existing spec requirements (case-study-portfolio, consultant-positioning, profile-credentials-ia) are unaffected. Only visual presentation changes.

## Approach

Use Approach 2 from exploration (targeted markup + CSS polish). Keep the existing component and data architecture. Add lightweight semantic wrappers and CSS utility classes for scanability hooks. Prioritize Credenciales mobile readability first, then case-card polish. Consolidate duplicated responsive overrides into maintainable breakpoint blocks.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/curriculum/page.tsx` | Modified | Timeline stacking, card grouping, spacing rhythm |
| `src/app/portafolio/page.tsx` | Modified | Case-card scan anchors and section markers |
| `src/styles/globals.css` | Modified | Responsive overrides dedup, spacing utility classes |
| `src/data/projects.ts` | Modified | Optional metadata labels for proof signals |
| `src/data/experience.ts` | Modified | Minor density adjustments for mobile fit |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Duplicated breakpoint rules cause regression | Medium | Consolidate in one pass, review rendered mobile layout |
| Over-styling dilutes premium consultant feel | Low | Apply minimal token changes; no theme shift |
| Reduced density hides evidence clarity | Low | Preserve content hierarchy; add visual grouping, not removal |

## Rollback Plan

Revert the single commit. This is a CSS + markup-only change with no data-migration or build-config impact.

## Dependencies

None.

## Success Criteria

- [ ] Credenciales timeline renders as a readable stacked layout on viewports ≤ 480px wide (no horizontal split).
- [ ] Certificate/capability cards have consistent spacing and visual grouping across all breakpoints.
- [ ] Case cards on the portfolio page show scanable section labels without expanding card height.
- [ ] No visual regressions on viewport widths 320px, 768px, and 1280px for both pages.
- [ ] `npm run build` succeeds with zero errors.
