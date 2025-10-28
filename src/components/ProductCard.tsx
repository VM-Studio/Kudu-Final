"use client";

import Image from "next/image";

export type Spec = { k: string; v: string };

export type ProductCardProps = {
  id?: string;                 // SKU / código
  name: string;                // nombre del modelo
  short?: string;              // descripción corta
  image?: string;              // /images/… (800x600 recomendado)
  specs?: Spec[];              // lista breve de especificaciones
  badges?: string[];           // ej. ["2 años de garantía"]
};

export default function ProductCard({
  id,
  name,
  short,
  image = "/images/placeholder.jpg",
  specs = [],
  badges = [],
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Imagen */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
      </div>

      {/* Contenido */}
      <div className="p-5">
        {badges.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-[#647A8B]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#647A8B]"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold text-[#111] group-hover:text-[#647A8B] transition">
          {name}
        </h3>

        {id && <div className="mt-0.5 text-xs text-[#777]">Código: {id}</div>}

        {short && <p className="mt-2 text-sm leading-6 text-[#555]">{short}</p>}

        {/* Specs cortas */}
        {specs.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-[#444]">
            {specs.slice(0, 4).map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#647A8B] font-medium">{s.k}:</span>
                <span>{s.v}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-5 flex gap-2">
          <button
            className="inline-flex items-center justify-center rounded-2xl bg-[#647A8B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
            type="button"
          >
            Ver detalles
          </button>
          <button
            className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#222] transition hover:border-[#647A8B]/40"
            type="button"
          >
            Consultar
          </button>
        </div>
      </div>
    </article>
  );
}
