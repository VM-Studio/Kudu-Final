import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="text-xl font-semibold text-[#111]">{BRAND.name}</div>
            <div className="mt-1 text-[#647A8B] font-medium tracking-wide">
              {BRAND.claim}
            </div>
            <p className="mt-4 text-sm text-[#555] max-w-xs leading-6">
              Diseñamos y desarrollamos productos de ventilación y cocción que
              combinan innovación, potencia y estética contemporánea.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[#111] font-semibold mb-3">Contacto</h4>
            <ul className="space-y-1 text-sm text-[#444]">
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
                  href={`https://wa.me/54${BRAND.contact.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#647A8B]"
                >
                  +54 9 {BRAND.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-[#111] font-semibold mb-3">Redes</h4>
            <div className="flex flex-wrap gap-3 text-sm text-[#444]">
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

        <div className="mt-12 border-t border-gray-200 pt-6 text-xs text-[#777]">
          © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
