'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '@/components/data/products';
import { Sora } from 'next/font/google';

import { useLayoutEffect, useRef } from 'react';

const sora = Sora({ subsets: ['latin'], weight: ['400','600','700','800'] });
const PRIMARY = '#547184';

type UiProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
  gallery?: string[];
  popular?: boolean;
  featured?: boolean;
  price?: number;
  compareAtPrice?: number;
};

const CATEGORIES = ['Extractores', 'Campanas', 'Purificadores', 'Anafes', 'Hornos'] as const;
type CategoryFilter = typeof CATEGORIES[number];

function normSrc(path?: string) {
  if (!path) return '/images/placeholder.jpg';
  return path.startsWith('/') ? path : `/${path}`;
}
function buildProductHref(p: UiProduct) {
  const id = encodeURIComponent(String(p.id ?? '').trim());
  if (!id) return '/catalogo'; // fallback defensivo

  if (p.gallery && p.gallery.length) {
    const params = new URLSearchParams();
    for (const src of p.gallery) params.append('imgs', src);
    return `/catalogo/${id}?${params.toString()}`;
  }
  return `/catalogo/${id}`;
}

/* ---------- TÍTULO GLOBAL (más pegado y compacto) ---------- */
function SectionTitle({ label, ghost }: { label: string; ghost: string }) {
  return (
    // quitamos margen superior y dejamos un margen inferior mínimo
    <div className="relative mb-2">{/* antes: my-2 / my-6 */}
      {/* bloque más bajo para acercar los títulos */}
      <div className="relative h-[74px] md:h-[92px] lg:h-[108px]">
        <span
          className={`${sora.className} pointer-events-none absolute inset-0 grid place-items-center
                         font-extrabold leading-none select-none text-slate-200/50
                         text-[10.5vw] md:text-[6.8vw]`}
        >
          {ghost}
        </span>

        <h2
          className={`${sora.className} absolute left-1/2 top-1/2 -translate-x-1/2
                        -translate-y-[72%] md:-translate-y-[70%] lg:-translate-y-[68%]
                        text-center tracking-tight font-extrabold text-slate-900 z-10
                        whitespace-nowrap
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
        >
          {label}
        </h2>
      </div>

      {/* línea más pegada al título */}
      <div className="mt-1 h-[3px] w-28 mx-auto rounded-full" style={{ backgroundColor: PRIMARY }} />
    </div>
  );
}

export default function CatalogoPage() {
  const mappedAll: UiProduct[] = useMemo(() => {
    return PRODUCTS.map((p: any, idx: number) => ({
      id: String(p.id ?? idx + 1),
      name: p.name ?? p.title ?? 'Producto',
      description: p.description ?? p.short ?? 'Producto de la línea.',
      image: normSrc(p.image),
      category: (p.category as UiProduct['category']) ?? 'Campanas',
      gallery: Array.isArray(p.gallery) ? p.gallery.map(normSrc) : undefined,
      popular: !!p.popular,
      featured: !!p.featured,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
    }));
  }, []);

  const [allProducts, setAllProducts] = useState<UiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAllProducts(mappedAll);
    setLoading(false);
  }, [mappedAll]);

  /* ===== HERO slides ===== */
  const HERO_SLIDES = useMemo(() => {
    const pick = (i: number) => mappedAll[i] ?? mappedAll[0];
    return [
      { product: pick(0), img: pick(0)?.image, title: pick(0)?.name, desc: pick(0)?.description },
      { product: pick(1), img: pick(1)?.image, title: pick(1)?.name, desc: pick(1)?.description },
      { product: pick(2), img: pick(2)?.image, title: pick(2)?.name, desc: pick(2)?.description },
    ];
  }, [mappedAll]);

  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), 3500);
    return () => clearInterval(id);
  }, [HERO_SLIDES.length]);

  /* ===== Populares (8) ===== */
  // SOLO campanas para el carrusel
  const campanas8 = useMemo(() => {
    return allProducts.filter(p => p.category === 'Campanas').slice(0, 8);
  }, [allProducts]);

  /* ===== Destacados (8 -> 4 por vista) ===== */
  const featured8 = useMemo(() => {
    const flagged = allProducts.filter(p => p.featured);
    return (flagged.length >= 8 ? flagged : allProducts).slice(0, 8);
  }, [allProducts]);
  const [featPage, setFeatPage] = useState(0);
  const FEAT_PER_VIEW = 4;
  const maxFeatPage = Math.max(0, Math.ceil(featured8.length / FEAT_PER_VIEW) - 1);
  const paginatedFeatured = useMemo(() => {
    const start = featPage * FEAT_PER_VIEW;
    return featured8.slice(start, start + FEAT_PER_VIEW);
  }, [featPage, featured8]);

  /* ===== Filtro (sin “Todos”) ===== */
  const [filter, setFilter] = useState<CategoryFilter>(CATEGORIES[0]);
  const products = useMemo(() => allProducts.filter(p => p.category === filter), [allProducts, filter]);
  const activeIndex = CATEGORIES.indexOf(filter);

  // refs para alinear el “pill” azul exactamente con el botón activo
  const railRef = useRef<HTMLDivElement>(null);

  // Tipado estricto por categoría para evitar warnings
  const btnRefs = useRef<Record<CategoryFilter, HTMLButtonElement | null>>(
    {} as Record<CategoryFilter, HTMLButtonElement | null>
  );

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const recalc = () => {
    const el = btnRefs.current[filter];
    const rail = railRef.current;
    if (!el || !rail) return;
    const elRect = el.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();
    setIndicator({ left: elRect.left - railRect.left, width: elRect.width });
  };

  useLayoutEffect(recalc, [filter]);
  useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [filter]);

  return (
    <div className={`${sora.className} min-h-screen w-full bg-white text-slate-900`}>
      {/* ================= HERO con background FIXED ================= */}
      <section
        className="
          relative w-full
          bg-center bg-cover bg-no-repeat bg-fixed
        "
        style={{
          backgroundImage: "url('/kudubackground.png')"
        }}
      >
        {/* overlay opcional para contraste del texto */}
        <div className="absolute inset-0 pointer-events-none bg-white/40"></div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8" style={{ minHeight: '72vh' }}>
          {/* IMAGEN DEL HERO (SIN TARJETA) */}
          <div
            className="
              absolute inset-y-6 left-6 right-[48%]
              overflow-visible pointer-events-none
            "
            style={{
              backgroundImage: `url('${HERO_SLIDES[heroIdx]?.img ?? '/hero/1.jpg'}')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
          {/* sombra suelo */}
          <div
            className="absolute left-10 right-[50%] bottom-8 h-10"
            style={{
              background: 'radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,.22), transparent 70%)',
              filter: 'blur(6px)'
            }}
          />

          {/* TEXTO A LA DERECHA */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">
            <div className="lg:col-start-2 max-w-xl lg:pl-8">
              {/* quitamos 'badge' para evitar error TS */}
              <p className="text-sm font-semibold tracking-wide text-slate-600">
                La mejor Calidad
              </p>
              <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                {HERO_SLIDES[heroIdx]?.title ?? 'New Car Parts'}
              </h1>
              <p className="mt-5 text-lg text-slate-700">
                {HERO_SLIDES[heroIdx]?.desc ?? 'Descripción breve del producto.'}
              </p>
              <Link
                href={buildProductHref(HERO_SLIDES[heroIdx].product)}
                className="mt-8 inline-flex items-center justify-center rounded-xl px-6 py-3 text-white font-semibold shadow-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                Ver producto
              </Link>
            </div>

            <div className="hidden lg:block" />

            {/* DOTS */}
            <div className="pointer-events-auto absolute bottom-10 right-[22%] flex items-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full ring-1 ring-slate-300 transition
                    ${i === heroIdx ? 'bg-slate-900' : 'bg-white hover:bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================== POPULARES (Carousel estilo “zoom center”) ================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        <SectionTitle label="Productos Populares" ghost="Populares" />
        <PopularCarousel items={campanas8} buildHref={buildProductHref} primary={PRIMARY} />
      </section>

      {/* ================== DESTACADOS (4 por vista) ================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        <SectionTitle label=" & Destacados" ghost="Destacados" />
        <div className="relative mt-12">
          <button
            aria-label="Anterior"
            onClick={() => setFeatPage((p) => Math.max(0, p - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-slate-300 bg-white grid place-items-center hover:bg-slate-50 shadow-sm"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => setFeatPage((p) => Math.min(maxFeatPage, p + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-slate-300 bg-white grid place-items-center hover:bg-slate-50 shadow-sm"
          >
            ›
          </button>

          <div className="mx-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {paginatedFeatured.map((p) => {
              const href = buildProductHref(p);
              const hasDiscount = p.compareAtPrice && p.price && p.compareAtPrice > p.price;
              return (
                <article key={p.id} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:shadow-[0_10px_30px_rgba(0,0,0,.06)] transition">
                  <div className="aspect-square grid place-items-center rounded-lg mb-4 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="h-[88%] w-[88%] object-contain" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">{p.category}</div>
                      <h4 className="text-[15px] font-semibold">{p.name}</h4>
                    </div>
                    {hasDiscount ? (
                      <div className="text-right">
                        <div className="text-xs line-through text-slate-400">${p.compareAtPrice}</div>
                        <div className="text-sm font-bold" style={{ color: PRIMARY }}>${p.price}</div>
                      </div>
                    ) : p.price ? (
                      <div className="text-sm font-bold" style={{ color: PRIMARY }}>${p.price}</div>
                    ) : null}
                  </div>
                  <div className="mt-3">
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-white text-sm font-semibold"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================== FILTRO + TODOS NUESTROS PRODUCTOS ================== */}
      {/* ================== FILTRO + TODOS NUESTROS PRODUCTOS ================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        <SectionTitle label="Todos nuestros productos" ghost="Productos" />

        {/* Filtro */}
        <div className="mb-8">
          <div className="relative mx-auto w-full max-w-3xl rounded-2xl bg-slate-50 p-1.5 ring-1 ring-slate-200">
            <div
              ref={railRef}
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)` }}
            >
              {/* Indicador azul perfectamente alineado */}
              <span
                className="absolute top-0 bottom-0 rounded-xl shadow-sm transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width, backgroundColor: PRIMARY }}
              />
              {CATEGORIES.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => { btnRefs.current[cat] = el; }} // ← callback sin return
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={[
                      'relative z-10 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition',
                      active ? 'text-white' : 'text-slate-900 hover:text-slate-700',
                    ].join(' ')}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tarjetas (SIN recuadro gris bajo la imagen) */}
        {loading ? (
          <p className="text-center text-slate-500">Cargando productos…</p>
        ) : products.length === 0 ? (
          <p className="text-center text-slate-500">No hay productos en esta categoría.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const href = buildProductHref(p);
              return (
                <article
                  key={p.id}
                  className="group rounded-2xl bg-white ring-1 ring-slate-200 p-5 transition
                       hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.07)]"
                >
                  <Link href={href} className="block">
                    <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-[90%] w-[90%] object-contain mx-auto my-auto"
                      />
                      <span
                        className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        {p.category}
                      </span>
                    </div>
                  </Link>
                  <h4 className="mt-4 text-lg font-semibold">{p.name}</h4>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={href}
                      className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition"
                      style={{ backgroundColor: `${PRIMARY}1A`, color: PRIMARY }}
                    >
                      Ver detalle
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- Componente POPULARES: Carrusel “zoom center” (laterales un poco más abiertas) ---------- */
function PopularCarousel({
  items,
  buildHref,
  primary,
}: {
  items: { id: string; name: string; image: string; category: string }[];
  buildHref: (p: any) => string;
  primary: string;
}) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  const visible = useMemo(() => {
    const L = items.length;
    return [(idx - 1 + L) % L, idx, (idx + 1) % L];
  }, [idx, items.length]);

  const PRIMARY_GLOW = `${primary}33`;

  return (
    <div className="relative mt-8">
      {/* glow sutil de marca */}
      <div
        className="pointer-events-none absolute -inset-x-24 top-8 h-[160px] -z-10 rounded-full blur-3xl"
        style={{ background: `radial-gradient(60% 120% at 50% 50%, ${PRIMARY_GLOW}, transparent 70%)` }}
      />

      {/* Flechas */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="hidden md:flex absolute -left-6 sm:-left-10 lg:-left-14 top-1/2 -translate-y-1/2
                     h-11 w-11 items-center justify-center rounded-full
                     ring-1 ring-slate-200/50 bg-white/80 text-slate-700 hover:bg-white transition z-30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="hidden md:flex absolute -right-6 sm:-right-10 lg:-right-14 top-1/2 -translate-y-1/2
                     h-11 w-11 items-center justify-center rounded-full
                     ring-1 ring-slate-200/50 bg-white/80 text-slate-700 hover:bg-white transition z-30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Track con bleed visible */}
      <div className="relative mx-0 sm:mx-6 md:mx-12 lg:mx-16 overflow-visible">
        <div className="relative h-[260px] sm:h-[320px] md:h-[380px]">
          {/* ghost arcs detrás, alineados a las nuevas posiciones */}
          <div className="pointer-events-none absolute left-[9%] sm:left-[10%] top-1/2 -translate-y-1/2 w-[25%] h-[54%] rounded-[28px] bg-slate-900/[.05]" />
          <div className="pointer-events-none absolute right-[9%] sm:right-[10%] top-1/2 -translate-y-1/2 w-[25%] h-[54%] rounded-[28px] bg-slate-900/[.05]" />

          {items.map((p, i) => {
            const isCenter = i === idx;
            const isLeft = i === visible[0];
            const isRight = i === visible[2];
            if (!isCenter && !isLeft && !isRight) return null;

            const base =
              "absolute top-1/2 -translate-y-1/2 rounded-[28px] overflow-hidden ring-1 transition-all duration-500 ease-out bg-white";
            const styleContain: React.CSSProperties = {
              backgroundImage: `url('${p.image}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            };
            const styleCover: React.CSSProperties = {
              backgroundImage: `url('${p.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            };

            // CENTRO
            if (isCenter) {
              return (
                <Link
                  key={p.id}
                  href={buildHref(p)}
                  className={`${base} left-1/2 -translate-x-1/2 z-20
                                h-[74%] w-[76%] sm:h-[80%] sm:w-[70%] md:h-[84%] md:w-[64%]
                                ring-white/30 shadow-[0_26px_110px_-30px_rgba(2,6,23,.35)]`}
                  style={styleContain}
                />
              );
            }

            // IZQUIERDA (un poco más abierta que la versión anterior)
            if (isLeft) {
              return (
                <Link
                  key={p.id}
                  href={buildHref(p)}
                  className={`${base} z-10
                                left-[13%] sm:left-[14%] md:left-[15%]
                                h-[50%] w-[24%] sm:h-[52%] sm:w-[24%] md:h-[54%] md:w-[24%]
                                opacity-90 ring-white/20
                                shadow-[0_12px_40px_-24px_rgba(2,6,23,.22)] scale-[0.95]`}
                  style={styleCover}
                >
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,.16) 70%)" }}
                  />
                </Link>
              );
            }

            // DERECHA
            return (
              <Link
                key={p.id}
                href={buildHref(p)}
                className={`${base} z-10
                              right-[13%] sm:right-[14%] md:right-[15%]
                              h-[50%] w-[24%] sm:h-[52%] sm:w-[24%] md:h-[54%] md:w-[24%]
                              opacity-90 ring-white/20
                              shadow-[0_12px_40px_-24px_rgba(2,6,23,.22)] scale-[0.95]`}
                style={styleCover}
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,.16) 70%)" }}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Dots + hint */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full ring-1 ring-slate-300 transition
                           ${i === idx ? "bg-slate-900" : "bg-white hover:bg-slate-200"}`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="text-xs tracking-[.18em] font-semibold text-slate-500 uppercase select-none">
          Presiona para ver màs Modelos
        </div>
      </div>
    </div>
  );
}
