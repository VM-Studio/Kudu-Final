// src/app/layout.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
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
        {/* Loader global: siempre dentro de Suspense */}
        <Suspense fallback={null}>
          <LoadingOverlay />
        </Suspense>

        <Navigation />

        {/* Cualquier página que use useSearchParams/usePathname quedará segura */}
        <Suspense fallback={null}>
          {children}
        </Suspense>

        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
