# Explore: home-proof-cards-tuning

## Status

Exploration complete for a focused Home proof-card tuning unit.

## Executive Summary

The Home “Casos reales” section currently works as a compact summary, but it does not yet read as strong proof. The cards show real case data, but the visual and markup hierarchy makes the problem statement feel more prominent than the result/evidence. A small SDD unit should improve the cards into more scannable proof artifacts using **micro JSX inside `.home-proof` only** plus Home-local CSS.

Recommended direction: create a clearer card hierarchy around:

```txt
case type / title
problem
observed result
stack
```

No data values need to change. No Home hero, control-room, pipeline, global primitive, or route behavior should be touched.

## Current JSX Structure

Source: `src/app/page.tsx`.

Current section:

```tsx
<section className="home-proof" aria-label="Casos de estudio">
  <h2 className="home-proof__heading">Casos reales</h2>
  <div className="home-proof__grid">
    {flagshipCaseStudies.map((study) => (
      <article key={study.id} className="case-card">
        <div className="case-card__meta">
          {study.metadataLabel && (
            <span className="case-card__badge">{study.metadataLabel}</span>
          )}
          <h3 className="case-card__title">{study.title}</h3>
        </div>
        <p className="case-card__problem">{study.problem}</p>
        {study.outcomes.length > 0 && (
          <p className="case-card__outcome">{study.outcomes[0]}</p>
        )}
        <ul className="case-card__stack" aria-label="Tecnologías utilizadas">
          {study.stack.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    ))}
  </div>
</section>
```

Current data shape from `src/data/projects.ts` includes:

- `metadataLabel` optional;
- `title`;
- `problem`;
- `outcomes[]`;
- `stack[]`;
- more fields available but not currently rendered on the Home cards (`audience`, `solution`, `evidenceNote`, `image`).

## Current CSS Ownership

Primary selectors in `src/styles/home.css`:

- `.home-proof`
- `.home-proof__heading`
- `.home-proof__grid`
- `.case-card`
- `.case-card__meta`
- `.case-card__badge`
- `.case-card__title`
- `.case-card__problem`
- `.case-card__outcome`
- `.case-card__stack`
- `.case-card__stack li`

Dark-mode selectors:

- `[data-theme="dark"] .case-card`
- `[data-theme="dark"] .case-card:hover`
- `[data-theme="dark"] .case-card__badge`
- `[data-theme="dark"] .case-card__stack li`

Responsive selectors:

- `@media (max-width: 1023px)` sets `.home-proof__grid` to two columns.
- `@media (max-width: 767px)` sets `.home-proof__grid` to one column and reduces `.case-card` padding.
- Small breakpoint currently adjusts `.home-proof__heading` only.

Reduced motion:

- `.case-card` animation and transition are suppressed in the existing Home reduced-motion block.

## Findings

### 1. The cards summarize, but do not frame evidence strongly

Current hierarchy:

1. optional badge,
2. title,
3. problem paragraph,
4. first outcome paragraph,
5. stack tags.

This makes the problem text the largest body block and the outcome a softer italic supporting note. For a “Prueba real” section, this undersells the evidence. The result should be at least as scannable as the problem.

### 2. Outcome is visually underweighted

`.case-card__outcome` uses:

- smaller font than the title and close to problem size;
- `color: var(--color-subtitles)`;
- italic style.

That reads as a footnote, not proof. The first outcome is the strongest evidence line available without changing data.

### 3. The card lacks explicit section labels

The markup does not tell the user what the paragraphs represent. A reader must infer that the first paragraph is a problem and the second paragraph is a result.

Micro labels such as “Problema” and “Resultado observado” would improve scan hierarchy without changing the data source or content claims.

### 4. Metadata badge inconsistency is visible

`metadataLabel` is optional. Case 2 currently has no badge, so the top rhythm can look inconsistent. This can be handled with layout/CSS or by rendering a fallback label from existing data semantics, but changing data is not needed.

Explore recommendation: do not change `src/data/projects.ts`; if a fallback is desired, use local rendering logic in `src/app/page.tsx` only if approved in Design.

### 5. Stack tags are useful but should remain supporting evidence

The stack supports credibility but should not be the dominant closing element. It can remain as a compact supporting row, optionally with a tiny label like “Stack”.

### 6. This is the right place for micro JSX

Unlike the previous Home tuning unit, this issue is structural/narrative. CSS-only can increase visual weight, but it cannot label paragraphs semantically without pseudo-content hacks. Micro JSX is appropriate here if limited to `.home-proof` card internals.

## Candidate Micro JSX Direction

Recommended card internal structure:

```txt
article.case-card
├─ .case-card__header
│  ├─ .case-card__badge / fallback small label
│  └─ h3.case-card__title
├─ .case-card__section
│  ├─ .case-card__section-label: Problema
│  └─ p.case-card__problem
├─ .case-card__section.case-card__section--outcome
│  ├─ .case-card__section-label: Resultado observado
│  └─ p.case-card__outcome
└─ .case-card__stack-block
   ├─ .case-card__section-label: Stack
   └─ ul.case-card__stack
```

Potential fallback label for missing `metadataLabel`:

```txt
study.metadataLabel ?? "Operación"
```

This does not change source data, but it does introduce a local UI label. Proposal/Spec should decide whether the fallback label is acceptable.

## Candidate CSS Direction

Home-local CSS only:

- Rename/augment `.case-card__meta` to `.case-card__header` or keep both for minimal diff.
- Add `.case-card__section` and `.case-card__section-label`.
- Make `.case-card__outcome` more proof-like:
  - non-italic or less footnote-like;
  - stronger color/contrast;
  - subtle left border or inset surface;
  - maybe `background: rgba(247, 185, 53, 0.08)` in light mode.
- Keep `.case-card__problem` readable but less dominant.
- Keep stack pills compact and wrapped.
- Preserve existing grid breakpoints.
- Preserve reduced-motion behavior.
- Add dark-mode support only for new proof/outcome surfaces if needed.

## Recommended First Slice

Change name:

```txt
home-proof-cards-tuning
```

Scope:

- `src/app/page.tsx` — micro JSX only inside `.home-proof` cards.
- `src/styles/home.css` — only `.home-proof*`, `.case-card*`, and corresponding Home-local dark/responsive/reduced-motion selectors if necessary.

Recommended changes:

1. Add explicit section labels for problem, result, and stack.
2. Make the first outcome visually read as evidence rather than a footnote.
3. Preserve the 3/2/1 grid behavior.
4. Keep all current case-study data values unchanged.
5. Do not touch Home hero, control-room, pipeline, CTA, global primitives, or data files.

## Out of Scope

- No `src/data/projects.ts` changes.
- No new case studies.
- No copy/content rewrites to case data.
- No Home hero/control-room/pipeline changes.
- No route/metadata/control-flow changes.
- No global primitive or design-system changes.
- No responsive foundation changes.
- No global dark-mode architecture migration.
- No Tailwind/shadcn.
- No `openspec/specs/design-responsividad/` changes.

## Likely Files

| File | Expected role |
| --- | --- |
| `src/app/page.tsx` | Micro JSX hierarchy inside `.home-proof` card rendering only. |
| `src/styles/home.css` | Visual hierarchy for proof card sections, labels, outcome emphasis, stack support, dark/responsive if needed. |
| `src/data/projects.ts` | Read-only. |

## Review Budget Forecast

Expected source diff:

```txt
60–130 changed lines
```

Preferred fail-stop:

```txt
Stop before Apply if source forecast exceeds 150 changed lines or touches files outside page.tsx/home.css without explicit approval.
```

Risk of exceeding 300 lines: low if the unit stays focused.

## Verification Recommendations

Later Verify should require:

- `npm run lint`
- `npm run build`
- `git diff --check`
- Static guards:
  - only `src/app/page.tsx` and `src/styles/home.css` source files changed;
  - no `src/data/projects.ts` changes;
  - no route/metadata/control-flow changes;
  - no hero/control-room/pipeline selector changes unless explicitly approved;
  - no `openspec/specs/design-responsividad/` changes.
- Playwright/manual smoke on `/`:
  - proof heading renders;
  - all three cards render;
  - each card exposes problem/result/stack labels;
  - first outcome is visible when present;
  - dark-mode proof cards remain readable;
  - mobile 390px/360px has no horizontal overflow;
  - reduced-motion still suppresses card animation/transition.

## Risks and Unknowns

- Adding labels changes visible UI copy. This is small but should be accepted explicitly in Proposal/Spec.
- A fallback badge for missing metadata could be useful, but it introduces a new label not present in data. Decide before implementation.
- Outcome emphasis must not imply quantitative proof beyond current qualitative case data.
- The design should avoid making cards too dense on mobile.

## Next Recommended

Proceed to `sdd-proposal` for `home-proof-cards-tuning`, with explicit approval of micro JSX labels and no data changes.

## Skill Resolution

Parent-authored artifact after delegated `sdd-explore` timed out without writing files. The relevant frontend-design/accessibility/Next/React guidance was available in session context, and this Explore remains bounded to the known Home proof-card source files.
