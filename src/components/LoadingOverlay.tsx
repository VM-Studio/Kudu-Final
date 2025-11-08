"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

/**
 * Loader de pantalla completa:
 * - Se muestra al montar (primer render)
 * - Se vuelve a mostrar en cada cambio de ruta (pathname o query)
 * - Barra de progreso con % y fade-out suave
 */
export default function LoadingOverlay() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // función que corre el ciclo del loader 1 vez
  const runOnce = () => {
    // limpiar ciclos previos
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    setShow(true);
    setProgress(0);

    // Avance “falso” hasta ~92%
    const started = Date.now();
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        const bump = 6 + Math.random() * 8; // 6–14
        return Math.min(92, p + bump);
      });
    }, 180);

    // Completar y hacer fade-out (mínimo 800ms en pantalla)
    const MIN_VISIBLE = 800;
    const finish = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      const remaining = Math.max(0, MIN_VISIBLE - (Date.now() - started));
      timerRef.current = setTimeout(() => setShow(false), 450 + remaining); // suma transición
    };

    // En App Router no hay eventos de router; simulamos “fin de carga” rápido
    // Lanzamos finish pronto; si querés atarlo a fetches, llamá finish() desde tu capa de datos
    timerRef.current = setTimeout(finish, 1700);
  };

  // Al montar → mostrar
  useEffect(() => {
    runOnce();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // En cada cambio de ruta o query → volver a mostrar
  useEffect(() => {
    runOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search?.toString()]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 transition-opacity duration-500"
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
      <div className="w-full max-w-xl">
        <div className="h-2.5 rounded-full bg-white/20">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-[#2B6CF6] to-[#61A0FF] transition-[width] duration-200"
            style={{ width: `${Math.floor(progress)}%` }}
          />
        </div>
        <p className="mt-4 text-center text-white/95 text-xl font-semibold tracking-wide">
          {Math.floor(progress)}% Cargando…
        </p>
      </div>
    </div>
  );
}
