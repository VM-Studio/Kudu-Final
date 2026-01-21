// src/app/perfil/page.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Sora } from "next/font/google";

/* ====== Font (debe estar en ámbito de módulo) ====== */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Tab = "posts" | "videos";
type ModalState =
  | { open: false }
  | { open: true; type: "image"; src: string; index: number }
  | { open: true; type: "video"; src: string; index: number };

export default function PerfilPage() {
  const [tab, setTab] = useState<Tab>("posts");
  const [modal, setModal] = useState<ModalState>({ open: false });

  /* ============= POSTS (feed cuadrado) ============= */
  const TOTAL_POSTS = 15;
  const FALLBACK_POSTS = Array.from({ length: TOTAL_POSTS }, (_, i) => `/feed/${i + 1}.jpg`);
  const [posts, setPosts] = useState<string[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/data/posts.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((arr: string[]) =>
        setPosts(arr.map((n) => (n.startsWith("/") ? n : `/feed/${n}`)))
      )
      .catch(() => {});
  }, []);

  /* ============= VIDEOS (vertical/reels) ============= */
  // videos = array de candidatos por cada video (p.ej. ["/videos/a.mp4", "/videos/files/a.mp4"])
  const [videos, setVideos] = useState<string[][]>([]);

  const mimeFrom = (src: string) =>
    src.toLowerCase().endsWith(".webm") ? "video/webm"
    : src.toLowerCase().endsWith(".mov")  ? "video/quicktime"
    : "video/mp4";

  const buildCandidates = (raw: string) => {
    // escapa espacios/acentos
    if (raw.startsWith("/")) return [encodeURI(raw)];
    const safe = encodeURI(raw);
    return [`/videos/${safe}`, `/videos/files/${safe}`];
  };

  useEffect(() => {
    fetch("/data/videos.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((arr: string[]) => {
        const mapped = arr.map(buildCandidates);
        setVideos(mapped);
      })
      .catch(() => {
        const base = [
          "video-1.mp4",
          "video-2.mp4",
          "video-3.mp4",
          "video-4.mp4",
          "video-5.mp4",
          "video-6.mp4",
          "video-7.mp4",
          
          "video-9.mp4",
          "video-10.mp4",
          "video-11.mp4",
          "video-12.mp4",
          "video-13.mp4",
          "video-14.mp4",
          "video-15.mp4",
        ];
        setVideos(base.map(buildCandidates));
      });
  }, []);

  const goToPrev = useCallback(() => {
    if (!modal.open) return;
    const items = modal.type === "image" ? posts : videos;
    const newIndex = (modal.index - 1 + items.length) % items.length;
    if (modal.type === "image") {
      setModal({ open: true, type: "image", src: posts[newIndex], index: newIndex });
    } else {
      setModal({ open: true, type: "video", src: videos[newIndex][0], index: newIndex });
    }
  }, [modal, posts, videos]);

  const goToNext = useCallback(() => {
    if (!modal.open) return;
    const items = modal.type === "image" ? posts : videos;
    const newIndex = (modal.index + 1) % items.length;
    if (modal.type === "image") {
      setModal({ open: true, type: "image", src: posts[newIndex], index: newIndex });
    } else {
      setModal({ open: true, type: "video", src: videos[newIndex][0], index: newIndex });
    }
  }, [modal, posts, videos]);

  /* ===== Accesibilidad modal + Navegación con flechas ===== */
  useEffect(() => {
    if (!modal.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal({ open: false });
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, goToPrev, goToNext]);

  // Bloquea scroll detrás del modal
  useEffect(() => {
    const el = document.documentElement;
    if (modal.open) {
      const prev = el.style.overflow;
      el.style.overflow = "hidden";
      return () => {
        el.style.overflow = prev;
      };
    }
  }, [modal.open]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-slate-700">
      <div className={`${sora.className} mx-auto max-w-6xl px-4 py-10`}>
        {/* TÍTULO con la MISMA fuente que el hero */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Nuestras Publicaciones
          </h1>
        </header>

        {/* PDFs */}
        <section className="mb-10">
          {/* contenedor: mismos tamaños + separación */}
          <div className="mb-4 flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-6">
            {/* Banner 1 */}
            <div className="w-full md:w-1/2">
              <div className="flex h-full flex-col md:flex-row items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-3 shadow-[0_8px_28px_-16px_rgba(2,6,23,0.12)] min-h-[100px]">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-semibold text-[#233265] leading-tight">
                      Catálogo completo
                    </span>
                  </div>
                </div>
                <a
                  href="/catalogo.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-[#63798a]/10 px-5 py-3 text-[#63798a] text-sm font-semibold hover:bg-[#63798a] hover:text-white transition"
                  aria-label="Descargar catálogo en PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                  </svg>
                  Descargar PDF
                </a>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="w-full md:w-1/2">
              <div className="flex h-full flex-col md:flex-row items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-3 shadow-[0_8px_28px_-16px_rgba(2,6,23,0.12)] min-h-[100px]">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-semibold text-[#233265] leading-tight">
                      Detalle de nuestro Catálogo
                    </span>
                  </div>
                </div>
                <a
                  href="/detalle.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-[#63798a]/10 px-5 py-3 text-[#63798a] text-sm font-semibold hover:bg-[#63798a] hover:text-white transition"
                  aria-label="Descargar catálogo en PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                  </svg>
                  Descargar PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav className="border-b border-slate-200">
          <ul className="flex gap-10">
            <li>
              <button
                onClick={() => setTab("posts")}
                className={`relative py-3 text-lg font-semibold ${
                  tab === "posts" ? "text-[#647a8b]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Publicaciones
                <span className={`absolute left-0 -bottom-[1px] h-[2px] bg-[#647a8b] transition-all ${tab === "posts" ? "w-full" : "w-0"}`} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab("videos")}
                className={`relative py-3 text-lg font-semibold ${
                  tab === "videos" ? "text-[#647a8b]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Videos informativos
                <span className={`absolute left-0 -bottom-[1px] h-[2px] bg-[#647a8b] transition-all ${tab === "videos" ? "w-full" : "w-0"}`} />
              </button>
            </li>
          </ul>
        </nav>

        {/* Panels */}
        <div className="mt-8">
          {tab === "posts" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setModal({ open: true, type: "image", src, index: i })}
                  className="group relative block overflow-hidden rounded-lg ring-1 ring-black/5 bg-slate-200 aspect-square shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)]"
                  title={`Abrir imagen ${i + 1}`}
                >
                  <img src={src} alt={`post-${i + 1}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" draggable={false} />
                </button>
              ))}
            </div>
          ) : (
            /* === VIDEOS: VERTICALES (con múltiples fuentes) === */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((candidates, i) => (
                <button
                  key={candidates.join("|")}
                  onClick={() => setModal({ open: true, type: "video", src: candidates[0], index: i })}
                  className="group relative block overflow-hidden rounded-lg ring-1 ring-black/5 bg-black
                             aspect-[9/16] shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)]"
                  title={`Reproducir video ${i + 1}`}
                >
                  <video
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // si falla el primer source, intenta siguiente candidato
                      const vid = e.currentTarget;
                      const currentIdx = candidates.findIndex((s) => (vid.currentSrc || "").endsWith(s));
                      const next = candidates[currentIdx + 1];
                      if (next) {
                        vid.src = next;
                        vid.play().catch(() => {});
                      }
                    }}
                  >
                    {candidates.map((src) => (
                      <source key={src} src={src} type={mimeFrom(src)} />
                    ))}
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div onClick={() => setModal({ open: false })} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[1px] grid place-items-center p-4" role="dialog" aria-modal="true">
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button onClick={() => setModal({ open: false })} className="absolute -top-10 right-0 text-white/90 hover:text-white text-sm">
              Cerrar ✕
            </button>

            {/* Flecha izquierda */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:-translate-x-16
                         grid place-items-center h-12 w-12 rounded-full bg-white/90 hover:bg-white
                         text-slate-800 shadow-xl transition-all hover:scale-110"
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-16
                         grid place-items-center h-12 w-12 rounded-full bg-white/90 hover:bg-white
                         text-slate-800 shadow-xl transition-all hover:scale-110"
              aria-label="Siguiente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {modal.type === "image" && (
              <img src={modal.src} alt="imagen ampliada" draggable={false} className="block max-w-[92vw] max-h-[85vh] object-contain rounded-xl shadow-2xl" />
            )}

            {modal.type === "video" && (
              <video
                src={modal.src}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="block max-w-[92vw] max-h-[85vh] object-contain rounded-xl shadow-2xl outline-none"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
