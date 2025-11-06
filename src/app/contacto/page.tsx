'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Montserrat_Alternates } from 'next/font/google';
import { PRODUCTS, type Product } from '@/components/data/products';

const montAlt = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
});

export default function ContactoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== NUEVO: interacción de productos =====
  const [wantProduct, setWantProduct] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const CATEGORIES = useMemo(
    () => ['Extractores', 'Campanas', 'Purificadores', 'Anafes', 'Hornos'] as const,
    []
  );
  const [activeCat, setActiveCat] = useState<(typeof CATEGORIES)[number]>('Extractores');

  const listByCat = useMemo(
    () => PRODUCTS.filter(p => p.category === activeCat),
    [activeCat]
  );

  // ===== NUEVO: feedback "Agregado con éxito!" =====
  const [addedOk, setAddedOk] = useState(false);

  function appendToMessage(p: Product) {
    const el = document.getElementById('mensaje') as HTMLTextAreaElement | null;
    if (!el) return;
    const text = `\n• Producto: ${p.name} (ID: ${p.id})`;
    el.value = (el.value || '') + text;
    el.dispatchEvent(new Event('input', { bubbles: true }));

    // feedback visual
    setAddedOk(true);
    setTimeout(() => setAddedOk(false), 1400);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;

    // Honeypot anti-spam (campo oculto)
    const hp = (form.elements.namedItem('website') as HTMLInputElement).value;
    if (hp) return;

    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const telefono = (form.elements.namedItem('telefono') as HTMLInputElement).value.trim();
    const asunto = (form.elements.namedItem('asunto') as HTMLInputElement).value.trim();
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value.trim();

    if (!nombre || !email || !mensaje) {
      setError('Completá nombre, email y tu consulta.');
      return;
    }

    setLoading(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        serviceId,
        templateId,
        {
          title: asunto || 'Consulta',
          name: nombre,
          email: email,
          message: `${mensaje}${telefono ? `\n\nTeléfono: ${telefono}` : ''}`,
        },
        { publicKey }
      );

      router.push('/contacto/agradecimiento');
    } catch (err) {
      console.error('EmailJS error', err);
      setError('No se pudo enviar el formulario. Probá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative">
      {/* Fondo suave con gradiente y brillo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#647a8b0f] via-white to-white" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(1200px_120px_at_50%_0%,rgba(128,150,168,0.18),transparent)]" />

      {/* Header centrado */}
      <section className="mx-auto max-w-4xl px-4 pt-10 md:pt-14">
        <h1
          className={`${montAlt.className} text-center text-4xl md:text-5xl font-extrabold tracking-tight text-[#1c212b]`}
        >
          Contacto
        </h1>
        <p className="mt-3 text-center text-slate-600">
          Dejanos tu consulta y te respondemos a la brevedad.
        </p>
      </section>

      {/* Card glass del formulario */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:py-10">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/60
            bg-white/70 backdrop-blur-xl
            shadow-[0_40px_120px_-35px_rgba(12,18,28,0.35)]
          "
        >
          {/* halos suaves */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-[#8096a8]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#647a8b]/20 blur-2xl" />

          <form onSubmit={onSubmit} className="relative z-10 grid gap-6 p-6 md:p-10">
            {/* Honeypot (oculto) */}
            <input
              type="text"
              name="website"
              aria-hidden="true"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Layout 2 columnas en desktop */}
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                id="nombre"
                name="nombre"
                label="Nombre y apellido *"
                autoComplete="name"
                required
              />
              <Field
                id="email"
                name="email"
                type="email"
                label="Email *"
                autoComplete="email"
                required
              />
              <Field
                id="telefono"
                name="telefono"
                label="Teléfono (opcional)"
                autoComplete="tel"
              />
              <Field
                id="asunto"
                name="asunto"
                label="Asunto"
                placeholder="Consulta por producto / proyecto"
              />
            </div>

            {/* ===== selector de producto opcional ===== */}
            <div className="flex items-center gap-3">
              <input
                id="wantProduct"
                type="checkbox"
                checked={wantProduct}
                onChange={(e) => setWantProduct(e.target.checked)}
                className="
                  h-5 w-5 appearance-none rounded-md border border-slate-300 bg-white
                  grid place-content-center
                  focus:outline-none focus:ring-2 focus:ring-[#647a8b]/30
                  checked:border-[#647a8b]
                  checked:bg-white
                  checked:bg-[length:14px_14px] checked:bg-no-repeat checked:bg-center
                  checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22 stroke=%22%23647A8B%22 stroke-width=%223%22><path d=%22M5 10l3 3 7-7%22/></svg>')]
                "
              />
              <label htmlFor="wantProduct" className="text-slate-800">
                ¿Desea consultar sobre algún producto en particular?
              </label>
              {wantProduct && (
                <button
                  type="button"
                  onClick={() => setShowPicker(true)}
                  className="ml-auto inline-flex items-center rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Elegir productos
                </button>
              )}
            </div>

            <TextArea
              id="mensaje"
              name="mensaje"
              label="Mensaje *"
              placeholder="Contanos en qué podemos ayudarte…"
              rows={6}
              required
            />

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex items-center justify-center
                  rounded-2xl bg-[#63798a] px-6 py-3
                  font-semibold text-white
                  shadow-md hover:opacity-90
                  transition disabled:opacity-60
                "
              >
                {loading ? 'Enviando…' : 'Enviar formulario'}
              </button>
              <p className="text-xs text-slate-500">* Campos obligatorios.</p>
            </div>
          </form>

          {/* ===== Modal de selección ===== */}
          {showPicker && (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b p-4">
                  <h3 className="text-lg font-semibold text-slate-900">Seleccionar productos</h3>
                  <button
                    type="button"
                    onClick={() => setShowPicker(false)}
                    className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>

                {/* NUEVO: badge de agregado */}
                {addedOk && (
                  <div className="absolute right-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200 shadow-sm">
                    Agregado con éxito!
                  </div>
                )}

                {/* Categorías */}
                <div className="flex gap-2 overflow-x-auto p-4">
                  {CATEGORIES.map(cat => {
                    const active = cat === activeCat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCat(cat)}
                        className={[
                          "whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ring-1 transition",
                          active
                            ? "bg-[#647a8b] text-white ring-[#647a8b]"
                            : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
                        ].join(' ')}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Lista de productos de la categoría */}
                <div className="max-h-[60vh] overflow-y-auto p-4 pt-0">
                  <ul className="divide-y">
                    {listByCat.map((p) => (
                      <li key={p.id} className="flex items-center gap-3 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={(p as any).image}
                          alt={p.name}
                          className="h-12 w-12 shrink-0 rounded-lg object-contain ring-1 ring-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-slate-900">{p.name}</p>
                          <p className="truncate text-xs text-slate-500">{p.id}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => appendToMessage(p)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
                        >
                          Agregar al mensaje
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-2 border-t p-4">
                  <button
                    type="button"
                    onClick={() => setShowPicker(false)}
                    className="rounded-xl border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50"
                  >
                    Listo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------------------- UI subcomponents ---------------------- */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  name: string;
};

function Field({ label, id, name, className = '', ...props }: FieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={[
          "rounded-2xl border border-slate-200/80 bg-white/70",
          "px-4 py-3 shadow-sm outline-none",
          "focus:ring-4 focus:ring-[#647a8b]/20 focus:border-[#647a8b]/60",
          "placeholder:text-slate-400",
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  name: string;
};

function TextArea({ label, id, name, className = '', ...props }: TextAreaProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-medium text-slate-800">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={[
          "rounded-2xl border border-slate-200/80 bg-white/70",
          "px-4 py-3 shadow-sm outline-none",
          "focus:ring-4 focus:ring-[#647a8b]/20 focus:border-[#647a8b]/60",
          "placeholder:text-slate-400",
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  );
}
