'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

type Slide =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string };

const SLIDES: Slide[] = [
  { type: 'image', src: '/imagenhero2.png', alt: 'KUDU — imagen 2' },
  { type: 'video', src: '/videohero1.mp4', alt: 'KUDU — video 1' },
  { type: 'image', src: '/imagenhero1.png', alt: 'KUDU — imagen 1' },
  { type: 'video', src: '/videohero2.mp4', alt: 'KUDU — video 2' },
  { type: 'video', src: '/videohero3.mp4', alt: 'KUDU — video 3' },
];

export default function HeroInicio() {
  const [idx, setIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const go = useCallback((nextIdx: number) => {
    setIdx((prev) => {
      const curr = SLIDES[prev];
      if (curr.type === 'video') {
        const v = videoRefs.current[prev];
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }
      return (nextIdx + SLIDES.length) % SLIDES.length;
    });
  }, []);

  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    const slide = SLIDES[idx];
    let cleanup: VoidFunction | undefined;

    if (slide.type === 'image') {
      const t = setTimeout(next, 5000);
      cleanup = () => clearTimeout(t);
    } else {
      const v = videoRefs.current[idx];
      if (v) {
        const play = async () => {
          try {
            await v.play();
          } catch {}
        };
        play();
        const onEnded = () => next();
        v.addEventListener('ended', onEnded);
        const fallback = setTimeout(next, (v.duration || 30) * 1000 + 500);
        cleanup = () => {
          v.removeEventListener('ended', onEnded);
          clearTimeout(fallback);
        };
      } else {
        const t = setTimeout(next, 12000);
        cleanup = () => clearTimeout(t);
      }
    }
    return () => cleanup && cleanup();
  }, [idx, next]);

  return (
  <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-0 sm:px-0 md:px-0">
  <div className="flex flex-col md:flex-row md:gap-0 w-full">
        {/* === CARRUSEL (75% del ancho, pegado a la izquierda) === */}
  <div className="w-full md:w-[75vw] shrink-0">
          <div className="relative h-[42vh] sm:h-[52vh] md:h-[60vh] lg:h-[66vh] overflow-hidden rounded-2xl md:rounded-r-2xl">
            {/* Slides */}
            <div className="absolute inset-0">
              {SLIDES.map((s, i) => {
                const active = i === idx;
                return (
                  <div
                    key={`${s.type}-${s.src}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      active
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {s.type === 'image' ? (
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        priority={active}
                        sizes="100vw"
                        quality={100}
                        className="object-cover object-left rounded-2xl"
                        draggable={false}
                      />
                    ) : (
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        className="absolute inset-0 w-full h-full object-cover object-left rounded-2xl"
                        muted
                        playsInline
                        preload="auto"
                        controls={false}
                        src={s.src}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Flechas */}
            <button
              aria-label="Anterior"
              onClick={prev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 grid place-items-center
                         h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/35 hover:bg-black/50 text-white
                         backdrop-blur-sm transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              aria-label="Siguiente"
              onClick={next}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center
                         h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/35 hover:bg-black/50 text-white
                         backdrop-blur-sm transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition ${
                    i === idx ? 'bg-white/90' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* === CTA (25% del ancho) === */}
  <aside className="w-full md:w-[25vw] flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full h-full min-h-[200px] rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 p-6 md:p-8 flex flex-col items-center md:items-start justify-center text-center md:text-left">

            <p className="text-zinc-600 mb-5 md:mb-6">
              Explorá todos nuestros productos y encontrá tu próxima cocina.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center px-5 py-3 font-bold rounded-xl bg-[#547184] text-white
                         hover:bg-zinc-800 active:scale-[.98] transition shadow-lg shadow-zinc-900/10"
            >
              Ver catálogo
              <svg
                className="ml-2"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
