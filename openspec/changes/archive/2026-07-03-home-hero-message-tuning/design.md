# Design: home-hero-message-tuning

## Status

Design complete.

## Decision

Use a **JSX-only microcopy change** for this unit.

Do not change CSS unless verification after Apply proves the updated copy causes readability or overflow issues.

This keeps the unit small and protects the previous visual work on proof cards, pipeline, and control-room.

## Source Scope

Primary source file:

```txt
src/app/page.tsx
```

Allowed JSX edits:

```txt
.home-hero__eyebrow text
.home-hero__role text
.home-hero__tagline text
secondary .home-hero__cta-link text
```

No CSS changes planned.

Fallback CSS source file only if verification proves it necessary:

```txt
src/styles/home.css
```

Allowed fallback CSS selectors only:

```txt
.home-hero__tagline
.home-hero__cta-link
@media (max-width: 480px) .home-hero__tagline
@media (max-width: 480px) .home-hero__cta-link
```

## Copy Design

### Eyebrow

Replace:

```txt
Arquitectura de software + IA aplicada
```

With:

```txt
Tecnología práctica + IA aplicada
```

Rationale:

- Broadens the brand beyond software architecture.
- Keeps AI present.
- Uses Spanish-forward wording.
- Still feels compatible with the technical Home visual.

### Role

Replace:

```txt
Arquitecto de software / Ingeniero IA
```

With:

```txt
Creador tech / Software / IA aplicada
```

Rationale:

- Introduces the creator/brand side.
- Keeps software and applied AI.
- Avoids over-claiming a single narrow service role.

### Tagline

Replace:

```txt
Diseño sistemas operativos con IA para ventas, soporte y conocimiento interno — automatizados, auditables y con control humano.
```

With:

```txt
Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.
```

Rationale:

- Names both people and businesses.
- Includes buying, repairing, automation, software, PCs/laptops, and AI.
- Preserves the “practical technology” umbrella.
- Keeps the sentence as one paragraph.

Risk:

- It is longer than the current tagline, so mobile smoke is required.

### Primary CTA

Keep unchanged:

```txt
Ver casos reales
```

Rationale:

- Proof-first is still the strongest primary action.
- It connects broader claims to evidence.

### Secondary CTA

Replace:

```txt
Diseñar un workflow conmigo
```

With:

```txt
Hablemos de tu solución
```

Rationale:

- Broader than workflow-only language.
- Spanish-forward.
- Still contact-oriented.
- Works for repairs, advice, automation, software, or AI.

## Why No CSS First

The existing CSS already supports:

- responsive clamp sizing for name, role, and tagline;
- centered mobile alignment;
- wrapped CTA layout;
- small-mobile tagline/CTA sizing.

Changing CSS preemptively would increase review surface without evidence. This unit should validate whether the copy alone fits.

## Responsive Expectations

Expected desktop behavior:

- name remains dominant;
- role remains secondary;
- tagline wraps across multiple readable lines;
- CTAs remain unchanged structurally.

Expected mobile behavior:

- text remains centered at `≤767px`;
- tagline may wrap into more lines but must remain readable;
- CTAs remain tappable and do not overflow;
- no horizontal overflow at 390px or 360px.

## Verification Design

Automated checks:

```txt
npm run lint
npm run build
git diff --check
```

Static guards:

```txt
git diff --name-only -- src
```

Expected source result for the happy path:

```txt
src/app/page.tsx
```

Expected no diff:

```txt
src/styles/home.css
src/data/projects.ts
docs/JUAN-FONTALVO-ROADMAP.md
openspec/specs/design-responsividad/
```

Smoke checks:

- desktop `/`: updated eyebrow, role, tagline, and CTAs visible;
- primary CTA text remains `Ver casos reales` and href remains `/casos-reales`;
- secondary CTA text becomes `Hablemos de tu solución` and href remains `/contacto`;
- control-room, proof cards, and pipeline still render;
- 390px and 360px: no horizontal overflow;
- mobile line breaks remain usable.

## Fallback Criteria

Only add CSS if one of these is observed after Apply:

1. tagline creates horizontal overflow;
2. CTA text wraps awkwardly or becomes visually cramped;
3. hero-left spacing becomes materially worse on mobile.

If fallback CSS is needed, keep it under `10` source changed lines and record the reason in apply-progress.

## Source Forecast

Happy path source forecast:

```txt
8–18 changed lines
```

Fallback source forecast with CSS:

```txt
18–30 changed lines
```

Hard source cap:

```txt
80 changed lines
```

## Rollback Plan

Rollback is a one-file JSX revert:

```txt
src/app/page.tsx
```

If fallback CSS is added, rollback the small hero selector edits in:

```txt
src/styles/home.css
```

## Next Recommended

Proceed to **Tasks** with a JSX-only happy path.
