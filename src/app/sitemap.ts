import type { MetadataRoute } from "next";
import { getArticles } from "@/data/blog";

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/casos-reales", changeFrequency: "monthly", priority: 0.8 },
  { path: "/perfil", changeFrequency: "monthly", priority: 0.8 },
  { path: "/credenciales", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
] as const satisfies readonly SitemapEntry[];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech-local.com";
  const blogRoutes = getArticles().map(
    (article): SitemapEntry => ({
      path: `/blog/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...blogRoutes].map(
    ({ path, changeFrequency, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }),
  );
}
