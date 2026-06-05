import type { Metadata } from "next";
import Link from "next/link";
import { personal, primarySalesContact } from "@/data/personal";

export const metadata: Metadata = {
	title: "Contacto",
	description:
		"Contacto calificado para consultas de automatización con IA y arquitectura de software.",
	alternates: {
		canonical: "/contacto",
	},
};

const inquirySteps = [
	"Comparte qué proceso querés automatizar y qué canal usa hoy tu equipo.",
	"Incluí volumen aproximado, dolores operativos y restricciones importantes.",
	"Si el caso encaja, seguimos por una conversación directa con alcance claro.",
] as const;

export default function Contacto() {
	return (
		<section className="content__page content__contact">
			<header className="contact__header">
				<h1 className="contact__title">Contacto</h1>
			</header>

			<div className="contact__container">
				{/* Info de contacto */}
				<section className="contact__info">
					<a
						href={primarySalesContact.url}
						className="contact__data contact__data--primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.47 14.38c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.53.12-.15.25-.61.78-.75.94-.14.16-.28.17-.52.06s-1.02-.37-1.93-1.19c-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.76-.19-.46-.39-.4-.53-.4-.14-.01-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.07.14-1.16-.06-.1-.22-.16-.46-.28zM12 0C5.37 0 0 5.37 0 12c0 2.1.55 4.16 1.59 5.94L0 24l6.3-1.65C8.13 23.44 10.03 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 21.82c-1.96 0-3.89-.53-5.56-1.52l-.4-.24-3.73.98 1-3.64-.26-.41C1.92 15.5 1.36 13.76 1.36 12c0-5.87 4.77-10.64 10.64-10.64S22.64 6.13 22.64 12 17.87 21.82 12 21.82z" fill="currentColor" /></svg>
						<span className="contact__label">Opción principal</span>
						<span className="contact__subtitle">
							{primarySalesContact.label}
						</span>
						<span className="contact__note">
							+57 {primarySalesContact.displayPhone}
						</span>
					</a>
					<a href={`tel:+57${personal.phone}`} className="contact__data">
						<svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" /></svg>
						<span className="contact__label">Canal secundario</span>
						<span className="contact__subtitle">
							+57 {personal.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
						</span>
					</a>
					<a href={`mailto:${personal.email}`} className="contact__data">
						<svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" /></svg>
						<span className="contact__label">Canal secundario</span>
						<span className="contact__subtitle">{personal.email}</span>
					</a>
					<div className="contact__data">
						<svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" /></svg>
						<span className="contact__label">Ubicación</span>
						<span className="contact__subtitle">
							{personal.city}, {personal.country}
						</span>
					</div>
				</section>

				{/* Consulta calificada */}
				<section className="contact__form-box">
					<header className="contact__form-header">
						<h2 className="form-header__title">
							Consulta <span className="title__color">calificada</span>
						</h2>
					</header>

					<div className="contact__qualified-box">
						<p className="contact__intro">
							El primer paso comercial es el bot de WhatsApp: permite capturar
							contexto mínimo, calificar la consulta y decidir si corresponde
							avanzar a una conversación directa con alcance claro.
						</p>
						<ol className="contact__steps">
							{inquirySteps.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ol>
						<div className="contact__actions">
							<a
								href={primarySalesContact.url}
								className="home-hero__cta-link home-hero__cta-link--primary btn btn--primary"
								target="_blank"
								rel="noopener noreferrer"
							>
								Abrir WhatsApp de ventas
							</a>
							<Link
								href="/casos-reales"
								className="home-hero__cta-link home-hero__cta-link--secondary btn btn--outline"
							>
								Revisar casos antes
							</Link>
						</div>
						<p className="contact__fine-print">
							Los canales personales quedan como respaldo. La priorización por
							WhatsApp ayuda a separar consultas de negocio de conversaciones
							personales o soporte no relacionado.
						</p>
					</div>
				</section>
			</div>
		</section>
	);
}
