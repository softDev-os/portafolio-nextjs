import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: "Perfil",
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
        <p className="profile__eyebrow">Architect / AI Engineer consultant</p>
        <h2 className="profile__headline">
          Diseño automatización con IA para operaciones que necesitan claridad, control y continuidad.
        </h2>
        <article className="profile__summary">
          <p>{personal.bio}</p>
          <p>
            Mi trabajo está en convertir conversaciones, soporte y conocimiento operativo en sistemas que un equipo pueda usar, auditar y mejorar sin depender de promesas vagas.
          </p>
        </article>
        <div className="profile__actions" aria-label="Siguientes pasos recomendados">
          <Link href="/portafolio" className="home-hero__cta-link home-hero__cta-link--primary">
            Ver casos reales primero
          </Link>
          <Link href="/contacto" className="home-hero__cta-link home-hero__cta-link--secondary">
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
            Temas donde puedo <span className="title__color">aportar</span>
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
