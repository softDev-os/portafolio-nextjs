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
      <header className="home-hero">
        <p className="home-hero__eyebrow">
          Arquitectura de software + IA aplicada
        </p>
        <h1 className="page__name home-hero__name">
          Juan <span className="home-hero__name-highlight">Fontalvo</span>
        </h1>
        <div className="home-hero__rule" aria-hidden="true" />
        <p className="page__job home-hero__job">
          Arquitecto de software / Ingeniero IA
        </p>
        <p className="home-hero__tagline">
          Diseño automatizaciones para convertir ventas, soporte y conocimiento
          operativo en flujos auditables que reducen fricción y escalan con
          control humano.
        </p>
        <ul
          className="home-hero__proof-list"
          aria-label="Casos de prueba principales"
        >
          {flagshipCaseStudies.map((caseStudy) => (
            <li key={caseStudy.id}>{caseStudy.title}</li>
          ))}
        </ul>
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
      </header>
    </section>
  );
}
