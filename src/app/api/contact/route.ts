// src/app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function need(keys: string[]) {
  const missing = keys.filter(k => !process.env[k]);
  if (missing.length) return { ok:false, error:`Faltan variables de entorno: ${missing.join(', ')}` };
  return { ok:true };
}

export async function POST(req: NextRequest) {
  const check = need(['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','MAIL_FROM','MAIL_TO']);
  if (!check.ok) {
    return new Response(JSON.stringify(check), { status:500, headers:{'Content-Type':'application/json'} });
  }

  const { nombre, email, telefono, asunto, mensaje, site } = await req.json();
  if (!nombre || !email || !mensaje) {
    return new Response(JSON.stringify({ ok:false, error:'Datos inválidos' }), { status:400, headers:{'Content-Type':'application/json'} });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: false,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM!,
    to: process.env.MAIL_TO!,
    subject: `[Contacto] ${asunto || 'Consulta'} — ${nombre}`,
    replyTo: email,
    html: `
      <h2>Nueva consulta ${site ? `de ${site}` : ''}</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${telefono || '-'}</p>
      <p><b>Asunto:</b> ${asunto || 'Consulta'}</p>
      <p><b>Mensaje:</b><br/>${(mensaje || '').replace(/\n/g,'<br/>')}</p>
    `,
  });

  return new Response(JSON.stringify({ ok:true }), { status:200, headers:{'Content-Type':'application/json'} });
}
