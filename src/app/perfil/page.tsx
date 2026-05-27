import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
	title: "Perfil",
	description:
		"Perfil profesional de Juan Fontalvo para arquitectura de automatización, IA aplicada y mejora operativa.",
	alternates: {
		canonical: "/perfil",
	},
};

const consultantCapabilities = [
	{
		title: "Arquitectura de automatización",
		description:
			"Diseño flujos de negocio que conectan conversaciones, herramientas internas y reglas operativas sin prometer resultados que no puedan auditarse.",
		iconPath:
			"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80zM160 352c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96zM160 224c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h112zM352 416c-17.7 0-32 14.3-32 32s14.3 32 32 32h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H352zm0-288c17.7 0 32-14.3 32-32s-14.3-32-32-32H240c-17.7 0-32 14.3-32 32s14.3 32 32 32h112z",
	},
	{
		title: "Intake y calificación por WhatsApp",
		description:
			"Construyo entradas de venta para capturar intención, ordenar contexto y preparar el seguimiento humano o automatizado según el caso.",
		iconPath:
			"M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z",
	},
	{
		title: "Soporte con handoff humano",
		description:
			"Estructuro asistentes que atienden preguntas repetibles y reconocen cuándo escalar a una persona con el contexto necesario.",
		iconPath:
			"M256 48C141.1 48 48 141.1 48 256v56c0 13.3 10.7 24 24 24h56c13.3 0 24-10.7 24-24V256c0-70.7 57.3-128 128-128s128 57.3 128 128v56c0 13.3 10.7 24 24 24h56c13.3 0 24-10.7 24-24V256C464 141.1 370.9 48 256 48zM128 376c-13.3 0-24 10.7-24 24v16c0 48.6 39.4 88 88 88h128c48.6 0 88-39.4 88-88v-16c0-13.3-10.7-24-24-24s-24 10.7-24 24v16c0 22.1-17.9 40-40 40H192c-22.1 0-40-17.9-40-40v-16c0-13.3-10.7-24-24-24z",
	},
	{
		title: "Memoria persistente para agentes",
		description:
			"Integro memoria y registro de decisiones para que los agentes trabajen con continuidad, trazabilidad y menos repetición operativa.",
		iconPath:
			"M288 32c-17.7 0-32 14.3-32 32v16H192V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v64H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v64H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h64v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-64h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-64h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v16h-64V64c0-17.7-14.3-32-32-32zm-32 128h64v64h-64v-64zm0 128h64v64h-64v-64z",
	},
] as const;

const methodSteps = [
	{
		title: "Entender la operación antes de automatizar",
		description:
			"Primero identifico intención, restricciones, responsables y señales de escalamiento. La IA no arregla un proceso que todavía no está claro.",
	},
	{
		title: "Diseñar flujos con puntos de control",
		description:
			"Cada automatización necesita límites: cuándo responde sola, cuándo pide contexto y cuándo entrega el caso a una persona.",
	},
	{
		title: "Dejar evidencia para operar y mejorar",
		description:
			"Prefiero sistemas que registran decisiones, aprendizajes y excepciones para que el equipo no dependa de memoria informal.",
	},
] as const;

const profilePrinciples = [
	"Problemas reales antes que demos vistosas: si no mejora una operación concreta, no entra en la solución.",
	"Arquitectura simple antes que stacks inflados: menos piezas, mejor instrumentadas y más fáciles de sostener.",
	"Automatización con criterio humano: el handoff importa tanto como la respuesta automática.",
] as const;

const trustBoundaries = [
	"Los casos publicados se describen con lenguaje cualitativo cuando no existe una métrica pública verificable.",
	"No uso logos, reseñas o contadores si no hay autorización o evidencia visible para respaldarlos.",
	"El alcance comercial se valida por conversación: primero se entiende el proceso, luego se propone una solución.",
] as const;

export default function SobreMi() {
	return (
		<section className="content__page content__about">
			<header className="about__header">
				<h1 className="about__title">Perfil</h1>
			</header>

			<section className="profile__hero" aria-label="Perfil estratégico">
				<p className="profile__eyebrow">
					Arquitectura de automatización e IA aplicada
				</p>
				<h2 className="profile__headline">
					Diseño sistemas de automatización para operaciones que necesitan
					decidir mejor, responder más rápido y sostener el control.
				</h2>
				<article className="profile__summary">
					<p>{personal.bio}</p>
					<p>
						Trabajo con equipos que necesitan ordenar conversaciones, soporte y
						conocimiento operativo en flujos claros, auditables y sostenibles.
						La tecnología entra cuando ayuda a reducir fricción real, no para
						sumar complejidad innecesaria.
					</p>
				</article>
				<div
					className="profile__actions"
					role="group"
					aria-label="Siguientes pasos recomendados"
				>
					<Link
						href="/casos-reales"
						className="home-hero__cta-link home-hero__cta-link--primary"
					>
						Ver casos reales primero
					</Link>
					<Link
						href="/contacto"
						className="home-hero__cta-link home-hero__cta-link--secondary"
					>
						Conversar con contexto
					</Link>
				</div>
			</section>

			<section className="about__method">
				<header className="method__header">
					<h2 className="method__title">
						Cómo resuelvo <span className="title__color">problemas</span>
					</h2>
				</header>
				<div className="method__steps">
					{methodSteps.map((step, index) => (
						<article key={step.title} className="method__step">
							<span className="method__index">0{index + 1}</span>
							<h3 className="method__step-title">{step.title}</h3>
							<p className="method__description">{step.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className="about__services">
				<header className="services__header">
					<h2 className="services__title">
						Frentes estratégicos donde puedo{" "}
						<span className="title__color">intervenir</span>
					</h2>
				</header>
				<div className="services__container">
					{consultantCapabilities.map((capability) => (
						<article key={capability.title} className="services__service">
							<div className="service__icons">
								<svg
									className="service__icon"
									aria-hidden="true"
									viewBox="0 0 512 512"
									fill="currentColor"
									width="1em"
									height="1em"
								>
									<path d={capability.iconPath} />
								</svg>
							</div>
							<div className="service__content">
								<h3 className="service__title">{capability.title}</h3>
								<p className="service__description">{capability.description}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="about__principles">
				<header className="principles__header">
					<h2 className="principles__title">
						Principios de <span className="title__color">trabajo</span>
					</h2>
				</header>
				<ul className="principles__list">
					{profilePrinciples.map((principle) => (
						<li key={principle} className="principles__item">
							{principle}
						</li>
					))}
				</ul>
			</section>

			<section className="about__trust">
				<header className="trust__header">
					<h2 className="trust__title">
						Cómo manejo la <span className="title__color">confianza</span>
					</h2>
				</header>
				<ul className="trust__list">
					{trustBoundaries.map((boundary) => (
						<li key={boundary} className="trust__item">
							{boundary}
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
