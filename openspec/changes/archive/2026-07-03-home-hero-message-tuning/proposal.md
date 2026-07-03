# Proposal: home-hero-message-tuning

## Status

Proposed.

## User Direction

The user chose the broader brand direction:

> la marca mas amplia

Interpretation: the Home hero should not position Juan Fontalvo only as “AI systems for businesses”. It should present Juan Fontalvo as a broader practical tech brand that includes PCs, laptops, AI, software, automation, repairs, content, and real-world tech solutions.

## Problem

The current Home hero is clear but narrow:

- `Arquitectura de software + IA aplicada`
- `Arquitecto de software / Ingeniero IA`
- `Diseño sistemas operativos con IA para ventas, soporte y conocimiento interno — automatizados, auditables y con control humano.`

That message fits the current case-study proof, but it does not fully cover the user’s intended umbrella brand.

The site is evolving toward a broader Juan Fontalvo identity:

- tech creator;
- PC/laptop guidance;
- repairs and practical solutions;
- AI and automation;
- software/web/programming;
- future content and streaming ecosystem.

If the Home stays too narrow, visitors may incorrectly understand the brand as only consulting for AI business workflows.

## Goal

Tune the Home hero message so it becomes a broader, practical tech-brand entry point while still preserving the current proof architecture.

The first-screen message should answer:

1. Who is this? Juan Fontalvo.
2. What world is this about? Practical tech, AI, software, PCs/laptops, and solutions.
3. Why trust it? Practical systems and real cases.
4. What should the visitor do next? See proof or start a conversation.

## Proposed Solution

Use a small **microcopy + CSS hierarchy** tuning.

Expected source files:

```txt
src/app/page.tsx
src/styles/home.css
```

### Copy direction

Move from a narrow AI-operations consultancy message toward a broader tech solutions message.

Recommended copy candidate:

```txt
Eyebrow:
Tecnología práctica + IA aplicada

Role:
Creador tech / Software / IA aplicada

Tagline:
Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.

Primary CTA:
Ver casos reales

Secondary CTA:
Hablemos de tu solución
```

Rationale:

- keeps AI and software present;
- adds PCs/laptops and practical technology;
- broadens audience beyond businesses only;
- avoids making the hero a scattered list;
- keeps proof-first primary CTA stable.

### CSS direction

Use minimal hierarchy tuning only if the updated copy needs it:

- maintain the two-column hero layout;
- preserve current desktop/mobile responsive ownership;
- keep name prominence;
- ensure tagline line length and mobile wrapping remain readable;
- keep CTA styling based on existing `.btn` primitives.

## Source Scope

Allowed source files:

```txt
src/app/page.tsx
src/styles/home.css
```

Allowed JSX scope:

```txt
.home-hero__eyebrow
.home-hero__role
.home-hero__tagline
.home-hero__cta text only
```

Allowed CSS selector scope:

```txt
.home-hero__left
.home-hero__eyebrow
.home-hero .page__job.home-hero__role
.home-hero__tagline
.home-hero__cta
@media (...) .home-hero__eyebrow
@media (...) .home-hero__tagline
@media (...) .home-hero__cta-link
```

## Non-Goals

This unit MUST NOT:

- change the name `Juan Fontalvo`;
- change `home-hero__name` structure;
- change proof cards, pipeline, or control-room markup/CSS;
- change data files;
- change routes, metadata, sitemap, or blog/case-study content;
- change button primitive architecture;
- touch `docs/JUAN-FONTALVO-ROADMAP.md`;
- touch `openspec/specs/design-responsividad/`;
- introduce Tailwind, shadcn, dependencies, or a new design system;
- redesign the full Home layout.

## Acceptance Criteria

### 1. Broader brand message

The Home hero MUST communicate Juan Fontalvo as a broad practical tech brand, not only as an AI workflow consultant.

It SHOULD include:

- practical technology;
- AI;
- software;
- PCs/laptops or equipment;
- solutions/help for people and businesses.

### 2. Proof architecture remains intact

The Home page MUST keep the existing proof flow:

- hero message;
- control-room visual;
- proof cards;
- pipeline.

This unit MUST NOT alter proof-card data or the control-room/pipeline visual work from previous units.

### 3. CTA clarity

The primary CTA SHOULD remain proof-first:

```txt
Ver casos reales
```

The secondary CTA SHOULD become broader than workflow-only language.

Recommended:

```txt
Hablemos de tu solución
```

### 4. Responsive readability

At desktop, tablet, 390px, and 360px:

- hero text remains readable;
- CTAs remain visible and tappable;
- no horizontal overflow is introduced;
- line breaks do not create an awkward or unusable hero.

### 5. Scope and budget

Preferred source forecast:

```txt
20–45 changed lines
```

Hard source cap:

```txt
80 changed lines
```

Hard unit cap:

```txt
300 changed lines
```

If source forecast exceeds 80 lines, stop and ask before continuing.

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

Expected source files:

```txt
src/app/page.tsx
src/styles/home.css
```

Also verify:

- no changes to proof-card/pipeline/control-room selectors;
- no data/package/global/foundation files changed;
- no `docs/JUAN-FONTALVO-ROADMAP.md` changes;
- no `openspec/specs/design-responsividad/` changes.

Recommended Home smoke:

- desktop `/`: hero message and CTAs visible;
- 390px and 360px: no horizontal overflow;
- control-room, proof cards, and pipeline still render;
- primary and secondary CTA links still point to `/casos-reales` and `/contacto`.

## Alternatives Considered

### A. Keep AI-business positioning only

Rejected because the user explicitly chose the broader brand direction.

### B. Broad brand microcopy + minimal CSS — chosen

Best balance: broadens positioning without redesigning the Home or touching other workstreams.

### C. Full brand-roadmap rewrite

Rejected for this unit. That belongs to the separate roadmap/content strategy workstream, not this Home hero tuning slice.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Message becomes too broad | High | Use one umbrella sentence, not a long service catalog. |
| AI proof section feels disconnected | Medium | Keep AI/software language in the hero and preserve cases below. |
| Mixed Spanish/English sounds inconsistent | Medium | Use Spanish-forward copy; keep necessary tech terms only. |
| Mobile line breaks degrade | Medium | Smoke at 390px and 360px. |
| Scope creeps into roadmap/content strategy | High | Do not edit roadmap docs or unrelated pages. |

## Next Recommended

Proceed to **Spec** for `home-hero-message-tuning`, using the broader brand microcopy direction above.
