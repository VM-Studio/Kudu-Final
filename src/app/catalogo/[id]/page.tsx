'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PRODUCTS, type Product, findProduct } from "@/components/data/products";

const ACCENT = "#647A8B";
const WA_NUMBER = "5491159278803";
const normalize = (src?: string) => (src && src.startsWith("/") ? src : `/${src ?? ""}`);

export default function ProductDetailPage() {
  // ✅ En client components, los params se leen con hooks
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const routeId = decodeURIComponent(String(id ?? "").trim());
  const product = routeId ? (findProduct(routeId) as Product | undefined) : undefined;

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Producto no encontrado</h1>
        <p className="mt-3 text-slate-600">No pude encontrar "{routeId}" en tu lista de productos.</p>
        <div className="mt-6">
          <Link href="/catalogo" className="inline-flex rounded-lg border border-slate-300 px-4 py-2.5 font-semibold">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Galería (portada primero) + sanitización (sin vacíos y sin duplicados)
 const local = (product as any).images ?? (product as any).gallery ?? [];
 const external = (product as any).externalImages ?? [];
 let gallery: string[] = [
   normalize((product as any).image),
   ...local.map((s: string) => (s?.startsWith("/") ? s : normalize(s))),
   ...external,
].filter(Boolean);

const qp = searchParams?.getAll("imgs");
if (qp && qp.length) {
  const arr = qp
    .flatMap((s) => (s ? String(s).split(",") : []))
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.startsWith("http") ? s : normalize(s)));
 gallery = [gallery[0], ...arr, ...gallery.slice(1)];
 }
// eliminar duplicados preservando el orden (portada primero)
gallery = Array.from(new Set(gallery));
if (!gallery.length) gallery = [normalize((product as any).image)];

  // -------- NUEVO: selección de imagen (portada primero) --------
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    setCurrentIdx(0);
  }, [routeId, gallery.join("|")]);
  const currentSrc = gallery[currentIdx] ?? gallery[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:underline">Inicio</Link><span className="px-2">/</span>
        <Link href="/catalogo" className="hover:underline">Catálogo</Link><span className="px-2">/</span>
        <span className="text-slate-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_14px_60px_-24px_rgba(2,6,23,.18)]">
            {/* imagen grande: la seleccionada */}
            <img
              src={currentSrc}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setCurrentIdx(i)}
                  className={[
                    "relative aspect-square overflow-hidden rounded-xl bg-white ring-1",
                    i === currentIdx ? "ring-slate-400" : "ring-[#e5e7eb] hover:ring-slate-300"
                  ].join(" ")}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  {/* miniatura con <img> para evitar bloqueo de dominios externos */}
                  <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{product.name}</h1>
          {product.short && <p className="mt-6 text-slate-600 text-base md:text-lg">{product.short}</p>}
          {product.specs?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.specs.slice(0, 8).map((s, i) => (
                <span
                  key={`sp-${i}`}
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1"
                  style={{ color: ACCENT, background: "rgba(100,122,139,.08)", borderColor: "rgba(100,122,139,.18)" }}
                >
                  {s.k ? `${s.k}: ${s.v}` : String(s)}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola KUDU, me interesa: ${product.name} (ID: ${product.id})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white font-semibold shadow transition"
              style={{ background: ACCENT }}
            >
              Consultar por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 font-semibold"
            >
              Volver al catálogo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
