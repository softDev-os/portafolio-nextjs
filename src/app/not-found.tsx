import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="content__page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem", gap: "1.5rem" }}>
      <p style={{ fontSize: "7rem", fontWeight: 700, color: "var(--principal-color)", margin: 0, lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ fontSize: "2.4rem", fontWeight: 600, margin: 0 }}>
        Página no encontrada
      </h1>
      <p style={{ fontSize: "1.5rem", color: "var(--color-texts)", maxWidth: "42rem", margin: 0 }}>
        La ruta que buscas no existe o fue movida. Volvé al inicio y seguí desde ahí.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          padding: "1rem 2.4rem",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#fff",
          background: "var(--principal-color)",
          borderRadius: "999px",
          textDecoration: "none",
        }}
      >
        Ir al inicio
      </Link>
    </section>
  );
}
