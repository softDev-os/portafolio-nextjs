# Proposal: brand-surface-alignment

## Status

Proposed.

## Problem

The Home hero now positions Juan Fontalvo as a broader practical tech brand:

```txt
Tecnología práctica + IA aplicada
Creador tech / Software / IA aplicada
```

But several public surfaces still describe the brand mostly as software architecture, AI automation, and operational workflows.

That creates a mismatch:

- the landing hero invites a broader audience;
- metadata and secondary pages still narrow the brand back to AI/workflow consulting;
- users coming from search, social previews, blog, or contact may receive a different promise than the Home page.

## Goal

Align the highest-visibility public surfaces with the broader Juan Fontalvo practical tech brand, without changing layout, data, CSS, or page architecture.

The aligned brand should communicate:

- practical technology;
- PCs and laptops;
- software;
- automation;
- AI applied to real problems;
- solutions for people and businesses.

## Proposed Solution

Use a **copy/metadata-only alignment pass**.

Recommended source scope:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

No CSS. No data model changes. No layout changes.

## Current Pre-Apply Blocker

Before Apply, resolve unrelated source drift:

```txt
M src/styles/home.css
```

The current diff is formatting-only wrapping of two `linear-gradient(...)` declarations in control-room CSS. It is unrelated to brand alignment and MUST NOT be mixed into this unit.

Apply may proceed only after one of these is true:

1. `src/styles/home.css` drift is reverted; or
2. user explicitly approves including it in a separate commit/unit before brand alignment.

Recommended: revert the formatting drift before Apply.

## Source Scope

### In scope

#### `src/app/page.tsx`

Update Home metadata only:

- `metadata.title`
- `metadata.description`

No JSX changes.

#### `src/app/opengraph-image.tsx`

Update public OG copy only:

- `alt`
- top label text
- subtitle text

No layout/style changes unless text length requires tiny wrapping-safe copy.

#### `src/app/contacto/page.tsx`

Update contact page public copy only:

- `metadata.description`
- `inquirySteps`
- contact intro paragraph
- CTA text if needed
- fine print if needed

Keep contact mechanics intact.

#### `src/app/blog/page.tsx`

Update blog public copy only:

- `metadata.description`
- blog intro paragraph
- bottom next-step paragraph and CTA text if needed

Keep article rendering and routes intact.

### Optional but deferred

`src/app/credenciales/page.tsx` metadata also still leans narrow, but this proposal defers it to avoid making the first alignment slice too broad.

## Non-Goals

This unit MUST NOT:

- edit CSS files;
- edit data files;
- edit blog article data/content;
- edit case-study data/content;
- edit roadmap docs;
- edit private CV artifacts;
- edit `openspec/specs/design-responsividad/`;
- change navigation, routes, layout, or visual components;
- change contact URLs, phone/email data, or `primarySalesContact` behavior;
- add dependencies, Tailwind, shadcn, or new components.

## Recommended Copy Direction

### Home metadata

Candidate:

```txt
Title:
Juan Fontalvo — Tecnología práctica, software e IA aplicada

Description:
Soluciones tech para personas y negocios: PCs, laptops, reparaciones, software, automatización e IA aplicada con casos reales.
```

### OpenGraph image

Candidate:

```txt
Alt:
Juan Fontalvo — Tecnología práctica + IA aplicada

Top label:
Creador tech / Software / IA aplicada

Subtitle:
PCs · Laptops · Software · Automatización · Soluciones reales
```

### Contact page

Candidate direction:

- broaden from “qué proceso querés automatizar” to “qué problema tech, equipo, proyecto o proceso querés resolver”;
- keep qualification: context, urgency, constraints, scope;
- keep WhatsApp as primary contact channel;
- reduce business-only language where possible.

Possible metadata:

```txt
Contacto para soluciones tech, software, automatización, IA aplicada, PCs y laptops.
```

### Blog page

Candidate direction:

- broaden from automation/workflows-only to practical tech content hub;
- keep AI/software/automation present;
- include PCs/laptops and real solutions.

Possible metadata:

```txt
Notas sobre tecnología práctica, PCs, laptops, IA, software, automatización y soluciones reales.
```

## Acceptance Criteria

### 1. Public brand promise is consistent

The updated public surfaces SHOULD align with the broader Home hero promise.

They MUST NOT imply the brand is only:

- AI workflow consulting;
- software architecture consulting;
- business automation only.

### 2. Practical tech remains concrete

Copy SHOULD mention or imply concrete practical areas:

- PCs/laptops;
- software;
- AI;
- automation;
- repairs or solutions;
- people and businesses.

### 3. Existing mechanics remain unchanged

The implementation MUST preserve:

- route structure;
- metadata object structure;
- OG image rendering mechanism;
- contact URLs/data;
- article rendering;
- case-study rendering.

### 4. No CSS/data/layout changes

Source diff MUST NOT include:

- CSS files;
- data files;
- package files;
- layout/foundation files.

### 5. Review workload stays bounded

Preferred source forecast:

```txt
35–90 changed lines
```

Hard source cap:

```txt
120 changed lines
```

If the source forecast exceeds 120 lines, pause and ask before continuing.

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

Expected source files only:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Also verify:

- no CSS files changed;
- no data files changed;
- no package files changed;
- no `docs/JUAN-FONTALVO-ROADMAP.md` changes;
- no `openspec/specs/design-responsividad/` changes.

Recommended smoke:

- `/` renders and metadata strings are updated in source;
- `/contacto` renders updated broader contact copy;
- `/blog` renders updated broader intro/next-step copy;
- `/opengraph-image` builds/renders without error;
- generated OG copy remains short enough for the image layout.

## Alternatives Considered

### A. Core alignment only — chosen

Touch Home metadata, OG image, Contact, and Blog.

Best balance of visibility and review size.

### B. Core + credentials metadata

More complete metadata alignment, but touches an additional page. Defer unless the user explicitly wants the first slice to include it.

### C. Full content strategy alignment

Would include blog articles, cases, roadmap, and service positioning. Rejected for this unit because it is too large.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Copy becomes too broad | High | Keep wording concrete: tech, PCs/laptops, software, AI, solutions. |
| Contact intake becomes vague | High | Keep qualification steps and context requirements. |
| OG text overflows | Medium | Keep OG subtitle short. |
| CSS drift contaminates commit | Medium | Resolve `src/styles/home.css` before Apply. |
| Scope creeps into content strategy | High | Exclude data/articles/roadmap. |

## Next Recommended

Proceed to **Spec** after resolving or explicitly acknowledging the `src/styles/home.css` drift as an Apply blocker.
