"use client";

import * as React from "react";
import { BRAND } from "@/lib/brand";
import { Send, Phone } from "lucide-react";

export default function Page() {
  const [form, setForm] = React.useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3500);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  const wa = BRAND.contact.phone.replace(/\D/g, "");

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-4xl font-extrabold text-[#111]">Contacto</h1>
        <p className="mt-3 max-w-xl text-[#444]">
          Envianos tu consulta o pedí un presupuesto. Te respondemos a la brevedad.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid max-w-2xl gap-5">
          <input
            required
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#647A8B] focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#647A8B] focus:outline-none"
          />
          <textarea
            required
            placeholder="Mensaje"
            rows={5}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#647A8B] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#647A8B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#586c7c]"
          >
            <Send size={16} /> Enviar mensaje
          </button>
          {enviado && (
            <p className="mt-2 text-sm font-medium text-green-600">
              ✅ ¡Mensaje enviado correctamente!
            </p>
          )}
        </form>

        <div className="mt-12 flex flex-col gap-3 text-sm text-[#444]">
          <p>
            <strong>Correo:</strong>{" "}
            <a href={`mailto:${BRAND.contact.email}`} className="text-[#647A8B] underline">
              {BRAND.contact.email}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-[#647A8B]" />
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              className="text-[#647A8B] underline"
            >
              WhatsApp {BRAND.contact.phone}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
