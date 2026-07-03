# Proposal: home-section-flow-tuning

## Status

Proposed.

## Problem

The individual Home blocks have been improved in separate units:

- hero message;
- control-room visual;
- proof cards;
- pipeline.

Each block now works better on its own. The remaining Home-level issue is section flow: the page should read as one cohesive experience rather than separate polished blocks stacked together.

Current flow:

```txt
hero → proof cards → pipeline
```

Current CSS relies heavily on the parent gap:

```css
.content__page--home {
  gap: 2.8rem;
}
```

That is simple and stable, but it treats every section transition equally. The narrative transitions are not equal:

- hero → proof should feel like “claim → evidence”;
- proof → pipeline should feel like “evidence → operating model summary”.

## Goal

Tune the Home section rhythm so the page feels intentional from top to bottom, without changing content, JSX, or component internals.

The target experience:

1. Hero introduces the broad tech brand promise.
2. Control-room reinforces operational credibility.
3. Proof cards provide evidence.
4. Pipeline closes as a compact system summary.

## Proposed Solution

Use **CSS-only section rhythm tuning** in:

```txt
src/styles/home.css
```

Recommended tuning areas:

1. **Page shell rhythm**
   - keep page-level spacing predictable;
   - avoid global responsive files;
   - tune only Home-local section flow.

2. **Hero-to-proof transition**
   - make proof feel connected to the hero promise;
   - avoid making it look like a disconnected card grid.

3. **Proof-to-pipeline transition**
   - make pipeline read as the closing system summary;
   - avoid it feeling like an afterthought.

4. **Responsive cadence**
   - preserve current desktop/tablet/mobile order;
   - keep mobile rhythm compact and readable;
   - prevent horizontal overflow.

## Source Scope

Allowed source file:

```txt
src/styles/home.css
```

Allowed selector scope:

```txt
.content__page--home
.home-hero
.home-proof
.home-proof__heading
.home-proof__grid
.home-pipeline
@media (max-width: 1023px) Home-local section flow selectors
@media (max-width: 767px) Home-local section flow selectors
@media (max-width: 480px) Home-local section flow selectors
```

Allowed only if Design proves necessary:

```txt
.content__page--home::before
.content__page--home::after
```

## Non-Goals

This unit MUST NOT:

- edit `src/app/page.tsx`;
- change hero copy;
- change proof card content or data;
- change control-room internals;
- change pipeline internals;
- change CTA/button primitives;
- change global layout/responsive files;
- touch `docs/JUAN-FONTALVO-ROADMAP.md`;
- touch `openspec/specs/design-responsividad/`;
- update OpenGraph/contact/blog copy;
- add dependencies, Tailwind, shadcn, or a new layout system.

## Acceptance Criteria

### 1. Home reads as one flow

The Home page SHOULD read as a coherent sequence:

```txt
brand promise → operational visual → proof → system summary
```

The implementation SHOULD improve section rhythm with scoped CSS only.

### 2. JSX and content are preserved

The implementation MUST NOT change:

- Home JSX;
- hero message;
- proof-card content;
- control-room markup/content;
- pipeline markup/content;
- data files.

### 3. Section-level CSS only

Source changes MUST stay at section-flow level.

Allowed:

- parent Home spacing;
- hero section spacing;
- proof section spacing/heading rhythm;
- pipeline section placement/spacing;
- responsive Home section rhythm.

Not allowed:

- rewriting card internals;
- changing control-room node internals;
- changing pipeline label/icon internals;
- global layout or responsive files.

### 4. Responsive stability

At desktop, tablet, 390px, and 360px:

- hero, proof, and pipeline remain in the same order;
- no horizontal overflow is introduced;
- vertical rhythm remains usable;
- mobile does not feel excessively sparse.

### 5. Dark mode and reduced motion stay intact

The implementation MUST NOT break existing dark-mode or reduced-motion behavior.

If section rhythm changes touch visual surfaces, they MUST remain readable in dark mode.

No new animations should be introduced.

## Review Budget

Preferred source forecast:

```txt
20–50 changed lines
```

Hard source cap:

```txt
80 changed lines
```

Hard unit cap:

```txt
300 changed lines
```

If the implementation forecast exceeds 80 source lines, stop and ask before continuing.

## Verification Plan

Required checks:

```txt
npm run lint
npm run build
git diff --check
```

Static guards:

```txt
git diff --name-only -- src
```

Expected source result:

```txt
src/styles/home.css
```

Also verify:

- `git diff -- src/app/page.tsx` is empty;
- no proof-card/control-room/pipeline internals changed;
- no data/package/global responsive files changed;
- no `docs/JUAN-FONTALVO-ROADMAP.md` changes;
- no `openspec/specs/design-responsividad/` changes.

Recommended Home smoke:

- desktop `/`: hero, proof, and pipeline render in order;
- desktop: Home feels visually connected and not overcrowded;
- 390px and 360px: no horizontal overflow;
- mobile: vertical spacing remains compact enough;
- dark mode: section flow remains readable;
- reduced motion: existing animation suppression remains effective.

## Alternatives Considered

### A. Do nothing

Valid if each block is acceptable individually, but it misses the current opportunity: now that each block is tuned, the transitions between them deserve a small pass.

### B. CSS-only section rhythm — chosen

Best balance: improves page-level feel while protecting content and previous component work.

### C. Full Home layout redesign

Rejected. Too large, unnecessary, and likely to undo the component-by-component discipline.

### D. Brand alignment across OG/contact/blog

Useful future work, but out of scope. This unit is about Home section rhythm only.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Section spacing becomes too sparse | Medium | Keep changes small and smoke desktop/mobile. |
| Mobile page becomes too long | Medium | Add responsive flow tuning only if needed. |
| Parent gap affects all section transitions equally | Medium | Prefer local section spacing where clearer. |
| Scope creeps into component internals | High | Static selector guard. |
| Dark/reduced-motion regressions | Low-Medium | No new animations; smoke dark/reduced-motion if visual surfaces are touched. |

## Next Recommended

Proceed to **Spec** for CSS-only `home-section-flow-tuning`.
