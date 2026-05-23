import type { Metadata } from "next";
import Link from "next/link";
import { personal, primarySalesContact } from "@/data/personal";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto calificado para consultas de automatización con IA y arquitectura de software.",
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
            <i className="contact__icon fa-brands fa-whatsapp"></i>
            <span className="contact__label">Opción principal</span>
            <span className="contact__subtitle">{primarySalesContact.label}</span>
            <span className="contact__note">+57 {primarySalesContact.displayPhone}</span>
          </a>
          <a href={`tel:+57${personal.phone}`} className="contact__data">
            <i className="contact__icon fa-solid fa-phone"></i>
            <span className="contact__label">Canal secundario</span>
            <span className="contact__subtitle">
              +57 {personal.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
            </span>
          </a>
          <a href={`mailto:${personal.email}`} className="contact__data">
            <i className="contact__icon fa-solid fa-envelope"></i>
            <span className="contact__label">Canal secundario</span>
            <span className="contact__subtitle">{personal.email}</span>
          </a>
          <div className="contact__data">
            <i className="contact__icon fa-solid fa-circle-check"></i>
            <span className="contact__label">Ubicación</span>
            <h2 className="contact__subtitle">{personal.city}, {personal.country}</h2>
          </div>
        </section>

        {/* Consulta calificada */}
        <section className="contact__form-box">
          <header className="contact__form-header">
            <h3 className="form-header__title">
              Consulta <span className="title__color">calificada</span>
            </h3>
          </header>

          <div className="contact__qualified-box">
            <p className="contact__intro">
              El primer paso comercial es el bot de WhatsApp: permite capturar contexto mínimo, calificar la consulta y decidir si corresponde avanzar a una conversación directa con alcance claro.
            </p>
            <ol className="contact__steps">
              {inquirySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="contact__actions">
              <a
                href={primarySalesContact.url}
                className="home-hero__cta-link home-hero__cta-link--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir WhatsApp de ventas
              </a>
              <Link href="/portafolio" className="home-hero__cta-link home-hero__cta-link--secondary">
                Revisar casos antes
              </Link>
            </div>
            <p className="contact__fine-print">
              Los canales personales quedan como respaldo. La priorización por WhatsApp ayuda a separar consultas de negocio de conversaciones personales o soporte no relacionado.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
