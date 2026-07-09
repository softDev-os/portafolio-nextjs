# Proposal: private-cv-redesign

## Problem Statement and Motivation

The user needs a professional CV/resume generated from existing portfolio information, an old private CV, recent certificates, and newer work with AI/automation. The current materials are fragmented across a public portfolio and private files.

The CV is private. It should be sent only to selected companies and must not become part of the public website or repository history.

## Intent

Create a private, field-reviewed CV workflow that produces:

1. a corrected private content source;
2. a polished HTML CV using the portfolio's visual language;
3. a locally generated PDF;
4. cleanup guidance so sensitive artifacts are not committed or left in the public repo folder after use.

## Scope

### In Scope

- Use existing portfolio data as source material.
- Use the old private CV and certificates as source material.
- Create a private field-review worksheet under `.private-cv/`.
- Correct every CV field through user review before final generation.
- Produce a short bilingual CV style: Spanish-first with English technical keywords/headings where useful.
- Include photo in the private CV.
- Include full private contact details in the final private PDF, per user approval.
- Generate HTML and PDF locally only.
- Keep OpenSpec artifacts redacted.
- Keep `.private-cv/` ignored by Git.

### Out of Scope / Non-goals

- No public portfolio route for the CV.
- No navigation link to the CV.
- No `public/` CV PDF output.
- No sitemap or robots exposure for the CV.
- No commit/PR unless the user explicitly asks after reviewing privacy risk.
- No raw phone number, exact address, reference phone, ID numbers, or certificate screenshots in OpenSpec artifacts.
- No claims of metrics, seniority, certifications, or outcomes that the user has not approved.

## Affected Areas

| Area | Responsibility |
| --- | --- |
| `.gitignore` | Ensure private CV folder is ignored. |
| `.private-cv/` | Ignored local working area for sensitive source files, worksheet, HTML, and PDF. |
| `openspec/changes/private-cv-redesign/` | Redacted planning artifacts only. |
| Existing `src/data/*` files | Read-only source material unless the user explicitly approves public portfolio data changes later. |
| Existing public pages | Read-only; do not associate the CV with the public site. |

## Success Criteria

- `.private-cv/` is ignored by Git and contains private working inputs/outputs only.
- The user has a private worksheet where every CV field can be corrected.
- The final CV content is approved by the user before PDF generation.
- The generated HTML follows the portfolio's visual language without becoming public website functionality.
- The generated PDF is created locally only.
- `git status` shows no sensitive CV source/PDF files as untracked/tracked.
- OpenSpec artifacts remain redacted and safe for a public repo.
- The workflow includes a cleanup step to remove private artifacts from the repo folder when finished.

## Review Workload Forecast

Expected tracked-source diff should stay small because most sensitive work happens in ignored files.

Forecast:

```txt
20–120 tracked changed lines
```

Review budget selected by user:

```txt
200 changed lines
```

If tracked changes exceed 200 lines, pause and ask before continuing.

## Verification Plan

- `git check-ignore -v .private-cv/<sample-file>` confirms private files are ignored.
- `git status --short --ignored .private-cv` shows `.private-cv/` as ignored, not untracked.
- Before any commit/PR, verify no sensitive files are staged or tracked.
- If code/scripts are added later, run the relevant project checks (`pnpm lint`, `pnpm typecheck`, and/or `pnpm build`) as appropriate.
- Manually inspect generated HTML/PDF locally before considering the work complete.

## Rollback / Cleanup Plan

If privacy risk appears:

1. Stop generation.
2. Remove generated local CV artifacts from `.private-cv/`.
3. Confirm `git status --short` does not show sensitive files.
4. Keep only redacted OpenSpec artifacts if the user still wants the SDD trace.

When the final PDF is delivered or copied elsewhere, remove private working outputs from the repo folder unless the user asks to keep them locally ignored.

## Proposal Question Round

Before Spec/Design, the user should correct the private worksheet and answer these product/content questions:

1. What headline should lead the CV: infrastructure/IT specialist, software automation engineer, AI workflow builder, or hybrid?
2. Which experience entries should be rewritten, merged, removed, or emphasized?
3. Which recent AI/automation projects should appear as evidence, and what can be stated safely?
4. Which certificates should appear in the CV summary versus an appendix/supporting evidence section?
5. Should the first version optimize for one-page recruiter scanning or two-page evidence depth?

## Recommendation for Spec

Proceed to Spec only after the private worksheet is corrected or the user approves using the extracted draft as the starting truth.
