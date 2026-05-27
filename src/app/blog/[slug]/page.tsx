import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/data/blog";

export function generateStaticParams() {
	return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) return { title: "Artículo no encontrado" };
	return {
		title: article.title,
		description: article.summary,
		alternates: {
			canonical: `/blog/${article.slug}`,
		},
		openGraph: {
			type: "article",
			title: article.title,
			description: article.summary,
			url: `/blog/${article.slug}`,
			publishedTime: article.date,
			images: [
				{
					url: article.image,
					alt: article.title,
				},
			],
		},
	};
}

export default async function BlogArticle({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) notFound();

	return (
		<section className="content__page content__blog">
			<article className="blog-article">
				<header className="blog-article__header">
					<Link href="/blog" className="blog-article__back">
						← Blog
					</Link>
					<span className="blog-article__category">{article.category}</span>
					<h1 className="blog-article__title">{article.title}</h1>
					<time dateTime={article.date} className="blog-article__date">
						{article.dateDisplay}
					</time>
					<div className="blog-article__image-wrapper">
						<Image
							src={article.image}
							alt={article.title}
							width={800}
							height={370}
							className="blog-article__image"
							priority
						/>
					</div>
				</header>

				<div className="blog-article__body">
					{article.content.map((paragraph, i) => (
						<p key={`${paragraph.slice(0, 40)}-${i}`}>{paragraph}</p>
					))}
				</div>

				<footer
					className="portfolio__next-step"
					aria-label="Siguiente paso después del artículo"
				>
					<p>
						Si querés llevar este tipo de automatización a una operación real,
						empezá por los casos o por una consulta con contexto.
					</p>
					<div className="home-hero__cta">
						<Link
							href="/casos-reales"
							className="home-hero__cta-link home-hero__cta-link--primary"
						>
							Ver casos reales
						</Link>
						<Link
							href="/contacto"
							className="home-hero__cta-link home-hero__cta-link--secondary"
						>
							Consultar por WhatsApp
						</Link>
					</div>
				</footer>
			</article>
		</section>
	);
}
