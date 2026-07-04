# Specification: brand-surface-alignment

## Status

Draft spec complete.

## Purpose

Align high-visibility public brand surfaces with the broader Juan Fontalvo practical tech brand introduced on Home.

This unit is copy/metadata-only. It must not change CSS, layout, data models, routes, or visual components.

## Current Brand Baseline

Home now presents the brand as:

```txt
Tecnología práctica + IA aplicada
Creador tech / Software / IA aplicada
```

The aligned public promise should cover:

- practical technology;
- PCs and laptops;
- software;
- automation;
- AI applied to real problems;
- solutions for people and businesses.

## Pre-Apply Blocker

Before Apply, unrelated source drift MUST be resolved:

```txt
M src/styles/home.css
```

That diff is formatting-only wrapping of two `linear-gradient(...)` declarations and is unrelated to brand alignment.

Apply MUST NOT start while `src/styles/home.css` is modified unless the user explicitly approves a separate handling strategy.

Recommended resolution before Apply:

```txt
git restore src/styles/home.css
```

Only if the user confirms that this drift is accidental.

## Scope

### In scope

Allowed source files:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Allowed changes:

- metadata titles/descriptions;
- OpenGraph image text/alt content;
- visible page intro/CTA/qualification copy;
- constant string arrays used for visible copy.

### Out of scope

The implementation MUST NOT:

- edit CSS files;
- edit data files;
- edit blog article data/content;
- edit case-study data/content;
- edit route structure;
- edit layout or visual components;
- edit contact URLs, phone, email, or `primarySalesContact` behavior;
- edit `src/app/credenciales/page.tsx` unless the user explicitly expands scope;
- edit `docs/JUAN-FONTALVO-ROADMAP.md`;
- edit private CV artifacts;
- edit `openspec/specs/design-responsividad/`;
- add dependencies, Tailwind, shadcn, or new components.

## Requirements

### Requirement: Public surfaces match the broader brand promise

The system MUST align Home metadata, OpenGraph image copy, Contact copy, and Blog copy with the broader Juan Fontalvo practical tech brand.

#### Scenario: Surfaces are not AI-business-only

- WHEN a visitor sees metadata, social preview text, Contact, or Blog
- THEN the copy MUST NOT imply Juan Fontalvo is only an AI workflow or software architecture consultant
- AND it SHOULD include a wider practical-tech frame.

#### Scenario: Brand promise remains concrete

- WHEN public copy is updated
- THEN it MUST remain concrete enough to understand quickly
- AND it SHOULD reference practical areas such as PCs/laptops, software, automation, AI, and real solutions.

### Requirement: Home metadata is aligned

The Home metadata MUST reflect the broadened brand promise.

#### Scenario: Home title broadens beyond software architecture only

- WHEN `src/app/page.tsx` metadata is reviewed
- THEN `metadata.title` SHOULD mention technology, software, and applied AI in a broader way.

Recommended direction:

```txt
Juan Fontalvo — Tecnología práctica, software e IA aplicada
```

#### Scenario: Home description includes practical tech scope

- WHEN `src/app/page.tsx` metadata is reviewed
- THEN `metadata.description` SHOULD mention solutions for people and businesses
- AND SHOULD include practical areas such as PCs, laptops, software, automation, and AI.

### Requirement: OpenGraph image copy is aligned

The OpenGraph image MUST match the broader public positioning without layout or styling changes.

#### Scenario: OG alt uses broad brand language

- WHEN `src/app/opengraph-image.tsx` is reviewed
- THEN `alt` SHOULD use broad practical-tech and AI language.

#### Scenario: OG visible label is Spanish-forward and broad

- WHEN the OG image is generated
- THEN the top label SHOULD avoid the narrow English-only `Architect / AI Engineer` framing
- AND SHOULD align with `Creador tech / Software / IA aplicada` or an equivalent compact variant.

#### Scenario: OG subtitle remains short enough for the image

- WHEN the OG subtitle is updated
- THEN it MUST remain short enough to fit the existing image layout
- AND SHOULD mention concrete pillars such as PCs, laptops, software, automation, and real solutions.

### Requirement: Contact page accepts broader tech inquiries

The Contact page MUST support the wider brand promise while preserving qualification and WhatsApp-first mechanics.

#### Scenario: Contact metadata broadens inquiry scope

- WHEN `src/app/contacto/page.tsx` metadata is reviewed
- THEN `metadata.description` SHOULD mention broader tech solutions, software, automation, AI, PCs, and laptops.

#### Scenario: Inquiry steps are not automation-only

- WHEN the inquiry steps render
- THEN they MUST NOT ask only what process the visitor wants to automate
- AND they SHOULD ask for the problem, project, equipment, process, or tech need to solve.

#### Scenario: Contact still requests useful context

- WHEN a visitor reads the steps
- THEN the copy SHOULD still ask for useful context such as urgency, constraints, current workflow, equipment, or scope.

#### Scenario: Contact mechanics remain unchanged

- WHEN Apply is complete
- THEN `primarySalesContact.url`, phone, email, `target`, and `rel` behavior MUST remain unchanged.

### Requirement: Blog becomes a broader practical tech content hub

The Blog page MUST align with the broader content direction while keeping AI/software/automation as important pillars.

#### Scenario: Blog metadata broadens topics

- WHEN `src/app/blog/page.tsx` metadata is reviewed
- THEN `metadata.description` SHOULD mention practical technology, PCs/laptops, AI, software, automation, and real solutions.

#### Scenario: Blog intro broadens without becoming vague

- WHEN the Blog intro renders
- THEN it SHOULD frame the blog as notes about practical tech, AI, software, equipment, and applied systems
- AND MUST remain concise.

#### Scenario: Blog next-step CTA remains useful

- WHEN the Blog bottom CTA renders
- THEN it SHOULD invite users to connect a note to a practical problem or solution need
- AND it SHOULD preserve links to `/casos-reales` and `/contacto` unless Design explicitly records a safer copy-only alternative.

### Requirement: Existing mechanics remain unchanged

The implementation MUST preserve the behavior of all affected files.

#### Scenario: No route or component behavior changes

- WHEN Apply is complete
- THEN routes MUST remain the same
- AND rendering logic MUST remain structurally unchanged.

#### Scenario: No imports/data behavior changes unless required by copy

- WHEN Apply is complete
- THEN no new imports SHOULD be added
- AND existing data imports/functions MUST remain unchanged.

#### Scenario: OpenGraph still builds

- WHEN `npm run build` runs
- THEN `/opengraph-image` MUST still compile successfully.

### Requirement: Scope and review workload stay bounded

The implementation MUST remain a small copy/metadata alignment slice.

#### Scenario: Source files are limited

- WHEN verification runs
- THEN `git diff --name-only -- src` MUST show only files accepted by this spec:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

#### Scenario: Forbidden files remain untouched

- WHEN verification runs
- THEN there MUST be no source diff touching:
  - CSS files;
  - data files;
  - package/dependency files;
  - blog article data/content;
  - case-study data/content;
  - `src/app/credenciales/page.tsx` unless explicitly approved;
  - `docs/JUAN-FONTALVO-ROADMAP.md`;
  - `openspec/specs/design-responsividad/`.

#### Scenario: Source diff stays under budget

- WHEN Apply is complete
- THEN source changed lines SHOULD be between `35` and `90`
- AND source changed lines MUST remain under `120` unless the user explicitly approves an exception.

## Verification Requirements

The implementation MUST pass:

```txt
npm run lint
npm run build
git diff --check
```

The implementation SHOULD include smoke evidence for:

- `/` renders after Home metadata update;
- `/contacto` renders updated broader contact copy;
- `/blog` renders updated broader intro/next-step copy;
- `/opengraph-image` builds/renders without error;
- no CSS/data files changed.

## Open Questions for Design

Design MUST decide final exact copy for:

- Home metadata title/description;
- OG alt, top label, and subtitle;
- Contact metadata, inquiry steps, intro, CTA/fine print if needed;
- Blog metadata, intro, bottom next-step copy, and CTA text if needed.

Design SHOULD keep copy Spanish-forward and short enough for existing layouts.

## Next Recommended

Proceed to **Design** after acknowledging the pre-Apply blocker around `src/styles/home.css` drift.
