import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";
import { siteOrigin } from "@/lib/seo";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Juan Fontalvo — Arquitectura de software e IA aplicada",
    template: "%s | Juan Fontalvo",
  },
  description:
    "Consultoría en arquitectura de software, automatización con IA y workflows operativos con prueba real antes del contacto.",
  authors: [{ name: "Juan Fontalvo" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/img/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Juan Fontalvo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '!function(){try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}}()',
          }}
        />
      </head>
      <body className={poppins.className}>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <div className="layout">
          <Sidebar />
          <main id="main-content" className="layout__main" tabIndex={-1}>
            {children}
            <Footer />
          </main>
        </div>
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  );
}
