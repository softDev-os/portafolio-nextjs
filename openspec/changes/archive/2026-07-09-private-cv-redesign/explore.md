# Explore: private-cv-redesign

## Context

The user wants to create a private CV/resume using information from:

- the existing public portfolio content;
- an old private CV PDF;
- recent certificates/diplomas;
- additional work traits, recent projects, and skills that the user will correct field by field.

The final CV is intended for selected companies only. It must not become part of the public portfolio experience.

## Privacy Boundary

This change MUST keep raw personal/sensitive data out of tracked OpenSpec artifacts.

Sensitive inputs are stored only in the ignored local folder:

```txt
.private-cv/
```

The folder is ignored by `.gitignore` and currently contains local working copies of the old CV and certificates.

OpenSpec artifacts for this change are intentionally redacted and should describe workflow, requirements, and acceptance criteria without embedding raw phone numbers, exact address, personal references, IDs, or full certificate screenshots.

## Current Inputs Observed

### Public portfolio sources

- `src/data/personal.ts` — public contact and positioning.
- `src/data/experience.ts` — sparse education, experience, and certificates.
- `src/data/skills.ts` — capability groups for AI automation, software architecture, workflows, delivery.
- `src/data/projects.ts` — selected case studies around WhatsApp intake, support handoff, and agent memory.
- `src/app/perfil/page.tsx` — method, principles, and strategic positioning.
- `src/app/credenciales/page.tsx` — current public credentials page.

### Private local sources

- Old CV PDF copied into `.private-cv/source-old-cv.pdf`.
- Certificates copied into `.private-cv/`.
- Extracted certificate topics include programming introduction, GNU/Linux administration, HTML/CSS, and Responsive Web Design.

## Recommended Direction

Use SDD for the private CV as a controlled content and artifact workflow, not as a public website feature.

Recommended implementation shape:

1. Keep sensitive source files in `.private-cv/` only.
2. Use a private field-review worksheet in `.private-cv/cv-field-review.md` for exact personal data and field corrections.
3. Use redacted OpenSpec artifacts under `openspec/changes/private-cv-redesign/` for proposal/spec/design/tasks.
4. Generate local HTML and PDF outputs inside `.private-cv/`.
5. Do not add a public route, public asset, sitemap entry, or navigation link for the CV.
6. Remove generated sensitive artifacts from the repo folder when the user says the final PDF has been copied/sent elsewhere.

## Open Product Questions

1. What exact professional headline should lead the CV?
2. Which profile should be primary: IT infrastructure, software/automation, AI workflows, or a balanced hybrid?
3. Which old experience entries should be preserved, rewritten, merged, or removed?
4. Which recent projects and AI work should be added as evidence?
5. Should the CV be one page, two pages, or content-first with later compression?
6. Which sensitive details are acceptable in the final private PDF?
7. Which certificate details should be shown in the CV versus kept as backup evidence only?

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Sensitive data accidentally becomes tracked | High | Keep raw files in `.private-cv/`, verify `git status --ignored`, avoid `public/`, avoid route/sitemap/nav. |
| CV overclaims unverified AI/project outcomes | Medium | Use evidence-based language and separate skills, projects, and learning-in-progress. |
| Field corrections become scattered in chat | Medium | Use a private field-review worksheet as the single source of truth. |
| HTML/PDF generation changes public portfolio | Medium | Make the workflow local-only and do not edit public routes unless explicitly approved. |
| Review workload grows too large | Medium | 200 changed-line review budget; split if needed. |

## Recommendation

Proceed to a redacted proposal and private field-review worksheet before writing final HTML/PDF.
