# Tasks: home-control-room-tuning

## Review Workload Forecast

| Field | Value |
| --- | --- |
| Estimated source diff | 55–85 changed lines |
| Hard source cap | 100 changed lines |
| Allowed source file | `src/styles/home.css` only |
| Allowed source selectors | `.control-room*`, `[data-theme="dark"] .control-room*`, responsive `.control-room*` |
| 300-line unit budget risk | Medium-Low |
| Chained PRs recommended | No |
| Decision needed before Apply | No, unless forecast exceeds 100 source lines |

## Tasks

### 0. Pre-apply safety

- [x] T0.1 Check `git status --short` before source edits.
- [x] T0.2 Confirm unrelated local work remains out of scope and unstaged:
  - `.gitignore`
  - `cv-refactor-scout.md`
  - `docs/JUAN-FONTALVO-ROADMAP.md`
  - `openspec/changes/private-cv-redesign/`
  - `openspec/specs/design-responsividad/`
- [x] T0.3 Run baseline `npm run lint` and `npm run build`; record existing Edge runtime warning if present.
- [x] T0.4 Reconfirm Apply source scope:
  - only `src/styles/home.css`;
  - no JSX;
  - no content/copy/icons/data/routes;
  - no proof-card/pipeline/CTA/global/foundation changes.
- [x] T0.5 Stop and ask before implementation if forecast exceeds 100 source changed lines.

### 1. Base control-room panel polish

- [x] T1.1 Update `.control-room` only:
  - add `overflow: hidden;`
  - add `isolation: isolate;`
  - replace flat background with layered radial + linear background;
  - tune border color to low-alpha gold;
  - tune box shadow with larger outer depth and subtle inset highlight.
- [x] T1.2 Update `.control-room::before` only:
  - set height to `4px`;
  - tune gradient midpoint;
  - add subtle gold glow.
- [x] T1.3 Update `.control-room__label` only:
  - set color to `var(--terciario-color)`.
- [x] T1.4 Update `.control-room__grid` only:
  - add `isolation: isolate;`
  - do not change the 2x2 grid geometry.

### 2. Node hierarchy and status affordance

- [x] T2.1 Update `.control-room__node` only:
  - add `min-width: 0;`
  - replace flat background with subtle vertical layered background;
  - tune border color;
  - add low-noise node shadow and inset highlight.
- [x] T2.2 Update `.control-room__node::after` only:
  - add low-alpha glow ring for primary/gold status dots;
  - do not change animation name/timing.
- [x] T2.3 Update `.control-room__node--handoff::after, .control-room__node--audit::after` only:
  - add secondary/teal low-alpha glow ring;
  - preserve existing delayed pulse behavior.
- [x] T2.4 Update `.control-room__icon` only:
  - add subtle primary/gold text-shadow.
- [x] T2.5 Update handoff/audit icon selector only:
  - add subtle secondary/teal text-shadow;
  - preserve existing icon color behavior.
- [x] T2.6 Update `.control-room__node-desc` only:
  - tune line-height to `1.4`.

### 3. Connector, pulse, and footer polish

- [x] T3.1 Update `.control-room__line` only:
  - replace flat line background with low-alpha gold/teal gradient;
  - add subtle glow;
  - do not change connector geometry.
- [x] T3.2 Update `.control-room__pulse` only:
  - add glow;
  - do not change animation geometry/timing.
- [x] T3.3 Update `.control-room__footer` only:
  - add low-alpha gold background;
  - add rounded corners;
  - tune border-top color;
  - do not change footer text.

### 4. Dark-mode parity

- [x] T4.1 Update existing `[data-theme="dark"] .control-room` only:
  - mirror layered panel background;
  - tune border color;
  - tune shadow/inset highlight;
  - preserve selector location in `home.css`.
- [x] T4.2 Update existing `[data-theme="dark"] .control-room__node` only:
  - mirror layered dark node background;
  - tune border color;
  - add shadow/inset highlight.
- [x] T4.3 Update existing `[data-theme="dark"] .control-room__footer` only:
  - add low-alpha gold background;
  - tune border-top color.
- [x] T4.4 Preserve existing dark selectors for node accent colors, icon colors, labels, and lines unless verification proves they conflict.
- [x] T4.5 Do not edit global dark-mode files.

### 5. Responsive compactness

- [x] T5.1 In existing `@media (max-width: 767px)`, update `.control-room__node` only:
  - compact padding to `1rem 0.85rem`.
- [x] T5.2 In existing `@media (max-width: 767px)`, update `.control-room__node-label` only:
  - set font-size to `1.05rem`.
- [x] T5.3 In existing `@media (max-width: 767px)`, update `.control-room__node-desc` only:
  - set font-size to `0.95rem`.
- [x] T5.4 In existing `@media (max-width: 480px)`, add control-room-only compact rules:
  - `.control-room { padding: 1.2rem; }`
  - `.control-room__label { margin-bottom: 1.2rem; }`
  - `.control-room__grid { gap: 0.7rem; }`
  - `.control-room__node { padding: 0.9rem 0.75rem; }`
  - `.control-room__icon { font-size: 1.35rem; }`
  - `.control-room__node-label { font-size: 1rem; }`
  - `.control-room__node-desc { font-size: 0.9rem; }`
- [x] T5.5 Do not change `.control-room__grid` to one column.

### 6. Scope guards after editing

- [x] T6.1 Confirm `git diff --name-only -- src` returns only `src/styles/home.css`.
- [x] T6.2 Confirm `git diff -- src/app/page.tsx` is empty.
- [x] T6.3 Confirm source diff does not touch:
  - `.home-hero__left`
  - CTA selectors
  - `.home-proof*`
  - `.case-card*`
  - `.home-pipeline*`
  - global primitives/foundation files
  - data/package files
  - `openspec/specs/design-responsividad/`
- [x] T6.4 Confirm source changed lines stay below 100.

### 7. Verification

- [x] T7.1 Run `npm run lint`.
- [x] T7.2 Run `npm run build`.
- [x] T7.3 Run `git diff --check`.
- [x] T7.4 Run or manually perform Home smoke:
  - desktop `/`: control-room visible;
  - four nodes visible;
  - lines/pulses present and contained;
  - `390px` no horizontal overflow;
  - `360px` no horizontal overflow;
  - dark mode readable;
  - reduced-motion hides pulses and disables status-dot animation.

### 8. Fresh review before commit

- [x] T8.1 Review final source diff against Proposal, Spec, Design, and Tasks.
- [x] T8.2 Use a fresh review lens if subagents are available; otherwise record why inline review is acceptable.
- [x] T8.3 Confirm unrelated local work remains unstaged/out of scope.

### 9. Commit strategy

- [x] T9.1 If Apply/Verify/Review pass, commit source as one focused commit. Suggested message:
  - `tune(css): enhance Home control room visual`
- [ ] T9.2 Then Sync/Archive OpenSpec artifacts as a separate docs commit.
- [x] T9.3 Do not stage unrelated `.gitignore`, CV artifacts, roadmap, private CV SDD, or `design-responsividad`.

### 10. Rollback

- [ ] T10.1 Roll back by restoring only `src/styles/home.css`.
- [ ] T10.2 Re-run lint/build/diff-check and Home smoke after rollback.
