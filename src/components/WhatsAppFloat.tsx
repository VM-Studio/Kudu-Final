"use client";

export default function WhatsAppFloat() {
  const wa = "5491159278803"; // sin '+'

  return (
    <a
      href={`https://wa.me/${wa}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
  className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-70 inline-flex h-20 w-20 items-center justify-center cursor-pointer rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/wpp.png"
        alt="WhatsApp"
        className="h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      <span className="sr-only">Abrir WhatsApp</span>
    </a>
  );
}
