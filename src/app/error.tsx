"use client";

import Link from "next/link";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "60vh",
				gap: "1.6rem",
				padding: "2rem",
				textAlign: "center",
			}}
		>
			<h1 style={{ fontSize: "2.4rem", color: "var(--color-titles)" }}>
				Algo salió mal
			</h1>
			<p style={{ fontSize: "1.6rem", maxWidth: "48rem" }}>
				Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
			</p>
			<div style={{ display: "flex", gap: "1.2rem", marginTop: "1rem" }}>
				<button
					type="button"
					onClick={reset}
					style={{
						padding: "1rem 2rem",
						borderRadius: "0.8rem",
						border: "none",
						background: "var(--principal-color)",
						color: "#0c0d1c",
						fontWeight: 600,
						fontSize: "1.4rem",
						cursor: "pointer",
					}}
				>
					Intentar de nuevo
				</button>
				<Link
					href="/"
					style={{
						padding: "1rem 2rem",
						borderRadius: "0.8rem",
						border: "2px solid var(--principal-color)",
						color: "var(--color-titles)",
						fontWeight: 600,
						fontSize: "1.4rem",
						textDecoration: "none",
					}}
				>
					Volver al inicio
				</Link>
			</div>
		</section>
	);
}
