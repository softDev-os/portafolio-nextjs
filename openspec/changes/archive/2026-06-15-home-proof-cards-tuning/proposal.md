# Proposal: home-proof-cards-tuning

## Problem Statement and Motivation

The Home page “Casos reales” section currently shows real case-study data, but the cards read more like compact descriptions than strong evidence. The section is meant to function as “Prueba real,” yet the current hierarchy makes the problem paragraph visually dominant while the outcome appears as a softer italic note.

Current card hierarchy:

1. optional metadata badge,
2. case title,
3. problem paragraph,
4. first outcome paragraph,
5. stack pills.

This makes the cards informative but not sufficiently scannable as proof. The user explicitly approved micro JSX because the issue is not only CSS; the markup should communicate the narrative structure of the evidence.

## Intent

Improve the Home proof cards so they read as small, credible proof artifacts without changing case-study data or redesigning the Home page.

The first slice should make each card easier to scan as:

```txt
case type / title
problem
observed result
stack
```

The change should remain tightly scoped to the Home proof section.

## Recommended Scope

Use the Explore recommendation: **micro JSX inside `.home-proof` plus Home-local CSS for card hierarchy**.

### In Scope

- Add explicit visual/semantic labels inside the Home proof cards:
  - `Problema`
  - `Resultado observado`
  - `Stack`
- Wrap current problem, outcome, and stack areas in small card sections.
- Make the first outcome visually read as evidence, not a footnote.
- Preserve existing case-study values from `src/data/projects.ts`.
- Preserve the three flagship cards and their current order.
- Keep the Home proof card grid behavior: three columns desktop, two tablet, one mobile.
- Add Home-local CSS for new card section/label/outcome hierarchy.
- Preserve reduced-motion behavior for `.case-card`.
- Add dark-mode support for any new proof/outcome surfaces.

### Explicit Product/UI Decisions

- Labels are approved for this unit: `Problema`, `Resultado observado`, `Stack`.
- No data changes are approved.
- No fallback metadata badge is approved in this first slice. If a case lacks `metadataLabel`, keep that card without a badge for now to avoid inventing taxonomy.
- Outcome emphasis must remain qualitative and must not imply numeric proof or guarantees not present in the data.

## Non-goals

- No `src/data/projects.ts` changes.
- No rewriting case-study copy.
- No adding/removing cases.
- No changing case order.
- No image usage changes.
- No Home hero, control-room, pipeline, CTA, or layout-shell redesign.
- No route, metadata, data-fetching, or control-flow changes.
- No global primitive changes.
- No responsive foundation changes.
- No global dark-mode architecture changes.
- No Tailwind/shadcn migration.
- No `openspec/specs/design-responsividad/` changes.

## Candidate Affected Files and Responsibilities

| Candidate file | Expected responsibility |
| --- | --- |
| `src/app/page.tsx` | Micro JSX hierarchy only inside `.home-proof` card rendering. Preserve data source, map order, and content values. |
| `src/styles/home.css` | Home-local card hierarchy styling for new sections/labels/outcome emphasis, plus dark/responsive/reduced-motion support if required. |
| `src/data/projects.ts` | Read-only; data must not change. |

## Success Criteria

- Each Home proof card clearly exposes a problem area, an observed result area, and a stack area.
- Existing case data values are unchanged.
- The first outcome becomes visually scannable as proof/evidence.
- The cards remain compact and do not overpower the Home hero.
- The grid remains responsive without horizontal overflow.
- Dark mode remains readable.
- Reduced-motion behavior remains intact.
- Only `src/app/page.tsx` and `src/styles/home.css` source files change.
- Total source diff remains under 150 changed lines unless explicitly approved.

## Review Workload Forecast

Expected implementation forecast:

```txt
60–130 changed source lines
```

Preferred fail-stop:

```txt
Stop before Apply if the source forecast exceeds 150 changed lines or requires touching files outside src/app/page.tsx and src/styles/home.css.
```

Risk of exceeding the 300-line unit budget: low if the scope remains restricted to the Home proof card section.

## Verification Plan

Later Apply/Verify phases should require:

1. `npm run lint`
2. `npm run build`
3. `git diff --check`
4. Static diff guards:
   - only `src/app/page.tsx` and `src/styles/home.css` changed under `src/`,
   - `src/data/projects.ts` unchanged,
   - no route, metadata, content data, or control-flow changes,
   - no hero/control-room/pipeline/CTA source changes unless explicitly approved,
   - no global primitive/responsive/dark-mode files changed,
   - no `openspec/specs/design-responsividad/` changes.
5. Playwright/manual Home smoke:
   - `/` renders the Home heading and “Casos reales” section,
   - exactly three proof cards render from flagship data,
   - each card has visible labels for problem/result/stack,
   - each card renders the current title, problem, first outcome, and stack values,
   - dark mode remains readable,
   - reduced-motion keeps card animation/transition suppressed,
   - mobile 390px and 360px have no horizontal overflow.

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Labels add visible UI copy | Certain | Low | Keep labels short and descriptive; user explicitly accepted micro JSX. |
| Outcome emphasis overclaims evidence | Medium | Medium | Use “Resultado observado” and render existing qualitative outcome only. No metrics or guarantees. |
| Card density increases on mobile | Medium | Medium | Keep labels compact; verify 390px/360px mobile overflow and readability. |
| Fallback badge invents taxonomy | Medium | Low | Do not add fallback badge in first slice. |
| Scope expands into full Home redesign | Low | Medium | Restrict source changes to `.home-proof` JSX/CSS selectors only. |

## Rollback Plan

If the card hierarchy creates visual or readability issues:

1. Revert the `.home-proof` JSX changes in `src/app/page.tsx`.
2. Remove the new `.case-card__section*` / label CSS from `src/styles/home.css`.
3. Preserve existing case-study data and unrelated Home styles.
4. Re-run lint/build and the Home smoke matrix.

## Recommendation for Spec

Proceed to **Spec** for `home-proof-cards-tuning`.

The Spec should define requirements and scenarios for:

- proof-card narrative hierarchy,
- micro JSX constraints,
- no data/content mutation,
- Home-local CSS scope,
- responsive/dark/reduced-motion preservation,
- verification gates and changed-line budget.
