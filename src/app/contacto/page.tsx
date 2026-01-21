'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sora } from 'next/font/google';

const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });
const PRIMARY = '#547184';

export default function ContactoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      // Redirigir a página de agradecimiento
      router.push('/contacto/agradecimiento');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`${sora.className} min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 px-4`}>
      <div className="mx-auto max-w-2xl">
        {/* Título */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
            Contactanos
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Completá el formulario y nos pondremos en contacto a la brevedad
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#547184] focus:border-transparent transition"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#547184] focus:border-transparent transition"
                placeholder="juan@ejemplo.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#547184] focus:border-transparent transition"
                placeholder="+54 11 1234-5678"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#547184] focus:border-transparent transition resize-none"
                placeholder="Contanos tu consulta..."
              />
            </div>
          </div>

          {/* Botón enviar */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ 
                backgroundColor: PRIMARY,
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            * Campos obligatorios
          </p>
        </form>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            También podés contactarnos directamente por:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:obras@geneve.com.ar"
              className="text-[#547184] hover:underline font-medium"
            >
              obras@geneve.com.ar
            </a>
            <span className="hidden sm:inline text-slate-400">•</span>
            <a
              href="https://wa.me/5491159278803"
              target="_blank"
              rel="noreferrer"
              className="text-[#547184] hover:underline font-medium"
            >
              +54 9 11 5927-8803
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
