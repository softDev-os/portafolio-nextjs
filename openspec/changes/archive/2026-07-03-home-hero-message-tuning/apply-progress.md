# Apply Progress: home-hero-message-tuning

## Status

Applied; not yet committed.

## Baseline Before Source Edits

Workspace included unrelated local work out of scope:

```text
 M .gitignore
?? cv-refactor-scout.md
?? docs/JUAN-FONTALVO-ROADMAP.md
?? openspec/changes/private-cv-redesign/
?? openspec/specs/design-responsividad/
```

Baseline commands before source edits:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |

## Source Changes

Only `src/app/page.tsx` was changed.

Implemented JSX-only microcopy update:

- Eyebrow changed to `Tecnología práctica + IA aplicada`.
- Role changed to `Creador tech / Software / IA aplicada`.
- Tagline changed to: `Ayudo a personas y negocios a comprar, reparar, automatizar y aprovechar mejor su tecnología — desde PCs y laptops hasta software y sistemas con IA.`
- Primary CTA stayed unchanged: `Ver casos reales` → `/casos-reales`.
- Secondary CTA changed to `Hablemos de tu solución` and still links to `/contacto`.

No CSS fallback was needed.

## Changed Files

```text
src/app/page.tsx
openspec/changes/home-hero-message-tuning/apply-progress.md
```

Source diff stat:

```text
src/app/page.tsx | 12 ++++++------
1 file changed, 6 insertions(+), 6 deletions(-)
```

## Verification Evidence

### Automated checks

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run build` | PASS; existing Edge runtime static-generation warning remains. |
| `git diff --check` | PASS |

### Static guards

| Guard | Result |
| --- | --- |
| `git diff --name-only -- src` shows only `src/app/page.tsx` | PASS |
| No CSS changed | PASS |
| No proof-card/control-room/pipeline/data/global/foundation changes | PASS |
| Source changed lines under 80 | PASS — 12 changed lines |
| No `docs/JUAN-FONTALVO-ROADMAP.md` changes | PASS |
| No `openspec/specs/design-responsividad/` changes | PASS |

### Playwright Home smoke

A temporary Playwright spec `tests/e2e/home-hero-message-tuning-smoke.spec.ts` was created, run, and deleted. `test-results/` was removed after the run.

Smoke covered:

- desktop hero updated copy visible;
- primary CTA visible and href `/casos-reales` preserved;
- secondary CTA visible and href `/contacto` preserved;
- control-room still renders;
- proof cards still render;
- pipeline still renders;
- `390px` and `360px` mobile widths have no horizontal overflow.

Result:

```text
3 passed
```

## Deviations

None. Implementation stayed JSX-only as designed.


## Fresh Review Results

Fresh review passed:

| Review lens | Result |
| --- | --- |
| `review-readability` | No findings |

Review task ID:

```text
subtask_review-readability_1783084115610_5e72b764
```

## Risks / Follow-ups

- The broader tagline is intentionally wider than the previous AI-operations-only positioning, but mobile smoke passed.
- Future units may need to align `/casos-reales`, blog, or roadmap copy with the broader brand, but those are out of scope here.

## Next Recommended

Run fresh review before committing. If clean, commit source as:

```text
tune(home): broaden hero brand message
```
