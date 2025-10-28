import { Metadata } from "next";
import { LINES } from "@/components/data/catalog";
import LinePage from "@/components/LinePage";
import SublineGrid from "@/components/SublineGrid";

export const metadata: Metadata = {
  title: "Purificadores | KUDU",
  description:
    "Línea Purificadores: Extensible, 1 Motor, 2 Motores y Digital. Diseño elegante y gran capacidad de absorción.",
};

export default function PurificadoresPage() {
  const line = LINES.find((l) => l.slug === "purificadores");

  if (!line) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-3xl font-bold text-[#111]">Purificadores</h1>
        <p className="mt-2 text-[#555]">No se encontró la información de esta línea.</p>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Cabecera + sublíneas (reutilizamos el componente genérico) */}
      <LinePage line={line} />

      {/* Sublíneas como en el PDF */}
      <div className="border-t border-gray-200">
        <SublineGrid
          lineSlug="purificadores"
          subSlug="extensible"
          title="Purificadores Extensibles"
          subtitle="Diseño moderno, motor silencioso y doble iluminación LED"
        />
      </div>

      <div className="border-t border-gray-200">
        <SublineGrid
          lineSlug="purificadores"
          subSlug="1-motor"
          title="Purificadores 1 Motor"
          subtitle="Compactos, eficientes y silenciosos"
        />
      </div>

      <div className="border-t border-gray-200">
        <SublineGrid
          lineSlug="purificadores"
          subSlug="2-motores"
          title="Purificadores 2 Motores"
          subtitle="Máxima potencia de extracción para cocinas grandes"
        />
      </div>

      <div className="border-t border-gray-200">
        <SublineGrid
          lineSlug="purificadores"
          subSlug="digital"
          title="Purificadores Digitales"
          subtitle="Control táctil, temporizador y diseño de vanguardia"
        />
      </div>
    </main>
  );
}
