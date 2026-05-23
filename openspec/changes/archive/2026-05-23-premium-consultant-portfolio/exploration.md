## Exploration: premium-consultant-portfolio

### Current State
The site is a personal “Desarrollador Web” portfolio with a legacy freelancer/course tone in Spanish, built in Next.js App Router (`src/app`) with static content modules in `src/data` and a global sidebar layout. Navigation and messaging prioritize profile/CV/contact over business outcomes. Portfolio items are generic placeholders, not real client case studies. Contact flow is a static form (`action="#"`) without backend handling. There is no testing stack configured in OpenSpec config.

### Affected Areas
- `src/app/page.tsx` — home hero messaging and CTA order (currently “Ver portafolio / Contactame”).
- `src/components/Sidebar.tsx` — role/title, nav labels, and primary conversion links.
- `src/app/portafolio/page.tsx` — currently gallery/category UI for generic items; needs case-study-first narrative.
- `src/data/projects.ts` — current data model is image/category/icon only; lacks outcomes, stack proof, metrics, evidence links.
- `src/app/sobre-mi/page.tsx` — contains weakly verifiable claims (reviews, clients, pricing, large counters) that conflict with premium consultant positioning.
- `src/app/contacto/page.tsx` — no qualification mechanism; static form does not enforce pre-contact context.
- `src/app/layout.tsx` — metadata currently anchored to “Desarrollador Web”; needs consultant/AI architecture positioning.
- `src/app/blog/page.tsx` — links to dynamic routes that do not exist (`/blog/[slug]` missing), creating navigation dead ends.
- `src/data/personal.ts`, `src/data/experience.ts`, `src/data/skills.ts` — profile and skill taxonomy skewed to training/web-dev instead of AI architecture consulting.
- `src/styles/globals.css` + `src/app/globals.css` — two competing global style systems; design refactor risk.

### Approaches
1. **Content-model-first repositioning (recommended)** — introduce structured case-study data and rebuild pages around proof-first storytelling.
   - Pros: Aligns directly with “show case studies before contact”; creates durable source-of-truth model for future iterations.
   - Cons: Requires coordinated updates across multiple routes/components and copy assets.
   - Effort: Medium.

2. **Copy-only surface rewrite** — keep existing IA/components and only replace titles/text.
   - Pros: Fastest delivery, lower immediate implementation risk.
   - Cons: Fails to solve structural mismatch (generic gallery, fake-like social proof blocks, weak CTA funnel).
   - Effort: Low.

3. **Full IA redesign + new visual system in one pass** — new route structure, custom components, and complete visual overhaul.
   - Pros: Strong premium differentiation potential.
   - Cons: High scope and high regression risk; likely exceeds comfortable single change and review budget.
   - Effort: High.

### Recommendation
Use **Approach 1** with incremental slices: establish a consultant-focused content model (case studies + proof artifacts + outcomes), then adapt home/portfolio/contact funnel to enforce proof-first flow before lead capture. Keep visual system evolution secondary in this change to stay under review and implementation risk limits.

### Risks
- **Credibility risk**: existing testimonials/clients/pricing/counters may be perceived as unverifiable and dilute premium trust.
- **Evidence gap**: locked flagship case studies need concrete metrics and artifacts (before/after numbers, architecture snapshots, workflow traces) to avoid generic claims.
- **Routing/content integrity**: blog links point to non-existent detail routes, hurting perceived quality.
- **Design-system coupling**: dual global CSS files increase regression risk when repositioning layout/typography.
- **Measurement gap**: no explicit conversion/event instrumentation for case-study → contact funnel.
- **QA gap**: no test runner and no automated regression harness; refactor confidence depends on manual checks.

### Ready for Proposal
Yes — proceed to proposal with scope constrained to proof-first positioning, case-study data model, IA/navigation updates, and minimum viable instrumentation. Explicitly defer deep visual rebrand and unverified voice/reservations claims until evidence is collected.
