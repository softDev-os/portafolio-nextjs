# Design: private-cv-redesign

## Overview

This change defines a private, local-only CV production workflow. The public Next.js portfolio remains a read-only source of positioning ideas, while all sensitive CV inputs, reviewed drafts, generated HTML, and generated PDF outputs stay under the ignored `.private-cv/` workspace.

Tracked repository changes are limited to redacted OpenSpec artifacts and, if needed, a `.gitignore` entry for `.private-cv/`. The final CV is not implemented as an application route, not linked from navigation, and not copied into `public/`.

## Architecture and Workflow

```text
Public portfolio data / approved public facts  ┐
Old private CV / certificates / photo          ├─> .private-cv/ field review
User corrections and approvals                 ┘          │
                                                         v
                                             .private-cv/ approved content source
                                                         │
                                                         v
                                             .private-cv/ standalone HTML + CSS
                                                         │
                                                         v
                                             .private-cv/ local PDF export
                                                         │
                                                         v
                                             privacy validation + cleanup
```

Key decisions:

- Use a standalone private HTML document instead of a Next.js route.
- Keep private styles inline or colocated under `.private-cv/`; do not import app route components, CSS modules, or public layout code.
- Use Playwright locally for PDF export because `@playwright/test` is available in project dev dependencies.
- Treat public portfolio content as read-only unless the user separately approves public portfolio edits.
- Require user approval of corrected CV content before final HTML/PDF generation.

## Private File Layout

All private files live under `.private-cv/`, which MUST be ignored by Git.

Recommended layout:

```text
.private-cv/
  README.md                         # local-only workflow notes
  sources/                          # private raw inputs, never tracked
    old-cv.*                        # prior private CV source
    certificates/                   # certificate evidence files/screenshots
    photo.*                         # approved CV photo
    references-private.*            # private backup only, not main CV body
  review/
    field-review.md                 # worksheet for correcting every CV field
    approved-content.json           # structured approved local content, if useful
  html/
    cv.html                         # standalone local HTML
    assets/                         # optional local-only copied photo/assets
  scripts/
    export-pdf.mjs                  # optional local Playwright export helper
  dist/
    cv.pdf                          # generated final/private PDF
```

Tracked files MUST NOT contain any raw values from this workspace.

## Content Data Flow

1. **Input collection**
   - Gather private source material only inside `.private-cv/sources/`.
   - Public portfolio facts may be consulted as non-sensitive source material, but public source files remain unchanged by default.

2. **Field review**
   - Create a local worksheet in `.private-cv/review/field-review.md`.
   - Every CV field is either approved, corrected, softened, or removed by the user.
   - Unverified claims remain blocked until corrected.

3. **Approved content source**
   - Convert the reviewed worksheet into a local approved content source, either directly in the HTML or in `.private-cv/review/approved-content.json`.
   - Use defensible wording only: applied generative AI/LLM work, data integration, automation, infrastructure IT, and operational DevOps.
   - Do not claim unsupported metrics, custom model training, unsupported seniority, or unapproved outcomes.

4. **Local HTML generation**
   - Build `.private-cv/html/cv.html` as a standalone document with local/inline CSS and local photo reference.
   - Keep contact details and sensitive content only in this local HTML.

5. **Local PDF export**
   - Export `.private-cv/dist/cv.pdf` from the local HTML.
   - Validate that no generated file appears outside `.private-cv/`.

## One-Page Layout Plan

Target: A4, one page, Spanish-first with useful English technical keywords/headings.

The layout should act as a compressed recruiter scan:

- Header with approved private contact categories only:
  - city/country;
  - phone;
  - email;
  - GitHub;
  - LinkedIn;
  - portfolio link.
- Exclude age, exact address, Instagram, IDs, and private reference details.
- Professional headline oriented to infrastructure, automation, applied AI/LLM, data integration, and operational DevOps.
- Short profile paragraph with defensible claims.
- Compact core capabilities / technical keywords.
- Current merged role:
  - independent consulting;
  - TechLocal;
  - related implementation work.
- Short fused premium-hardware support role covering JC Computadores and New Technology.
- Brief Armada entry only if it fits without crowding.
- Compact projects row with the approved project groups:
  - WhatsApp intake;
  - support handoff;
  - persistent memory for agents;
  - TechLocal services.
- Certifications grouped in compact form:
  - main: GNU/Linux administration, Responsive Web Design, PHP/SQL/POO/MVC, HTML/CSS;
  - additional: Intro to Programming, Advanced Web Layout.
- Languages:
  - Spanish native;
  - English A2 for technical reading/documentation.
- No Portuguese.
- References note only: references available upon request. Full reference details remain private backup material only.

Lower-priority evidence should be compressed rather than forcing a second page.

## Visual Design Direction

The CV should be visually inspired by the portfolio without becoming part of the public site:

- modern high-contrast typography and spacing;
- clean section cards or separators;
- subtle accent color matching the portfolio feel;
- concise technical chips for capabilities;
- print-first layout with predictable page breaks;
- photo treatment suitable for a formal CV.

Implementation guidance:

- Copy only the visual intent, not route code or public app components.
- Prefer inline CSS in `.private-cv/html/cv.html` for portability and privacy.
- Use `@page` rules and print CSS for A4 sizing.
- Use a single explicit page container and compact spacing to keep the one-page structure stable.
- Avoid remote fonts, analytics, public asset URLs, or external network requests.

## PDF Generation Approach

Playwright is available via `@playwright/test` in `package.json`, so local PDF generation can use a private helper script such as `.private-cv/scripts/export-pdf.mjs`.

Recommended behavior:

- Resolve `.private-cv/html/cv.html` as a local `file://` URL.
- Launch Chromium locally.
- Export to `.private-cv/dist/cv.pdf` with:
  - A4 format;
  - `printBackground: true`;
  - CSS page size honored where practical;
  - no web server and no Next.js route.
- Keep the script itself under `.private-cv/` unless the user later approves a tracked, redacted utility.

The existing Playwright e2e config is not the target export mechanism because it is configured around the public Next.js server. The CV export should remain independent from the web app.

## Validation and Privacy Checks

Before final delivery:

1. **Ignore validation**
   - Confirm `.private-cv/` is ignored by Git.
   - Confirm private files appear as ignored, not tracked or public untracked files.

2. **Repository status validation**
   - Confirm no private CV source, HTML, PDF, photo, certificate, or reference file is staged or tracked.
   - Confirm tracked changes are limited to redacted OpenSpec artifacts and possibly `.gitignore`.

3. **Redaction validation**
   - Review tracked OpenSpec/design/task artifacts for raw sensitive values.
   - Do not include phone numbers, exact address, age, IDs, family reference details, certificate screenshots, or full private CV text.

4. **Content approval gate**
   - User approval of the corrected field-reviewed content is required before final PDF generation.
   - Any unresolved field or unsupported claim blocks final export.

5. **Output inspection**
   - Manually open the local HTML and PDF.
   - Verify one-page layout, contact fields, excluded fields, project groups, certification grouping, language list, and references note.

6. **Review budget gate**
   - If tracked changed lines are expected to exceed 200, pause and ask before continuing.

## Cleanup Flow

After the final PDF is copied, delivered, or no longer needed in the repository folder:

1. Remove generated private HTML/PDF outputs from `.private-cv/` unless the user explicitly wants to keep local ignored copies.
2. Keep or remove private source files according to user preference, but never move them into tracked folders.
3. Re-run Git status/ignore checks to confirm no private file is tracked or publicly untracked.
4. Keep only redacted OpenSpec artifacts in the repository.

If a privacy issue is found, stop work, remove generated outputs, verify repository status, and continue only after the user confirms the desired recovery path.

## Risks and Tradeoffs

- **Manual content review is slower but safer.** It prevents unsupported claims and accidental exposure of sensitive fields.
- **Standalone HTML duplicates visual styling.** This avoids public route coupling but means styling is not automatically kept in sync with the portfolio.
- **Playwright PDF export may need local browser installation.** If Chromium is unavailable, install/use Playwright browsers locally or fall back to browser print-to-PDF, keeping all outputs in `.private-cv/`.
- **Two-page constraint can force concise wording.** Lower-priority details should be softened, grouped, or omitted rather than shrinking text excessively.
- **Private files in the repo working tree still carry local risk.** Cleanup after delivery reduces accidental future exposure.

## Why Not Use a Public Next.js Route

A public Next.js route would create avoidable privacy and operational risks:

- it could be linked, indexed, cached, deployed, or discovered;
- it would encourage storing private content in app source or public assets;
- it could accidentally enter sitemap, robots, analytics, navigation, or deployment artifacts;
- it would mix a selective private CV workflow with the public portfolio product surface.

The private CV is a document-generation workflow, not a website feature. A standalone ignored HTML file plus local PDF export satisfies the requirement with a smaller privacy footprint.

## Impacted Modules and File Changes

Expected tracked changes:

- `openspec/changes/private-cv-redesign/design.md` — this redacted design.
- `.gitignore` — only if `.private-cv/` is not already ignored.

Expected untracked/ignored local changes during implementation:

- `.private-cv/**` — private sources, worksheet, HTML, local export script, generated PDF.

No changes are expected to:

- `src/app/**` routes;
- public navigation;
- sitemap/robots metadata;
- `public/**` assets;
- public portfolio data, unless separately approved later.
