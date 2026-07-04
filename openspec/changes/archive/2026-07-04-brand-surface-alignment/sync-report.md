# Sync Report: brand-surface-alignment

## Status

Synced.

## Canonical Spec

Created:

```text
openspec/specs/brand-surface-alignment/spec.md
```

## Source Commit

```text
3ef3f23 tune(content): align public brand surfaces
```

## Synced Behavior

The canonical spec records accepted behavior for aligning public brand surfaces
with the broader Juan Fontalvo practical tech + applied AI positioning:

- Home metadata presents practical technology, software, and applied AI;
- OpenGraph image copy presents the broad brand in Spanish-forward language;
- Contact copy accepts broader tech, equipment, project, software,
  automation, and AI inquiries while preserving WhatsApp-first mechanics;
- Blog copy frames the page as a practical tech, PCs/laptops, AI,
  software, automation, and real-solutions content hub;
- CSS, data files, route mechanics, layout, package files, credentials,
  roadmap, private CV, and design-responsividad artifacts remain out of scope.

## Verification Basis

- Verify report:
  `openspec/changes/brand-surface-alignment/verify-report.md`
- Source commit: `3ef3f23`
- `git diff --check`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS with existing Edge runtime warning.
- `lens_diagnostics mode=all severity=error`: PASS in parent session after
  `IsolatedAnchor` remediation.
- Fresh review: `review-readability` ran twice; final finding was only the
  known unrelated `.gitignore` drift.
- Source diff: 77 changed lines across four allowed files, under the
  120-line hard cap.

## Scope Exclusions

Unrelated local work remains out of scope:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`

## Notes

`src/app/contacto/page.tsx` includes a documented `IsolatedAnchor` wrapper.
It preserves anchor behavior while avoiding a known false-positive in the
local pi-lens `no-nested-links` rule, which currently treats containers like
`<div><a /></div>` as invalid.
