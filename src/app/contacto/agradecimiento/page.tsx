import Link from "next/link";
import { Montserrat_Alternates, Sora } from "next/font/google";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// (Opcional) Meta tags de la página
export const metadata = {
  title: "Mensaje enviado | KUDU Obras",
  description: "Gracias por tu consulta. Te responderemos a la brevedad.",
  robots: {
    index: false, // evitá indexar la página de confirmación
    follow: false,
  },
};

export default function GraciasContactoPage() {
  return (
    <main className={`${sora.className} relative min-h-[70vh]`}>
      {/* Fondo suave */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#647a8b0f] via-white to-white" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(1200px_120px_at_50%_0%,rgba(128,150,168,0.18),transparent)]" />

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
          {/* Check icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 7l-9 9-5-5" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className={`${montAlt.className} text-4xl md:text-5xl font-extrabold tracking-tight text-[#1c212b]`}>
          ¡Mensaje enviado!
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Gracias por contactarte con <strong>KUDU Obras</strong>. Recibimos tu consulta y te responderemos a la
          brevedad al correo que nos indicaste.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-[#63798a] px-6 py-3 font-semibold text-white shadow-md hover:opacity-90 transition"
          >
            Volver al inicio
          </Link>

          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            Ver catálogo
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          ¿No recibiste nuestra respuesta en 24–48 h? Revisá tu carpeta de spam o escribinos nuevamente.
        </p>
      </section>
    </main>
  );
}
