# Design: brand-surface-alignment

## Status

Design complete.

## Decision

Use a **copy/metadata-only alignment pass** across four public surfaces:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

No CSS, data, layout, route, or component structure changes.

## Pre-Apply Blocker

Current working tree includes unrelated source drift:

```txt
M src/styles/home.css
```

This unit MUST NOT include that file.

Before Apply, resolve it explicitly. Recommended happy path if the drift is accidental:

```bash
git restore src/styles/home.css
```

If the user does not approve reverting it, stop before Apply and ask how to handle it. Do not mix it into this unit.

## Source Scope

Allowed source files:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Allowed change types:

- static metadata strings;
- OpenGraph image visible text and alt text;
- visible public copy on Contact and Blog;
- existing constant string arrays used for public copy.

No new imports expected.

## Exact Copy Design

### 1. Home metadata — `src/app/page.tsx`

Current:

```txt
Title:
Juan Fontalvo — Arquitectura de software e IA aplicada

Description:
Consultoría en arquitectura de software y automatización con IA basada en casos reales.
```

Replace with:

```txt
Title:
Juan Fontalvo — Tecnología práctica, software e IA aplicada

Description:
Soluciones tech para personas y negocios: PCs, laptops, reparaciones, software, automatización e IA aplicada con casos reales.
```

Rationale:

- aligns with the broader Home hero;
- keeps software/AI present;
- adds PCs/laptops/repairs/practical tech;
- still points to proof via “casos reales”.

### 2. OpenGraph image — `src/app/opengraph-image.tsx`

Current:

```txt
alt:
Juan Fontalvo — Arquitecto de software / Ingeniero IA

Top label:
Architect / AI Engineer

Subtitle:
Automatización con IA · Workflows operativos · Prueba real antes del contacto
```

Replace with:

```txt
alt:
Juan Fontalvo — Tecnología práctica + IA aplicada

Top label:
Creador tech / Software / IA aplicada

Subtitle:
PCs · Laptops · Software · Automatización · Soluciones reales
```

Rationale:

- Spanish-forward;
- shorter and broader;
- avoids English-only role framing;
- should fit existing OG layout without style changes.

### 3. Contact page — `src/app/contacto/page.tsx`

#### Metadata description

Current:

```txt
Contacto calificado para consultas de automatización con IA y arquitectura de software.
```

Replace with:

```txt
Contacto para soluciones tech, software, automatización, IA aplicada, PCs y laptops.
```

#### Inquiry steps

Current:

```txt
Comparte qué proceso querés automatizar y qué canal usa hoy tu equipo.
Incluí volumen aproximado, dolores operativos y restricciones importantes.
Si el caso encaja, seguimos por una conversación directa con alcance claro.
```

Replace with:

```txt
Contame qué problema tech, equipo, proyecto o proceso querés resolver.
Incluí contexto útil: dispositivo, flujo actual, urgencia, presupuesto o restricciones.
Si el alcance encaja, seguimos por WhatsApp con una conversación directa y clara.
```

#### Contact intro

Current:

```txt
El primer paso comercial es el bot de WhatsApp: permite capturar contexto mínimo, calificar la consulta y decidir si corresponde avanzar a una conversación directa con alcance claro.
```

Replace with:

```txt
El primer paso es WhatsApp: permite entender el contexto, ordenar la consulta y decidir si conviene avanzar con una solución clara.
```

#### Primary WhatsApp CTA

Current:

```txt
Abrir WhatsApp de ventas
```

Replace with:

```txt
Consultar por WhatsApp
```

#### Fine print

Current:

```txt
Los canales personales quedan como respaldo. La priorización por WhatsApp ayuda a separar consultas de negocio de conversaciones personales o soporte no relacionado.
```

Replace with:

```txt
Los canales personales quedan como respaldo. WhatsApp ayuda a ordenar solicitudes de tecnología, reparación, software o automatización sin mezclar conversaciones personales.
```

Rationale:

- contact accepts broader tech needs;
- still asks for concrete context;
- preserves WhatsApp-first behavior;
- avoids business-only “ventas” framing.

### 4. Blog page — `src/app/blog/page.tsx`

#### Metadata description

Current:

```txt
Notas sobre automatización con IA, arquitectura de software y workflows operativos.
```

Replace with:

```txt
Notas sobre tecnología práctica, PCs, laptops, IA, software, automatización y soluciones reales.
```

#### Blog intro

Current:

```txt
Notas sobre automatización con IA, workflows operativos y patrones de arquitectura que aplico en proyectos reales.
```

Replace with:

```txt
Notas sobre tecnología práctica, PCs, laptops, IA, software y automatización aplicadas a problemas reales.
```

#### Bottom next-step paragraph

Current:

```txt
Si una nota conecta con un problema de tu operación, revisá los casos o abrí una consulta calificada por WhatsApp.
```

Replace with:

```txt
Si una nota conecta con un problema o decisión tech, revisá los casos o abrí una consulta por WhatsApp.
```

#### Contact CTA

Current:

```txt
Consultar por WhatsApp
```

Keep unchanged.

Rationale:

- broadens Blog as content hub;
- keeps AI/software/automation;
- adds practical tech and equipment topics;
- preserves proof/contact flow.

## What We Deliberately Do Not Do

- Do not edit `src/app/credenciales/page.tsx` in this unit.
- Do not edit blog article data.
- Do not edit case-study data.
- Do not edit `src/data/personal.ts` or contact URL behavior.
- Do not edit CSS or layout.
- Do not update roadmap docs.

## Expected Source Diff

Expected source files:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Expected source diff:

```txt
35–75 changed lines
```

Hard source cap:

```txt
120 changed lines
```

## Verification Design

Automated:

```txt
npm run lint
npm run build
git diff --check
```

Static guards:

```txt
git diff --name-only -- src
```

Expected files only:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

Must be empty / unchanged:

```txt
src/styles/home.css
src/data/**
package.json
package-lock.json
docs/JUAN-FONTALVO-ROADMAP.md
openspec/specs/design-responsividad/
```

Smoke checks:

- `/` builds/renders after metadata update;
- `/contacto` renders broader contact copy and WhatsApp CTA;
- `/blog` renders broader intro and next-step copy;
- `/opengraph-image` builds/renders without error;
- no CSS/layout visual regression is expected because no CSS is changed.

## Rollback Plan

Rollback is copy-only:

```txt
src/app/page.tsx
src/app/opengraph-image.tsx
src/app/contacto/page.tsx
src/app/blog/page.tsx
```

No generated assets or data migrations are involved.

## Next Recommended

Proceed to **Tasks**, with an explicit first task to resolve `src/styles/home.css` drift before Apply.
