# Design: Profile and Credentials Reframe

## Technical Approach

Reframe the two existing identity routes as static App Router pages backed by the current `src/data/*` modules. `/sobre-mi` becomes `Perfil`: a strategic explanation of how Juan works as an Architect / AI Engineer consultant. `/curriculum` remains the URL but renders `Credenciales`: supporting authority evidence, not a downloadable or job-application CV. The change keeps the archived proof-first funnel intact: homepage and portfolio still lead with cases before contact, and identity pages must not introduce a CV shortcut.

## Architecture Decisions

| Decision | Alternatives considered | Rationale |
|---|---|---|
| Preserve `/sobre-mi` and `/curriculum` URLs while changing labels, metadata, headings, and copy. | Create `/perfil` and `/credenciales` routes now. | Specs explicitly defer route migration; preserving URLs avoids redirect/SEO churn. |
| Keep content in existing static modules (`personal`, `experience`, `skills`). | Add CMS, MDX, or a new profile data layer. | The repo is static App Router content; a new content system is disproportionate. |
| Replace percentage skills with capability groups. | Keep progress bars without numbers; add “levels”. | Any proficiency scale still implies fake precision. Capability groups are evidence-safe and easier to verify. |
| Remove CV download UI and `personal.cv` usage. | Keep the file but hide the button with CSS. | Behavior must be gone from rendered identity actions, not just visually hidden. |
| Reuse BEM/global CSS with targeted additions/removals. | Tailwind rewrite or broad visual redesign. | Existing project uses `src/styles/globals.css`; targeted CSS protects review budget. |

## Data Flow

```text
src/data/personal.ts ───────→ Sidebar identity, /sobre-mi profile narrative
src/data/experience.ts ─────→ /curriculum credential timelines + certificates
src/data/skills.ts ─────────→ /curriculum capability groups + evidence tags
src/data/projects.ts ───────→ Existing proof-first references remain unchanged
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/app/sobre-mi/page.tsx` | Modify | Title/metadata to `Perfil`; remove age/municipality/contact data block; render strategic profile narrative, operating principles, capability themes, and trust boundaries. |
| `src/app/curriculum/page.tsx` | Modify | Title/metadata to `Credenciales`; rename sections to authority/evidence language; render capability groups instead of progress bars; omit certificate verification IDs unless real IDs exist. |
| `src/components/Sidebar.tsx` | Modify | Change `/curriculum` nav label from `CV` to `Credenciales`; remove the `Descargar CV` anchor and `personal.cv` dependency. |
| `src/data/personal.ts` | Modify | Remove `cv`; reduce raw personal fields from UI contract. Keep contact fields only for contact/social surfaces that already need them. |
| `src/data/experience.ts` | Modify | Make certificate `id` optional or remove it; rewrite education/experience descriptions as supporting credibility, not résumé bullets. |
| `src/data/skills.ts` | Modify | Replace `Skill { percentage, className }` with capability-group data for AI automation, architecture, workflows, and implementation. |
| `src/styles/globals.css` | Modify | Remove or stop relying on `.sidebar__cv-btn`, `.skills__percentage*`, and `.skills__number`; add compact credential capability/card styles if current classes are insufficient. |

## Interfaces / Contracts

Use const-object typing for stable group identifiers and flat interfaces.

```ts
export const CAPABILITY_GROUP = {
  AI_AUTOMATION: "ai-automation",
  SOFTWARE_ARCHITECTURE: "software-architecture",
  OPERATIONS_WORKFLOWS: "operations-workflows",
} as const;

export interface CapabilityGroup {
  id: CapabilityGroupId;
  title: string;
  evidence: string[];
  tools: string[];
}
```

Certificate IDs must not render when missing or placeholder-like (`XXXXXX`).

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Static content | No `Descargar CV`, `CV`, `%`, `ID Verificación: XXXXXX`, `Edad`, or `Municipio` in rendered identity pages. | Manual browser review plus source search during implementation. |
| Quality | Next/React/TypeScript validity. | `npm run lint` and `npm run build`. |
| UX regression | Sidebar active state, `/sobre-mi`, `/curriculum`, and proof-first links still work. | Manual route pass after build. |

## Migration / Rollout

No runtime data migration required. Migrate content in one static rollout: first update data contracts, then route rendering, then sidebar and CSS cleanup. Keep rollback as a normal git revert of static files.

## Implementation Sequencing

1. Update `skills.ts`, `experience.ts`, and `personal.ts` contracts.
2. Refactor `/curriculum` to `Credenciales` using the new capability and certificate contracts.
3. Refactor `/sobre-mi` to `Perfil`, removing personal-data fillers.
4. Remove sidebar CV action and relabel identity navigation.
5. Clean CSS for removed UI and run lint/build/manual route checks.

## Open Questions

- None blocking. Implementation should not add new claims unless they are publicly verifiable.
