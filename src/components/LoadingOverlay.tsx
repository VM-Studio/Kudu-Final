"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Variable fuera del componente para trackear globalmente
let hasShownGlobal = false;

/**
 * Loader de pantalla completa:
 * - Se muestra SOLO al montar (primer render / carga inicial)
 * - NO se muestra en navegación interna
 * - Barra de progreso con % y fade-out suave
 */
export default function LoadingOverlay() {
  // Inicializar estado basado en si ya se mostró antes
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(() => !hasShownGlobal);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Al montar → mostrar SOLO la primera vez
  useEffect(() => {
    // Si ya se mostró una vez, no hacer nada
    if (hasShownGlobal) {
      return;
    }
    hasShownGlobal = true;

    // limpiar ciclos previos
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Avance "falso" hasta ~92%
    const started = Date.now();
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        const bump = 10 + Math.random() * 12;
        return Math.min(92, p + bump);
      });
    }, 120);

    // Completar y hacer fade-out (mínimo 400ms en pantalla)
    const MIN_VISIBLE = 400;
    const finish = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      const remaining = Math.max(0, MIN_VISIBLE - (Date.now() - started));
      timerRef.current = setTimeout(() => setShow(false), 300 + remaining);
    };

    timerRef.current = setTimeout(finish, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center p-6 transition-opacity duration-500"
      style={{ backgroundColor: "#617783", opacity: progress >= 100 ? 0 : 1 }}
      role="status"
      aria-label="Cargando…"
    >
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/loaderInicio.png"
          alt="VM Studio"
          width={180}
          height={90}
          priority
          
        />
      </div>

      {/* Barra */}
      <div className="w-full max-w-md">
        <div className="h-1 rounded-full bg-white/20">
          <div
            className="h-1 rounded-full bg-white transition-[width] duration-200"
            style={{ width: `${Math.floor(progress)}%` }}
          />
        </div>
        <p className="mt-4 text-center text-white/95 text-sm font-medium tracking-wide">
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
}
