// src/components/Footer.tsx
import { BRAND } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const waNumber = BRAND.contact.phone.replace(/\D/g, "");

  return (
    <footer className="border-t border-gray-400 bg-gray-200">
      {/* contenedor más bajo */}
  <div className="mx-auto max-w-7xl px-4 sm:px-5 py-6 md:py-8 w-full">
  <div className="grid gap-6 md:grid-cols-3 w-full">
          {/* Marca */}
          <div className="leading-tight">
            <Image
              src="/navbar.png"
              alt={BRAND.name}
              width={120}
              height={40}
              className="mb-2"
            />
            <div className="mt-0.5 text-sm text-[#647A8B] font-medium tracking-wide">
              {BRAND.claim}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="leading-tight">
            <h4 className="text-sm text-[#111] font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="space-y-1 text-xs text-[#444]">
              <li>
                <Link href="/" className="hover:text-[#647A8B]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-[#647A8B]">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/perfil" className="hover:text-[#647A8B]">
                  Perfil
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-[#647A8B]">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="leading-tight">
            <h4 className="text-sm text-[#111] font-semibold mb-2">Contacto</h4>
            <ul className="space-y-1 text-xs text-[#444]">
              <li>{BRAND.contact.address}</li>
              <li>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="hover:text-[#647A8B]"
                >
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#647A8B]"
                >
                  +{waNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* franja legal súper baja */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-[11px] text-[#777]">
          © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
