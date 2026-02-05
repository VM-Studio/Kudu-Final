'use client';

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/components/data/products";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const PRIMARY = "#547184";

export default function HornosPage() {
  const hornos = useMemo(() => 
    PRODUCTS.filter(p => p.category === "Hornos"), 
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
                Hornos KUDU
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Hornos de cocina con diseño moderno, seguridad y alto rendimiento. 
                Perfectos para cocinar con precisión, amplias capacidades y distribución 
                uniforme del calor. Ideales para todo tipo de recetas.
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
                <Image src="/images/lines/horno.png" alt="Hornos KUDU" fill className="object-contain p-4 md:p-6" priority />
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
              { icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z", title: "Cocción Uniforme", desc: "Distribución perfecta del calor para resultados óptimos" },
              { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: "Gran Capacidad", desc: "Amplio interior para todo tipo de preparaciones" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Eficiencia Energética", desc: "Diseño optimizado para menor consumo" }
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
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Encontrá el horno perfecto para tu cocina</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hornos.map((p) => (
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Hornos de Cocina KUDU - Calidad y Performance</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Los <strong>hornos KUDU</strong> combinan diseño elegante con tecnología avanzada 
            para ofrecerte la mejor experiencia de cocción. Perfectos para todo tipo de recetas.
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">¿Por qué elegir Hornos KUDU?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
            <li>Control preciso de temperatura para cocción perfecta</li>
            <li>Amplia capacidad interior (hasta 60 litros)</li>
            <li>Sistema de ventilación para distribución uniforme del calor</li>
            <li>Acabados premium en acero inoxidable</li>
            <li>Fácil limpieza con esmalte vitrificado</li>
            <li>Termostato regulable y luz interior</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
