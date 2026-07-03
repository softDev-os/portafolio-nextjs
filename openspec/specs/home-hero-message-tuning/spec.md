# Specification: home-hero-message-tuning

## Status

Draft spec complete.

## Purpose

Tune the Home hero message so Juan Fontalvo is positioned as a broader practical tech brand, not only as an AI workflow consultant, while preserving the existing Home proof architecture and keeping the change small.

## Scope

### In scope

Allowed source files:

```txt
src/app/page.tsx
src/styles/home.css
```

Allowed JSX changes in `src/app/page.tsx`:

```txt
.home-hero__eyebrow text
.home-hero__role text
.home-hero__tagline text
secondary .home-hero__cta-link text
```

Allowed CSS selectors in `src/styles/home.css`:

```txt
.home-hero__left
.home-hero__eyebrow
.home-hero .page__job.home-hero__role
.home-hero__tagline
.home-hero__cta
.home-hero__cta-link
@media (...) .home-hero__eyebrow
@media (...) .home-hero__tagline
@media (...) .home-hero__cta-link
```

### Out of scope

The implementation MUST NOT:

- change the name `Juan Fontalvo`;
- change the `home-hero__name` DOM structure;
- change the primary CTA destination or text unless explicitly approved;
- change proof cards, control-room, or pipeline markup/CSS;
- change data files, blog content, case-study content, metadata, sitemap, or routes;
- change global primitives, button architecture, layout foundation, or global dark-mode files;
- touch `docs/JUAN-FONTALVO-ROADMAP.md`;
- touch `openspec/specs/design-responsividad/`;
- add Tailwind, shadcn, dependencies, or a new design system.

## Requirements

### Requirement: Hero communicates the broader Juan Fontalvo tech brand

The Home hero MUST position Juan Fontalvo as a broader practical tech brand covering technology, AI, software, equipment, and real-world solutions.

#### Scenario: Message is broader than AI business workflows

- WHEN a visitor reads the first hero screen
- THEN the message MUST NOT imply that Juan Fontalvo only designs AI workflows for businesses
- AND it SHOULD include a broader practical-tech frame that can cover people, businesses, PCs/laptops, software, automation, and AI.

#### Scenario: Message remains focused, not scattered

- WHEN the hero copy is updated
- THEN it MUST avoid becoming a long catalog of unrelated services
- AND it MUST preserve one clear umbrella promise.

### Requirement: Copy uses the approved broad-brand direction

The hero copy MUST follow the user-approved broad brand direction.

#### Scenario: Eyebrow introduces broad practical tech plus AI

- WHEN the Home hero renders
- THEN the eyebrow SHOULD communicate practical technology and applied AI.

Recommended copy:

```txt
Tecnología práctica + IA aplicada
```

#### Scenario: Role line broadens beyond consultant-only positioning

- WHEN the Home hero renders
- THEN the role line SHOULD include the creator/tech/software/AI identity instead of only `Arquitecto de software / Ingeniero IA`.

Recommended copy:

```txt
Creador tech / Software / IA aplicada
```

#### Scenario: Tagline explains the broader value proposition

- WHEN the Home hero renders
- THEN the tagline MUST explain that Juan helps people and businesses use technology better
- AND it SHOULD mention practical areas such as buying, repairing, automation, software, equipment, or AI
- AND it MUST remain readable as one short paragraph.

Recommended copy:

```txt
Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.
```

#### Scenario: Secondary CTA becomes broader than workflow-only language

- WHEN the Home hero renders
- THEN the secondary CTA SHOULD invite a broad solution conversation, not only workflow design.

Recommended copy:

```txt
Hablemos de tu solución
```

### Requirement: Proof-first architecture remains intact

The Home page MUST keep its current proof flow.

#### Scenario: Existing Home sections remain present

- WHEN the implementation is complete
- THEN the Home page MUST still render:
  - hero message;
  - control-room visual;
  - proof cards;
  - pipeline detail.

#### Scenario: Primary CTA remains proof-first

- WHEN the Home hero renders
- THEN the primary CTA MUST remain:

```txt
Ver casos reales
```

- AND it MUST continue linking to `/casos-reales`.

#### Scenario: Contact CTA remains contact-oriented

- WHEN the secondary CTA renders
- THEN it MUST continue linking to `/contacto`.

### Requirement: Visual hierarchy supports the new copy

The system SHOULD tune only the minimum CSS needed to keep the updated hero message readable and balanced against the polished control-room visual.

#### Scenario: Name remains dominant

- WHEN the Home hero renders on desktop
- THEN `Juan Fontalvo` MUST remain the dominant text element.

#### Scenario: Tagline remains readable

- WHEN the updated tagline renders
- THEN it MUST preserve comfortable line length and spacing on desktop
- AND it MUST remain readable at 390px and 360px widths.

#### Scenario: CTA layout remains stable

- WHEN the Home hero renders at desktop, tablet, 390px, and 360px
- THEN both CTAs MUST remain visible and tappable
- AND they MUST NOT introduce horizontal overflow.

### Requirement: Responsive behavior remains stable

The system MUST preserve the existing responsive ownership for the Home hero.

#### Scenario: Tablet collapse remains unchanged

- WHEN viewport width is at or below `1023px`
- THEN the hero MUST continue using the existing collapsed single-column behavior
- AND `.home-hero__right` MUST remain above the hero text unless a future unit explicitly changes that behavior.

#### Scenario: Mobile alignment remains intentional

- WHEN viewport width is at or below `767px`
- THEN hero-left text and CTAs MUST remain centered as currently implemented.

#### Scenario: Small-mobile overflow is prevented

- WHEN viewport width is `390px` or `360px`
- THEN the updated copy MUST NOT create horizontal overflow
- AND no visual element in the hero MUST extend the document width.

### Requirement: Scope and review workload stay small

The implementation MUST remain a small Home hero message unit.

#### Scenario: Source files are limited

- WHEN verification runs
- THEN `git diff --name-only -- src` MUST show only:

```txt
src/app/page.tsx
src/styles/home.css
```

- OR only one of those files if CSS changes are not needed.

#### Scenario: Forbidden areas remain untouched

- WHEN verification runs
- THEN there MUST be no source diff touching:
  - proof-card selectors or data;
  - control-room selectors;
  - pipeline selectors;
  - global primitives;
  - layout foundation;
  - package/dependency files;
  - `docs/JUAN-FONTALVO-ROADMAP.md`;
  - `openspec/specs/design-responsividad/`.

#### Scenario: Source diff stays under budget

- WHEN Apply is complete
- THEN source changed lines SHOULD be between `20` and `45`
- AND source changed lines MUST remain under `80` unless the user explicitly approves an exception.

## Verification Requirements

The implementation MUST pass:

```txt
npm run lint
npm run build
git diff --check
```

The implementation SHOULD include a Home smoke check covering:

- desktop hero message visible;
- both CTAs visible;
- CTA hrefs remain `/casos-reales` and `/contacto`;
- control-room, proof cards, and pipeline still render;
- 390px and 360px no-horizontal-overflow checks;
- mobile line breaks remain usable.

## Open Questions for Design

Design MUST decide whether CSS changes are necessary. If the copy change alone preserves readability, Design SHOULD prefer a JSX-only source diff.

## Next Recommended

Proceed to **Design** with a bias toward the smallest possible implementation: copy first, CSS only if verification/readability requires it.
