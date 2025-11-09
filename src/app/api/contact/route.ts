import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';          // asegura runtime Node en Vercel
export const dynamic = 'force-dynamic';   // evita intentos de prerender

export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      // No romper el build: error claro en runtime si faltara
      return NextResponse.json(
        { error: 'Falta RESEND_API_KEY en el servidor' },
        { status: 500 }
      );
    }
    const resend = new Resend(key);  // 👈 mover aquí

    const body = await req.json();

    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const phone = String(body?.phone ?? '').trim();
    const message = String(body?.message ?? '').trim();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || 'onboarding@resend.dev';

    const subject = `Nueva consulta - KUDUOBRAS - ${name}`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
        <h2>Nueva consulta del sitio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <div style="white-space:pre-wrap">${message}</div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: to!,
      subject,
      html,
      replyTo: email, // usa camelCase si tu SDK lo requiere
    });

    if (error) return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error del servidor', details: String(e) }, { status: 500 });
  }
}
