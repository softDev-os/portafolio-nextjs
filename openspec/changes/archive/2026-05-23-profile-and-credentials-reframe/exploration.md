## Exploration: profile-and-credentials-reframe

### Current State
The site is already repositioned toward premium consultant messaging, but information architecture is still split between a consultant narrative (`/sobre-mi`) and a legacy CV model (`/curriculum`).

- `/sobre-mi` currently mixes strategic content with legacy personal profile data. It includes:
  - consultant capability cards and trust boundaries (aligned with proof-first direction), and
  - personal data list (`Edad`, `País`, `Municipio`, `Correo`) sourced from `src/data/personal.ts` (legacy CV tone).
- `/curriculum` remains a classic job-seeker CV page:
  - timeline sections (`Formación`, `Experiencia`) from `src/data/experience.ts`
  - percentage bars (`designSkills`, `codeSkills`) and broad competencies from `src/data/skills.ts`
  - certificates section with placeholder verification IDs (`XXXXXX`).
- Sidebar/global identity still has mixed IA signals:
  - nav label for `/sobre-mi` is already `Perfil`,
  - nav label for `/curriculum` is still `CV`,
  - downloadable CV button (`Descargar CV`) is still present via `personal.cv`.

### Affected Areas
- `src/app/sobre-mi/page.tsx` — page title/content structure; still includes personal-data block that weakens premium framing.
- `src/app/curriculum/page.tsx` — legacy CV information architecture and copy hierarchy.
- `src/components/Sidebar.tsx` — navigation labels and downloadable CV CTA.
- `src/data/personal.ts` — contains personal raw fields and `cv` download URL consumed by UI.
- `src/data/experience.ts` — education/experience/certificates model currently optimized for chronological CV reading.
- `src/data/skills.ts` — skill percentages and generic competencies that read as junior/freelance CV signals.

### Approaches
1. **Route-preserving narrative reframe (MVP)** — keep `/sobre-mi` and `/curriculum` URLs, but reframe semantics and content blocks to `Perfil` + `Credenciales`.
   - Pros: Minimal routing risk; fastest coherent IA update; avoids broken internal links.
   - Cons: URL slug `/curriculum` remains legacy unless later migration/redirect is introduced.
   - Effort: Low/Medium.

2. **Route + IA rename** — create `/credenciales`, migrate content, and redirect `/curriculum`.
   - Pros: Full semantic alignment (label, content, URL).
   - Cons: Extra scope (redirects, metadata/canonical checks, potential SEO transition noise).
   - Effort: Medium.

### Recommendation
Use **Approach 1** as the minimum viable reframe for this change: keep existing routes, rename and restructure page narratives, and remove CV-download mechanics. This delivers immediate coherence with the premium consultant positioning while containing scope and review risk.

### Risks
- **Credentials evidence quality**: certificate IDs are placeholders and could reduce authority if presented as “verification.”
- **Content depth gap**: current data lacks strong “problems solved / decision rationale / operating model” statements needed for a premium `Perfil` page.
- **Taxonomy drift**: many entries in education/experience/skills are still tool- or job-history-centric and may require editorial pruning.
- **URL semantics debt**: keeping `/curriculum` temporarily may create mild naming inconsistency versus `Credenciales` label.

### Ready for Proposal
Yes — proceed with a scoped proposal for IA/content reframe (Perfil + Credenciales), explicitly excluding bilingual rollout and major visual redesign.
