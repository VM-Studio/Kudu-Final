// src/components/Footer.tsx
import { BRAND } from "@/lib/brand";

export default function Footer() {
  const waNumber = BRAND.contact.phone.replace(/\D/g, "");

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* contenedor más bajo */}
      <div className="mx-auto max-w-6xl px-5 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Marca */}
          <div className="leading-tight">
            <div className="text-lg font-semibold text-[#111]">{BRAND.name}</div>
            <div className="mt-0.5 text-sm text-[#647A8B] font-medium tracking-wide">
              {BRAND.claim}
            </div>
            <p className="mt-2 text-xs text-[#555] max-w-xs leading-5">
              Diseñamos y desarrollamos productos de ventilación y cocción que
              combinan innovación, potencia y estética contemporánea.
            </p>
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

          {/* Redes */}
          <div className="leading-tight">
            <h4 className="text-sm text-[#111] font-semibold mb-2">Redes</h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#444]">
              <a
                href={`https://instagram.com/${BRAND.social.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#647A8B]"
              >
                Instagram
              </a>
              <a
                href={`https://tiktok.com/@${BRAND.social.tiktok}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#647A8B]"
              >
                TikTok
              </a>
              <a
                href={`https://facebook.com/${BRAND.social.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#647A8B]"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* franja legal súper baja */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-[11px] text-[#777]">
          © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
