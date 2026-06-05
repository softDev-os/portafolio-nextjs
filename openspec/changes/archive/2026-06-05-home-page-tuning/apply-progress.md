# Apply Progress: home-page-tuning

## Status

Applied.

## Context

The delegated `sdd-apply` run timed out before writing artifacts or touching files. Parent audited the workspace, confirmed no source changes existed, and applied the bounded one-file CSS change directly according to `tasks.md`.

## Baseline Before Source Edits

Workspace before source edits:

```text
?? openspec/changes/home-page-tuning/
?? openspec/specs/design-responsividad/
```

Expected state: only the active SDD change directory and pre-existing out-of-scope `design-responsividad` directory were untracked.

Baseline commands before source edits:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |

## Source Changes

Only `src/styles/home.css` was changed.

### CTA ownership cleanup

Conservatively deduplicated Home CTA base declarations now owned by `.btn` / `.btn--primary` / `.btn--outline`:

- removed duplicated base layout/shape declarations from `.home-hero__cta-link`:
  - `display: inline-flex`
  - `align-items: center`
  - `gap: 0.6rem`
  - `padding: 1rem 2.4rem`
  - `border-radius: 3.2rem`
  - `text-decoration: none`
  - local base transition
- kept Home-owned CTA typography:
  - `font-size: 1.3rem`
  - `font-weight: 500`
- removed exact `.btn--primary` duplicates from `.home-hero__cta-link--primary`:
  - `background: var(--principal-color)`
  - `color: #0c0d1c`
- kept Home-owned primary glow and hover/focus lift.
- removed exact `.btn--outline` duplicates from `.home-hero__cta-link--secondary`:
  - `border: 2px solid var(--terciario-color)`
  - `color: var(--terciario-color)`
  - `background: transparent`
- kept Home-owned secondary hover/focus fill and lift.

### Dark-mode token normalization

Normalized only exact token aliases documented in Design:

- `#1a1b30` → `var(--color-principal)` for Home dark surfaces.
- `#50b1b1` → `var(--secundario-color)` for handoff/audit accents.
- `#e2e2ec` → `var(--color-titles)` for control-room node labels.

Skipped non-exact local surface/border values as planned:

- `#22253a`
- `#333656`
- `#f5c84a`
- rgba shadows/overlays

### Responsive changes

No responsive changes were made. No overflow/density issue was reproduced during smoke, so optional responsive tasks were skipped.

## Changed Files

```text
src/styles/home.css
openspec/changes/home-page-tuning/apply-progress.md
```

Source diff stat:

```text
src/styles/home.css | 33 +++++++--------------------------
1 file changed, 7 insertions(+), 26 deletions(-)
```

This is under the 150 source-line fail-stop and under the 300-line unit budget.

## Verification Evidence

### Automated checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |

### Static guards

| Guard | Result |
| --- | --- |
| `git diff --name-only -- src` shows only `src/styles/home.css` | PASS |
| `git diff -- src/app/page.tsx` is empty | PASS |
| `src/styles/primitives.css` unchanged | PASS |
| responsive files unchanged | PASS |
| `src/styles/dark-mode.css` unchanged | PASS |
| `src/styles/index.css` unchanged | PASS |
| no route/data/content/dependency/control-flow files changed | PASS |
| no added global `a:focus-visible`, `button:focus-visible`, `a:hover`, or `button:hover` rules | PASS |
| no changes under `openspec/specs/design-responsividad/` | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-page-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke matrix:

- desktop `/` renders heading and two CTAs;
- desktop hero remains a two-column grid;
- both Home CTAs keep visible keyboard focus;
- dark + reduced-motion context keeps control-room, proof card, and pipeline visible;
- reduced motion hides `.control-room__pulse`;
- `390px` and `360px` mobile widths have no horizontal overflow and retain both CTA buttons.

Result:

```text
5 passed
```

## Deviations

- Delegated `sdd-apply` timed out before writing artifacts or changing files. Parent applied the bounded one-file change directly.
- No responsive tweaks were made because smoke did not reproduce overflow/density issues.
- No JSX changes were made.

## Risks / Follow-ups

- CTA visual parity relies on Unit 4 `.btn` and variants remaining unchanged.
- Home primary `:focus-visible` still owns a Home-specific glow that can override the shared focus-ring box-shadow; verification should keep relying on visible outline and account for transition timing.
- Interactive visual review is still useful, but automated smoke passed.

## Next Recommended

Run fresh review / Judgment Day before committing. If clean, commit this source change as the Unit 5 source commit.
