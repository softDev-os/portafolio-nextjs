# Home Page Tuning Specification

## Purpose

Define the accepted behavior of the Home route `/` after shared `.btn` and focus primitives were adopted, preserving the "AI Operations Control Room" visual direction without route, data, content, JSX structure, global primitive, Tailwind/shadcn, or `design-responsividad` changes.

## Requirements

### Requirement: Home CTA Ownership After Button Primitive Adoption

Home page CTAs MUST use the shared `.btn` primitive layer for shared base shape behavior where that can be done without visible regression. Home-specific CTA typography, primary glow, secondary fill, hover/focus lift, visual weight, and hero emphasis MUST remain Home-owned and visually equivalent to the pre-tuning intent.

#### Scenario: Shared base shape remains safely owned by the button primitive

- GIVEN the Home CTAs render on `/`
- WHEN their button-like base shape is evaluated
- THEN shared base behaviors such as inline-flex alignment, rounded button shape, no text decoration, cursor affordance, and conservative transitions MUST be provided by the shared button primitive layer where safe
- AND Home-specific CTA classes MUST continue to supply Home-specific typography and visual emphasis

#### Scenario: Primary Home CTA keeps hero emphasis

- GIVEN the primary Home CTA is visible in the hero
- WHEN it is rendered, hovered, or keyboard-focused
- THEN it MUST preserve the Home-specific filled accent treatment, glow/shadow emphasis, and lift affordance
- AND no visible CTA regression from the previous Home visual intent MUST be introduced

#### Scenario: Secondary Home CTA keeps outline-to-fill behavior

- GIVEN the secondary Home CTA is visible in the hero
- WHEN it is rendered, hovered, or keyboard-focused
- THEN it MUST preserve the Home-specific secondary treatment, including readable outline/default state and fill/lift affordance on interaction
- AND no visible CTA regression from the previous Home visual intent MUST be introduced

### Requirement: Home Focus-Visible Preservation

Keyboard focus on Home CTAs MUST remain visible through the shared primitive focus-visible layer. Home tuning MUST NOT introduce global focus selectors or replace shared focus ownership with page-specific global rules.

#### Scenario: Keyboard Tab exposes visible focus on Home CTAs

- GIVEN a keyboard user is on the Home route `/`
- WHEN the user presses Tab until focus reaches each Home CTA
- THEN each CTA MUST show a visible focus indicator supplied by the shared focus-visible primitive layer
- AND the indicator MUST be visually distinguishable against the Home hero background in light and dark contexts

#### Scenario: Mouse interaction does not force keyboard focus styling

- GIVEN a pointer user clicks a Home CTA
- WHEN the CTA receives focus from mouse or touch interaction
- THEN keyboard-only focus styling SHOULD NOT be forced by Home-specific CSS
- AND shared `:focus-visible` behavior MUST remain the focus mechanism

#### Scenario: No global focus selector is added

- GIVEN the Home CSS is inspected
- WHEN focus rules are reviewed
- THEN no global `a:focus-visible`, `button:focus-visible`, or universal focus selector MUST be added for this domain
- AND any Home focus refinements MUST remain class-scoped and additive to the shared primitive behavior

### Requirement: Responsive Home Composition Preservation

The Home route MUST remain readable and stable across desktop, tablet, mobile, and small-mobile viewports. Desktop MUST preserve the two-column hero composition. Tablet and mobile MUST preserve the one-column composition. The control-room preview, proof cards, and pipeline MUST remain readable without introducing horizontal overflow. Page-level padding and overflow ownership MUST remain in the responsive foundation files.

#### Scenario: Desktop hero remains two-column

- GIVEN a desktop viewport renders `/`
- WHEN the Home hero is inspected
- THEN the hero MUST retain its two-column composition with the textual hero content and control-room preview presented side by side
- AND the "AI Operations Control Room" visual direction MUST remain recognizable

#### Scenario: Tablet and mobile hero remain one-column

- GIVEN a tablet or mobile viewport renders `/`
- WHEN the Home hero is inspected
- THEN the hero MUST collapse to a readable one-column composition
- AND CTA layout, hero text, and the control-room preview MUST remain usable without clipping or overlap

#### Scenario: Home support sections avoid horizontal overflow

- GIVEN tablet, mobile, and small-mobile viewports render `/`
- WHEN the control-room preview, proof-card grid, and pipeline are inspected
- THEN their content MUST remain readable within the viewport
- AND no horizontal page overflow attributable to Home tuning MUST be introduced

#### Scenario: Page-level responsive ownership is preserved

- GIVEN the stylesheet cascade is inspected
- WHEN responsive ownership is evaluated
- THEN page-level padding, overflow, shell scroll, and breakpoint ownership MUST remain in the existing responsive foundation files
- AND Home tuning MUST NOT move or redesign page-level responsive architecture

### Requirement: Dark-Mode and Reduced-Motion Preservation

Home tuning MUST preserve acceptable dark-mode contrast and MUST preserve reduced-motion behavior that suppresses Home entrance and pulse motion. Dark-mode adjustments MAY remain Home-local where they describe Home-specific visuals and MUST NOT become a broad global dark-mode architecture migration.

#### Scenario: Home dark mode remains readable

- GIVEN dark mode is active on `/`
- WHEN the hero, CTAs, control-room preview, proof cards, and pipeline are viewed
- THEN text, interactive affordances, decorative panels, and card surfaces MUST maintain acceptable visual contrast
- AND Home-specific visual identity MUST remain coherent with the current dark theme

#### Scenario: Reduced motion suppresses Home entrance and pulse motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the Home route renders
- THEN Home entrance animations, divider animation, control-room node pulse motion, data pulse motion, and CTA/card transition motion MUST be suppressed or minimized
- AND no newly introduced Home motion MUST bypass the existing reduced-motion behavior

#### Scenario: Dark-mode scope does not become global redesign

- GIVEN the Home CSS diff is reviewed
- WHEN dark-mode changes are inspected
- THEN any dark-mode adjustments MUST be limited to preserving or improving Home-specific readability and contrast
- AND the change MUST NOT migrate global dark-mode architecture or redesign shared dark tokens

### Requirement: Strict Scope and Non-Goal Enforcement

This domain MUST remain a Home page tuning pass, not a redesign. It MUST NOT change routes, data fetching, content modules, metadata, control flow, JSX structure, global primitives, Tailwind/shadcn setup, broad responsive architecture, or files under `openspec/specs/design-responsividad/`. `src/app/page.tsx` MUST remain unchanged.

#### Scenario: Source scope stays Home CSS first

- GIVEN the implementation is reviewed
- WHEN touched source files are inspected
- THEN `src/styles/home.css` MUST be the only source file changed
- AND `src/app/page.tsx` MUST remain unchanged

#### Scenario: No route, data, content, or control-flow change

- GIVEN the implementation diff is reviewed
- WHEN route files, data modules, metadata exports, content strings, and rendering control flow are inspected
- THEN no route, data, content, metadata, or control-flow changes MUST be present

#### Scenario: No global primitive redesign or framework migration

- GIVEN the implementation diff is reviewed
- WHEN CSS primitives and dependencies are inspected
- THEN shared `.btn` and focus primitives MUST NOT be redesigned as part of this domain
- AND no Tailwind utilities, Tailwind configuration, shadcn/ui imports, or shadcn components MUST be introduced

#### Scenario: Design-responsividad remains untouched

- GIVEN the implementation diff is reviewed
- WHEN changed file paths are inspected
- THEN no files under `openspec/specs/design-responsividad/` MUST be modified
- AND no undocumented responsive-system change MUST be present

### Requirement: Verification Gates

Verification MUST include lint, build, diff cleanliness, and Home route smoke checks for keyboard focus, dark mode, reduced motion, and mobile overflow.

#### Scenario: Automated verification passes

- GIVEN the implementation is complete
- WHEN `npm run lint`, `npm run build`, and `git diff --check` are executed
- THEN all commands MUST succeed with no new attributable errors, warnings, or whitespace errors

#### Scenario: Home route smoke verification passes

- GIVEN the implementation is complete
- WHEN `/` is checked with Playwright or manual smoke testing
- THEN the expected Home heading and CTAs MUST render
- AND Home CTAs MUST remain keyboard reachable and visibly focused on Tab
- AND dark-mode, reduced-motion, and mobile/small-mobile overflow checks MUST pass

#### Scenario: Scope verification passes

- GIVEN the implementation is complete
- WHEN the diff is audited
- THEN no non-goal changes to route/data/content/control-flow, JSX structure, global primitives, Tailwind/shadcn, broad responsive files, or `openspec/specs/design-responsividad/` MUST be present
