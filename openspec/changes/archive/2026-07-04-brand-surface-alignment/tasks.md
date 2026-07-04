# Tasks: brand-surface-alignment

## Review Workload Forecast

| Field | Value |
| --- | --- |
| Estimated source diff | 35–75 changed lines |
| Hard source cap | 120 changed lines |
| Allowed source files | `src/app/page.tsx`, `src/app/opengraph-image.tsx`, `src/app/contacto/page.tsx`, `src/app/blog/page.tsx` |
| Forbidden source files | CSS, data, package, roadmap, private CV, `design-responsividad` |
| 300-line unit budget risk | Medium-Low |
| Chained PRs recommended | No |
| Decision needed before Apply | Yes: resolve `src/styles/home.css` drift first |

## Tasks

### 0. Pre-apply blocker: clean unrelated source drift

- [x] T0.1 Check `git status --short` before source edits.
- [x] T0.2 Inspect `git diff -- src/styles/home.css`.
- [x] T0.3 If the diff is only accidental formatting drift, run `git restore src/styles/home.css`.
- [x] T0.4 If the user does not approve reverting the drift, stop Apply and ask how to handle it.
- [x] T0.5 Confirm `src/styles/home.css` is no longer modified before brand copy edits.
- [x] T0.6 Confirm unrelated local work remains out of scope and unstaged:
  - `.gitignore`
  - `cv-refactor-scout.md`
  - `docs/JUAN-FONTALVO-ROADMAP.md`
  - `openspec/changes/private-cv-redesign/`
  - `openspec/specs/design-responsividad/`

### 1. Baseline verification

- [x] T1.1 Run baseline `npm run lint`.
- [x] T1.2 Run baseline `npm run build`; record existing Edge runtime warning if present.
- [x] T1.3 Reconfirm source scope:
  - copy/metadata-only;
  - no CSS;
  - no data;
  - no layout;
  - no route mechanics;
  - no new imports expected.

### 2. Home metadata — `src/app/page.tsx`

- [x] T2.1 Update `metadata.title` to:
  - `Juan Fontalvo — Tecnología práctica, software e IA aplicada`
- [x] T2.2 Update `metadata.description` to:
  - `Soluciones tech para personas y negocios: PCs, laptops, reparaciones, software, automatización e IA aplicada con casos reales.`
- [x] T2.3 Do not change Home JSX.

### 3. OpenGraph image — `src/app/opengraph-image.tsx`

- [x] T3.1 Update `alt` to:
  - `Juan Fontalvo — Tecnología práctica + IA aplicada`
- [x] T3.2 Update the top label text to:
  - `Creador tech / Software / IA aplicada`
- [x] T3.3 Update the subtitle text to:
  - `PCs · Laptops · Software · Automatización · Soluciones reales`
- [x] T3.4 Do not change `runtime`, `size`, `contentType`, font loading, image dimensions, layout styles, or `ImageResponse` structure.

### 4. Contact page — `src/app/contacto/page.tsx`

- [x] T4.1 Update `metadata.description` to:
  - `Contacto para soluciones tech, software, automatización, IA aplicada, PCs y laptops.`
- [x] T4.2 Update `inquirySteps` to:
  - `Contame qué problema tech, equipo, proyecto o proceso querés resolver.`
  - `Incluí contexto útil: dispositivo, flujo actual, urgencia, presupuesto o restricciones.`
  - `Si el alcance encaja, seguimos por WhatsApp con una conversación directa y clara.`
- [x] T4.3 Update contact intro paragraph to:
  - `El primer paso es WhatsApp: permite entender el contexto, ordenar la consulta y decidir si conviene avanzar con una solución clara.`
- [x] T4.4 Update primary WhatsApp CTA text to:
  - `Consultar por WhatsApp`
- [x] T4.5 Update fine print to:
  - `Los canales personales quedan como respaldo. WhatsApp ayuda a ordenar solicitudes de tecnología, reparación, software o automatización sin mezclar conversaciones personales.`
- [x] T4.6 Do not change contact URLs, `target`, `rel`, `primarySalesContact`, phone, email, or imported data.

### 5. Blog page — `src/app/blog/page.tsx`

- [x] T5.1 Update `metadata.description` to:
  - `Notas sobre tecnología práctica, PCs, laptops, IA, software, automatización y soluciones reales.`
- [x] T5.2 Update blog intro paragraph to:
  - `Notas sobre tecnología práctica, PCs, laptops, IA, software y automatización aplicadas a problemas reales.`
- [x] T5.3 Update bottom next-step paragraph to:
  - `Si una nota conecta con un problema o decisión tech, revisá los casos o abrí una consulta por WhatsApp.`
- [x] T5.4 Keep CTA link hrefs unchanged:
  - `/casos-reales`
  - `/contacto`
- [x] T5.5 Keep `Consultar por WhatsApp` CTA text unchanged.
- [x] T5.6 Do not change article rendering or article data.

### 6. Scope guards

- [x] T6.1 Confirm `git diff --name-only -- src` returns only:
  - `src/app/page.tsx`
  - `src/app/opengraph-image.tsx`
  - `src/app/contacto/page.tsx`
  - `src/app/blog/page.tsx`
- [x] T6.2 Confirm no CSS files are modified.
- [x] T6.3 Confirm no data files are modified.
- [x] T6.4 Confirm no package/dependency files are modified.
- [x] T6.5 Confirm no `docs/JUAN-FONTALVO-ROADMAP.md` changes are staged or included.
- [x] T6.6 Confirm no `openspec/specs/design-responsividad/` changes are included.
- [x] T6.7 Confirm source changed lines remain below 120.

### 7. Verification

- [x] T7.1 Run `npm run lint`.
- [x] T7.2 Run `npm run build`.
- [x] T7.3 Run `git diff --check`.
- [x] T7.4 Run or manually perform route smoke:
  - `/` renders after metadata update;
  - `/contacto` renders broader contact copy;
  - `/blog` renders broader blog intro and next-step copy;
  - `/opengraph-image` returns/renders successfully;
  - no CSS/data files changed.

### 8. Fresh review before commit

- [x] T8.1 Review final source diff against Proposal, Spec, Design, and Tasks.
- [x] T8.2 Use `review-readability` because this is public copy across multiple surfaces.
- [x] T8.3 Confirm unrelated local work remains unstaged/out of scope.

### 9. Commit strategy

- [x] T9.1 If Apply/Verify/Review pass, commit source as one focused commit. Suggested message:
  - `tune(content): align public brand surfaces`
- [x] T9.2 Then Sync/Archive OpenSpec artifacts as a separate docs commit.
- [x] T9.3 Do not stage unrelated `.gitignore`, CV artifacts, roadmap, private CV SDD, `design-responsividad`, or CSS drift.

### 10. Rollback

- [x] T10.1 Rollback was not needed; rollback path remains restoring only:
  - `src/app/page.tsx`
  - `src/app/opengraph-image.tsx`
  - `src/app/contacto/page.tsx`
  - `src/app/blog/page.tsx`
- [x] T10.2 Rollback verification was not run because no rollback was performed.
