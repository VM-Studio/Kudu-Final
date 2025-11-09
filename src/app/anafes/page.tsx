// src/app/anafes/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { LINES } from "@/components/data/catalog";
import LinePage from "@/components/LinePage";
import SublineGrid from "@/components/SublineGrid";

export const metadata: Metadata = {
  title: "Anafes | KUDU",
  description:
    "Línea Anafes KUDU. Estética minimalista y alto rendimiento para uso diario.",
};

export default function AnafesPage() {
  const line = LINES.find((l) => l.slug === "anafes");

  if (!line) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-3xl font-bold text-[#111]">Anafes</h1>
        <p className="mt-2 text-[#555]">
          No se encontró la información de esta línea.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* IMPORTANTE: Suspense requerido por Next 16 para hijos con useSearchParams/usePathname */}
      <Suspense fallback={<AnafesFallback />}>
        <LinePage line={line} />

        {line.children?.map((child) => (
          <div key={child.slug} className="border-t border-gray-200">
            <SublineGrid
              lineSlug={line.slug}
              subSlug={child.slug}
              title={`${line.title.replace("Línea ", "")} · ${child.title}`}
            />
          </div>
        ))}
      </Suspense>
    </main>
  );
}

/* ===== Skeleton de carga muy simple ===== */
function AnafesFallback() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
      <div className="mt-6 h-64 rounded-3xl bg-slate-100 animate-pulse" />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 rounded-2xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    </section>
  );
}
