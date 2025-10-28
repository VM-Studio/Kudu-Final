"use client";

import { BRAND } from "@/lib/brand";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const wa = BRAND.contact.phone.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${wa}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
      style={{ boxShadow: "0 12px 30px rgba(37, 211, 102, .35)" }}
    >
      <MessageCircle size={26} />
      <span className="sr-only">Abrir WhatsApp</span>
    </a>
  );
}
