import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech-local.com"),
  title: {
    default: "Juan Fontalvo — Architect / AI Engineer",
    template: "%s | Juan Fontalvo",
  },
  description:
    "Consultoría en arquitectura de software, automatización con IA y workflows operativos con prueba real antes del contacto.",
  authors: [{ name: "Juan Fontalvo" }],
  icons: {
    icon: "/assets/img/logo.svg",
  },
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(){try{var t=localStorage.getItem(\"theme\")||(matchMedia(\"(prefers-color-scheme:dark)\").matches?\"dark\":\"light\");document.documentElement.dataset.theme=t}catch(e){}}()",
          }}
        />
      </head>
      <body className={poppins.className}>
        <div className="layout">
          <Sidebar />
          <main className="layout__main">
            {children}
            <Footer />
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
