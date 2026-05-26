import type { MetadataRoute } from "next";
import { getArticles } from "@/data/blog";
import { siteOrigin } from "@/lib/seo";

type SitemapEntry = {
	path: string;
	changeFrequency: NonNullable<
		MetadataRoute.Sitemap[number]["changeFrequency"]
	>;
	priority: number;
	lastModified?: Date;
};

const STATIC_PUBLISHED = new Date("2026-05-20");

const staticRoutes = [
	{ path: "", changeFrequency: "weekly", priority: 1 },
	{ path: "/casos-reales", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/perfil", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/credenciales", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/blog", changeFrequency: "weekly", priority: 0.7 },
	{ path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
] as readonly SitemapEntry[];

export default function sitemap(): MetadataRoute.Sitemap {
	const blogRoutes: SitemapEntry[] = getArticles().map((article) => ({
		path: `/blog/${article.slug}`,
		changeFrequency: "monthly",
		priority: 0.6,
		lastModified: new Date(article.date),
	}));

	return [...staticRoutes, ...blogRoutes].map(
		({ path, changeFrequency, priority, lastModified }) => ({
			url: `${siteOrigin}${path}`,
			lastModified: lastModified ?? STATIC_PUBLISHED,
			changeFrequency,
			priority,
		}),
	);
}
