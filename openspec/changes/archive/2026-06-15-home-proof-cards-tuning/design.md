# Design: home-proof-cards-tuning

## Status

Design complete for the focused Home proof-card tuning slice.

## Architecture Overview

The Home proof-card UI is owned by the Home route and Home stylesheet:

- `src/app/page.tsx` owns the rendered `.home-proof` card markup and reads the existing flagship case-study data with `getFlagshipCaseStudies()`.
- `src/styles/home.css` owns `.home-proof*` and `.case-card*` presentation, including Home-local dark-mode, responsive, and reduced-motion support for those selectors.
- `src/data/projects.ts` remains read-only and is not part of the implementation surface.

The current issue is structural as well as visual: users need to see which line is the problem, which line is observed evidence, and which items are supporting stack context. CSS alone cannot add reliable visible text labels without pseudo-content that would be weaker for accessibility, localization, and maintenance. A small JSX change is therefore justified, but it is bounded to the internals of each `.home-proof` `.case-card` only.

The Home page remains a Next.js App Router Server Component. The change must not add client state, browser APIs, new imports, route behavior, metadata changes, data-fetching changes, or component extraction.

## Exact JSX Structure Plan

### Current shape

```tsx
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
```

### Planned shape

```tsx
<article key={study.id} className="case-card">
  <header className="case-card__header">
    {study.metadataLabel && (
      <span className="case-card__badge">{study.metadataLabel}</span>
    )}
    <h3 className="case-card__title">{study.title}</h3>
  </header>

  <div className="case-card__section">
    <span className="case-card__section-label">Problema</span>
    <p className="case-card__problem">{study.problem}</p>
  </div>

  {study.outcomes.length > 0 && (
    <div className="case-card__section case-card__section--outcome">
      <span className="case-card__section-label">Resultado observado</span>
      <p className="case-card__outcome">{study.outcomes[0]}</p>
    </div>
  )}

  <div className="case-card__section case-card__section--stack">
    <span className="case-card__section-label">Stack</span>
    <ul className="case-card__stack" aria-label="Tecnologías utilizadas">
      {study.stack.slice(0, 3).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
</article>
```

### Class decisions

- Rename `.case-card__meta` to `.case-card__header` in JSX and CSS because the wrapper owns the card heading area, not only metadata.
- Keep `.case-card`, `.case-card__badge`, `.case-card__title`, `.case-card__problem`, `.case-card__outcome`, `.case-card__stack`, and `.case-card__stack li`.
- Add `.case-card__section` for each labeled content block.
- Add `.case-card__section-label` for the visible labels.
- Add `.case-card__section--outcome` to create the observed-result emphasis surface.
- Add `.case-card__section--stack` to keep stack tags as supporting evidence and preserve bottom alignment.
- Do not introduce a fallback metadata badge. Existing badges render only when `study.metadataLabel` exists.

### Data mutation guarantee

The implementation must render the same `study.title`, `study.problem`, `study.outcomes[0]`, and `study.stack.slice(0, 3)` values. It must not mutate the `study` object, change case order, add fallback taxonomy, rewrite copy, or touch `src/data/projects.ts`.

## Exact CSS Design

All CSS work stays in `src/styles/home.css` and is limited to `.home-proof*`, `.case-card*`, and directly related Home-local dark/responsive/reduced-motion blocks.

### Existing selectors to modify

- `.case-card`
  - Add internal `gap` for the new labeled sections.
  - Keep current background, border, radius, padding, opacity, animation, hover transition.
- `.case-card__meta`
  - Replace with `.case-card__header`.
- `.case-card__badge`
  - Keep existing visual treatment; remove or neutralize `margin-bottom` if header gap owns spacing.
- `.case-card__problem`
  - Keep readable body treatment, but remove paragraph-owned bottom margin so section spacing is centralized.
- `.case-card__outcome`
  - Change from italic/subtitle footnote treatment to proof emphasis: normal style, stronger color, slightly stronger weight, no paragraph-owned bottom margin.
- `.case-card__stack`
  - Keep flex/wrap tag layout, but remove `margin-top: auto`; bottom alignment moves to `.case-card__section--stack`.
- Dark-mode selectors for `.case-card`, `.case-card:hover`, `.case-card__badge`, and `.case-card__stack li`
  - Preserve existing behavior and add only new label/outcome surface support.
- Responsive selectors at `max-width: 1023px`, `max-width: 767px`, and optionally `max-width: 480px`
  - Preserve current grid behavior and add density tuning only for `.case-card*` if needed.

### New selectors and intended properties

- `.case-card__header`
  - `display: flex; flex-direction: column; align-items: flex-start; gap: 0.6rem;`
  - Small bottom spacing only if needed after card-level `gap` is tested.
- `.case-card__section`
  - `display: flex; flex-direction: column; gap: 0.45rem;`
  - Optional subtle separators via `.case-card__section + .case-card__section` using a light top border and padding.
- `.case-card__section-label`
  - Small visible uppercase label.
  - Use `font-size` around `0.9rem` to `0.95rem`, `font-weight: 700`, `letter-spacing: 0.1em`, `text-transform: uppercase`, and `color: var(--principal-color)`.
- `.case-card__section--outcome`
  - Proof surface using a subtle gold-tinted background, gold border/left accent, rounded corners, and compact padding.
  - Intended light-mode treatment: `background: rgba(247, 185, 53, 0.08)`, `border: 1px solid rgba(247, 185, 53, 0.18)`, stronger left border, `border-radius: 1rem`, `padding` around `0.9rem 1rem`.
- `.case-card__section--stack`
  - `margin-top: auto` to keep stack as the supporting footer when card heights differ.
- Dark additions:
  - `[data-theme="dark"] .case-card__section + .case-card__section` for separator contrast if separators are used.
  - `[data-theme="dark"] .case-card__section--outcome` for readable gold-tinted surface and border.
  - `[data-theme="dark"] .case-card__outcome` only if the existing tokens do not provide enough contrast.

### Selectors explicitly not touched

Do not modify Home hero, control-room, pipeline, CTA, page shell, legacy section, global primitive, or responsive foundation selectors, including:

- `.content__page--home*`
- `.home-hero*`
- `.control-room*`
- `.home-pipeline*`
- `.section*`
- `.btn*`, focus primitive selectors, global `a`/`button` selectors
- Any selector outside `src/styles/home.css`

## Responsive Design

The existing grid behavior remains unchanged:

- Desktop: `.home-proof__grid { grid-template-columns: repeat(3, 1fr); }`
- Tablet (`max-width: 1023px`): two columns.
- Mobile (`max-width: 767px`): one column.

Mobile density strategy:

- Keep labels short and uppercase so they scan without adding long paragraphs.
- Use compact section gaps and outcome padding on mobile.
- Preserve `flex-wrap` for stack pills.
- Avoid fixed widths and avoid `white-space: nowrap` on card labels/content.
- Verify 390px and 360px viewports for no card-induced horizontal overflow.

## Dark Mode and Reduced Motion

Dark mode must remain Home-local for this slice:

- Existing `.case-card` dark background/border behavior stays.
- Add dark support only for new separators and the outcome proof surface if needed.
- Keep label color on `var(--principal-color)` unless contrast testing requires a Home-local adjustment.
- Do not migrate dark-mode architecture or edit global dark-mode files.

Reduced motion must preserve current behavior:

- `.case-card` remains in the existing Home `prefers-reduced-motion: reduce` block.
- No new animations or transform-based motion are introduced for labels or outcome surfaces.
- The existing reduced-motion block continues to set `.case-card` animation/transition to none.

## Accessibility and Semantics

- Labels are visible text, not pseudo-content and not `aria-hidden`.
- `article` semantics are preserved for each case card.
- `h3.case-card__title` remains the card heading.
- `ul.case-card__stack` / `li` list semantics are preserved for stack values.
- The stack list keeps its current `aria-label="Tecnologías utilizadas"`; the visible `Stack` label supplements scanability.
- `header.case-card__header` is acceptable inside `article` and clarifies the card heading area.
- The outcome label `Resultado observado` intentionally avoids overclaiming; the UI must not add metrics, guarantees, or stronger claims than the existing qualitative outcome text.

## Implementation File Plan and Changed-Line Forecast

Future Apply should touch only:

| File | Planned role | Forecast |
| --- | --- | ---: |
| `src/app/page.tsx` | Micro JSX hierarchy inside `.home-proof` `.case-card` rendering only | 25-45 changed lines |
| `src/styles/home.css` | Scoped `.case-card*` hierarchy, labels, outcome surface, dark/responsive support | 55-85 changed lines |

Total source forecast: **80-130 changed lines**.

Fail-stop recommendation: pause before Apply if the forecast rises above 150 changed source lines or requires source changes outside `src/app/page.tsx` and `src/styles/home.css`.

## Verification Design

Automated verification for Apply/Verify:

1. `npm run lint`
2. `npm run build`
3. `git diff --check`

Static diff guards:

- Only `src/app/page.tsx` and `src/styles/home.css` may change under `src/`.
- `src/data/projects.ts` must remain unchanged.
- No route exports, metadata, imports, data fetching, broad render control flow, global primitives, responsive foundation files, or `openspec/specs/design-responsividad/` changes.
- No Home hero, control-room, pipeline, CTA, or global focus/button selector changes.

Playwright or manual smoke on `/`:

- Home route renders the “Casos reales” proof section.
- Exactly three `.case-card` articles render from current flagship data.
- Each current card visibly shows `Problema`, `Resultado observado`, and `Stack`.
- Each card still renders its existing title, problem, first outcome, and first three stack values.
- A card without `metadataLabel` does not show an invented fallback badge.
- Dark mode keeps labels, card surfaces, outcome surface, and stack pills readable.
- `prefers-reduced-motion: reduce` keeps `.case-card` animation/transition suppressed.
- 390px and 360px mobile checks show no horizontal overflow and no clipped labels/stack pills.

## Risks, Tradeoffs, and Rollback

| Risk / tradeoff | Impact | Mitigation |
| --- | --- | --- |
| Visible labels add UI density | Low-medium | Keep labels short, compact, and scoped to proof cards. |
| Outcome surface may overstate evidence | Medium | Use `Resultado observado`; render only existing qualitative outcome text. |
| Renaming `.case-card__meta` creates extra diff | Low | It is local and clarifies ownership; no external dependency found. |
| Mobile cards may feel busy | Medium | Compact gaps/padding and smoke test 390px/360px. |
| Dark gold surface contrast may need tuning | Low-medium | Add Home-local dark selector for outcome surface only. |

Rollback is straightforward: revert the `.home-proof` card JSX structure to the previous flat paragraphs/list and remove the new `.case-card__header`, `.case-card__section*`, and outcome-surface CSS. No data rollback is needed because data files are not touched.

## Recommendation for Tasks

Proceed to Tasks with a single focused implementation unit under the 150-line preferred fail-stop:

1. Update `.home-proof` card JSX in `src/app/page.tsx` with header, labeled problem/outcome/stack sections, and no fallback badge.
2. Update `.case-card*` styles in `src/styles/home.css` for section spacing, labels, outcome emphasis, stack footer behavior, dark support, mobile density, and reduced-motion preservation.
3. Verify lint/build/diff guards and Home smoke checks across cards, dark mode, reduced motion, and 390px/360px mobile.

## Skill Resolution

`paths-injected`: loaded the exact frontend-design, accessibility, next-best-practices, and react-best-practices skill files provided by the parent prompt. Also read `AGENTS.md`, `openspec/config.yaml`, the required OpenSpec artifacts, relevant Next App Router Server/Client Component docs, and the requested source context.
