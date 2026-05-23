import type { Metadata } from "next";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description:
    "Perfil profesional de Juan Fontalvo como Architect / AI Engineer para automatización operativa con IA.",
};

const consultantCapabilities = [
  {
    icon: "fa-solid fa-sitemap",
    title: "Arquitectura de automatización",
    description:
      "Diseño flujos de negocio que conectan conversaciones, herramientas internas y reglas operativas sin prometer resultados que no puedan auditarse.",
  },
  {
    icon: "fa-brands fa-whatsapp",
    title: "Intake y calificación por WhatsApp",
    description:
      "Construyo entradas de venta para capturar intención, ordenar contexto y preparar el seguimiento humano o automatizado según el caso.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Soporte con handoff humano",
    description:
      "Estructuro asistentes que atienden preguntas repetibles y reconocen cuándo escalar a una persona con el contexto necesario.",
  },
  {
    icon: "fa-solid fa-brain",
    title: "Memoria persistente para agentes",
    description:
      "Integro memoria y registro de decisiones para que los agentes trabajen con continuidad, trazabilidad y menos repetición operativa.",
  },
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
        <h1 className="about__title">
          Sobre <span className="title__color">Mi</span>
        </h1>
      </header>

      {/* Información personal */}
      <section className="about__personal-info">
        <article className="personal-info__bio">
          <p className="personal-info__description">{personal.bio}</p>
        </article>
        <div className="personal-info__data">
          <ul className="personal-info__list">
            <li className="personal-info__option">
              <span className="personal-info__title">Edad</span>
              <span className="personal-info__value">{personal.age}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">País</span>
              <span className="personal-info__value">{personal.country}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Municipio</span>
              <span className="personal-info__value">{personal.city}</span>
            </li>
            <li className="personal-info__option">
              <span className="personal-info__title">Correo</span>
              <span className="personal-info__value">{personal.email}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Lo que hago */}
      <section className="about__services">
        <header className="services__header">
          <h2 className="services__title">
            Lo que <span className="title__color">hago</span>
          </h2>
        </header>
        <div className="services__container">
          {consultantCapabilities.map((capability) => (
            <article key={capability.title} className="services__service">
              <div className="service__icons">
                <i className={`service__icon ${capability.icon}`} aria-hidden="true"></i>
              </div>
              <div className="service__content">
                <h3 className="service__title">{capability.title}</h3>
                <p className="service__description">{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Límites de confianza */}
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
