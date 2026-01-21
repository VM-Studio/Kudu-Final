// src/app/page.tsx
"use client";

import LinesGrid from "@/components/LinesGrid";
import HeroInicio from "@/components/HeroInicio";
import { BRAND } from "@/lib/brand";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Sora } from "next/font/google";
import Link from "next/link";
import { PRODUCTS } from "@/components/data/products";
import { useMemo, useState } from "react";

// Fuente Sora (ligera/moderna)
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const PRIMARY = '#547184';

type UiProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
  gallery?: string[];
  popular?: boolean;
  featured?: boolean;
  price?: number;
  compareAtPrice?: number;
};

function normSrc(path?: string) {
  if (!path) return '/images/placeholder.jpg';
  return path.startsWith('/') ? path : `/${path}`;
}

function buildProductHref(p: UiProduct) {
  const id = encodeURIComponent(String(p.id ?? '').trim());
  if (!id) return '/catalogo';

  if (p.gallery && p.gallery.length) {
    const params = new URLSearchParams();
    for (const src of p.gallery) params.append('imgs', src);
    return `/catalogo/${id}?${params.toString()}`;
  }
  return `/catalogo/${id}`;
}

function SectionTitle({ label, ghost }: { label: string; ghost: string }) {
  return (
    <div className="relative mb-2">
      <div className="relative h-[74px] md:h-[92px] lg:h-[108px]">
        <span
          className={`${sora.className} pointer-events-none absolute inset-0 grid place-items-center
                         font-extrabold leading-none select-none text-slate-200/50
                         text-[10.5vw] md:text-[6.8vw]`}
        >
          {ghost}
        </span>

        <h2
          className={`${sora.className} absolute left-1/2 top-1/2 -translate-x-1/2
                        -translate-y-[72%] md:-translate-y-[70%] lg:-translate-y-[68%]
                        text-center tracking-tight font-extrabold text-slate-900 z-10
                        whitespace-nowrap
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
        >
          {label}
        </h2>
      </div>

      <div className="mt-1 h-[3px] w-28 mx-auto rounded-full" style={{ backgroundColor: PRIMARY }} />
    </div>
  );
}

export default function Home() {
  const mappedAll: UiProduct[] = useMemo(() => {
    return PRODUCTS.map((p, idx: number) => ({
      id: String(p.id ?? idx + 1),
      name: p.name ?? 'Producto',
      description: p.short ?? 'Producto de la línea.',
      image: normSrc(p.image),
      category: (p.category as UiProduct['category']) ?? 'Campanas',
      gallery: Array.isArray(p.gallery) ? p.gallery.map(normSrc) : undefined,
      popular: false,
      featured: false,
      price: undefined,
      compareAtPrice: undefined,
    }));
  }, []);

  const featured8 = useMemo(() => {
    const flagged = mappedAll.filter(p => p.featured);
    return (flagged.length >= 8 ? flagged : mappedAll).slice(0, 8);
  }, [mappedAll]);

  const [featPage, setFeatPage] = useState(0);
  const FEAT_PER_VIEW = 4;
  const maxFeatPage = Math.max(0, Math.ceil(featured8.length / FEAT_PER_VIEW) - 1);
  const paginatedFeatured = useMemo(() => {
    const start = featPage * FEAT_PER_VIEW;
    return featured8.slice(start, start + FEAT_PER_VIEW);
  }, [featPage, featured8]);

  return (
    <main className={`${sora.className} bg-white`}>
      {/* HERO */}
      <section
        aria-label="Hero"
        className="relative w-full overflow-hidden py-8 md:py-12"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 md:gap-12 items-center">
            {/* Mitad izquierda - Contenido centrado */}
            <div className="flex flex-col justify-center space-y-4 md:space-y-6 pr-0 md:pr-8">
              <span className="inline-flex items-center rounded-full bg-[#647A8B]/10 px-3 py-1 text-[11px] font-semibold text-[#647A8B] uppercase tracking-wider w-max">
                {BRAND.claim}
              </span>

              <h1 className="font-extrabold leading-[1.08] text-[#111] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Soluciones integrales en equipamiento para grandes proyectos
              </h1>

              <p className="text-sm sm:text-[15px] md:text-base leading-6 text-[#444] mt-2 md:mt-3">
                Diseño elegante, potencia y seguridad para tu cocina: <span className="font-semibold">Purificadores,
                Campanas, Extractores, Hornos y Anafes KUDU.</span>
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center rounded-none bg-[#647A8B] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-none border border-[#647A8B] bg-white px-6 py-3.5 text-sm font-semibold text-[#647A8B] transition hover:bg-[#647A8B]/10"
                >
                  Contacto
                </Link>
              </div>
            </div>

            {/* Mitad derecha - Video rectangular horizontal */}
            <div className="flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="/opcionhero.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* secciones */}
      <LinesGrid />
      <HeroInicio />
      <FeaturedProducts />

      {/* ================== DESTACADOS (4 por vista) ================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pt-16 md:pt-24 pb-12">
        <SectionTitle label="& Purificadores Destacados" ghost="Destacados" />
        <div className="relative mt-8 md:mt-12">
          <button
            aria-label="Anterior"
            onClick={() => setFeatPage((p) => Math.max(0, p - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-slate-300 bg-white place-items-center hover:bg-slate-50 shadow-sm hidden xl:grid"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => setFeatPage((p) => Math.min(maxFeatPage, p + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-slate-300 bg-white place-items-center hover:bg-slate-50 shadow-sm hidden xl:grid"
          >
            ›
          </button>

          <div className="xl:mx-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {paginatedFeatured.map((p) => {
              const href = buildProductHref(p);
              const hasDiscount = p.compareAtPrice && p.price && p.compareAtPrice > p.price;
              return (
                <article key={p.id} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:shadow-[0_10px_30px_rgba(0,0,0,.06)] transition">
                  <div className="aspect-square grid place-items-center rounded-lg mb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="h-[88%] w-[88%] object-contain" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">{p.category}</div>
                      <h4 className="text-[15px] font-semibold">{p.name}</h4>
                    </div>
                    {hasDiscount ? (
                      <div className="text-right">
                        <div className="text-xs line-through text-slate-400">${p.compareAtPrice}</div>
                        <div className="text-sm font-bold" style={{ color: PRIMARY }}>${p.price}</div>
                      </div>
                    ) : p.price ? (
                      <div className="text-sm font-bold" style={{ color: PRIMARY }}>${p.price}</div>
                    ) : null}
                  </div>
                  <div className="mt-3">
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-white text-sm font-semibold"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
