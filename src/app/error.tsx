"use client";

import Link from "next/link";
import "../styles/error.css";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<section className="error-container">
			<h1 className="error-title">Algo salió mal</h1>
			<p className="error-message">
				Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
			</p>
			<div className="error-actions">
				<button type="button" onClick={reset} className="error-btn-primary btn btn--primary">
					Intentar de nuevo
				</button>
				<Link href="/" className="error-btn-secondary btn btn--outline">
					Volver al inicio
				</Link>
			</div>
		</section>
	);
}
