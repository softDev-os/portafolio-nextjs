# Archive Report: brand-surface-alignment

## Status

Archived.

## Executive Summary

Unit `brand-surface-alignment` completed a copy/metadata-only alignment pass
for the highest-visibility public surfaces after Home moved to the broader
Juan Fontalvo practical tech + applied AI brand.

The source commit broadened Home metadata, OpenGraph image copy, Contact copy,
and Blog copy without changing CSS, data files, routes, layout, packages, or
contact mechanics.

## Change Summary

| Field | Value |
| --- | --- |
| Change | `brand-surface-alignment` |
| Source commit | `3ef3f23 tune(content): align public brand surfaces` |
| Source files changed | `src/app/page.tsx`, `src/app/opengraph-image.tsx`, `src/app/contacto/page.tsx`, `src/app/blog/page.tsx` |
| Source changed lines | 77 |
| CSS changes | None |
| Data changes | None |
| Package changes | None |
| Budget | Under 120-line hard cap |

## Phase Artifacts Preserved

- explore.md
- proposal.md
- specs/brand-surface-alignment/spec.md
- design.md
- tasks.md
- apply-progress.md
- verify-report.md
- sync-report.md
- archive-report.md (this file)

## Canonical Spec

- `openspec/specs/brand-surface-alignment/spec.md` — created and remains in
  place.

## Verification Summary

- `git diff --check`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS; existing Edge runtime static-generation warning
  remains.
- `lens_diagnostics mode=all severity=error`: PASS in parent session.
- Fresh review: `review-readability` completed. Final warning was only the
  known unrelated `.gitignore` drift.
- Source commit: `3ef3f23`.

## Scope Compliance

- Copy/metadata-only public brand alignment.
- Touched only Home metadata, OpenGraph copy, Contact copy, and Blog copy.
- No CSS, data, package, route, or layout changes.
- `src/app/credenciales/page.tsx` was deliberately deferred.
- Blog article data and case-study data were not changed.
- Contact URLs, phone/email, `target`, `rel`, and `primarySalesContact`
  behavior remain unchanged.

## Implementation Note

`src/app/contacto/page.tsx` now has a small documented `IsolatedAnchor` wrapper.
This was added after pi-lens reported blocking `no-nested-links` false positives
for valid containers with literal anchors. Runtime anchor behavior is preserved.

## Unrelated Local Work Excluded

The following local items were intentionally excluded from this unit:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
