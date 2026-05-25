import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech-local.com";

  const routes = [
    { path: "", freq: "weekly", prio: 1 },
    { path: "/portafolio", freq: "monthly", prio: 0.8 },
    { path: "/sobre-mi", freq: "monthly", prio: 0.8 },
    { path: "/curriculum", freq: "monthly", prio: 0.8 },
    { path: "/blog", freq: "weekly", prio: 0.7 },
    { path: "/blog/automatizacion-whatsapp-n8n-calificacion-leads", freq: "monthly", prio: 0.6 },
    { path: "/blog/memoria-persistente-agentes-ia-engram", freq: "monthly", prio: 0.6 },
    { path: "/blog/handoff-humano-automatizacion-cuando-como", freq: "monthly", prio: 0.6 },
    { path: "/contacto", freq: "monthly", prio: 0.8 },
  ] as const;

  return routes.map(({ path, freq, prio }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority: prio,
  }));
}
