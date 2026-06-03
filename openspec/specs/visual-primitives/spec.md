# visual-primitives Specification

## Purpose

Define a reusable raw-CSS visual primitive layer for common portfolio UI treatments (section title decorations, card surfaces, badges/tags, and budget-gated button/focus primitives) that reduces duplication without changing page content, route behavior, layout architecture, page-specific responsive tuning, or page-specific design intent.

## Requirements

### Requirement: Primitive Layer Import Order and Ownership

The system MUST load `primitives.css` in the global stylesheet cascade after `reset.css` and before `layout.css` so that primitive classes are available before layout/page selectors and later page styles can still override intentionally. `primitives.css` MUST own only reusable visual-treatment primitives and MUST NOT contain page-specific layout, spacing, responsive breakpoints, or responsive retuning rules.

#### Scenario: Primitives import between reset and layout

- GIVEN the application global stylesheet `src/styles/index.css` is processed
- WHEN the CSS cascade is evaluated
- THEN `primitives.css` MUST be imported after `reset.css` and before `layout.css`
- AND the existing relative order of all other stylesheet imports MUST remain unchanged

#### Scenario: Primitives do not own page layout

- GIVEN any page renders within the portfolio application
- WHEN the page layout (grid, flex, spacing, responsive breakpoints) is evaluated
- THEN no page layout or responsive behavior MUST originate from `primitives.css`
- AND page-specific layout rules MUST remain in page-owned stylesheets

#### Scenario: Page styles can override primitives

- GIVEN a page uses a primitive class and also declares page-specific overrides on the same element
- WHEN the cascade resolves conflicting declarations
- THEN page-owned rules with equal or higher specificity MAY override primitive declarations
- AND intentional page-specific design variations MUST be preserved

### Requirement: Section Title Decoration Primitive

The system MUST provide a reusable CSS class for the dotted underline title decoration pattern (`repeating-radial-gradient` with `var(--principal-color)` dots on a transparent background) so that duplicated `::after` pseudo-element declarations across page stylesheets can be consolidated. The primitive MUST support at minimum the two existing size variants: a larger decoration for page-level section headings and a smaller decoration for subsection headings, without changing heading element semantics or textual content.

#### Scenario: Large decoration for page-level section titles

- GIVEN a page-level section title uses the title-decoration primitive with the large size variant
- WHEN the heading renders
- THEN a `::after` pseudo-element MUST display a `repeating-radial-gradient` dot pattern using `var(--principal-color)` dots with approximate dimensions matching the existing 5rem × 3rem decoration
- AND the heading's semantic element, text content, and page-owned layout/spacing MUST remain unchanged

#### Scenario: Small decoration for subsection titles

- GIVEN a subsection title uses the title-decoration primitive with the small size variant
- WHEN the heading renders
- THEN a `::after` pseudo-element MUST display a `repeating-radial-gradient` dot pattern using `var(--principal-color)` dots with approximate dimensions matching the existing 3rem × 2rem decoration
- AND the heading's semantic element, text content, and page-owned layout/spacing MUST remain unchanged

#### Scenario: Decoration duplication is reduced

- GIVEN the title-decoration primitive is applied to eligible section headings across page stylesheets
- WHEN the page stylesheets are inspected
- THEN duplicated `repeating-radial-gradient` `::after` declarations for section titles in `pages-headers.css` and `pages-profile.css` MUST be removed or reduced
- AND any remaining page-specific title `::after` overrides MUST be limited to size, position, or visibility tuning only

#### Scenario: Responsive small decoration adjustments preserved

- GIVEN the responsive-small breakpoint adjusts title decoration sizing or visibility
- WHEN a small viewport renders a page with decorated section titles
- THEN responsive adjustments to the decoration SHOULD remain in the responsive stylesheet where they exist
- AND the primitive class itself MUST NOT contain responsive breakpoints

### Requirement: Card Surface Primitive

The system MUST provide a reusable low-specificity CSS class for the shared card/panel surface visual treatment (border, border-radius, background, and optional hover border-color/shadow) so that near-identical surface declarations can be consolidated without normalizing intentionally different card designs across pages. Page-owned internal layout, padding, spacing, responsive behavior, and dark-mode overrides MUST be preserved.

#### Scenario: Card surface is applied additively

- GIVEN a page element that represents a card/panel surface
- WHEN the card-surface primitive class is added to the element's existing class list
- THEN the element MUST receive a border, border-radius, and background consistent with the shared card treatment
- AND all page-owned internal layout declarations (flex, grid, padding, spacing) MUST continue to apply from the page stylesheet

#### Scenario: Intentionally different cards are not normalized

- GIVEN two cards on different pages have intentionally different border-radius, shadow, or border-color values that reflect distinct page-level design intent
- WHEN the card-surface primitive is evaluated
- THEN the primitive MUST NOT force a single radius or shadow value across all cards
- AND page-specific overrides for border-radius, shadow, or border-color MUST continue to win where they exist

#### Scenario: Only near-identical surfaces are migrated

- GIVEN a set of card selectors across `home.css`, `pages-profile.css`, `pages-services.css`, `pages-misc.css`, `portfolio.css`, `pages-pricing.css`, and `contact.css`
- WHEN card surfaces are evaluated for primitive migration
- THEN only selectors whose border, border-radius, background, and hover treatment are near-identical to the primitive MUST be migrated
- AND selectors with meaningful design variations MUST retain their page-owned surface declarations

#### Scenario: Card dark-mode overrides remain in dark-mode.css

- GIVEN the card-surface primitive is applied to elements that have dark-theme visual differences
- WHEN the user switches to dark mode
- THEN dark-mode-specific border-color, background, and shadow overrides for card surfaces SHOULD remain in `dark-mode.css` where the cascade order places them last
- AND the primitive class itself MUST NOT be the primary owner of dark-mode visual differences for cards

### Requirement: Badge/Tag Primitive

The system MUST provide a reusable CSS class for the inline pill/chip/tag visual treatment (`border-radius: 999px` with accent background and typography) so that near-identical badge declarations across page stylesheets can be consolidated. The primitive MUST preserve semantic markup (element type, ARIA roles if any) and page-owned content, sizing, and layout behavior.

#### Scenario: Badge/tag visuals are consolidated

- GIVEN inline pill/chip/tag elements across `home.css`, `portfolio.css`, `blog.css`, and `pages-misc.css` share the `border-radius: 999px` pattern
- WHEN the badge/tag primitive is applied to eligible elements
- THEN duplicated border-radius, background, and typography declarations MUST be removed or reduced in page stylesheets
- AND the elements MUST retain their existing semantic markup and page-owned content

#### Scenario: Page-specific badge variations are preserved

- GIVEN a badge element has page-specific sizing, margin, or color overrides that differ from other badge instances
- WHEN the badge/tag primitive class is applied
- THEN page-specific overrides for padding, font-size, margin, and color MUST continue to apply from the page stylesheet
- AND the primitive MUST NOT normalize badge sizing or color across pages

#### Scenario: Badge dark-mode overrides remain page or dark-mode owned

- GIVEN a badge element uses the badge/tag primitive and has dark-theme visual differences
- WHEN the user switches to dark mode
- THEN dark-mode-specific background and border-color overrides for badges SHOULD remain in `dark-mode.css` or their existing page stylesheet location
- AND the primitive class MUST NOT be the primary source of dark-mode badge differences

### Requirement: Button/Focus Budget Gate

The system MUST defer a full button shape primitive (sizing, border-radius, hover lift, and visual weight) by default in this change. A minimal focus-visible normalization for migrated interactive primitives MAY be included only if the implementation forecast for the base slice (section titles, cards, badges) stays safely under 300 changed lines with at least a 50-line buffer. Any included focus work MUST be limited to explicit `:focus-visible` outline or ring normalization for interactive selectors touched by primitive migration and MUST NOT globally restyle all links or buttons.

#### Scenario: Full button primitive is deferred by default

- GIVEN the base slice of section title, card surface, and badge/tag primitives is implemented
- WHEN the implementation forecast shows the changed-line count approaching or exceeding 250 lines
- THEN a full button shape primitive (sizing, radius, hover) MUST NOT be included in this change
- AND button styling MUST remain page-owned as before

#### Scenario: Minimal focus-visible normalization when budget permits

- GIVEN the base slice implementation forecast stays at or below 250 changed lines
- WHEN the optional focus-visible work is included
- THEN the focus-visible primitive MUST normalize `:focus-visible` outline or ring appearance only for interactive selectors that are directly touched by the primitive migration
- AND the focus-visible work MUST NOT add global `:focus-visible` rules that restyle all links and buttons on every page

#### Scenario: Budget exceeded triggers delivery decision

- GIVEN the implementation forecast for the base slice plus optional focus-visible work exceeds 300 changed lines
- WHEN the forecast is presented before apply
- THEN the implementation MUST pause and request a delivery decision from the user
- AND the default recommendation MUST be to defer the button/focus primitive

### Requirement: Dark Mode Compatibility

The system MUST preserve the existing dark-mode architecture where `dark-mode.css` imports last in the cascade and owns dark-theme visual differences. Dark-mode visual overrides for primitive-owned treatments (card surfaces, badges) SHALL remain in `dark-mode.css` or in their existing page stylesheet dark-mode blocks. `primitives.css` MUST NOT duplicate or own dark-mode variable overrides.

#### Scenario: Primitive classes do not own dark-mode overrides

- GIVEN the card-surface or badge/tag primitive classes are defined in `primitives.css`
- WHEN the stylesheet is inspected
- THEN `primitives.css` MUST NOT contain `[data-theme="dark"]` selector blocks
- AND dark-theme visual differences for primitive-owned selectors MUST remain in `dark-mode.css` or existing page dark-mode blocks

#### Scenario: Dark-mode cascade order is preserved

- GIVEN `dark-mode.css` imports last in the cascade
- WHEN the user switches to dark mode
- THEN dark-mode overrides for primitive-managed selectors MUST apply correctly because they import after `primitives.css`
- AND no cascade-order regressions attributable to the primitive layer MUST occur

### Requirement: Reduced Motion Compatibility

The system MUST preserve the existing global reduced-motion baseline in `reset.css` (`prefers-reduced-motion: reduce` minimizing animation duration, transition duration, animation iteration, and smooth scrolling). Any transitions or animations introduced by primitive classes MUST be safe under that baseline. Component-specific reduced-motion overrides in page stylesheets MUST remain where they exist.

#### Scenario: Global reduced-motion baseline covers primitive transitions

- GIVEN the user has enabled reduced motion at the operating-system or browser level
- WHEN a primitive class applies a transition property (e.g., card hover border-color transition)
- THEN the global `reset.css` reduced-motion baseline MUST minimize that transition
- AND no additional primitive-specific reduced-motion block is required unless the primitive introduces non-duration behavior (transforms, opacity fades) that needs explicit suppression

#### Scenario: Primitive transitions do not fight reduced motion

- GIVEN a primitive class introduces a CSS `transition` property
- WHEN the implementation is verified
- THEN the transition MUST be covered by the existing global reduced-motion baseline
- AND if a primitive introduces transform-based hover effects, a primitive-specific `prefers-reduced-motion: reduce` block MUST suppress those transforms

#### Scenario: Existing page-specific reduced-motion blocks are preserved

- GIVEN page stylesheets contain component-specific `prefers-reduced-motion: reduce` blocks for migrated selectors
- WHEN the primitive migration removes or reduces those selectors from page stylesheets
- THEN the reduced-motion blocks MUST be updated only to the extent needed to reference the new primitive class names
- AND no reduced-motion behavior that previously suppressed motion for those elements MUST be lost

### Requirement: Non-Regression Constraints

This change MUST remain a narrow raw-CSS visual primitive extraction. It MUST NOT migrate to Tailwind or shadcn, MUST NOT perform a full page redesign, MUST NOT retune page-specific responsive behavior, MUST NOT fix the `/perfil` 360px overflow, MUST NOT perform broad token migration (spacing, shadows, radii, border-widths), and MUST NOT change route behavior, data modules, metadata, React component structure, or dark-mode hydration behavior. The `openspec/specs/design-responsividad/` spec MUST NOT be modified.

#### Scenario: Scope audit passes

- GIVEN the implementation diff for this change is reviewed
- WHEN files and changed lines are inspected
- THEN no Tailwind or shadcn imports, utilities, or configuration MUST be present
- THEN no React component refactors, route changes, or data-module changes MUST be present
- THEN no page-specific responsive retuning beyond what is necessary for safe primitive class addition MUST be present
- THEN no `/perfil` 360px overflow fix MUST be present
- THEN no broad token migration (spacing, shadow, radius, or border-width tokens) MUST be present
- THEN the `openspec/specs/design-responsividad/` directory and its spec MUST remain unchanged

#### Scenario: TSX changes are additive class names only

- GIVEN a TSX file is touched to adopt a primitive class
- WHEN the change is inspected
- THEN the change MUST be limited to adding one or more CSS class names to an element's existing `className` attribute
- AND no content, data, control flow, component extraction, or route behavior changes MUST be present

### Requirement: Review Budget and Verification

The implementation MUST stay at or below a 300 changed-line review budget unless an explicit delivery decision approves otherwise. The change MUST pass `npm run lint` and `npm run build` with no new attributable errors. Verification MUST include diff review, representative route and viewport manual smoke checks, dark-mode checks for migrated surfaces, keyboard focus checks if interactive selectors are touched, and reduced-motion checks for any new transitions.

#### Scenario: Automated verification passes

- GIVEN the implementation is complete
- WHEN `npm run lint` and `npm run build` are executed
- THEN both commands MUST exit successfully
- AND no new lint violations or build warnings attributable to this change MUST be present

#### Scenario: Representative route smoke checks pass

- GIVEN the implementation is complete
- WHEN the following routes are checked at desktop, tablet, mobile, and small-mobile viewports: `/`, `/perfil`, `/credenciales`, `/contacto`, `/casos-reales`, `/blog`
- THEN section title decorations, card surfaces, and badges MUST render correctly across all checked viewports
- AND no visual regressions attributable to the primitive migration MUST be present

#### Scenario: Dark mode smoke checks pass

- GIVEN the implementation is complete
- WHEN dark mode is toggled on representative pages with migrated card surfaces and badges
- THEN dark-theme visual differences for migrated elements MUST render as before
- AND no dark-mode regressions attributable to the primitive layer MUST be present

#### Scenario: Reduced motion smoke checks pass

- GIVEN the implementation is complete and the operating-system reduced-motion preference is enabled
- WHEN representative pages with migrated card surfaces and decorations are viewed
- THEN transitions and hover effects for migrated elements MUST be minimized by the global baseline
- AND no motion regressions attributable to the primitive layer MUST be present

#### Scenario: Budget is enforced

- GIVEN the implementation diff is reviewed
- WHEN the changed-line count is measured
- THEN the count MUST be at or below 300 changed lines
- OR an explicit delivery decision MUST approve exceeding the budget
