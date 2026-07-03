# Explore: home-hero-message-tuning

## Status

Exploration complete.

## Goal

Explore the next Home tuning unit after `home-control-room-tuning`: the left-side hero message and its visual hierarchy.

The intent is to balance the newly polished AI operations-center visual on the right with a sharper, clearer message on the left.

## Discovery Method

- Used CodeGraph first to map the Home hero JSX and related symbols.
- Read the targeted Home hero CSS sections in `src/styles/home.css`.
- No source edits were made.

## Current Source Map

Primary JSX source:

```txt
src/app/page.tsx
```

Current hero-left structure:

```tsx
<header className="home-hero__left">
  <p className="home-hero__eyebrow">Arquitectura de software + IA aplicada</p>
  <h1 className="page__name home-hero__name">Juan <span>Fontalvo</span></h1>
  <p className="page__job home-hero__role">Arquitecto de software / Ingeniero IA</p>
  <div className="home-hero__divider" aria-hidden="true" />
  <p className="home-hero__tagline">...</p>
  <div className="home-hero__cta">...</div>
</header>
```

Current text:

- Eyebrow: `Arquitectura de software + IA aplicada`
- Name: `Juan Fontalvo`
- Role: `Arquitecto de software / Ingeniero IA`
- Tagline: `Diseño sistemas operativos con IA para ventas, soporte y conocimiento interno — automatizados, auditables y con control humano.`
- Primary CTA: `Ver casos reales`
- Secondary CTA: `Diseñar un workflow conmigo`

Primary CSS source:

```txt
src/styles/home.css
```

Relevant selector families:

```txt
.home-hero
.home-hero__left
.home-hero__eyebrow
.home-hero .page__name.home-hero__name
.home-hero__name-highlight
.home-hero .page__job.home-hero__role
.home-hero__divider
.home-hero__tagline
.home-hero__cta
.home-hero__cta-link
.home-hero__cta-link--primary
.home-hero__cta-link--secondary
@media (max-width: 1023px) .home-hero*
@media (max-width: 767px) .home-hero*
@media (max-width: 480px) .home-hero*
```

## Current Behavior

### Desktop

- `.home-hero` is a two-column grid with text on the left and the control-room visual on the right.
- `.home-hero__left` is vertically centered and fades in.
- Name has strong scale and highlight treatment.
- Role is uppercase, lighter-weight, and letter-spaced.
- Tagline is readable but long.
- CTAs already use shared `.btn` primitives and custom Home hover emphasis.

### Tablet/mobile

- At `max-width: 1023px`, hero collapses to one column and `.home-hero__right` moves above the text.
- At `max-width: 767px`, the hero-left text centers and CTAs center.
- At `max-width: 480px`, eyebrow, tagline, and CTA link sizes are adjusted.

## Fit With Recent Units

Recent Home units made the visual side stronger:

- proof cards now communicate problem/result/stack more clearly;
- pipeline now wraps better and visually connects to proof cards;
- control-room now has a stronger AI operations-center treatment.

The left hero message has not yet been tuned to match that increased visual confidence.

## Observations

### What already works

- The current message is directionally correct: software architecture, applied AI, operations, human control.
- Primary CTA `Ver casos reales` is strong because it sends users to proof.
- The tagline already bridges to the control-room metaphor.
- Existing CSS structure is clean enough for a small scoped unit.

### What feels weaker now

- The hero-left text may read slightly generic compared with the now stronger operations-center visual.
- `Ingeniero IA` is understandable, but the public positioning could be sharpened around operations and systems.
- `Diseñar un workflow conmigo` is actionable but mixes English and Spanish and may feel less premium than the new visual direction.
- The tagline is dense: it says many correct things, but the first-read value proposition could be more immediate.
- CSS hierarchy may need small spacing/type refinements after any copy adjustment.

## Opportunity

This unit can make the left hero answer faster:

1. What does Juan do?
2. For whom / in what area?
3. Why trust the system?
4. Where should the visitor click next?

The right panel already says “operations system”. The left copy should not fight it; it should name the promise clearly.

## Recommended Direction

Recommended option: **microcopy + CSS hierarchy tuning**.

Expected source files:

```txt
src/app/page.tsx
src/styles/home.css
```

Expected changes:

- refine eyebrow/role/tagline/secondary CTA wording;
- keep name and primary CTA stable;
- tune hero-left spacing/type only if the new copy needs it;
- preserve current layout and responsive ownership.

Expected source diff:

```txt
20–60 changed lines
```

Hard source cap:

```txt
80 changed lines
```

## Alternatives

### Option A — CSS-only hierarchy polish

Only tune spacing/type in `src/styles/home.css`.

Pros:

- Lowest risk.
- Keeps copy stable.

Cons:

- Does not solve the core issue if the message itself feels less sharp than the visual.

### Option B — Microcopy + CSS hierarchy polish — recommended

Tune a few visible strings plus minimal CSS.

Pros:

- Best fit for the current gap.
- Makes the hero message match the AI operations-center visual.
- Still small and reviewable.

Cons:

- Requires product/copy decision before Proposal.

### Option C — Full hero narrative rewrite

Rewrite hero positioning, CTA strategy, and possibly downstream proof alignment.

Pros:

- Strongest brand repositioning potential.

Cons:

- Too big for this component-by-component flow.
- Risks mixing with the separate roadmap/CV workstream.

## Recommended Non-Goals

This unit should not:

- touch proof cards, pipeline, or control-room CSS;
- touch data files or routes outside Home;
- touch `docs/JUAN-FONTALVO-ROADMAP.md` unless the user explicitly brings the roadmap workstream into scope;
- touch `openspec/specs/design-responsividad/`;
- change button primitive architecture;
- add dependencies;
- redesign the full Home layout.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Copy becomes too abstract | High | Keep the promise concrete: systems, operations, sales/support/knowledge, human control. |
| Copy becomes too salesy | Medium | Preserve proof-first CTA and measured tone. |
| Scope creeps into roadmap/brand strategy | High | Keep this unit limited to Home hero message. |
| Mobile line breaks worsen | Medium | Verify 390px and 360px after any copy change. |
| Mixed Spanish/English feels inconsistent | Medium | Decide deliberately whether `workflow` stays or becomes Spanish. |

## Verification Ideas

For later Apply/Verify:

- `npm run lint`
- `npm run build`
- `git diff --check`
- static guard: source diff limited to `src/app/page.tsx` and/or `src/styles/home.css`
- static guard: no proof/control-room/pipeline/data/global changes
- smoke `/` desktop, 390px, 360px:
  - hero message visible;
  - CTAs visible;
  - no horizontal overflow;
  - control-room/proof/pipeline still render;
  - mobile line breaks acceptable.

## Product Questions for Proposal

Before Proposal, resolve one product/copy direction:

- Should the hero lean more toward **AI operations systems for businesses** or toward the broader **Juan Fontalvo tech creator / solutions** brand?

## Next Recommended

Proceed to **Proposal** after confirming the copy direction. Recommended default: keep this unit focused on AI operations systems for businesses, because that matches the current Home proof/control-room/pipeline architecture.
