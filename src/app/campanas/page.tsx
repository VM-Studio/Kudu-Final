'use client';

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/components/data/products";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const PRIMARY = "#547184";

export default function CampanasPage() {
  const campanas = useMemo(() => 
    PRODUCTS.filter(p => p.category === "Campanas"), 
  []);

  const normSrc = (path?: string) => {
    if (!path) return "/images/placeholder.jpg";
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <div className={`${sora.className} min-h-screen bg-white`}>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Campanas KUDU
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Campanas de cocina con diseño elegante y potencia superior. Perfectas para eliminar 
                olores y humo de manera eficiente. Disponibles en múltiples modelos.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#productos" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 shadow-lg"
                   style={{ backgroundColor: PRIMARY }}>
                  Ver todos los modelos
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 transition-all hover:bg-slate-50"
                      style={{ borderColor: PRIMARY, color: PRIMARY }}>
                  Contactar a ventas
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[360px] h-[280px] md:max-w-[520px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/lines/campana.png" alt="Campanas KUDU" fill className="object-contain p-4 md:p-6" priority />
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: PRIMARY }} />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Alta Potencia", desc: "Motores eficientes con gran capacidad de absorción" },
              { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Diseño Elegante", desc: "Acabados premium que complementan cualquier cocina" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Garantía KUDU", desc: "Respaldo de marca líder en electrodomésticos" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${PRIMARY}20` }}>
                  <svg className="w-8 h-8" style={{ color: PRIMARY }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Todos nuestros modelos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Encontrá la campana perfecta para tu cocina</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campanas.map((p) => {
              const features = p.short
                ? p.short.split(".").map((item) => item.trim()).filter(Boolean)
                : [];

              return (
                <Link
                  key={p.id}
                  href={`/catalogo/${p.id}`}
                  className="group bg-white border border-slate-200 p-5 transition-colors hover:border-slate-300"
                >
                  <div className="relative aspect-4/3 bg-white">
                    <Image src={normSrc(p.image)} alt={p.name} fill className="object-contain" />
                  </div>
                  <div className="mt-5">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      {p.id}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{p.name}</h3>
                    {features.length > 0 ? (
                      <ul className="mt-3 space-y-1 text-sm text-slate-600">
                        {features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-5 inline-flex items-center justify-center border border-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-900">
                      Comprar
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6">¿No encontrás lo que buscás?</p>
            <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: PRIMARY }}>
              Contactanos para más información
            </Link>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Campanas de Cocina KUDU - Calidad y Diseño</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Las <strong>campanas KUDU</strong> son la solución perfecta para mantener tu cocina libre de humo y olores. 
            Con tecnología de última generación y diseños que se adaptan a cualquier estilo.
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">¿Por qué elegir Campanas KUDU?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
            <li>Motores de alta eficiencia con gran capacidad de absorción</li>
            <li>Múltiples velocidades para adaptarse a tus necesidades</li>
            <li>Iluminación LED de bajo consumo</li>
            <li>Filtros de aluminio lavables y de fácil mantenimiento</li>
            <li>Diseños modernos en acero inoxidable y vidrio templado</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
