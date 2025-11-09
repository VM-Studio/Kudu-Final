import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validaciones mínimas (podemos endurecer luego)
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const phone = String(body?.phone ?? '').trim();
    const message = String(body?.message ?? '').trim();
    const products: string[] = Array.isArray(body?.products) ? body.products : [];

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO;
    if (!to) {
      return NextResponse.json({ error: 'CONTACT_TO no configurado' }, { status: 500 });
    }

    const from = process.env.CONTACT_FROM && process.env.CONTACT_FROM.trim() !== ''
      ? process.env.CONTACT_FROM
      : 'onboarding@resend.dev';

    const subject = `Nueva consulta - KUDUOBRAS - ${name}`;
    const productsBlock =
      products.length ? `<p><strong>Productos:</strong> ${products.join(', ')}</p>` : '';

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
        <h2>Nueva consulta del sitio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${productsBlock}
        <p><strong>Mensaje:</strong></p>
        <div style="white-space:pre-wrap">${message}</div>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
        <p style="font-size:12px;color:#666">Origen: kuduobras.com</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: 'No se pudo enviar el email', details: error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error del servidor', details: String(e) }, { status: 500 });
  }
}
