# Tasks: private-cv-redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 80–160 |
| 200-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low
```

**Rationale**: Only tracked change is this tasks file (~100–130 lines). `.private-cv/` is already in `.gitignore`. No routes, no public assets, no `src/` changes. All sensitive work happens inside the ignored `.private-cv/` workspace. Well within the 200-line budget.

## Implementation Checklist

- [x] Task 1: Verify `.private-cv/` ignore safety and redaction baseline.
- [x] Task 2: Create `.private-cv/` directory layout and workflow README.
- [x] Task 3: Gather source materials into `.private-cv/sources/`.
- [x] Task 4: Create and complete the field-review worksheet.
- [x] Task 5: Produce approved content source from user-corrected worksheet.
- [x] Task 6: Build private standalone HTML with inline CSS.
- [x] Task 7: Create local Playwright PDF export helper.
- [x] Task 8: Manually inspect generated HTML and PDF.
- [x] Task 9: Run privacy validation and redaction checks.
- [x] Task 10: Record apply/verify evidence in redacted OpenSpec artifacts.
- [x] Task 11: Cleanup generated local artifacts after user decides what to keep. Deferred: `.private-cv/` remains local and ignored; user chose not to delete private generated artifacts during repo archive.

---

## Task 1: Verify `.private-cv/` ignore safety and redaction baseline

**Goal**: Confirm the private workspace is already ignored by Git and that no tracked artifacts contain sensitive values.

**Steps**:

1. Run `git check-ignore -v .private-cv/` and verify it reports the `.gitignore` rule at line 51.
2. Run `git status --short --ignored .private-cv/` and confirm the directory shows as ignored (not untracked or staged).
3. Review tracked OpenSpec artifacts (`proposal.md`, `spec.md`, `design.md`) for raw sensitive data (phone numbers, exact address, IDs, family reference details, certificate screenshots, full CV text).
4. If any raw sensitive value is found, redact it or replace with a generic placeholder before proceeding.

**Verification**: Git reports `.private-cv/` as ignored. All tracked artifacts use only redacted/generic terms.

---

## Task 2: Create `.private-cv/` directory layout and workflow README

**Goal**: Create the private workspace directory structure as specified in the design, plus a local-only README with workflow notes.

**Steps**:

1. Create directories: `.private-cv/sources/`, `.private-cv/sources/certificates/`, `.private-cv/review/`, `.private-cv/html/assets/`, `.private-cv/scripts/`, `.private-cv/dist/`.
2. Write `.private-cv/README.md` with:
   - Purpose of each subdirectory.
   - Workflow summary (review → approve → generate HTML → export PDF → validate → cleanup).
   - Reminder that this entire directory is Git-ignored.
   - Reminder to move or copy the final PDF elsewhere and clean up generated artifacts when done.
3. Confirm `git status` still shows `.private-cv/` as ignored.

**Verification**: `ls -la .private-cv/` shows the expected structure. `README.md` is present and accurate.

---

## Task 3: Gather source materials into `.private-cv/sources/`

**Goal**: Collect all private input material in one place for the field review step. Do **not** read or expose raw sensitive values in tracked artifacts.

**Steps**:

1. Locate the old private CV source and copy it to `.private-cv/sources/old-cv.*`.
2. Locate certificate evidence files and copy to `.private-cv/sources/certificates/`.
3. Locate the approved CV photo and copy to `.private-cv/sources/photo.*`.
4. If reference details exist separately, copy to `.private-cv/sources/references-private.*` (backup only, not for main CV body).
5. Confirm these files are ignored by Git: `git check-ignore -v .private-cv/sources/*`.

**Verification**: Source files are present under `.private-cv/sources/`. Git shows them as ignored.

---

## Task 4: Create and complete the field-review worksheet

**Goal**: Produce `.private-cv/review/field-review.md` — a structured worksheet where every CV field is listed for user correction before final content is approved.

**Steps**:

1. Write the worksheet covering all CV sections:
   - **Header**: city/country, phone, email, GitHub, LinkedIn, portfolio link (exclude age, Instagram, exact address).
   - **Headline / professional summary**: orient to infrastructure, automation, applied generative AI/LLM, data integration, operational DevOps.
   - **Core capabilities / technical keywords**: list technical skills defensibly.
   - **Experience entries** as per design:
     - Current merged role (independent consulting + TechLocal + related work).
     - Fused premium-hardware support block (JC Computadores + New Technology).
     - Brief Armada entry.
     - Removed: Madevidrios.
   - **Projects**: WhatsApp intake, support handoff, persistent memory for agents, TechLocal services.
   - **Certifications**: main group (GNU/Linux admin, Responsive Web Design, PHP/SQL/POO/MVC, HTML/CSS) and additional group (Intro to Programming, Advanced Web Layout).
   - **Languages**: Spanish native, English A2 technical reading/documentation. No Portuguese.
   - **References note**: "Available upon request" only.
2. For each field, note the draft value from source material and leave space for user correction or approval.
3. Flag any unsupported metrics, seniority claims, or unapproved outcomes for user decision.

**Verification**: Worksheet is complete with all sections. User can review and correct every field.

---

## Task 5: Produce approved content source from user-corrected worksheet

**Goal**: Once the user has corrected and approved every field, convert the worksheet into a structured approved content source.

**Steps**:

1. After user completes field review, create `.private-cv/review/approved-content.json` (or update the worksheet directly if user prefers).
2. Include only user-approved values. Do not include raw phone number, exact address, IDs, family reference details, or certificate screenshots in tracked artifacts — all sensitive data stays inside `.private-cv/` only.
3. Verify all claims are interview-defensible: describe applied work, not unsupported metrics or custom model training.
4. Confirm the user has explicitly approved the final content before proceeding to generation.

**Verification**: Approved content source exists. User confirms approval in writing (inline approval in the worksheet, or explicit message).

---

## Task 6: Build private standalone HTML with inline CSS

**Goal**: Create `.private-cv/html/cv.html` — a standalone, self-contained HTML document with inline CSS that implements the one-page layout from the design.

**Steps**:

1. Write the HTML document with:
   - A4 page setup via `@page { size: A4; margin: ... }` and print CSS.
   - Modern high-contrast typography, clean section cards/separators, subtle accent color.
   - Concise technical chips for capabilities.
   - Print-first one-page layout with compact sections and no forced second page.
   - Photo reference from a local path (e.g., `../sources/photo.*` or copied to `html/assets/`).
2. One-page content:
   - Contact header (city/country, phone, email, GitHub, LinkedIn, portfolio link — no age, Instagram, exact address).
   - Professional headline (infrastructure, automation, applied AI/LLM, data integration, DevOps).
   - Short profile paragraph (defensible claims only).
   - Compact core capabilities / technical keywords.
   - Current merged role with concise impact bullets.
   - Fused premium-hardware support block (JC + New Tech). Brief Armada entry only if it fits. No Madevidrios.
   - Approved project groups (WhatsApp intake, support handoff, persistent memory for agents, TechLocal services) in compact form.
   - Certifications (main + additional groups), languages, and references note in compact form.
3. Use Spanish-first text with English technical keywords/headings where useful.
4. Do **not** include remote fonts, analytics, public asset URLs, or external network requests.
5. Do **not** import any Next.js route code, CSS modules, or app components.
6. Place the photo in `.private-cv/html/assets/` (copy from sources) and reference it from the HTML.

**Verification**: Open `.private-cv/html/cv.html` in a browser. Two-page layout renders correctly. All approved fields are present. Excluded fields are absent. No external network requests.

---

## Task 7: Create local Playwright PDF export helper

**Goal**: Write `.private-cv/scripts/export-pdf.mjs` — a standalone Node.js script that uses Playwright to convert the local HTML to a PDF.

**Steps**:

1. Write a script that:
   - Resolves `../html/cv.html` as a `file://` URL.
   - Launches a local Chromium browser via `@playwright/test` or `playwright` (available in project dev dependencies).
   - Exports to `.private-cv/dist/cv.pdf` with:
     - `format: 'A4'`.
     - `printBackground: true`.
     - Respect CSS page size where practical.
   - Does **not** start a web server or reference the Next.js app.
2. Keep the script itself under `.private-cv/` (ignored by Git).
3. Test the script runs: `node .private-cv/scripts/export-pdf.mjs`.
   - If Playwright browsers are not installed, run `npx playwright install chromium` first.

**Verification**: Script runs without errors. `.private-cv/dist/cv.pdf` is created. No web server needed. No output appears outside `.private-cv/`.

---

## Task 8: Manually inspect generated HTML and PDF

**Goal**: Confirm both outputs are correct, complete, and properly formatted before validation.

**Steps**:

1. Open `.private-cv/html/cv.html` in a browser. Verify:
   - One-page layout without overflow or forced second page.
   - Contact header shows approved categories only (no age, Instagram, exact address).
   - Photo displays correctly.
   - Experience, projects, certifications, languages, and references match approved content.
   - No unsupported metrics or unapproved claims visible.
2. Open `.private-cv/dist/cv.pdf` in a PDF viewer. Verify:
   - Same content fidelity as the HTML.
   - A4 sizing.
   - Print-friendly appearance.
3. If issues are found, correct the HTML and regenerate the PDF.

**Verification**: Both HTML and PDF pass visual inspection. Content matches user-approved source.

---

## Task 9: Run privacy validation and redaction checks

**Goal**: Perform all validation gates from the spec before considering the work complete.

**Steps**:

1. **Ignore validation**: `git check-ignore -v .private-cv/html/cv.html` and `git check-ignore -v .private-cv/dist/cv.pdf` — both must report the `.gitignore` rule.
2. **Repository status**: `git status --short --ignored .private-cv/` — show all files as ignored, none as untracked or staged.
3. **Redaction validation**: Re-read `openspec/changes/private-cv-redesign/proposal.md`, `spec.md`, `design.md`, and `tasks.md`. Confirm no raw sensitive values (phone numbers, exact address, IDs, family reference details, certificate screenshots, full CV text) appear in any tracked file.
4. **Review budget gate**: Count tracked changed lines (`git diff --stat` or `git diff --shortstat`). If over 200, pause and ask for user approval before continuing.
5. **Content approval gate**: Confirm user has explicitly approved the final content (inline approval in worksheet or explicit message).

**Verification**: All five gates pass. Record results in the task output.

---

## Task 10: Record apply/verify evidence in redacted OpenSpec artifacts

**Goal**: Capture what was done and what was verified so the SDD trace is complete and reviewable.

**Steps**:

1. Write a brief apply/verify note in the next applicable OpenSpec artifact (e.g., update `tasks.md` or create a `verify-report.md`) covering:
   - What was created under `.private-cv/` (described generically — do not expose raw values).
   - Ignore validation results (pass/fail).
   - Redaction validation results (pass/fail).
   - Review budget usage (tracked line count).
   - Whether user approved final content and generated output.
   - Any issues found and how they were resolved.
2. Ensure the record itself contains only redacted/generic descriptions.
3. If cleanup has been performed, note the cleanup state.

**Verification**: A redacted apply/verify record exists in the OpenSpec change directory.

---

## Task 11: Cleanup generated local artifacts (optional, user decision)

**Goal**: Remove generated private HTML/PDF outputs from the repository folder after the final PDF is delivered or copied elsewhere, unless the user asks to keep local ignored copies.

**Steps**:

1. Ask the user whether to:
   - (a) Keep all `.private-cv/` contents (ignored, safe for local reuse).
   - (b) Remove generated artifacts but keep source files and worksheet.
   - (c) Remove everything except the redacted OpenSpec artifacts.
2. If (b) or (c) is chosen:
   - Remove `html/`, `dist/`, and optionally `sources/`, `review/`, `scripts/` per user preference.
   - Run `git status --short` to confirm no sensitive files remain tracked or untracked.
   - Update the apply/verify record with the cleanup state.
3. If the user wants to keep everything, note the decision in the record.

**Verification**: Git status shows no private CV files as tracked or untracked. Redacted OpenSpec artifacts remain.

---

## Summary

| Task | Description | Depends On |
|------|-------------|------------|
| 1 | Verify ignore safety and redaction baseline | — |
| 2 | Create `.private-cv/` layout and README | 1 |
| 3 | Gather source materials into `.private-cv/sources/` | 2 |
| 4 | Create and complete field-review worksheet | 3 |
| 5 | Produce approved content source from worksheet | 4 (user approval gate) |
| 6 | Build private standalone HTML with inline CSS | 5 |
| 7 | Create local Playwright PDF export helper | 5 |
| 8 | Manually inspect generated HTML and PDF | 6, 7 |
| 9 | Run privacy validation and redaction checks | 8 |
| 10 | Record apply/verify evidence in redacted artifacts | 9 |
| 11 | Cleanup generated local artifacts (user decides) | 10 |

All sensitive work happens inside `.private-cv/` (Git-ignored). Tracked changes are limited to this tasks file. Budget risk is Low. No chained PRs needed.
