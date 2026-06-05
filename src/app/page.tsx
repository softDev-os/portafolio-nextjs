import type { Metadata } from "next";
import Link from "next/link";
import { getFlagshipCaseStudies } from "@/data/projects";

export const metadata: Metadata = {
	title: "Juan Fontalvo — Arquitectura de software e IA aplicada",
	description:
		"Consultoría en arquitectura de software y automatización con IA basada en casos reales.",
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	const flagshipCaseStudies = getFlagshipCaseStudies();

	return (
		<section className="content__page content__page--home">
			{/* ── Hero: asymmetric two-column layout ── */}
			<div className="home-hero">
				<header className="home-hero__left">
					<p className="home-hero__eyebrow">
						Arquitectura de software + IA aplicada
					</p>

					<h1 className="page__name home-hero__name">
						Juan <span className="home-hero__name-highlight">Fontalvo</span>
					</h1>

					<p className="page__job home-hero__role">
						Arquitecto de software / Ingeniero IA
					</p>

					<div className="home-hero__divider" aria-hidden="true" />

					<p className="home-hero__tagline">
						Diseño sistemas operativos con IA para ventas, soporte y
						conocimiento interno — automatizados, auditables y con control
						humano.
					</p>

					<div className="home-hero__cta">
						<Link
							href="/casos-reales"
							className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"
						>
							Ver casos reales
						</Link>
						<Link
							href="/contacto"
							className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"
						>
							Diseñar un workflow conmigo
						</Link>
					</div>
				</header>

				{/* ── Right: CSS-only control-room workflow preview ── */}
				<div className="home-hero__right" aria-hidden="true">
					<div className="control-room">
						<div className="control-room__label">Flujo operativo</div>
						<div className="control-room__grid">
							<div className="control-room__node control-room__node--intake">
								<span className="control-room__icon">◉</span>
								<span className="control-room__node-label">Intake</span>
								<span className="control-room__node-desc">
									Mensaje entrante
								</span>
							</div>
							<div className="control-room__node control-room__node--triage">
								<span className="control-room__icon">◇</span>
								<span className="control-room__node-label">AI Triage</span>
								<span className="control-room__node-desc">
									Clasificación automática
								</span>
							</div>
							<div className="control-room__node control-room__node--handoff">
								<span className="control-room__icon">▣</span>
								<span className="control-room__node-label">Human Handoff</span>
								<span className="control-room__node-desc">
									Decisión con contexto
								</span>
							</div>
							<div className="control-room__node control-room__node--audit">
								<span className="control-room__icon">◈</span>
								<span className="control-room__node-label">Audit Trail</span>
								<span className="control-room__node-desc">
									Memoria persistente
								</span>
							</div>
							{/* Connecting lines */}
							<div className="control-room__line control-room__line--h1" />
							<div className="control-room__line control-room__line--v1" />
							<div className="control-room__line control-room__line--h2" />
							{/* Data pulse */}
							<div className="control-room__pulse control-room__pulse--h1" />
							<div className="control-room__pulse control-room__pulse--v1" />
							<div className="control-room__pulse control-room__pulse--h2" />
						</div>
						<div className="control-room__footer">
							Control humano en cada decisión crítica
						</div>
					</div>
				</div>
			</div>

			{/* ── Proof: compact case study cards ── */}
			<section className="home-proof" aria-label="Casos de estudio">
				<h2 className="home-proof__heading">Casos reales</h2>
				<div className="home-proof__grid">
					{flagshipCaseStudies.map((study) => (
						<article key={study.id} className="case-card">
							<div className="case-card__meta">
								{study.metadataLabel && (
									<span className="case-card__badge">
										{study.metadataLabel}
									</span>
								)}
								<h3 className="case-card__title">{study.title}</h3>
							</div>
							<p className="case-card__problem">{study.problem}</p>
							{study.outcomes.length > 0 && (
								<p className="case-card__outcome">{study.outcomes[0]}</p>
							)}
							<ul
								className="case-card__stack"
								aria-label="Tecnologías utilizadas"
							>
								{study.stack.slice(0, 3).map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			{/* ── Pipeline architecture detail ── */}
			<div className="home-pipeline" aria-hidden="true">
				<div className="home-pipeline__step">
					<span className="home-pipeline__icon">◉</span>
					<span className="home-pipeline__label">Mensaje entrante</span>
				</div>
				<div className="home-pipeline__arrow">→</div>
				<div className="home-pipeline__step">
					<span className="home-pipeline__icon">◇</span>
					<span className="home-pipeline__label">Clasificación IA</span>
				</div>
				<div className="home-pipeline__arrow">→</div>
				<div className="home-pipeline__step">
					<span className="home-pipeline__icon">▣</span>
					<span className="home-pipeline__label">Decisión segura</span>
				</div>
				<div className="home-pipeline__arrow">→</div>
				<div className="home-pipeline__step">
					<span className="home-pipeline__icon">◈</span>
					<span className="home-pipeline__label">Humano informado</span>
				</div>
			</div>
		</section>
	);
}
