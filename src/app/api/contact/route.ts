import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const { error } = await resend.emails.send({
      from: 'KUDUOBRAS - Contacto <onboarding@resend.dev>',
      to: ['obras@geneve.com.ar'],
      subject: `Nueva consulta - KUDUOBRAS - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #233265; border-bottom: 3px solid #647a8b; padding-bottom: 10px;">
            Nueva Consulta de Contacto
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #233265;">Mensaje:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #647a8b; border-radius: 4px;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de KUDUOBRAS</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
