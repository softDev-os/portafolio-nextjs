# Web quality audit — 2026-05-26

Audited the local production build served from `http://127.0.0.1:3000` after commit `fb792fd`.

## Commands

```bash
pnpm build
pnpm start
pnpm dlx lighthouse <route> \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json

# axe CLI failed in this environment because chromedriver could not be spawned,
# so axe-core 4.11.4 was run through Playwright against the same local server.
```

Raw JSON artifacts were written under `/tmp/portafolio-audits/` during the audit run.

## Lighthouse scores

| Route | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 96 | 100 |
| `/casos-reales` | 87 | 100 | 96 | 100 |
| `/perfil` | 99 | 100 | 96 | 100 |
| `/credenciales` | 99 | 96 | 96 | 100 |
| `/blog` | 88 | 100 | 92 | 100 |
| `/contacto` | 98 | 100 | 96 | 100 |

## axe-core results

axe-core 4.11.4 via Playwright reported **0 violations** on all audited routes:

| Route | Violations | Incomplete checks |
| --- | ---: | ---: |
| `/` | 0 | 1 |
| `/casos-reales` | 0 | 1 |
| `/perfil` | 0 | 2 |
| `/credenciales` | 0 | 1 |
| `/blog` | 0 | 1 |
| `/contacto` | 0 | 1 |

The incomplete axe checks are mostly `color-contrast` cases where axe could not determine text contrast over gradient backgrounds. `/perfil` also reported an incomplete `aria-prohibited-attr` check for `.profile__actions` because a plain `div` has an `aria-label` without a role.

## Findings

### P0 — none

No critical Lighthouse or axe blocker was found.

### P1 — certificate date contrast on `/credenciales`

- Evidence: Lighthouse accessibility score is 96 on `/credenciales`.
- Affected selector: `.certificate__date`.
- Reported contrast: `#7f7f95` on `#1a1b30`, ratio `4.32:1`, expected `4.5:1`.
- Scope: visible in dark-mode/mobile audit context.
- Recommended action: adjust the certificate date text color/token slightly lighter or increase the font size/weight only for this metadata text.
- Validation: rerun Lighthouse accessibility for `/credenciales` and the E2E smoke tests.

### P2 — blog image aspect ratio on `/blog`

- Evidence: Lighthouse Best Practices flags `image-aspect-ratio` on article card images.
- Affected selector: `.article__image` inside `.article__mask`.
- Observed displayed ratios are close to square, while source images are wider (`1.50` / `1.78`).
- Recommended action: make the article image container preserve a consistent wide aspect ratio or use object-fit/crop intentionally so displayed dimensions match the intended ratio.
- Validation: rerun Lighthouse on `/blog` and visually smoke test desktop/mobile.

### P2 — LCP image loading on `/casos-reales` and `/blog`

- Evidence: Lighthouse performance is 87 on `/casos-reales` and 88 on `/blog`.
- `/casos-reales` LCP image is a case image loaded lazily.
- `/blog` LCP is an article image loaded lazily.
- Recommended action: mark the first above-the-fold image on these routes as priority/eager using Next Image props, but only after verifying which image is actually above the fold per breakpoint.
- Validation: rerun Lighthouse performance on both routes.

### P3 — local-only Vercel Analytics console noise

- Evidence: Lighthouse Best Practices reports console errors for `/_vercel/insights/script.js` returning 404 from the local `next start` server.
- Likely cause: Vercel Analytics endpoint is not available in local production server mode.
- Recommended action: treat as local audit noise unless production audits show the same error.
- Validation: confirm on deployed `https://tech-local.com` before changing code.

### P3 — `.profile__actions` aria-label on plain div

- Evidence: axe incomplete check on `/perfil`: `aria-label` is not well supported on a plain `div` without a valid role.
- Recommended action: remove the `aria-label` if it is decorative/grouping only, or use an appropriate semantic element if it needs a programmatic label.
- Validation: rerun axe on `/perfil`.

## Do not do

- Do not redesign the site based on these audit numbers.
- Do not chase local Vercel Analytics 404 before confirming it happens in production.
- Do not split CSS files as part of this audit unless a fix requires it.
- Do not optimize below-the-fold images with `priority`; only above-the-fold/LCP candidates should be considered.

## Recommended next batch

1. Fix `.certificate__date` contrast on `/credenciales`.
2. Fix `.profile__actions` ARIA semantics if source confirms the label is unnecessary.
3. Investigate `/blog` article card image aspect ratio.
4. Investigate route-specific LCP image priority for `/casos-reales` and `/blog`.
