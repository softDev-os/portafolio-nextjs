const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech-local.com";

export const siteOrigin = siteUrl.replace(/\/+$/, "");
