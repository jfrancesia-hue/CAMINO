import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camino",
  description:
    "Un espacio para encontrar paz, proposito y volver a conectar con la fe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
