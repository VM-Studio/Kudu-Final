'use client';

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/components/data/products";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const PRIMARY = "#547184";

export default function ExtractoresPage() {
  const extractores = useMemo(() => 
    PRODUCTS.filter(p => p.category === "Extractores"), 
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
                Extractores KUDU
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Extractores de aire potentes y silenciosos. Ideales para baños y cocinas, 
                eliminan olores y vapor, previniendo la humedad y el moho. 
                Diseño compacto y eficiente.
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
                <Image src="/images/lines/extractor.png" alt="Extractores KUDU" fill className="object-contain p-4 md:p-6" priority />
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
              { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Potencia de Extracción", desc: "Motor de alto rendimiento para máxima eficiencia" },
              { icon: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z", title: "Operación Silenciosa", desc: "Tecnología de bajo ruido para mayor confort" },
              { icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Fácil Mantenimiento", desc: "Limpieza simple y acceso a componentes" }
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
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Encontrá el extractor perfecto para tu espacio</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {extractores.map((p) => (
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Extractores de Aire KUDU - Ventilación Eficiente</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Los <strong>extractores KUDU</strong> son la solución perfecta para mantener el aire fresco 
            y limpio en tu hogar. Potentes, silenciosos y eficientes.
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">¿Por qué elegir Extractores KUDU?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
            <li>Motor de alta potencia con bajo consumo energético</li>
            <li>Diseño compacto ideal para baños y cocinas</li>
            <li>Prevención efectiva de humedad y moho</li>
            <li>Instalación sencilla y rápida</li>
            <li>Bajo nivel de ruido durante operación</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
