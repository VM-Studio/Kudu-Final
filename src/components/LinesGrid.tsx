"use client";

import Image from "next/image";
import { LINES } from "@/components/data/catalog";

export default function LinesGrid() {
  const lines = LINES.slice(0, 5);

  // helper para quitar el prefijo "Línea " y dejar solo el nombre
  const cleanTitle = (t: string) => t.replace(/^L[ií]nea\s*/i, "").trim();

  return (
    <section id="lineas" className="mx-auto max-w-6xl px-6 pt-24 pb-20">
      {/* Título estilo “fondo grande + frase arriba” */}
      <div className="relative mb-14">
        <h2
          aria-hidden
          className="pointer-events-none select-none text-center font-extrabold tracking-tight text-[#647A8B] opacity-25 
                     text-[40px] sm:text-[60px] md:text-[80px] leading-none"
        >
          Nuestras líneas
        </h2>
        <p className="absolute inset-0 flex items-center justify-center text-center font-extrabold text-[#111] 
                       text-[22px] sm:text-[28px] md:text-[32px] leading-tight">
          ¿Qué categoría estás buscando?
        </p>
      </div>

      {/* Fila estática sin scroll */}
      <div className="flex justify-center gap-6 md:gap-8">
        {lines.map((line) => (
          <a
            key={line.slug}
            href={`/${line.slug}`}
            className="group relative isolate flex w-[180px] flex-col items-center text-center"
          >
            {/* Imagen más metida dentro de la tarjeta */}
            <div className="absolute top-[-9px] z-10">
              <Image
                src={line.image || "/images/placeholder.jpg"}
                alt={line.title}
                width={170}
                height={160}
                className="object-contain drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1"
              />
            </div>

            {/* Tarjeta gris (subo el contenido para que el título quede dentro) */}
            <div className="mt-6 h-[166px] w-full rounded-3xl bg-[#EEF1F5] shadow-sm ring-1 ring-black/5 flex items-end justify-center pb-6">
              {/* Nombre adentro de la tarjeta */}
              <h3 className="text-lg font-semibold text-[#111]">
                {cleanTitle(line.title)}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
