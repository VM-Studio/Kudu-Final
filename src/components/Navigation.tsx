"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";

const LINKS = [
  { label: "Purificadores", href: "/purificadores" },
  { label: "Campanas", href: "/campanas" },
  { label: "Extractores", href: "/extractores" },
  { label: "Hornos", href: "/hornos" },
  { label: "Anafes", href: "/anafes" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waNumber = BRAND.contact.phone.replace(/\D/g, ""); // solo dígitos

  const linkBase =
    "text-sm transition font-semibold";
  const linkIdle = "text-[#222] hover:text-[#647A8B]";
  const linkActive = "text-[#647A8B]";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled ? "bg-white/90 backdrop-blur border-b border-gray-200" : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* logo */}
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Inicio">
            <div className="h-6 w-6 rounded-lg" style={{ background: "#647A8B" }} />
            <span className="text-sm font-semibold tracking-widest text-[#111]">KUDU</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`${linkBase} ${active ? linkActive : linkIdle}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              className="inline-flex items-center justify-center rounded-2xl bg-[#647A8B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          {/* burger */}
          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-gray-300 bg-white md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <div className="space-y-[5px]">
              <span className="block h-[2px] w-5 bg-[#222]"></span>
              <span className="block h-[2px] w-5 bg-[#222]"></span>
              <span className="block h-[2px] w-5 bg-[#222]"></span>
            </div>
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[85%] max-w-[340px] border-l border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between p-5">
              <div className="inline-flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg" style={{ background: "#647A8B" }} />
                <span className="text-sm font-semibold tracking-widest text-[#111]">KUDU</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-gray-300 bg-white"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-5 pb-4">
              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl border border-transparent px-4 py-3 text-[15px] transition ${
                      active ? "text-[#647A8B]" : "text-[#222] hover:border-[#647A8B]/30 hover:bg-[#647A8B]/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 px-5">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-[#647A8B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>

            <div className="px-5 py-6 text-xs text-[#777]">
              {BRAND.name} · {BRAND.claim}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
