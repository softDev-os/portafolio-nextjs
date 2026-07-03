# Sync Report: home-hero-message-tuning

## Status

Synced.

## Canonical Spec

Created:

```text
openspec/specs/home-hero-message-tuning/spec.md
```

## Source Commit

```text
84d6495 tune(home): broaden hero brand message
```

## Synced Behavior

The canonical spec records accepted behavior for a JSX-only Home hero message tuning unit:

- Home hero positions Juan Fontalvo as a broader practical tech brand;
- message is not limited to AI workflows for businesses;
- name and primary proof CTA remain preserved;
- secondary CTA is broader and contact-oriented;
- no CSS fallback was needed;
- proof cards, control-room, and pipeline remain untouched;
- responsive no-overflow behavior verified at 390px and 360px.

## Verification Basis

- Verify report: `openspec/changes/home-hero-message-tuning/verify-report.md`
- Lint/build/diff-check: PASS
- Playwright smoke: PASS
- Fresh review: PASS
- Source diff: 12 changed lines in `src/app/page.tsx`

## Scope Exclusions

Unrelated local work remains out of scope:

- `.gitignore`
- `cv-refactor-scout.md`
- `docs/JUAN-FONTALVO-ROADMAP.md`
- `openspec/changes/private-cv-redesign/`
- `openspec/specs/design-responsividad/`
