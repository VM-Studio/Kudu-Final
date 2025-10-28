import { Metadata } from "next";
import { LINES } from "@/components/data/catalog";
import LinePage from "@/components/LinePage";
import SublineGrid from "@/components/SublineGrid";

export const metadata: Metadata = {
  title: "Campanas | KUDU",
  description:
    "Línea Campanas: Creta, Rodas, Digital y Milos. Adaptables a cualquier cocina; instalación mural sobre hornallas.",
};

export default function CampanasPage() {
  const line = LINES.find((l) => l.slug === "campanas");

  if (!line) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-3xl font-bold text-[#111]">Campanas</h1>
        <p className="mt-2 text-[#555]">No se encontró la información de esta línea.</p>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Cabecera + tarjetas de sublíneas */}
      <LinePage line={line} />

      {/* Sublíneas */}
      <div className="border-top border-gray-200">
        <SublineGrid lineSlug="campanas" subSlug="creta" title="Campanas Creta" />
      </div>
      <div className="border-t border-gray-200">
        <SublineGrid lineSlug="campanas" subSlug="rodas" title="Campanas Rodas" />
      </div>
      <div className="border-t border-gray-200">
        <SublineGrid lineSlug="campanas" subSlug="digital" title="Campanas Digital" />
      </div>
      <div className="border-t border-gray-200">
        <SublineGrid lineSlug="campanas" subSlug="milos" title="Campanas Milos" />
      </div>
    </main>
  );
}
