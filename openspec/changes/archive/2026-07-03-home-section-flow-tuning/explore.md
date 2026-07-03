# Explore: home-section-flow-tuning

## Status

Exploration complete.

## Goal

Explore the next Home tuning unit after polishing the hero message, control-room, proof cards, and pipeline: the overall vertical section flow.

The purpose is to make the Home feel like one coherent experience instead of strong blocks placed one after another.

## Discovery Method

- Used CodeGraph first to map `src/app/page.tsx` Home structure.
- Read targeted `src/styles/home.css` sections for page shell, hero, proof cards, pipeline, and responsive behavior.
- No source edits were made.

## Current Home Structure

Primary source:

```txt
src/app/page.tsx
```

Home section order:

1. `.home-hero`
   - `.home-hero__left`
   - `.home-hero__right` / `.control-room`
2. `.home-proof`
   - `.home-proof__heading`
   - `.home-proof__grid`
   - `.case-card`
3. `.home-pipeline`

Current high-level JSX is already appropriate. This unit should not need JSX changes.

## Current CSS Flow Map

Primary source:

```txt
src/styles/home.css
```

Relevant flow selectors:

```txt
.content__page--home
.content__page--home::before
.content__page--home::after
.home-hero
.home-proof
.home-proof__heading
.home-proof__grid
.home-pipeline
@media (max-width: 1023px) .home-hero
@media (max-width: 1023px) .home-proof__grid
@media (max-width: 1023px) .home-pipeline
@media (max-width: 767px) .home-proof__grid
@media (max-width: 767px) .case-card
@media (max-width: 480px) .home-proof__heading
@media (max-width: 480px) .home-pipeline
```

## Current Behavior

### Page shell

`.content__page--home` currently owns:

- page-level positioning;
- vertical `gap: 2.8rem` between hero, proof, and pipeline;
- clamp-based padding;
- visible overflow;
- decorative background grid and corner accent.

### Hero

`.home-hero` owns:

- two-column desktop layout;
- `gap: 3rem` between message and control-room;
- `min-height: clamp(34rem, 56vh, 42rem)`;
- single-column collapse at `max-width: 1023px`.

At tablet/mobile, `.home-hero__right` moves above hero text through `order: -1`.

### Proof section

`.home-proof` is a full-width block with no explicit margin. It relies on parent gap.

`.home-proof__grid` uses:

- 3 columns on desktop;
- 2 columns at tablet;
- 1 column at mobile.

### Pipeline

`.home-pipeline` is a full-width flex/wrapped visual block. It relies on the same parent gap as proof and hero.

It already has small-mobile wrapping fixes from `home-pipeline-tuning`.

## Recent Units Affecting Flow

- `home-control-room-tuning` made the right-side visual more visually dense and premium.
- `home-hero-message-tuning` broadened hero copy but did not need CSS.
- `home-proof-cards-tuning` made the proof cards more informative.
- `home-pipeline-tuning` made the pipeline more readable and cohesive.

After these changes, each block is stronger. The remaining question is the rhythm between them.

## Observations

### What already works

- JSX order is good: hero → proof → pipeline.
- Parent gap gives a consistent vertical rhythm.
- Responsive ownership is mostly well documented in comments.
- Mobile layout already avoids horizontal overflow in recent smoke tests.
- Each block has its own visual identity.

### What may feel unfinished

- The same `2.8rem` parent gap treats hero→proof and proof→pipeline as equal transitions, even though they are different narrative moments.
- `.home-proof` has no local spacing/anchor treatment beyond heading and grid; it may feel like a standalone section rather than the proof continuation of the hero promise.
- `.home-pipeline` sits as a final technical flourish, but the spacing before it may not clearly signal “architecture summary / closing flow”.
- On desktop, `.home-hero` has a large min-height; combined with proof and pipeline, the Home can feel tall without a clear section cadence.
- On mobile, the order is control-room → hero copy → proof → pipeline. The flow is valid, but vertical spacing may need finer local rhythm than the desktop gap.

## Opportunity

Tune section flow with small CSS-only changes:

1. **Narrative grouping**
   - make proof feel connected to the hero promise;
   - make pipeline feel like a deliberate closing summary.

2. **Vertical rhythm**
   - use local margin/spacing rules instead of relying only on parent gap;
   - keep the rhythm tighter on mobile.

3. **Responsive cadence**
   - preserve current ordering;
   - avoid global responsive files;
   - tune only Home-local selectors.

4. **Review safety**
   - no JSX;
   - no copy;
   - no data;
   - no changes inside card/control-room internals unless later design proves necessary.

## Recommended Direction

Recommended option: **CSS-only section rhythm tuning**.

Expected source file:

```txt
src/styles/home.css
```

Recommended selector scope:

```txt
.content__page--home
.home-hero
.home-proof
.home-proof__heading
.home-proof__grid
.home-pipeline
@media (...) Home-local section flow selectors
```

Expected source diff:

```txt
20–50 changed lines
```

Hard source cap:

```txt
80 changed lines
```

## Possible Implementation Ideas

These are exploratory ideas, not final design yet:

- replace the single parent `gap` with slightly more intentional section rhythm, or keep it and add local spacing only where needed;
- add a subtle `.home-proof` visual anchor or top spacing to connect it to the hero;
- make `.home-proof__heading` spacing align better with the cards;
- add a slightly clearer separation before `.home-pipeline` so it reads as a closing system summary;
- reduce/tune gaps at tablet/mobile so the page does not feel like separate stacked panels.

## Non-Goals

This unit should not:

- edit `src/app/page.tsx`;
- change hero copy;
- change proof-card content/data;
- change control-room internals;
- change pipeline internals;
- touch global responsive files;
- touch `docs/JUAN-FONTALVO-ROADMAP.md`;
- touch `openspec/specs/design-responsividad/`;
- update OpenGraph/contact/blog copy, even though CodeGraph surfaced they still use narrower AI/automation language;
- add dependencies, Tailwind, shadcn, or new layout systems.

## Related Follow-Up Outside This Unit

CodeGraph surfaced that other public surfaces still carry narrower AI/automation positioning:

- `src/app/opengraph-image.tsx`
- `src/app/contacto/page.tsx`
- `src/app/blog/page.tsx`

Those may deserve a future brand-alignment unit, but they are explicitly out of scope for `home-section-flow-tuning`.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| CSS rhythm changes undo previous visual tuning | Medium | Restrict changes to section-level selectors, not internals. |
| Desktop becomes too sparse | Medium | Keep source changes small and verify full-page visual density. |
| Mobile becomes too tall | Medium | Include 390px/360px smoke and tune mobile gap only if needed. |
| Parent gap changes affect all Home sections equally | Medium | Prefer local section rhythm if global gap change feels risky. |
| Scope creeps into brand copy alignment | High | Keep this unit CSS-only; save copy alignment for future unit. |

## Verification Ideas

For later Apply/Verify:

- `npm run lint`
- `npm run build`
- `git diff --check`
- static guard: `git diff --name-only -- src` shows only `src/styles/home.css`
- static guard: no `src/app/page.tsx` diff
- static guard: no control-room/proof-card/pipeline internals changed unless explicitly designed
- Home smoke:
  - desktop: hero, proof, and pipeline all visible in correct order;
  - 390px and 360px: no horizontal overflow;
  - mobile vertical rhythm remains usable;
  - dark mode remains readable;
  - reduced motion still disables Home entrance animations/pulses as before.

## Next Recommended

Proceed to **Proposal** for a CSS-only `home-section-flow-tuning` unit.
