import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Juan Fontalvo — Architect / AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const regular = await fetch(
    new URL("../../public/assets/fonts/Poppins-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const bold = await fetch(
    new URL("../../public/assets/fonts/Poppins-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 80px",
          background: "linear-gradient(135deg, #f9c552 0%, #f7b935 40%, #e8a820 100%)",
          fontFamily: "Poppins",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Architect / AI Engineer
          </p>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Juan Fontalvo
          </h1>
          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "rgba(255,255,255,0.92)",
              margin: 0,
              maxWidth: "80%",
            }}
          >
            Automatización con IA · Workflows operativos · Prueba real antes del contacto
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Poppins",
          data: regular,
          weight: 400,
        },
        {
          name: "Poppins",
          data: bold,
          weight: 700,
        },
      ],
    },
  );
}
