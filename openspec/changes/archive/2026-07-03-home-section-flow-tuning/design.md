# Design: home-section-flow-tuning

## Status

Design complete.

## Decision

Use **CSS-only local section rhythm tuning**.

Do not change JSX, copy, component internals, data, or global responsive files.

Prefer local spacing on `.home-proof` and `.home-pipeline` instead of changing the parent `gap` broadly. Keep `.content__page--home { gap: 2.8rem; }` unchanged for now because it is stable and affects all Home section transitions equally.

## Source Scope

Allowed source file:

```txt
src/styles/home.css
```

Allowed selectors for this design:

```txt
.home-proof
.home-proof__heading
.home-proof__grid
.home-pipeline
@media (max-width: 1023px) .home-proof
@media (max-width: 1023px) .home-pipeline
@media (max-width: 767px) .home-proof
@media (max-width: 767px) .home-pipeline
@media (max-width: 480px) .home-proof
@media (max-width: 480px) .home-pipeline
```

No planned changes to:

```txt
.content__page--home
.home-hero
.case-card*
.control-room*
.home-pipeline__*
```

## Design Rationale

The parent Home gap already gives broad spacing, but local section spacing can clarify narrative transitions without disturbing every block.

Desired rhythm:

```txt
hero + control-room = brand promise / credibility
proof = evidence connected to hero
pipeline = compact system-summary close
```

## Concrete CSS Plan

### 1. Proof section anchor

Add a subtle top boundary to `.home-proof` so it feels like a continuation of the hero rather than a detached grid.

Current:

```css
.home-proof {
  position: relative;
  z-index: 1;
  width: 100%;
}
```

Change to:

```css
.home-proof {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 0.25rem;
}
```

Rationale:

- tiny local rhythm change;
- no visual decoration yet;
- keeps proof attached to parent flow.

### 2. Proof heading rhythm

Current heading has `margin-bottom: 1.6rem`.

Increase slightly:

```css
.home-proof__heading {
  margin-bottom: 1.8rem;
}
```

Rationale:

- gives the label more breathing room after recent proof-card hierarchy tuning;
- does not touch card internals.

### 3. Proof grid cadence

Current grid gap: `1.4rem`.

Tune slightly:

```css
.home-proof__grid {
  gap: 1.5rem;
}
```

Rationale:

- cards have more content now; slightly more air improves scan without making the section sparse.

### 4. Pipeline as closing summary

Add a local top margin to `.home-pipeline` so it reads as a summary after proof, not just the next equal-gap child.

Current `.home-pipeline` has no margin.

Add:

```css
.home-pipeline {
  margin-top: 0.25rem;
}
```

Rationale:

- small local emphasis on proof → pipeline transition;
- avoids changing parent `gap` for all sections.

### 5. Tablet rhythm

At `max-width: 1023px`, keep existing hero collapse and proof grid behavior. Add small local rhythm only:

```css
.home-proof {
  padding-top: 0;
}

.home-pipeline {
  margin-top: 0;
}
```

Rationale:

- parent stack already changes at tablet;
- do not amplify vertical height on collapsed layouts.

### 6. Mobile rhythm

At `max-width: 767px`, slightly tighten proof-grid cadence.

Current mobile proof grid becomes one column. Add:

```css
.home-proof__grid {
  gap: 1.1rem;
}
```

Rationale:

- one-column cards can otherwise feel too spaced after the hero and control-room;
- keeps page compact.

### 7. Small-mobile rhythm

At `max-width: 480px`, keep existing `.home-proof__heading` font-size and `.home-pipeline` padding. Add only if useful:

```css
.home-proof__heading {
  margin-bottom: 1.2rem;
}
```

Rationale:

- tightens heading-to-card transition on narrow screens.

## What We Deliberately Do Not Do

- No `.content__page--home` gap change.
- No `.home-hero` min-height change.
- No card padding/gap changes.
- No control-room changes.
- No pipeline internals changes.
- No decorative pseudo-elements or new surfaces.
- No animations.

This keeps the unit small and avoids reopening previous component decisions.

## Expected Source Diff

Expected source diff:

```txt
12–25 changed lines
```

Hard cap:

```txt
80 changed lines
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

Expected result:

```txt
src/styles/home.css
```

Additional guards:

- `git diff -- src/app/page.tsx` is empty.
- no `.case-card*` internals changed;
- no `.control-room*` changes;
- no `.home-pipeline__*` changes;
- no data/package/global responsive/global dark files changed;
- no roadmap/design-responsividad changes.

Smoke checks:

- desktop `/`: hero, proof, and pipeline render in order;
- desktop: proof heading, cards, and pipeline have readable rhythm;
- 390px and 360px: no horizontal overflow;
- mobile: one-column proof cards do not feel excessively spaced;
- dark mode remains readable;
- reduced-motion behavior remains unchanged.

## Rollback Plan

Rollback is a one-file CSS revert in:

```txt
src/styles/home.css
```

Remove only the local `.home-proof*` and `.home-pipeline` rhythm edits.

## Next Recommended

Proceed to **Tasks** with this small CSS-only local rhythm plan.
