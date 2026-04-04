import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Juan Fontalvo — Desarrollador Web",
  description: "Portafolio de Juan Fontalvo, Desarrollador Web.",
};

export default function Home() {
  return (
    <section className="content__page content__page--home">
      <header className="home-hero">
        <p className="home-hero__eyebrow">Hola — bienvenido a mi espacio</p>
        <h1 className="page__name home-hero__name">
          Juan <span className="home-hero__name-highlight">Fontalvo</span>
        </h1>
        <div className="home-hero__rule" aria-hidden="true" />
        <h2 className="page__job home-hero__job">Desarrollador Web</h2>
        <p className="home-hero__tagline">
          Interfaces claras, código mantenible y atención al detalle.
        </p>
        <div className="home-hero__cta">
          <Link href="/portafolio" className="home-hero__cta-link home-hero__cta-link--primary">
            Ver portafolio
          </Link>
          <Link href="/contacto" className="home-hero__cta-link home-hero__cta-link--secondary">
            Contactame
          </Link>
        </div>
      </header>
    </section>
  );
}
