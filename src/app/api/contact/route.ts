import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Inicializar Resend solo si existe la variable de entorno.
const resendApiKey = process.env.RESEND_API_KEY;
let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  // Durante builds locales o CI sin la clave, evitamos lanzar una excepción
  // y manejamos la ruta devolviendo un error controlado en tiempo de petición.
  console.warn('RESEND_API_KEY no está definida. Emails deshabilitados.');
}

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

    // Comprobar que el servicio de emails está disponible
    if (!resend) {
      console.error('Intento de enviar email pero RESEND_API_KEY no está configurada.');
      return NextResponse.json(
        { error: 'Servicio de email no configurado' },
        { status: 503 }
      );
    }

    // Enviar email usando Resend
    // Usar la dirección 'from' del dominio verificado. Preferimos tomarla desde
    // la variable de entorno CONTACT_FROM en Vercel (ej: 'KUDUOBRAS - Contacto <contacto@kuduobras.com>')
    const contactFrom = process.env.CONTACT_FROM || 'KUDUABRAS - Contacto <contacto@kuduobras.com>';
    const contactTo = process.env.CONTACT_TO ? process.env.CONTACT_TO.split(',').map(s => s.trim()) : ['obras@geneve.com.ar'];

    const { error } = await resend.emails.send({
      from: contactFrom,
      to: contactTo,
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
      // Devolver detalles del error temporalmente para debugging en producción.
      // Si prefieres no exponer detalles, remové `details` luego de depurar.
      const details = typeof error === 'string' ? error : error?.message || JSON.stringify(error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje', details },
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
