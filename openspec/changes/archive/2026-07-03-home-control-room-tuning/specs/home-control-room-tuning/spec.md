# Specification: home-control-room-tuning

## Status

Draft spec complete.

## Purpose

Tune the Home hero `.control-room` decorative visual so it reads as a premium **AI operations center**, while preserving the existing raw CSS architecture and keeping the unit small enough to review comfortably.

## Scope

### In scope

The implementation MUST be limited to CSS in:

```txt
src/styles/home.css
```

Allowed selector families:

```txt
.control-room
.control-room::before
.control-room__label
.control-room__grid
.control-room__node
.control-room__node--intake
.control-room__node--triage
.control-room__node--handoff
.control-room__node--audit
.control-room__icon
.control-room__node-label
.control-room__node-desc
.control-room__node::after
.control-room__line*
.control-room__pulse*
.control-room__footer
[data-theme="dark"] .control-room*
@media (...) .control-room*
```

`.home-hero__right` MAY be changed only if Design proves a wrapper-level adjustment is required for the control-room visual.

### Out of scope

The implementation MUST NOT:

- edit `src/app/page.tsx`;
- change JSX structure;
- change labels, descriptions, icons, routes, metadata, or data;
- change hero text, CTA, proof cards, pipeline, sidebar, layout foundation, visual primitives, or global dark-mode files;
- add Tailwind, shadcn, canvas, SVG systems, dependencies, or JS animation;
- alter `openspec/specs/design-responsividad/`;
- remove or weaken the decorative `aria-hidden="true"` wrapper.

## Requirements

### Requirement: CSS-only AI operations-center polish

The system MUST make the existing `.control-room` block feel more like a polished AI operations center through scoped CSS-only visual tuning.

#### Scenario: Panel has stronger operations-center presence

- WHEN the Home page renders on desktop
- THEN the `.control-room` panel SHOULD feel more premium and technical than a flat card
- AND this SHOULD be achieved through low-noise CSS treatments such as layered surface depth, subtle gradients, refined borders, shadows, and a clearer top accent
- AND the panel MUST remain visually compatible with the existing gold/teal/blueprint brand direction.

#### Scenario: Visual treatment remains controlled

- WHEN the control-room visual is tuned
- THEN the result MUST NOT become visually noisy, cluttered, or disconnected from the rest of Home
- AND the treatment MUST remain secondary to the main hero message and CTAs.

### Requirement: Existing markup and content are preserved

The system MUST preserve the current decorative control-room markup and content.

#### Scenario: JSX remains unchanged

- WHEN the implementation is complete
- THEN `git diff -- src/app/page.tsx` MUST be empty
- AND the `.home-hero__right` wrapper MUST still contain `aria-hidden="true"` in the committed source.

#### Scenario: Control-room text and symbols remain unchanged

- WHEN the implementation is complete
- THEN the following visible strings MUST remain unchanged:
  - `Flujo operativo`
  - `Intake`
  - `Mensaje entrante`
  - `AI Triage`
  - `Clasificación automática`
  - `Human Handoff`
  - `Decisión con contexto`
  - `Audit Trail`
  - `Memoria persistente`
  - `Control humano en cada decisión crítica`
- AND the existing node symbols MUST remain unchanged:
  - `◉`
  - `◇`
  - `▣`
  - `◈`.

### Requirement: Node hierarchy is clearer

The system MUST improve the scan rhythm of the four operation nodes without changing their layout model.

#### Scenario: Four-node grid remains readable

- WHEN the Home page renders at desktop and tablet widths
- THEN the four `.control-room__node` items MUST remain visible in the existing 2x2 grid
- AND node labels MUST remain visually stronger than descriptions
- AND node descriptions MUST remain readable without requiring interaction.

#### Scenario: Accent roles remain recognizable

- WHEN the nodes render
- THEN intake/triage MUST retain the primary/gold operational accent
- AND handoff/audit MUST retain a distinct secondary/tertiary accent
- AND dark mode MUST preserve sufficient contrast for both accent groups.

### Requirement: Connector and pulse treatment supports flow

The system MUST preserve the existing connector/pulse concept while making it feel intentional and controlled.

#### Scenario: Connectors stay inside the panel

- WHEN the Home page renders at desktop, 390px, and 360px widths
- THEN `.control-room__line*` and `.control-room__pulse*` elements MUST NOT visually escape the `.control-room` panel
- AND they MUST NOT create horizontal overflow.

#### Scenario: Connector geometry is not rewritten without need

- WHEN Design and Apply are performed
- THEN connector geometry SHOULD remain based on the existing `.control-room__line--h1`, `.control-room__line--v1`, `.control-room__line--h2`, `.control-room__pulse--h1`, `.control-room__pulse--v1`, and `.control-room__pulse--h2` structure
- AND changes SHOULD prefer color, opacity, glow, or layering refinements over positional rewrites.

### Requirement: Responsive behavior remains stable

The system MUST preserve responsive stability for the control-room block.

#### Scenario: Tablet layout remains intact

- WHEN viewport width is at or below `1023px`
- THEN `.home-hero__right` MUST continue to render above the hero text via the existing responsive ownership
- AND the control-room block MUST remain centered and readable.

#### Scenario: Mobile layout remains compact and non-overflowing

- WHEN viewport width is `390px` or `360px`
- THEN the four nodes MUST remain visible
- AND the panel MUST NOT cause horizontal overflow
- AND the implementation SHOULD first tune `.control-room*` padding, gap, font size, and node spacing before considering layout changes.

#### Scenario: One-column fallback is not introduced by default

- WHEN Design is written
- THEN a one-column `.control-room__grid` fallback MUST NOT be selected unless the design records concrete evidence that the 2x2 grid cannot remain readable at small widths.

### Requirement: Dark mode parity is preserved and improved

The system MUST keep dark mode readable and cohesive with the tuned operations-center visual.

#### Scenario: Dark panel remains layered and readable

- GIVEN `[data-theme="dark"]` is active
- WHEN the Home page renders
- THEN `.control-room`, `.control-room__node`, `.control-room__line*`, `.control-room::before`, and `.control-room__footer` MUST remain readable
- AND tuned dark styles MUST be limited to `[data-theme="dark"] .control-room*` selectors.

#### Scenario: No global dark-mode changes

- WHEN the implementation is complete
- THEN no global dark-mode source file SHOULD be changed for this unit
- AND unrelated dark-mode selectors MUST remain untouched.

### Requirement: Reduced motion is preserved

The system MUST preserve existing reduced-motion protections.

#### Scenario: Animations are disabled under reduced motion

- GIVEN the user prefers reduced motion
- WHEN the Home page renders
- THEN `.home-hero__right` entrance animation MUST remain disabled
- AND `.control-room__node::after` animation MUST remain disabled
- AND `.control-room__pulse` elements MUST remain hidden.

#### Scenario: No new unmanaged animation

- WHEN Apply adds or changes CSS effects
- THEN it MUST NOT introduce new animations or transitions that bypass the existing `prefers-reduced-motion: reduce` guard.

### Requirement: Review workload stays small

The system MUST keep this unit small and reviewable.

#### Scenario: Source diff stays inside budget

- WHEN Design forecasts implementation size
- THEN preferred source changed lines SHOULD be between `35` and `75`
- AND source changed lines MUST stay under `100`
- AND the full unit MUST stay under the `300` changed-line review budget unless the user explicitly approves an exception.

#### Scenario: Scope guard passes

- WHEN verification runs
- THEN `git diff --name-only -- src` MUST show only `src/styles/home.css`
- AND `git diff -- src/app/page.tsx` MUST be empty
- AND no source diff SHOULD touch proof cards, pipeline, CTAs, global primitives, layout foundation, data files, dependencies, or `openspec/specs/design-responsividad/`.

## Verification Requirements

The implementation MUST pass:

```txt
npm run lint
npm run build
git diff --check
```

The implementation SHOULD include a Home smoke check covering:

- desktop control-room visibility;
- four nodes visible;
- connector/pulse elements present and contained;
- 390px and 360px no-horizontal-overflow checks;
- dark-mode readability;
- reduced-motion behavior.

## Next Recommended

Proceed to **Design** with a CSS-only implementation plan and a source forecast under `100` changed lines.
