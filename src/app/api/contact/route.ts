import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';          // asegura runtime Node en Vercel
export const dynamic = 'force-dynamic';   // evita intentos de prerender

// Escape básico para HTML
function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'Falta RESEND_API_KEY en el servidor' },
        { status: 500 }
      );
    }
    const resend = new Resend(key);

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

    // --- Formateo prolijo del bloque de mensaje ---
    // Buscamos "Hola! Me gustaría consultar..." en cualquier parte (puede venir precedido de "Asunto: ...")
    const holaIdx = message.search(/hola!\s*me gustar[ií]a consultar/i);
    let messageBlock = '';

    if (holaIdx >= 0) {
      // Tomamos desde "Hola..." hacia adelante
      const fromHola = message.slice(holaIdx);
      const lines = fromHola.split('\n');

      // 1) Encabezado (primera línea)
      const header = lines[0] ?? '';

      // 2) Ítems (resto de líneas). Limpia viñetas "•", "-", espacios, etc.
      const items = lines
        .slice(1)
        .map(l =>
          l
            .replace(/^[\s\u2022•\-]+/g, '') // elimina viñetas y guiones al inicio
            .trim()
        )
        .filter(Boolean);

      messageBlock = `
        <p style="margin:0 0 8px 0">${esc(header)}</p>
        ${
          items.length
            ? `<ul style="margin:0;padding-left:18px">${items
                .map(i => `<li style="margin:4px 0">${esc(i)}</li>`)
                .join('')}</ul>`
            : ''
        }
      `;
    } else {
      // Mensaje libre; mostrar rótulo y mantener saltos de línea
      messageBlock = `
        <p style="margin:0 0 6px 0"><strong>Mensaje:</strong></p>
        <div style="white-space:pre-wrap">${esc(message)}</div>
      `;
    }

    // --- Layout general simple y robusto para Outlook ---
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#0F172A">
        <h2 style="margin:0 0 16px 0;font-size:20px;">Nueva consulta del sitio</h2>

        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:640px">
          <tr>
            <td style="padding:8px 0;width:120px;"><strong>Nombre:</strong></td>
            <td style="padding:8px 0;">${esc(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>Email:</strong></td>
            <td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#0ea5e9;text-decoration:none">${esc(email)}</a></td>
          </tr>
          ${
            phone
              ? `<tr>
                   <td style="padding:8px 0;"><strong>Teléfono:</strong></td>
                   <td style="padding:8px 0;">${esc(phone)}</td>
                 </tr>`
              : ''
          }
        </table>

        <div style="margin:16px 0 0 0;padding:12px 14px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;">
          ${messageBlock}
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: to!,
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error del servidor', details: String(e) }, { status: 500 });
  }
}
