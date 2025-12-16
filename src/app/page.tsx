// src/app/page.tsx
"use client";

import LinesGrid from "@/components/LinesGrid";
import HeroInicio from "@/components/HeroInicio";
import { BRAND } from "@/lib/brand";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Sora } from "next/font/google";
import Link from "next/link";

// Fuente Sora (ligera/moderna)
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className={`${sora.className} bg-white`}>
      {/* HERO */}
      <section
        aria-label="Hero"
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url(/background.png)" }}
      >
        {/* velo suave a la izquierda para legibilidad (no tapa) */}
  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/80 via-white/50 to-transparent" />

        {/* contenido */}
        <div className="relative mx-auto flex h-[82vh] md:h-[90vh] max-w-6xl items-center px-5 pt-10 md:pt-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-[#647A8B]/10 px-3 py-1 text-[11px] font-semibold text-[#647A8B] uppercase tracking-wider">
              {BRAND.claim}
            </span>

            {/* Título más chico */}
            <h1 className="mt-4 font-extrabold leading-[1.08] text-[#111] text-4xl md:text-[3.5rem]">
              Innovación, estilo y potencia en cada detalle.
            </h1>

            <p className="mt-5 text-[17px] leading-7 text-[#444]">
              Diseño elegante, potencia y seguridad para tu cocina: Purificadores,
              Campanas, Extractores, Hornos y Anafes KUDU.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-2xl bg-[#647A8B] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
              >
                Ver catálogo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl border border-[#647A8B] bg-white px-6 py-3.5 text-sm font-semibold text-[#647A8B] transition hover:bg-[#647A8B]/10"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>

        {/* degradado SOLO hacia abajo (no hacia arriba) */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[90px] bg-linear-to-b from-transparent to-white" />
      </section>

      {/* secciones */}
      <LinesGrid />
      <HeroInicio />
      <FeaturedProducts />
    </main>
  );
}
