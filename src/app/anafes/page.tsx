import { Metadata } from "next";
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
        <p className="mt-2 text-[#555]">No se encontró la información de esta línea.</p>
      </main>
    );
  }

  return (
    <main className="bg-white">
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
    </main>
  );
}
