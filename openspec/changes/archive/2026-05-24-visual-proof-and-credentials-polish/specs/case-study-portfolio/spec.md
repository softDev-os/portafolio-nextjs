# Delta for case-study-portfolio

## ADDED Requirements

### Requirement: Case-Card Section Scan Anchors

Case study cards MUST display visible section labels for Problema, Solución, and Resultados that enable rapid visual scanning. These labels SHALL be visually distinct from body text via typographic treatment (uppercase, color, weight) and MUST NOT expand the base card height beyond their natural flow.

#### Scenario: Section labels are visually distinct

- GIVEN a visitor opens `/portafolio` on any viewport width
- WHEN a case card renders with `.portfolio__case-grid` sections
- THEN each `<h3>` heading inside `.portfolio__case-grid` SHALL use uppercase, a distinct color, and heavier weight than body paragraph text
- AND a label (e.g., "Problema", "Solución", "Resultados") is immediately readable without reading surrounding content

#### Scenario: Labels do not expand card height artificially

- GIVEN the same card rendering
- WHEN section headings and content render
- THEN no heading or section wrapper applies a fixed `min-height` or empty padding that adds height beyond content-driven flow

### Requirement: Case-Card Spacing Rhythm

The `.portfolio__case-list` MUST apply a consistent gap between case cards across all breakpoints. The gap SHALL be controlled by a single `gap` property on the grid container, not by individual card margins.

#### Scenario: Consistent inter-card gap on desktop

- GIVEN a visitor opens `/portafolio` on a viewport ≥ 1024px wide
- WHEN multiple case cards render
- THEN each `.portfolio__case-card` has equal vertical spacing to its adjacent cards
- AND the gap is driven by `.portfolio__case-list` `gap`, not by `margin-top` or `margin-bottom` on individual cards

#### Scenario: Vertical stacking on narrow viewports

- GIVEN a viewport ≤ 767px wide
- WHEN the case grid stacks to a single column
- THEN `.portfolio__case-card` elements maintain the same gap value driven by the container
- AND the gap provides adequate breathing room between cards

### Requirement: Evidence Metadata Labels

Case studies MAY display optional metadata labels (e.g., proof-type indicators such as "Automatización" or "IA Aplicada") as lightweight inline visual badges. When present, they MUST render without adding card height beyond the badge's own inline flow. When absent, they MUST cause no layout shift.

#### Scenario: Metadata label renders inline

- GIVEN a case study with an optional metadata label present in the data model
- WHEN the card renders
- THEN the label appears as an inline badge (e.g., a small rounded pill)
- AND it flows naturally within the card without fixed positioning or extra container padding

#### Scenario: Absent metadata causes no shift

- GIVEN a case study with no optional metadata label
- WHEN the card renders
- THEN no empty placeholder or hidden element occupies space for the absent label
- AND the adjacent content rendering is identical to a card that has no label data
