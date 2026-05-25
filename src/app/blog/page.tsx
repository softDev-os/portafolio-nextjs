import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/data/blog";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Notas sobre automatización con IA, arquitectura de software y workflows operativos.",
	alternates: {
		canonical: "/blog",
	},
};

export default function Blog() {
	const articles = getArticles();

	return (
		<section className="content__page content__blog">
			<header className="blog__header">
				<h1 className="blog__title">Blog</h1>
				<p className="blog__intro">
					Notas sobre automatización con IA, workflows operativos y patrones de
					arquitectura que aplico en proyectos reales.
				</p>
			</header>

			<section className="blog__articles">
				{articles.map((article) => (
					<article key={article.slug} className="articles__article">
						<div className="article__top">
							<div className="article__category">{article.category}</div>
							<Link
								href={`/blog/${article.slug}`}
								className="article__image-link"
							>
								<div className="article__mask">
									<Image
										src={article.image}
										className="article__image"
										alt={article.title}
										width={400}
										height={185}
									/>
								</div>
								<div className="article__logo">
									<svg className="article__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor" /></svg>
								</div>
							</Link>
						</div>
						<div className="article__bottom">
							<time dateTime={article.date} className="article__date">
								{article.dateDisplay}
							</time>
							<h2 className="article__title">
								<Link href={`/blog/${article.slug}`} className="article__link">
									{article.title}
								</Link>
							</h2>
							<p className="article__summary">{article.summary}</p>
						</div>
					</article>
				))}
			</section>

			<section
				className="portfolio__next-step"
				aria-label="Siguiente paso después de leer el blog"
			>
				<p>
					Si una nota conecta con un problema de tu operación, revisá los casos
					o abrí una consulta calificada por WhatsApp.
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
			</section>
		</section>
	);
}
