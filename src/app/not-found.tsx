import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Página no encontrada",
	description: "La ruta que buscas no existe o fue movida.",
	robots: { index: false },
};

export default function NotFound() {
	return (
		<section className="not-found">
			<p className="not-found__code">404</p>
			<h1 className="not-found__title">Página no encontrada</h1>
			<p className="not-found__description">
				La ruta que buscas no existe o fue movida. Volvé al inicio y seguí desde
				ahí.
			</p>
			<Link href="/" className="not-found__link">
				Ir al inicio
			</Link>
		</section>
	);
}
