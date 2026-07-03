# Specification: home-section-flow-tuning

## Status

Draft spec complete.

## Purpose

Tune the Home page section rhythm so the already-polished blocks read as one coherent experience:

```txt
brand promise → operational visual → proof → system summary
```

This unit is CSS-only and section-flow-only.

## Scope

### In scope

Allowed source file:

```txt
src/styles/home.css
```

Allowed selector families:

```txt
.content__page--home
.home-hero
.home-proof
.home-proof__heading
.home-proof__grid
.home-pipeline
@media (max-width: 1023px) Home-local section-flow selectors
@media (max-width: 767px) Home-local section-flow selectors
@media (max-width: 480px) Home-local section-flow selectors
```

Allowed only if Design proves necessary:

```txt
.content__page--home::before
.content__page--home::after
```

### Out of scope

The implementation MUST NOT:

- edit `src/app/page.tsx`;
- change hero copy;
- change proof-card data, markup, or card internals;
- change control-room internals;
- change pipeline internals;
- change CTA/button primitive architecture;
- change global layout, global responsive files, global dark-mode files, or shared primitives;
- touch `docs/JUAN-FONTALVO-ROADMAP.md`;
- touch `openspec/specs/design-responsividad/`;
- update OpenGraph/contact/blog copy;
- add Tailwind, shadcn, dependencies, or a new layout system.

## Requirements

### Requirement: Home section sequence reads as one coherent flow

The Home page MUST preserve its existing section order while improving the perceived rhythm between sections.

#### Scenario: Existing section order remains unchanged

- WHEN the Home page renders
- THEN the visual order MUST remain:
  - hero;
  - proof cards;
  - pipeline.
- AND the control-room MUST remain inside the hero visual area.

#### Scenario: Transitions have narrative intent

- WHEN a visitor scrolls or scans the Home page
- THEN hero-to-proof SHOULD read as “claim → evidence”
- AND proof-to-pipeline SHOULD read as “evidence → system summary”.

### Requirement: CSS changes remain section-flow level

The implementation MUST tune only section-level rhythm and spacing.

#### Scenario: Section-level selectors are used

- WHEN source changes are reviewed
- THEN changes SHOULD be limited to:
  - `.content__page--home`;
  - `.home-hero`;
  - `.home-proof`;
  - `.home-proof__heading`;
  - `.home-proof__grid`;
  - `.home-pipeline`;
  - Home-local responsive rules for those selectors.

#### Scenario: Component internals remain untouched

- WHEN source changes are reviewed
- THEN the implementation MUST NOT change:
  - `.case-card*` internals;
  - `.control-room*` internals;
  - `.home-pipeline__step`, `.home-pipeline__label`, `.home-pipeline__icon`, or `.home-pipeline__arrow` internals;
  - `.home-hero__left`, `.home-hero__tagline`, or CTA copy/styling unless a future unit explicitly scopes them.

### Requirement: Desktop rhythm is balanced

The system MUST preserve desktop visual density while making section transitions feel intentional.

#### Scenario: Hero remains visually dominant

- WHEN the Home page renders on desktop
- THEN the hero MUST remain the dominant first section
- AND its two-column layout MUST remain unchanged.

#### Scenario: Proof section feels connected, not detached

- WHEN the proof cards render below the hero
- THEN the proof heading/grid SHOULD feel like a continuation of the hero promise
- AND spacing SHOULD NOT make proof feel like an unrelated page section.

#### Scenario: Pipeline reads as closing summary

- WHEN the pipeline renders after proof cards
- THEN it SHOULD read as a compact closing system summary
- AND spacing SHOULD NOT make it feel like an accidental leftover block.

### Requirement: Mobile rhythm remains usable

The system MUST preserve mobile readability and avoid excessive vertical gaps.

#### Scenario: Mobile order remains stable

- WHEN viewport width is at or below `767px`
- THEN the Home order MUST remain:
  - control-room visual;
  - hero copy/CTA;
  - proof cards;
  - pipeline.

#### Scenario: Mobile spacing stays compact enough

- WHEN viewport width is `390px` or `360px`
- THEN vertical spacing SHOULD remain compact enough that the page does not feel like isolated panels separated by large empty gaps
- AND all sections MUST remain readable.

#### Scenario: No horizontal overflow

- WHEN viewport width is `390px` or `360px`
- THEN the implementation MUST NOT introduce horizontal overflow.

### Requirement: Dark mode and reduced motion remain intact

The implementation MUST NOT regress existing dark-mode or reduced-motion behavior.

#### Scenario: Dark mode remains readable

- GIVEN `[data-theme="dark"]` is active
- WHEN the Home page renders
- THEN section surfaces and rhythm changes MUST remain readable
- AND no global dark-mode files SHOULD be changed.

#### Scenario: Reduced motion remains honored

- GIVEN the user prefers reduced motion
- WHEN the Home page renders
- THEN existing Home entrance animations and control-room pulses MUST remain suppressed as before
- AND this unit MUST NOT add new animations.

### Requirement: Review workload remains small

The implementation MUST remain a small CSS-only unit.

#### Scenario: Source files are limited

- WHEN verification runs
- THEN `git diff --name-only -- src` MUST show only:

```txt
src/styles/home.css
```

- AND `git diff -- src/app/page.tsx` MUST be empty.

#### Scenario: Source diff stays under budget

- WHEN Apply is complete
- THEN source changed lines SHOULD be between `20` and `50`
- AND source changed lines MUST remain under `80` unless the user explicitly approves an exception.

#### Scenario: Forbidden areas remain untouched

- WHEN verification runs
- THEN there MUST be no source diff touching:
  - proof-card internals;
  - control-room internals;
  - pipeline internals;
  - data files;
  - package/dependency files;
  - global responsive files;
  - global dark-mode files;
  - `docs/JUAN-FONTALVO-ROADMAP.md`;
  - `openspec/specs/design-responsividad/`.

## Verification Requirements

The implementation MUST pass:

```txt
npm run lint
npm run build
git diff --check
```

The implementation SHOULD include a Home smoke check covering:

- desktop hero/proof/pipeline render in order;
- 390px and 360px no-horizontal-overflow checks;
- mobile vertical rhythm remains usable;
- dark mode remains readable;
- reduced motion behavior remains intact.

## Open Questions for Design

Design MUST decide whether to:

1. tune only local margins/spacing on `.home-proof` and `.home-pipeline`; or
2. also adjust `.content__page--home` parent gap.

Design SHOULD prefer local section rhythm if changing the parent gap would make all transitions less intentional.

## Next Recommended

Proceed to **Design** with a CSS-only, section-level implementation plan.
