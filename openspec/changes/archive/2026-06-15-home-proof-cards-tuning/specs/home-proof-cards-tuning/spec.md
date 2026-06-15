# Home Proof Cards Tuning Specification

## Purpose

Define the accepted behavior for tuning the Home page proof cards so the “Casos reales” section reads as credible proof artifacts with explicit problem, observed-result, and stack hierarchy, without changing case-study data, Home page scope, global primitives, or unrelated responsive/dark-mode architecture.

## Requirements

### Requirement: Proof-Card Narrative Hierarchy

Each Home proof card MUST expose distinct problem, observed-result, and stack areas using the approved visible labels `Problema`, `Resultado observado`, and `Stack`. The hierarchy MUST make the observed result at least as scannable as the problem while preserving the current case title, optional existing metadata badge behavior, problem text, first outcome text, and stack values.

#### Scenario: Every proof card exposes approved labels

- GIVEN the Home route `/` renders the “Casos reales” proof section
- WHEN the proof cards are inspected
- THEN each card MUST show the visible labels `Problema`, `Resultado observado`, and `Stack`
- AND the labels MUST identify the current problem, first outcome, and stack content areas respectively

#### Scenario: Existing card values remain visible

- GIVEN the current flagship case-study data renders on `/`
- WHEN each proof card is inspected
- THEN the card title, problem text, first outcome text, and current stack values MUST remain visible
- AND those values MUST be sourced from the existing case-study data without rewriting their content

#### Scenario: Result reads as observed evidence

- GIVEN a proof card has an outcome value
- WHEN the outcome is rendered under `Resultado observado`
- THEN it MUST read as qualitative observed evidence
- AND the UI MUST NOT add metrics, guarantees, or stronger claims than the existing outcome text supports

### Requirement: Micro JSX Scope Constraints

Any JSX change for this domain MUST be limited to the internals of the `.home-proof` card rendering in `src/app/page.tsx`. The change MUST NOT alter routes, imports, metadata, rendering control flow outside the proof-card internals, or the source data module.

#### Scenario: JSX changes stay inside Home proof card internals

- GIVEN the implementation diff is reviewed
- WHEN `src/app/page.tsx` changes are inspected
- THEN any JSX structural change MUST be confined to elements rendered inside `.home-proof` proof cards
- AND JSX outside the Home proof-card internals MUST remain unchanged

#### Scenario: Data source and ordering are preserved

- GIVEN the implementation diff is reviewed
- WHEN data access and card rendering are inspected
- THEN the existing Home proof-card data source, card count, and card order MUST be preserved
- AND `src/data/projects.ts` MUST remain unchanged

#### Scenario: No fallback metadata badge is introduced

- GIVEN a proof card has no existing `metadataLabel`
- WHEN the card renders
- THEN no invented fallback metadata badge MUST be shown in this slice
- AND existing metadata badges MAY render only when already provided by the current data

#### Scenario: Route and control-flow behavior are unchanged

- GIVEN the implementation diff is reviewed
- WHEN route exports, imports, metadata, and render conditions are inspected
- THEN no route, metadata, import, data-fetching, or broad control-flow changes MUST be present

### Requirement: Home-Local CSS Scope

CSS changes for this domain MUST remain in `src/styles/home.css` and MUST target only `.home-proof*`, `.case-card*`, and necessary Home-local dark-mode, responsive, or reduced-motion support for those selectors. The change MUST NOT restyle Home hero, control-room, pipeline, CTA, global primitives, or application shell selectors.

#### Scenario: CSS selectors stay proof-card scoped

- GIVEN `src/styles/home.css` is inspected after implementation
- WHEN changed selectors are reviewed
- THEN new or modified selectors MUST be limited to `.home-proof*`, `.case-card*`, and necessary dark/responsive/reduced-motion wrappers for those selectors
- AND unrelated Home selectors MUST remain unchanged

#### Scenario: Unrelated Home sections are not restyled

- GIVEN the implementation diff is reviewed
- WHEN hero, control-room, pipeline, and CTA styles are inspected
- THEN no styling changes for those sections MUST be present
- AND the change MUST NOT redesign the Home page outside the proof-card area

#### Scenario: No global primitive or responsive foundation changes occur

- GIVEN changed files are inspected
- WHEN global CSS, primitive CSS, responsive foundation files, and `openspec/specs/design-responsividad/` are reviewed
- THEN none of those files or specifications MUST be modified by this domain

### Requirement: Responsive, Dark-Mode, and Reduced-Motion Preservation

The tuned proof cards MUST preserve the existing Home proof grid behavior across desktop, tablet, mobile, and small-mobile viewports. Dark mode MUST remain readable for any new proof-card surfaces or labels. Reduced-motion behavior MUST continue to suppress or minimize `.case-card` animation and transition motion.

#### Scenario: Existing grid behavior is preserved

- GIVEN desktop, tablet, and mobile viewports render `/`
- WHEN the Home proof section is inspected
- THEN the proof-card grid MUST preserve the intended three-column desktop, two-column tablet, and one-column mobile behavior
- AND no horizontal overflow attributable to proof-card tuning MUST be introduced

#### Scenario: Dark mode remains readable

- GIVEN dark mode is active on `/`
- WHEN the Home proof cards and any new labels or result surfaces are viewed
- THEN text, labels, card surfaces, borders, and stack pills MUST remain readable with acceptable contrast
- AND dark-mode adjustments MUST remain scoped to the Home proof-card selectors

#### Scenario: Reduced motion remains respected

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the Home proof cards render or are interacted with
- THEN `.case-card` animation and transition motion MUST be suppressed or minimized consistently with existing Home reduced-motion behavior
- AND no newly introduced proof-card motion MUST bypass the reduced-motion preference

#### Scenario: Mobile card density remains usable

- GIVEN 390px and 360px mobile viewports render `/`
- WHEN the proof cards are inspected
- THEN labels, problem text, observed result, and stack values MUST remain readable without clipping or horizontal page overflow
- AND the cards SHOULD remain compact enough not to obscure the surrounding Home narrative

### Requirement: Strict Non-Goals and Source Budget Enforcement

This domain MUST remain a focused Home proof-card tuning unit. Source changes MUST be limited to `src/app/page.tsx` and `src/styles/home.css`. The preferred source fail-stop threshold is more than 150 changed lines, and the hard review budget is at or below 300 changed source lines unless explicit approval is obtained before Apply.

#### Scenario: Source file scope is enforced

- GIVEN the implementation diff is reviewed
- WHEN changed source files are listed
- THEN only `src/app/page.tsx` and `src/styles/home.css` MAY be changed under `src/`
- AND no data, route, global style, primitive, component library, or responsive foundation source files MUST be changed

#### Scenario: Preferred fail-stop threshold is honored

- GIVEN the Apply forecast or implementation diff exceeds 150 changed source lines
- WHEN the workflow reaches or approaches Apply
- THEN the workflow MUST pause for an explicit delivery decision before continuing
- AND the default recommendation SHOULD be to split or reduce scope

#### Scenario: Hard review budget is honored

- GIVEN the implementation diff is measured
- WHEN changed source lines are counted
- THEN the source diff MUST be at or below 300 changed lines
- OR explicit approval MUST be recorded before exceeding that budget

#### Scenario: Product non-goals remain excluded

- GIVEN the implementation diff is reviewed
- WHEN content data, case studies, case order, images, hero, control-room, pipeline, CTA, Tailwind/shadcn, and `design-responsividad` paths are inspected
- THEN no changes in those non-goal areas MUST be present

### Requirement: Verification Gates

Verification for this domain MUST include lint, build, diff cleanliness, static scope guards, and Home proof-card smoke checks covering card count, labels, current values, dark mode, reduced motion, and mobile overflow.

#### Scenario: Automated verification succeeds

- GIVEN the implementation is complete
- WHEN `npm run lint`, `npm run build`, and `git diff --check` are executed
- THEN all commands MUST succeed with no new attributable errors, warnings, or whitespace errors

#### Scenario: Static guard verification succeeds

- GIVEN the implementation diff is complete
- WHEN static guards inspect changed files and content
- THEN only `src/app/page.tsx` and `src/styles/home.css` MAY be changed under `src/`
- AND `src/data/projects.ts`, route metadata, imports unrelated to the proof cards, project data, global primitives, responsive foundation files, and `openspec/specs/design-responsividad/` MUST remain unchanged

#### Scenario: Home proof-card smoke verification succeeds

- GIVEN `/` is checked with Playwright or manual smoke testing
- WHEN the Home proof section is inspected
- THEN the proof heading MUST render
- AND exactly three proof cards MUST render from the current flagship data
- AND every card MUST show `Problema`, `Resultado observado`, and `Stack`
- AND each card MUST render its existing title, problem, first outcome, and stack values

#### Scenario: Environment smoke verification succeeds

- GIVEN `/` is checked in representative environments
- WHEN dark mode, reduced motion, and 390px/360px mobile viewports are tested
- THEN proof cards MUST remain readable in dark mode
- AND proof-card motion MUST remain suppressed or minimized under reduced motion
- AND mobile proof cards MUST not introduce horizontal overflow
