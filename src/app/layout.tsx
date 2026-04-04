import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Analytics } from "@vercel/analytics/next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Juan Fontalvo — Desarrollador Web",
    template: "%s | Juan Fontalvo",
  },
  description:
    "Portafolio y blog de Juan Fontalvo, Desarrollador Web especializado en tecnologías modernas.",
  authors: [{ name: "Juan Fontalvo" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Juan Fontalvo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <div className="layout">
          <Sidebar />
          <main className="layout__main">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
