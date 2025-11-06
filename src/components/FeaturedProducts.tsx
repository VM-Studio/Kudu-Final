// src/components/FeaturedProducts.tsx
"use client";

import Image, { type StaticImageData } from "next/image";
import type { Product } from "@/components/data/products";
import { PRODUCTS } from "@/components/data/products";

/* ============================
   IMÁGENES ESTÁTICAS (fingerprint)
   ============================ */
import IMG_PU700_NG from "../../public/purificadores/extensible/pu700-ng_2.jpg";
import IMG_PU700_SS from "../../public/purificadores/extensible/pu700-ss_2.jpg";
import IMG_CC60SS   from "../../public/campanas/creta/cc60-ss.jpg";
import IMG_HE7801NG from "../../public/hornos/airis/he7801-ng.jpg";

const IMAGE_BY_ID: Record<string, StaticImageData> = {
  "KU.PU700.NG":   IMG_PU700_NG,
  "KU.PU700.SS":   IMG_PU700_SS,
  "KU-CC60SS":     IMG_CC60SS,
  "KU-HE7801-NG":  IMG_HE7801NG,
};

const FEATURED_IDS = ["KU.PU700.NG", "KU.PU700.SS", "KU-CC60SS", "KU-HE7801-NG"];
const BIG_CENTERED = new Set<string>(["KU-CC60SS", "KU-HE7801-NG"]);

export default function FeaturedProducts() {
  const picked = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const featured =
    picked.length >= 4
      ? picked.slice(0, 4)
      : [...picked, ...PRODUCTS.filter((p) => !picked.includes(p))].slice(0, 4);

  const resolveSrc = (p: Product): StaticImageData | string =>
    IMAGE_BY_ID[p.id] ??
    (p.image?.startsWith("/") ? p.image : `/${p.image || "images/placeholder.jpg"}`);

  const safe = (s?: string) => (typeof s === "string" ? s : "");

  return (
    <section
      id="destacados"
      className="mx-auto max-w-6xl px-6 pt-16 pb-12"
      aria-labelledby="destacados-title"
    >
      <div className="relative mb-12">
        <h2
          id="destacados-title"
          aria-hidden
          className="pointer-events-none select-none text-center font-extrabold tracking-tight text-[#647A8B] opacity-10 
                     text-[40px] sm:text-[60px] md:text-[80px] leading-none"
        >
          Productos destacados
        </h2>
        <p className="absolute inset-0 flex items-center justify-center text-center font-extrabold text-[#111] 
                       text-[24px] sm:text-[32px] md:text-[36px] leading-tight">
          Elegidos por los clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {featured.map((p) => {
          const isBig = BIG_CENTERED.has(p.id);
          const isHuge = p.id === "KU-HE7801-NG"; // sólo el horno

          if (isBig) {
            return (
              <div
                key={p.id}
                className="group relative isolate overflow-visible rounded-3xl bg-[#EEF1F5] shadow-sm ring-1 ring-black/5
                           p-5 sm:p-6 md:p-7 min-h-[200px]"
              >
                <div className="grid grid-cols-2 gap-6 items-center">
                  {/* Imagen centrada */}
                  <div className="flex justify-center items-center">
                    <Image
                      src={resolveSrc(p)}
                      alt={safe(p.name)}
                      width={isHuge ? 320 : 280} // horno más grande
                      height={isHuge ? 250 : 210}
                      className="object-contain drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1"
                      priority
                    />
                  </div>

                  {/* Texto */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#111]">{safe(p.name)}</h3>
                    {p.short && (
                      <p className="mt-2 text-sm leading-6 text-[#374151]">{p.short}</p>
                    )}
                    {Array.isArray(p.specs) && p.specs.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.specs.slice(0, 3).map((s, i) => (
                          <span
                            key={`${p.id}-spec-${i}`}
                            className="inline-flex items-center rounded-full bg-[#647A8B]/10 text-[#233265]
                                       ring-1 ring-[#647A8B]/15 px-3 py-1 text-xs font-medium"
                          >
                            {`${s.k}: ${s.v}`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 transition 
                                group-hover:ring-2 group-hover:ring-[#647A8B]/30" />
              </div>
            );
          }

          // Resto sin modificar
          return (
            <div
              key={p.id}
              className="group relative isolate overflow-visible rounded-3xl bg-[#EEF1F5] shadow-sm ring-1 ring-black/5
                         p-5 sm:p-6 md:p-7 min-h-[200px] flex items-center"
            >
              <div className="absolute top-2 left-4 md:top-3 md:left-5 z-10">
                <Image
                  src={resolveSrc(p)}
                  alt={safe(p.name)}
                  width={200}
                  height={150}
                  className="h-[150px] w-[200px] object-contain drop-shadow-md 
                             transition-transform duration-300 group-hover:-translate-y-1"
                  priority
                />
              </div>

              <div className="ml-[200px] md:ml-[240px]">
                <h3 className="text-xl font-semibold text-[#111]">{safe(p.name)}</h3>
                {p.short && (
                  <p className="mt-2 text-sm leading-6 text-[#374151]">{p.short}</p>
                )}
                {Array.isArray(p.specs) && p.specs.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.specs.slice(0, 3).map((s, i) => (
                      <span
                        key={`${p.id}-spec-${i}`}
                        className="inline-flex items-center rounded-full bg-[#647A8B]/10 text-[#233265]
                                   ring-1 ring-[#647A8B]/15 px-3 py-1 text-xs font-medium"
                      >
                        {`${s.k}: ${s.v}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 transition 
                              group-hover:ring-2 group-hover:ring-[#647A8B]/30" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
