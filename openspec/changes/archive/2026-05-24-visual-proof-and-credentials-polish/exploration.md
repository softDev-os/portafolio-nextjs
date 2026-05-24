## Exploration: visual-proof-and-credentials-polish

### Current State
`Casos reales` (`/portafolio`) already follows a proof-first narrative with strong content structure (Problema → Solución → Resultados), consistent CTA, and safe claim language. Visually, cards are clean but compact: section hierarchy inside each case card is subtle, and scan anchors are limited when users skim quickly.

`Credenciales` (`/curriculum`) is content-rich but visually dense on smaller viewports. The timeline keeps a left-year/right-description split down to mobile, creating narrow text columns and high cognitive load. Certificates and capability cards are functional but packed, with limited spacing rhythm and weak visual grouping. Responsive behavior exists but is spread across repeated media-query blocks, which makes consistency fragile.

### Affected Areas
- `src/app/portafolio/page.tsx` — case-card content order and scanability hooks.
- `src/app/curriculum/page.tsx` — timeline/capabilities/certificates composition and mobile reading flow.
- `src/styles/globals.css` — portfolio/curriculum styles and breakpoint behavior (including duplicate responsive overrides).
- `src/data/projects.ts` — case payload shape that can support stronger visual metadata labels if needed.
- `src/data/experience.ts` — credential/timeline copy length influences density on mobile.

### Approaches
1. **CSS-first polish (no data-model changes)** — tighten hierarchy, spacing, and responsive stacking only.
   - Pros: Lowest risk, preserves current narrative and architecture, fast to ship.
   - Cons: Limited room for richer proof signals (badges/meta) without light markup changes.
   - Effort: Low.

2. **Targeted markup + CSS polish** — keep existing IA, add lightweight visual wrappers/labels for scanability.
   - Pros: Better readability gains for both pages; enables timeline clarity and case-card anchors.
   - Cons: Slightly higher implementation and regression surface than pure CSS.
   - Effort: Medium.

### Recommendation
Use **Approach 2** with strict scope: keep navigation and page architecture intact, avoid redesign. Prioritize mobile readability in `Credenciales` first (highest pain), then add scanability polish in `Casos reales`.

### Risks
- Over-styling could drift into template aesthetics and dilute current premium consultant positioning.
- Touching many breakpoint overrides in one pass can introduce regressions due to duplicated responsive rules.
- If density is reduced without preserving evidence clarity, perceived credibility can drop.

### Ready for Proposal
Yes — with a constrained MVP polish scope focused on hierarchy, scanability, and mobile legibility only.
