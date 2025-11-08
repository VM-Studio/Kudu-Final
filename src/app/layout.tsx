// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LoadingOverlay from "@/components/LoadingOverlay";

export const metadata: Metadata = {
  title: "KUDU — Catálogo 2025",
  description: "Purificadores, Campanas, Extractores, Hornos y Anafes KUDU.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-white text-[#111] antialiased">
        {/* Loader global: aparece en el primer render y en cada cambio de ruta */}
        <LoadingOverlay />

        <Navigation />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
