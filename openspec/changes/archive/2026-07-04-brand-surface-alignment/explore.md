# Explore: brand-surface-alignment

## Status

Exploration complete.

## Goal

Explore a brand-alignment unit after the Home hero was broadened from AI-business-only positioning into the wider Juan Fontalvo practical tech brand.

The goal is to identify public-facing surfaces that still use narrow “AI automation / workflows only” positioning and decide a safe SDD scope for aligning them.

## Discovery Method

- Used CodeGraph first, per repo navigation rules.
- Queried public copy and metadata surfaces related to:
  - Home metadata;
  - OpenGraph image;
  - Contact page;
  - Blog page;
  - Credentials page metadata surfaced incidentally.
- No source edits were made.

## Current Working Tree Warning

Before this Explore, `git status --short` showed unrelated local work:

```text
 M .gitignore
 M src/styles/home.css
?? cv-refactor-scout.md
?? docs/JUAN-FONTALVO-ROADMAP.md
?? openspec/changes/private-cv-redesign/
?? openspec/specs/design-responsividad/
```

Important: `src/styles/home.css` is currently modified, but this Explore did not edit source. The diff is formatting-only wrapping of two long `linear-gradient(...)` declarations in `.control-room__node` and `.control-room__line`.

Before any Apply for `brand-surface-alignment`, resolve this source drift explicitly:

- either revert `src/styles/home.css` formatting drift if it is accidental;
- or consciously include/commit it in a separate unit if the user wants it.

Do not mix that CSS drift into a brand-copy alignment commit.

## Brand Baseline After Home Tuning

Home hero now presents the broader brand:

```txt
Tecnología práctica + IA aplicada
Creador tech / Software / IA aplicada
Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.
```

This broader positioning includes:

- practical technology;
- people and businesses;
- PCs and laptops;
- buying and repairing;
- software;
- automation and AI.

## Surfaces Found

### 1. Home metadata — `src/app/page.tsx`

Current metadata:

```ts
export const metadata: Metadata = {
  title: "Juan Fontalvo — Arquitectura de software e IA aplicada",
  description:
    "Consultoría en arquitectura de software y automatización con IA basada en casos reales.",
};
```

Alignment issue:

- title and description still narrow the Home to software architecture + AI consulting;
- this conflicts with the new broader Home hero message.

Priority: **High**.

Reason: Home metadata is the primary search/share summary for the landing page.

### 2. OpenGraph image — `src/app/opengraph-image.tsx`

Current public OG text:

```txt
alt: Juan Fontalvo — Arquitecto de software / Ingeniero IA
Architect / AI Engineer
Automatización con IA · Workflows operativos · Prueba real antes del contacto
```

Alignment issue:

- role is still narrow and English-forward;
- subtitle is AI/workflow-only;
- does not mention the broader practical tech umbrella.

Priority: **High**.

Reason: this is the visual preview for sharing. It should match the new brand promise.

### 3. Contact page — `src/app/contacto/page.tsx`

Current metadata:

```txt
Contacto calificado para consultas de automatización con IA y arquitectura de software.
```

Current inquiry steps:

```txt
Comparte qué proceso querés automatizar y qué canal usa hoy tu equipo.
Incluí volumen aproximado, dolores operativos y restricciones importantes.
Si el caso encaja, seguimos por una conversación directa con alcance claro.
```

Current intro/fine print:

```txt
El primer paso comercial es el bot de WhatsApp: permite capturar contexto mínimo, calificar la consulta y decidir si corresponde avanzar a una conversación directa con alcance claro.

Los canales personales quedan como respaldo. La priorización por WhatsApp ayuda a separar consultas de negocio de conversaciones personales o soporte no relacionado.
```

Alignment issue:

- contact flow assumes business automation as the main query type;
- does not yet cover repairs, equipment advice, broader tech help, content/project inquiries, or software/AI as a wider set;
- still uses “ventas” and “negocio” framing heavily.

Priority: **High**.

Reason: Contact must accept the broader traffic created by the Home hero.

### 4. Blog page — `src/app/blog/page.tsx`

Current metadata:

```txt
Notas sobre automatización con IA, arquitectura de software y workflows operativos.
```

Current intro:

```txt
Notas sobre automatización con IA, workflows operativos y patrones de arquitectura que aplico en proyectos reales.
```

Current next-step copy:

```txt
Si una nota conecta con un problema de tu operación, revisá los casos o abrí una consulta calificada por WhatsApp.
```

Alignment issue:

- blog is framed almost entirely around automation/operations/architecture;
- after broader Home positioning, blog can also cover practical tech, PCs/laptops, repairs, AI tools, software, buying advice, and creator content;
- CTA still assumes operational problem + WhatsApp query.

Priority: **Medium-High**.

Reason: Blog is likely a major future content hub for the broader brand.

### 5. Credentials page metadata — `src/app/credenciales/page.tsx`

Current metadata description:

```txt
Credenciales estratégicas de Juan Fontalvo para arquitectura de automatización, IA aplicada y entrega técnica.
```

Alignment issue:

- still narrower than the new brand, but less urgent because credentials can legitimately emphasize technical delivery;
- may be better handled in a future page-specific unit.

Priority: **Medium / optional**.

Reason: It is public metadata, but not as central as Home, OG, Contact, and Blog.

## Recommended Scope

Recommended change name:

```txt
brand-surface-alignment
```

Recommended initial source scope:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Optional, only if Proposal accepts it:

```txt
src/app/credenciales/page.tsx
```

Recommended exclude for first slice:

- article data/content files;
- case-study data;
- visual CSS;
- contact data in `src/data/personal.ts`;
- roadmap docs;
- private CV SDD;
- `openspec/specs/design-responsividad/`.

## Recommended Direction

Use a **copy/metadata-only alignment pass**.

No CSS. No layout. No data model changes.

Recommended copy principles:

1. **Spanish-forward**: keep public page copy in Spanish unless a brand/technical term needs English.
2. **Broad but not messy**: include practical tech, AI, software, PCs/laptops, repairs/solutions, but avoid a long service catalog.
3. **Preserve proof-first credibility**: keep cases, evidence, and consultation language where useful.
4. **Contact should broaden intake**: from “what process do you want to automate?” to “what tech problem, project, equipment, or automation do you need to solve?”
5. **Blog should become content hub**: notes about practical tech, AI, software, PCs/laptops, repairs, and applied systems.

## Candidate Alignment Examples

These are exploratory, not final Proposal decisions.

### Home metadata

```txt
Title:
Juan Fontalvo — Tecnología práctica, software e IA aplicada

Description:
Soluciones tech para personas y negocios: PCs, laptops, reparaciones, software, automatización e IA aplicada con casos reales.
```

### OpenGraph image

```txt
Alt:
Juan Fontalvo — Tecnología práctica + IA aplicada

Eyebrow:
Creador tech / Software / IA aplicada

Subtitle:
PCs · Laptops · Software · Automatización · Soluciones reales
```

### Contact metadata / intro

```txt
Contacto para soluciones tech, software, automatización, IA aplicada, PCs y laptops.
```

Contact steps should broaden from “proceso a automatizar” toward:

- what problem/project/equipment/process needs help;
- useful context such as device, current workflow, urgency, budget or constraints;
- direct conversation when scope is clear.

### Blog metadata / intro

```txt
Notas sobre tecnología práctica, PCs, laptops, IA, software, automatización y soluciones reales.
```

## Proposed Options

### Option A — Core alignment only

Touch:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Expected source diff:

```txt
35–90 changed lines
```

Pros:

- aligns the most visible surfaces;
- keeps scope focused;
- no CSS/layout risk.

Cons:

- credentials metadata remains narrower for now.

### Option B — Core + credentials metadata

Touch Option A plus:

```txt
src/app/credenciales/page.tsx
```

Expected source diff:

```txt
40–100 changed lines
```

Pros:

- more complete public metadata alignment.

Cons:

- touches 5 files;
- slightly higher review workload.

### Option C — Full brand/content alignment

Also touch article data, case-study copy, services language, and roadmap.

Rejected for this unit.

This would become a content strategy rewrite, not a small SDD implementation slice.

## Recommendation

Proceed with **Option A — Core alignment only**.

Rationale:

- It covers the highest-visibility mismatches.
- It avoids touching credentials, article data, cases, or roadmap prematurely.
- It can stay copy/metadata-only.
- It keeps review manageable.

Suggested hard source cap:

```txt
120 changed lines
```

Suggested preferred forecast:

```txt
35–90 changed lines
```

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Copy becomes too broad and vague | High | Keep copy practical and concrete: tech, PCs/laptops, software, AI, solutions. |
| Existing AI proof feels disconnected | Medium | Keep automation/AI as part of the brand, not removed. |
| Contact becomes too unfocused | High | Broaden intake while still asking for concrete context and scope. |
| OG image text overflows visually | Medium | Keep OG subtitle short and smoke the route/build. |
| Scope expands into content strategy | High | Exclude blog article data, roadmap docs, cases, and CV workstream. |
| Existing `src/styles/home.css` drift contaminates commit | Medium | Resolve or exclude CSS drift before Apply. |

## Verification Ideas

For later Apply/Verify:

- `npm run lint`
- `npm run build`
- `git diff --check`
- static guard: source diff limited to accepted source files;
- static guard: no CSS files changed;
- static guard: no data files changed;
- smoke fetch/render for `/`, `/contacto`, `/blog`, and `/opengraph-image`;
- verify key visible copy and metadata strings update as expected;
- verify OG route still builds/renders.

## Next Recommended

Proceed to **Proposal** for Option A, after resolving how to handle the current unrelated `src/styles/home.css` formatting drift.
