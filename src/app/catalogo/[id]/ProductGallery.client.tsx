"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ACCENT = "#647A8B";

export function ProductGalleryClient({ name, gallery }: { name: string; gallery: string[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [gallery?.join("|")]);

  return (
    <div className="relative">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_14px_60px_-24px_rgba(2,6,23,.18)]">
        <Image
          src={gallery[activeIdx] ?? "/images/placeholder.jpg"}
          alt={`${name} - ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 md:p-6"
          priority
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {gallery.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setActiveIdx(i)}
            type="button"
            className={[
              "relative aspect-square overflow-hidden rounded-xl bg-white ring-1",
              i === activeIdx ? "ring-[--accent] outline outline-2 outline-[--accent]" : "ring-[#e5e7eb] hover:ring-[--accent]",
            ].join(" ")}
            style={{ ["--accent" as any]: ACCENT }}
            aria-label={`Ver imagen ${i + 1}`}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill className="object-contain p-1.5" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ThumbsClient({ name, gallery }: { name: string; gallery: string[] }) {
  // este export existe para que el server stub lo pueda importar por nombre
  return null;
}

export default ProductGalleryClient;
