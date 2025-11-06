"use client";

import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/components/data/products";

type Props = {
  lineSlug: string;   // ej: "purificadores"
  subSlug: string;    // ej: "extensible"
  title?: string;     // título visible, si querés sobreescribir
  subtitle?: string;  // opcional
};

// Tipo mínimo para los ítems que necesita ProductCard
type Item = {
  id: string;
  name: string;
  short?: string;
  image: string;
  specs?: any;
  badges?: string[];
};

export default function SublineGrid({ lineSlug, subSlug, title, subtitle }: Props) {
  const key = `${lineSlug}/${subSlug}`;

  // Fix TS: indexación dinámica tipada
  const dict = PRODUCTS as unknown as Record<string, Item[]>;
  const items: Item[] = dict[key] ?? [];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#111]">
          {title ?? `Modelos · ${capitalize(subSlug)}`}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-[#666]">{subtitle}</p>}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-[#555]">
          No hay productos cargados todavía para esta sublínea.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p: Item) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              short={p.short}
              image={p.image}
              specs={p.specs}
              badges={p.badges}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function capitalize(s: string) {
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
