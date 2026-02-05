'use client';

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/components/data/products";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const PRIMARY = "#547184";

export default function AnafesPage() {
  const anafes = useMemo(() => 
    PRODUCTS.filter(p => p.category === "Anafes"), 
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
                Anafes KUDU
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Anafes de cocina con estética minimalista y alto rendimiento. 
                Ideales para uso diario con la mejor calidad y seguridad. 
                Disponibles en diferentes configuraciones y acabados.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#productos" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                   style={{ backgroundColor: PRIMARY }}>
                  Ver todos los modelos
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg border-2 transition-all hover:bg-slate-50"
                      style={{ borderColor: PRIMARY, color: PRIMARY }}>
                  Contactar a ventas
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[360px] h-[280px] md:max-w-[520px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/lines/anafe.png" alt="Anafes KUDU" fill className="object-contain p-4 md:p-6" priority />
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
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Alto Rendimiento", desc: "Quemadores eficientes para cocción perfecta" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Máxima Seguridad", desc: "Sistemas de seguridad certificados" },
              { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Diseño Premium", desc: "Estética moderna que realza tu cocina" }
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
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Encontrá el anafe perfecto para tu cocina</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {anafes.map((p) => (
              <Link key={p.id} href={`/catalogo/${p.id}`}
                    className="group bg-white rounded-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square bg-white p-6">
                  <Image src={normSrc(p.image)} alt={p.name} fill className="object-contain transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#547184]">{p.name}</h3>
                  {p.short && <p className="text-sm text-slate-600 mb-4 line-clamp-2">{p.short}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold" style={{ color: PRIMARY }}>Ver detalles →</span>
                    <span className="text-xs text-slate-400">ID: {p.id}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6">¿No encontrás lo que buscás?</p>
            <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: PRIMARY }}>
              Contactanos para más información
            </Link>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Anafes de Cocina KUDU - Calidad y Rendimiento</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Los <strong>anafes KUDU</strong> combinan diseño elegante con máximo rendimiento. 
            Perfectos para cocinar con precisión y seguridad en tu hogar.
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">¿Por qué elegir Anafes KUDU?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
            <li>Quemadores de alta eficiencia energética</li>
            <li>Parrillas de hierro fundido resistentes</li>
            <li>Encendido eléctrico de seguridad</li>
            <li>Acabados en acero inoxidable y vidrio templado</li>
            <li>Fácil limpieza y mantenimiento</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
