"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import NavbarLogo from "../../public/navbar.png";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Perfil", href: "/perfil" },
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const waNumber = "5491159278803";
  const linkBase = "text-sm transition font-extrabold";
  const linkIdle = "text-[#222] hover:text-[#647A8B]";
  const linkActive = "text-[#647A8B]";

  return (
    <>
      {/* NAVBAR full-width con sombra sutil */}
      <header
        className={[
          "sticky top-0 z-50 w-full -mb-2 md:-mb-3 transition-all",
          scrolled
            // sombra un poco más marcada al scrollear + blur
            ? "bg-white/90 supports-[backdrop-filter]:bg-white/75 backdrop-blur " +
              "shadow-[0_14px_42px_-30px_rgba(2,6,23,.35)]"
            // sombra finita y elegante en reposo
            : "bg-white shadow-[0_10px_32px_-28px_rgba(2,6,23,.24)]"
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center" aria-label="Inicio">
            <Image
              src={NavbarLogo}
              alt="KUDU"
              width={150}
              height={36}
              priority
              className="h-9 md:h-10 w-auto -translate-y-px"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`${linkBase} ${isActive(l.href) ? linkActive : linkIdle}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#647A8B] px-5 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          {/* Burger */}
          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-gray-300 bg-white md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <div className="space-y-[5px]">
              <span className="block h-[2px] w-5 bg-[#222]" />
              <span className="block h-[2px] w-5 bg-[#222]" />
              <span className="block h-[2px] w-5 bg-[#222]" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[85%] max-w-[340px] border-l border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between p-5">
              <div className="inline-flex items-center">
                <Image src="/navbar.png" alt="KUDU" width={130} height={30} className="h-7 w-auto" />
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
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl border border-transparent px-4 py-3 text-[15px] transition ${
                    isActive(l.href)
                      ? "text-[#647A8B]"
                      : "text-[#222] hover:border-[#647A8B]/30 hover:bg-[#647A8B]/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 px-5">
              <a
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#647A8B] px-5 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
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
