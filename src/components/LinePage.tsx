"use client";

import Image from "next/image";
import Link from "next/link";
import { Category } from "@/components/data/catalog";

type Props = {
  line: Category;
};

export default function LinePage({ line }: Props) {
  if (!line) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      {/* encabezado */}
      <div className="mb-10 grid gap-6 md:grid-cols-[1.3fr,1fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#111]">
            {line.title.replace("Línea ", "")}
          </h1>
          {line.subtitle && (
            <div className="mt-2 text-[#647A8B] font-medium">
              {line.subtitle}
            </div>
          )}
          <p className="mt-4 max-w-2xl text-[#444] leading-7">
            {line.description}
          </p>
        </div>

        <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src={line.image || "/images/placeholder.jpg"}
            alt={line.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* sublíneas */}
      {line.children && (
        <>
          <h2 className="text-2xl font-semibold text-[#111]">Sublíneas</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {line.children.map((child) => (
              <Link
                key={child.slug}
                href={`/${line.slug}/${child.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-[#647A8B]/40 hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={`/images/${line.slug}/${child.slug}.jpg`}
                    alt={child.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#111] group-hover:text-[#647A8B] transition">
                    {child.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#555]">
                    Ver modelos y especificaciones
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
