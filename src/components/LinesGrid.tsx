// src/components/LinesCarousel.tsx
"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { LINES } from "@/components/data/catalog";

import ImgPurificadores from "../../public/images/lines/purificadores.png";
import ImgCampana       from "../../public/images/lines/campana.png";
import ImgExtractor     from "../../public/images/lines/extractor.png";
import ImgHorno         from "../../public/images/lines/horno.png";
import ImgAnafe         from "../../public/images/lines/anafe.png";

const LINE_IMG: Record<string, StaticImageData> = {
  purificadores: ImgPurificadores,
  campanas:      ImgCampana,
  extractores:   ImgExtractor,
  hornos:        ImgHorno,
  anafes:        ImgAnafe,
};

const ACCENT = "#547184";
const cleanTitle = (t: string) => t.replace(/^L[ií]nea\s*/i, "").trim();

export default function LinesCarousel() {
  const items = useMemo(() => LINES.slice(0, 5), []);
  const [idx, setIdx] = useState(0);
  const n = items.length;

  const leftIndex  = (idx - 1 + n) % n;
  const rightIndex = (idx + 1) % n;

  const current    = items[idx];
  const leftItem   = items[leftIndex];
  const rightItem  = items[rightIndex];

  const goLeft  = () => setIdx((i) => (i - 1 + n) % n);
  const goRight = () => setIdx((i) => (i + 1) % n);

  const resolve = (slug: string, fallback?: string) =>
    LINE_IMG[slug] ?? (fallback || "/images/placeholder.jpg");

  return (
    <section id="lineas" className="relative w-full bg-white">
      <div className="relative mx-auto max-w-[1400px] px-2 sm:px-4 md:px-6 py-14 md:py-16 w-full">
        {/* ===== TÍTULO "Nuestras líneas" (ghost + título centrado) ===== */}
        <div className="relative mb-2 md:mb-3">
          <div className="relative h-[110px] md:h-[140px] lg:h-40">
            <span
              className="pointer-events-none absolute inset-0 grid place-items-center
                         font-extrabold leading-none select-none text-slate-200/60
                         text-[12vw] md:text-[7.5vw]"
            >
              Líneas
            </span>
            <h2
              className="absolute left-1/2 top-1/2 -translate-x-1/2
                         -translate-y-[48%] md:-translate-y-[46%]
                         text-center tracking-tight font-extrabold text-slate-900 z-10
                         whitespace-nowrap
                         text-3xl md:text-5xl lg:text-6xl"
            >
              Nuestras líneas
            </h2>
          </div>
          <div
            className="mt-2 h-[3px] w-28 mx-auto rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </div>
        

        <div className="relative">
          {/* === LATERAL IZQUIERDO: imagen arriba, botón abajo === */}
          <div
            className="
              pointer-events-auto
              absolute top-1/2 -translate-y-1/2
              hidden md:flex
              md:h-[300px]
              md:w-[min(26vw,340px)]
              -left-8
              flex-col items-center justify-center gap-3
              rounded-r-[99px]
              ring-1
            "
            style={{
              background: "linear-gradient(180deg,#f7f9fb,#ffffff)",
              boxShadow: "0 16px 44px rgba(97,119,137,0.20)",
              borderColor: "rgba(97,119,137,0.15)",
            }}
          >
            <Image
              src={resolve(leftItem.slug, leftItem.image)}
              alt={leftItem.title}
              width={220}
              height={180}
              className="h-[170px] w-[210px] object-contain"
              priority
            />

            <button
              onClick={goLeft}
              aria-label="Anterior"
              className="group inline-flex items-center gap-2 text-[#111]"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-full ring-1 transition"
                style={{
                  color: ACCENT,
                  borderColor: "transparent",
                  boxShadow: "0 2px 8px rgba(97,119,137,0.25)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium" style={{ color: ACCENT }}>
                Anterior
              </span>
            </button>
          </div>

          {/* === LATERAL DERECHO: imagen arriba, botón abajo === */}
          <div
            className="
              pointer-events-auto
              absolute top-1/2 -translate-y-1/2
              hidden md:flex
              md:h-[300px]
              md:w-[min(26vw,340px)]
              -right-8
              flex-col items-center justify-center gap-3
              rounded-l-[99px]
              ring-1
            "
            style={{
              background: "linear-gradient(180deg,#f7f9fb,#ffffff)",
              boxShadow: "0 16px 44px rgba(97,119,137,0.20)",
              borderColor: "rgba(97,119,137,0.15)",
            }}
          >
            <Image
              src={resolve(rightItem.slug, rightItem.image)}
              alt={rightItem.title}
              width={220}
              height={180}
              className="h-[170px] w-[210px] object-contain"
              priority
            />

            <button
              onClick={goRight}
              aria-label="Siguiente"
              className="group inline-flex items-center gap-2 text-[#111]"
            >
              <span className="text-sm font-medium" style={{ color: ACCENT }}>
                Siguiente
              </span>
              <span
                className="grid h-10 w-10 place-items-center rounded-full ring-1 transition"
                style={{
                  color: ACCENT,
                  borderColor: "transparent",
                  boxShadow: "0 2px 8px rgba(97,119,137,0.25)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* === PANEL CENTRAL (sin cambios funcionales) === */}
          <div className="relative mx-auto grid max-w-[760px] place-items-center px-6">
            <div
              className="pointer-events-none absolute -inset-x-10 -top-8 h-48 rounded-full blur-3xl"
              style={{ background: `${ACCENT}20` }}
            />
            <Image
              src={resolve(current.slug, current.image)}
              alt={current.title}
              width={600}
              height={360}
              className="h-[340px] w-[560px] md:h-[360px] md:w-[600px] object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.12)]"
              priority
            />

            <div className="mt-6 flex w-full items-end justify-between">
              <div className="text-[#111]">
                <div className="text-[26px] md:text-[30px] font-extrabold tracking-tight">
                  {cleanTitle(current.title)}
                </div>
                <div className="mt-1 text-sm md:text-[15px]" style={{ color: ACCENT }}>
                  Colección KUDU
                </div>
              </div>
            </div>
          </div>

          {/* CONTROLES MOBILE */}
          <div className="mt-8 flex items-center justify-between px-6 md:hidden">
            <button onClick={goLeft} aria-label="Anterior" className="inline-flex items-center gap-2 text-[#111]">
              <span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-black/10" style={{ color: ACCENT }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-sm" style={{ color: ACCENT }}>Anterior</span>
            </button>
            <button onClick={goRight} aria-label="Siguiente" className="inline-flex items-center gap-2 text-[#111]">
              <span className="text-sm" style={{ color: ACCENT }}>Siguiente</span>
              <span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-black/10" style={{ color: ACCENT }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </div>
        </div>
    </div>

      <div className="h-px w-full bg-slate-200"></div>
    </section>
  );
}
