# Button Focus Primitives Specification

## Purpose

Define a minimal raw-CSS button primitive (`.btn` base and conservative variants) and a normalized keyboard focus-visible quality bar for in-scope interactive selectors, without redesigning page-level hover, color, sizing, responsive layout, or dark-mode behavior.

## Requirements

### Requirement: Button Primitive Base Ownership

The system provides a reusable, low-specificity `.btn` CSS class in `primitives.css` that owns only the shared base shape properties common across existing button-like elements:

- `display: inline-flex`
- `align-items: center`
- `justify-content: center`
- `gap: 0.6rem`
- `padding: 1rem 2.4rem`
- `border-radius: 3.2rem`
- `text-decoration: none`
- `cursor: pointer`
- `transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease`

`.btn` MUST NOT set `background`, `color`, `border`, `box-shadow`, `font-size`, or `font-weight`, because those properties vary intentionally by page and variant. `.btn` MUST NOT own page layout, responsive breakpoints, or responsive sizing retuning.

#### Scenario: Base shape is applied additively

- GIVEN a page element adopts the `.btn` class in addition to its existing page-owned classes
- WHEN the element renders
- THEN the element MUST receive inline-flex layout, centered alignment, rounded corners, no text decoration, a pointer cursor, and a conservative transition baseline
- AND page-owned colors, sizing, borders, backgrounds, shadows, and hover behavior MUST continue to apply as before

#### Scenario: Base shape does not force color or background

- GIVEN a `.btn` element also carries a page-specific class that sets `background: var(--principal-color)` and `color: #0c0d1c`
- WHEN the cascade resolves
- THEN `.btn` MUST NOT override those color and background values
- AND the element MUST render with the page-specified colors

#### Scenario: Base shape does not force sizing

- GIVEN two button elements both carry `.btn` but have different page-specific `font-size`, `padding`, or `border-radius` declarations
- WHEN both elements render side by side
- THEN `.btn` MUST NOT normalize their font-size, padding, or border-radius
- AND each element MUST render at its page-specified size

### Requirement: Minimal Button Variants

The system provides `.btn--primary` and `.btn--outline` variant classes in `primitives.css`. Each variant sets only the minimum properties needed to distinguish it and does not duplicate base shape properties already owned by `.btn`. Variants MUST NOT own hover, active, dark-mode, or responsive behavior.

`.btn--primary` sets `background: var(--principal-color)`, `color: #0c0d1c`, `border: 0`.

`.btn--outline` sets `background: transparent`, `border: 2px solid var(--terciario-color)`, `color: var(--terciario-color)`.

`.btn--subtle` is explicitly deferred: error/not-found opacity-hover and blog back-link patterns are not stable enough to justify a shared variant in this slice.

#### Scenario: Primary variant provides filled accent treatment

- GIVEN an element carries both `.btn` and `.btn--primary`
- WHEN the element renders
- THEN `.btn--primary` MUST supply a filled background and contrasting text color
- AND page-specific hover lift, shadow, or transition overrides MUST continue to apply from the page stylesheet

#### Scenario: Outline variant provides transparent-plus-border treatment

- GIVEN an element carries both `.btn` and `.btn--outline`
- WHEN the element renders
- THEN `.btn--outline` MUST supply a transparent background and a visible border
- AND page-specific hover fill or color-change behavior MUST continue to apply from the page stylesheet

#### Scenario: Variant is skipped when no safe existing pattern exists

- GIVEN no existing page-owned element uses a matching variant pattern
- WHEN the variant is evaluated for creation
- THEN the variant MUST NOT be created just to fill out the variant set
- AND only variants justified by existing page patterns MAY be included

### Requirement: Focus-Visible Keyboard Quality Bar

The following interactive selectors receive an explicit `:focus-visible` keyboard-focus treatment via a shared gold-ring rule in `primitives.css`:

- `.btn:focus-visible`
- `.nav-float__link:focus-visible`
- `.home-hero__cta-link:focus-visible`
- `.contact__data:focus-visible`
- `.footer__link:focus-visible`
- `.footer__social-link:focus-visible`
- `.form__button:focus-visible`
- `.error-btn-primary:focus-visible`
- `.error-btn-secondary:focus-visible`
- `.not-found__link:focus-visible`
- `.portfolio__link:focus-visible`
- `.blog-article__back:focus-visible`
- `.article__link:focus-visible`

The `:focus-visible` treatment applies a keyboard-only visible focus ring using the established gold-ring style: `outline: 0.3rem solid var(--principal-color); outline-offset: 0.35rem; box-shadow: 0 0 0 0.6rem rgba(247, 185, 53, 0.18)`. It MUST NOT trigger on mouse or touch interaction.

`.sidebar__theme-toggle:focus-visible` remains under `sidebar.css` ownership with a white outline (`outline: 2px solid #fff; outline-offset: 2px;`) and is explicitly excluded from the gold-ring group.

#### Scenario: Missing selectors gain visible keyboard focus

- GIVEN a keyboard user Tabs through the application
- WHEN focus lands on any of `.form__button`, `.error-btn-primary`, `.error-btn-secondary`, `.not-found__link`, `.portfolio__link`, `.blog-article__back`, or `.article__link`
- THEN a visible gold-ring focus indicator MUST appear around that element
- AND the ring MUST disappear when focus moves away

#### Scenario: Gold ring is the default treatment

- GIVEN the focus-visible treatment is applied to an in-scope selector
- WHEN the element receives keyboard focus
- THEN the focus ring MUST use the established gold-ring visual pattern
- OR an explicit, documented component-specific reason MUST justify a different treatment

#### Scenario: Mouse click does not show focus ring

- GIVEN a user clicks any in-scope element with a mouse
- WHEN the click activates the element
- THEN no focus ring MUST appear as a result of the mouse click alone
- AND `:focus-visible` behavior MUST remain keyboard-only

#### Scenario: Previously covered selectors retain their treatment

- GIVEN `.home-hero__cta-link`, `.nav-float__link`, `.contact__data`, `.footer__link`, and `.footer__social-link` already had `:focus-visible` treatment in the legacy sidebar.css group
- WHEN the focus group was moved to `primitives.css`
- THEN these selectors MUST retain visible keyboard focus
- AND the transition to primitive-owned focus grouping MUST NOT cause a visual regression

#### Scenario: Sidebar theme toggle retains independent focus

- GIVEN `.sidebar__theme-toggle` is the sidebar theme toggle button
- WHEN it receives keyboard focus
- THEN its focus indicator MUST remain a white outline (`outline: 2px solid #fff; outline-offset: 2px;`)
- AND it MUST NOT be part of the gold-ring group

### Requirement: No Global Link or Button Restyle

The implementation MUST NOT add global `a:focus-visible`, `button:focus-visible`, `a:hover`, or `button:hover` rules that restyle all links or all buttons across every page. Focus-visible normalization targets only explicitly listed candidate selectors.

#### Scenario: Global selector rules are absent

- GIVEN the implementation CSS is inspected
- WHEN the stylesheet text is searched
- THEN no global `a:focus-visible` or `button:focus-visible` rule that targets all links or all buttons MUST be present
- AND no `a:hover` or `button:hover` normalization rule MUST be present

#### Scenario: Non-targeted links and buttons are unaffected

- GIVEN a link or button that is not in the in-scope candidate list
- WHEN a keyboard user Tabs to that element
- THEN the focus-visible behavior of that element MUST remain what it was before this change
- AND the implementation MUST NOT accidentally alter its focus treatment

### Requirement: TSX Additive Class-Name Constraint

Any TSX file change in this domain MUST be limited to adding one or more CSS class names to an existing element's `className` attribute. No content, data, control flow, component extraction, route logic, metadata, or structural markup changes are permitted in TSX files.

#### Scenario: TSX change is class-name-only

- GIVEN a TSX file is modified to adopt `.btn` or a variant class
- WHEN the diff is reviewed
- THEN the change MUST consist solely of appending one or more class name literals to an existing `className` attribute
- AND no JSX structure, conditional rendering, data access, or content changes MUST be present

#### Scenario: No component extraction or refactoring

- GIVEN the implementation touches TSX files
- WHEN the diff is reviewed
- THEN no new React component, hook, or utility function MUST be introduced
- AND no existing component MUST be extracted, renamed, restructured, or refactored

### Requirement: Page-Specific Behavior Preservation

Page-specific hover behavior, active states, color choices, sizing exceptions, border-radius differences, dark-mode overrides, and responsive adjustments MUST remain intact and owned by their existing page stylesheets. The `.btn` primitive and focus-visible normalization MUST NOT homogenize these page-level design differences.

#### Scenario: Home hero CTA hover lift is preserved

- GIVEN `.home-hero__cta-link--primary` has a `:hover { transform: translateY(-3px); box-shadow: ... }` rule in `home.css`
- WHEN `.btn` is present on the CTA element's class list
- THEN the hover lift and shadow MUST still apply on hover
- AND the behavior MUST originate from `home.css`, not from `primitives.css`

#### Scenario: Error button opacity hover is preserved

- GIVEN `.error-btn-primary` has `:hover { opacity: 0.85 }` in `error.css`
- WHEN `.btn` or a variant is added to the error button's class list
- THEN the opacity hover MUST still apply
- AND the behavior MUST originate from `error.css`

#### Scenario: Portfolio filter link active state is preserved

- GIVEN `.portfolio__link` has an active-state treatment in `portfolio.css`
- WHEN focus-visible normalization is present for `.portfolio__link`
- THEN the existing active-state visual indicator MUST continue to function
- AND no new active-state behavior MUST be introduced by the focus-visible rule

#### Scenario: Dark-mode visual differences remain page or dark-mode owned

- GIVEN a touched element has dark-theme visual overrides
- WHEN the user switches to dark mode
- THEN those dark-theme differences MUST continue to apply from `dark-mode.css` or their existing page stylesheet dark-mode block
- AND `primitives.css` MUST NOT be the source of dark-mode overrides for button elements

### Requirement: Reduced-Motion Compatibility

The `.btn` primitive and any focus-visible transitions MUST be compatible with the existing global reduced-motion baseline in `reset.css`. The global baseline's `transition-duration: 0.01ms !important` under `prefers-reduced-motion: reduce` covers all `.btn`-owned transitions. `primitives.css` MUST NOT contain a standalone `@media (prefers-reduced-motion: reduce)` block unless it suppresses transform or opacity effects not already covered by the duration-only global baseline.

#### Scenario: Global baseline covers primitive transitions

- GIVEN the user has enabled reduced motion at the operating-system or browser level
- WHEN a `.btn` element renders
- THEN any transition properties set by `.btn` MUST be minimized by the global `reset.css` reduced-motion baseline
- AND no visual motion MUST be perceivable from `.btn`-owned transitions

#### Scenario: No conflicting reduced-motion block in primitives

- GIVEN `primitives.css` is inspected
- WHEN the file content is searched
- THEN no standalone `@media (prefers-reduced-motion: reduce)` block MUST be present in `primitives.css`

### Requirement: Non-Goal Enforcement

The domain MUST NOT include any Tailwind or shadcn migration, page redesign, global button or link restyle, hover normalization, broad token migration (spacing, shadow, radius, border-width, color tokens), route/data/content changes, responsive retuning, or `design-responsividad` changes.

#### Scenario: No Tailwind or shadcn

- GIVEN the implementation diff is reviewed
- WHEN files and changed lines are inspected
- THEN no Tailwind utility classes, `@apply` directives, or Tailwind configuration changes MUST be present
- AND no shadcn/ui imports, components, or configuration MUST be present

#### Scenario: No design-responsividad changes

- GIVEN the implementation diff is reviewed
- WHEN changed file paths are inspected
- THEN no files under `openspec/specs/design-responsividad/` MUST be modified
- AND no responsive breakpoint retuning MUST be present in any CSS file

#### Scenario: No route, data, or content changes

- GIVEN the implementation diff is reviewed
- WHEN changed file paths are inspected
- THEN no changes to route handlers, page data fetching, content modules, or metadata exports MUST be present

### Requirement: Review Budget Enforcement

The implementation diff MUST stay at or below 300 changed lines. If the implementation forecast before apply exceeds 300 changed lines, the workflow MUST pause and request a delivery decision.

### Requirement: Verification

The implementation MUST pass `npm run lint` and `npm run build` with no new attributable errors or warnings. Manual verification SHOULD cover keyboard Tab/focus-visible behavior across all in-scope selectors on their containing routes, dark-mode smoke checks, reduced-motion smoke checks, and a diff audit confirming additive-only TSX changes and no non-goal scope creep.

#### Scenario: Lint and build pass

- GIVEN the implementation is complete
- WHEN `npm run lint` and `npm run build` are executed
- THEN both commands MUST exit successfully
- AND no new lint violations or build warnings attributable to this change MUST be present

#### Scenario: Keyboard focus route matrix passes

- GIVEN the implementation is complete
- WHEN a keyboard user Tabs through `/`, `/perfil`, `/contacto`, `/casos-reales`, `/blog`, `/blog/[slug]`, `/not-found`, and the error boundary
- THEN a visible gold-ring focus indicator MUST appear on the in-scope selectors when they receive keyboard focus
- AND previously covered selectors (`.home-hero__cta-link`, `.nav-float__link`, `.contact__data`, `.footer__link`, `.footer__social-link`) MUST still show their focus indicators

#### Scenario: Dark mode smoke passes

- GIVEN the implementation is complete
- WHEN dark mode is toggled on representative routes containing touched button elements
- THEN button backgrounds, text colors, and borders MUST render as before
- AND the gold focus ring MUST remain visible against dark backgrounds

#### Scenario: Reduced motion smoke passes

- GIVEN the implementation is complete and `prefers-reduced-motion: reduce` is active
- WHEN representative routes with touched button elements are viewed
- THEN hover transforms and transitions on touched elements MUST be suppressed by the global baseline
- AND no unexpected motion regressions MUST be present

#### Scenario: Diff audit passes

- GIVEN the implementation diff is reviewed
- WHEN changed files are inspected
- THEN TSX changes MUST be limited to additive class-name additions
- AND no non-goal scope creep (Tailwind, shadcn, global link restyle, hover normalization, responsive retuning, design-responsividad changes, route/data/content changes) MUST be present
