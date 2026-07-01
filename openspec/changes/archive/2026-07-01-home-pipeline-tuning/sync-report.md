# Sync Report: home-pipeline-tuning

## Status

Synced.

## Canonical Spec

Created:

```text
openspec/specs/home-pipeline-tuning/spec.md
```

## Source Commit

```text
fa5423e tune(css): refine Home pipeline wrapping
```

## Synced Behavior

The canonical spec records accepted behavior for a CSS-only Home pipeline tuning unit:

- source changes limited to `src/styles/home.css`;
- pipeline remains decorative with existing `aria-hidden` JSX unchanged;
- labels remain readable across desktop/tablet/mobile/small-mobile;
- arrows remain visible and connected to the flow;
- subtle visual bridge to proof cards is allowed;
- dark-mode and reduced-motion behavior preserved;
- strict non-goals for JSX/data/global/responsive/design-responsividad changes;
- lint/build/diff and Home smoke gates required.

## Verification Basis

- Verify report: `openspec/changes/home-pipeline-tuning/verify-report.md`
- Lint/build/diff-check: PASS
- Playwright smoke: PASS
- Source diff: 17 changed lines in `src/styles/home.css`

## Scope Exclusions

Unrelated local work remains out of scope:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
