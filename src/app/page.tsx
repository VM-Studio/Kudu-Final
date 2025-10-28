"use client";

import LinesGrid from "@/components/LinesGrid";
import HeroInicio from "@/components/HeroInicio";
import { BRAND } from "@/lib/brand";

export default function Home() {
  return (
    <main>
      {/* HERO con imagen de fondo y contenido a la izquierda */}
      <section
        aria-label="Hero"
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/background.png)" }}
      >
        {/* velo para legibilidad del lado izquierdo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" />

        <div className="relative mx-auto flex h-[80vh] md:h-[90vh] max-w-6xl items-center px-5 pt-10 md:pt-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-[#647A8B]/10 px-3 py-1 text-xs font-semibold text-[#647A8B]">
              {BRAND.claim}
            </span>

            <h1 className="mt-4 font-extrabold leading-[1.05] text-[#111] text-4xl md:text-6xl">
            Innovación, estilo y potencia en cada detalle.
            </h1>

            <p className="mt-4 text-[17px] leading-7 text-[#444]">
              Diseño elegante, potencia y seguridad para tu cocina: Purificadores,
              Campanas, Extractores, Hornos y Anafes KUDU.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-2xl bg-[#647A8B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
              >
                Ver catálogo
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-2xl border border-[#647A8B] bg-white px-5 py-3 text-sm font-semibold text-[#647A8B] transition hover:bg-[#647A8B]/10"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Grilla principal */}
      <LinesGrid />

      {/* Carrusel multimedia + CTA */}
      <HeroInicio />
    </main>
  );
}
