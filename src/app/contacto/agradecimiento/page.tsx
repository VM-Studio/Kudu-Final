'use client';

import Image from 'next/image';
import { Sora } from 'next/font/google';

const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });

export default function AgradecimientoPage() {
  return (
    <div className={`${sora.className} min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16 px-4`}>
      <div className="mx-auto max-w-2xl text-center">
        {/* Mensaje */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-12">
          Muchas gracias por ponerte en contacto con nosotros
        </h1>

        {/* Logo KUDU */}
        <div className="flex justify-center">
          <Image
            src="/navbar.png"
            alt="KUDU"
            width={180}
            height={60}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
