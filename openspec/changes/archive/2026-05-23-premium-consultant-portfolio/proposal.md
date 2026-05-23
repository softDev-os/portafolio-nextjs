# Proposal: Premium Consultant Portfolio

## Intent

Reposition the site from generic developer portfolio to premium Architect / AI Engineer consultant portfolio. The funnel must put verified case studies before contact and replace weak claims with concrete AI/automation proof.

## Scope

### In Scope
- Case-study model for WhatsApp lead intake, support handoff, and agent memory.
- Homepage, portfolio, sidebar/navigation, metadata, and profile copy aligned to consulting outcomes.
- Contact as a secondary, qualified next step after proof review.
- Reduce unverifiable testimonials, counters, pricing, and off-strategy claims.
- Fix or hide surfaced navigation dead ends that hurt credibility.

### Out of Scope
- Deep visual-system rewrite or full IA redesign beyond the proof-first funnel.
- Voice automation or reservation systems as central claims.
- Backend lead capture, CRM, analytics pipeline, or automated tests.

## Capabilities

### New Capabilities
- `consultant-positioning`: Premium messaging, trust boundaries, conversions.
- `case-study-portfolio`: Case study structure, evidence, outcomes, proof-first navigation.

### Modified Capabilities
- None — no existing OpenSpec specs are present.

## Approach

Use content-model-first repositioning. Make case-study data the source of truth, then adapt existing App Router pages/components to render an evidence-first narrative. Keep visual changes targeted.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/projects.ts` | Modified | Case-study fields, outcomes, proof, stack, CTAs. |
| `src/app/page.tsx` | Modified | Premium positioning and proof-first CTAs. |
| `src/app/portafolio/page.tsx` | Modified | Flagship case studies as primary proof. |
| `src/components/Sidebar.tsx` | Modified | Role, nav labels, conversion path. |
| `src/app/sobre-mi/page.tsx` | Modified | Remove weak claims; reinforce credibility. |
| `src/app/contacto/page.tsx` | Modified | Qualified next step after proof. |
| `src/app/layout.tsx` | Modified | Consultant metadata. |
| `src/app/blog/page.tsx` | Modified | Hide/fix dead links. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Generic case studies | Med | Use verified evidence; label outcomes conservatively. |
| Scope expands | Med | Keep this content-model and funnel focused. |
| No automated tests | Med | Verify with `npm run lint`, `npm run build`, manual route review. |

## Rollback Plan

Restore previous content modules and affected route/component files from git. No backend or external service changes are in scope.

## Dependencies

- Exploration artifact.
- Verified VPS evidence for flagship stories.

## Success Criteria

- [ ] Homepage/navigation position Architect / AI Engineer consulting.
- [ ] Portfolio presents the three flagship case studies first.
- [ ] Contact CTAs are secondary and framed for qualified business inquiries.
- [ ] Unverifiable or off-strategy claims are removed or reduced.
- [ ] No central claims are made for voice or reservations.
- [ ] Build/lint and manual route review pass.
