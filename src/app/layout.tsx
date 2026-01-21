// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LoadingOverlay from "@/components/LoadingOverlay";

export const metadata: Metadata = {
  title: "KUDU — Catálogo 2025",
  description: "Purificadores, Campanas, Extractores, Hornos y Anafes KUDU.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.png", type: "image/png" }, // fallback
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="overflow-x-hidden">
  <body className="min-h-dvh bg-white text-[#111] antialiased w-full max-w-[100vw] overflow-x-hidden">
        {/* Loader global: siempre dentro de Suspense */}
        <Suspense fallback={null}>
          <LoadingOverlay />
        </Suspense>

        <Navigation />

        {/* Cualquier página que use useSearchParams/usePathname quedará segura */}
        <Suspense fallback={null}>{children}</Suspense>

        <Footer />
        <WhatsAppFloat />

        {/* Google tag (gtag.js) - Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17806964482"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17806964482');
          `}
        </Script>
      </body>
    </html>
  );
}
