# Apply Progress: private-cv-redesign

## Status

Applied local private CV workflow.

## Completed Work

- Verified `.private-cv/` ignore safety for private source, draft, HTML, script, approved content, and PDF outputs.
- Confirmed tracked OpenSpec artifacts do not contain raw sensitive values via redaction grep checks.
- Created the private workspace layout under `.private-cv/`.
- Normalized source material into the designed private layout.
- Created a local-only workflow README.
- Created a private approved content source.
- Created a standalone private HTML CV with inline/private CSS and local assets.
- Created a local Playwright PDF export helper.
- Generated a local A4 PDF in the private ignored workspace.
- Reworked the generated CV from 2 pages to 1 page after Judgment Day feedback and user direction.
- Switched the PDF HTML to system fonts/no letter-spacing to improve ATS/copy-paste text extraction.
- Confirmed generated PDF has 1 page.
- Confirmed generated HTML/PDF and private review/script files are ignored by Git.

## Generated Private Artifacts

All artifacts below are inside ignored `.private-cv/` and are described generically only:

- local approved content source;
- local standalone HTML CV;
- local assets including photo and fonts;
- local PDF export helper;
- generated private PDF.

## Validation Evidence

- Ignore validation: passed.
- Redaction validation for tracked OpenSpec artifacts: passed.
- PDF generation: passed.
- PDF page count: 1 page, A4.
- Public route/assets check: no public route or `public/` output was created.

## Remaining User Gate

Resolved for repository archive: the user chose to keep local ignored artifacts under `.private-cv/`. No private files should be staged or committed.

## Risks / Notes

- Generated private files remain sensitive even though ignored by Git.
- Cleanup decision for archive: keep ignored local artifacts under `.private-cv/`.
