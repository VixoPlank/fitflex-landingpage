import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({
          error: 'El correo electrónico es requerido',
        }),
        { status: 400, headers }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          error: 'Por favor ingresa un correo electrónico válido',
        }),
        { status: 400, headers }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    // Email para el usuario
    const userMailOptions = {
      from: `"FitFlex" <${import.meta.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido a FitFlex!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2B6CB0;">¡Gracias por registrarte en FitFlex!</h2>
          <p>Estamos emocionados de tenerte con nosotros. Pronto recibirás más información sobre nuestro lanzamiento.</p>
          <p>Mientras tanto, mantente atento a tu correo para no perderte ninguna actualización.</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #EBF4FF; border-radius: 5px;">
            <p style="margin: 0; color: #2B6CB0;">El equipo de FitFlex</p>
          </div>
        </div>
      `,
    };

    // Email para el administrador
    const adminMailOptions = {
      from: `"FitFlex System" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.EMAIL_USER,
      subject: 'Nuevo registro en FitFlex',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>Nuevo usuario registrado</h3>
          <p>Email: ${email}</p>
          <p>Fecha: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    // Enviar ambos emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return new Response(
      JSON.stringify({
        message: '¡Registro exitoso! Revisa tu correo para más información.',
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(
      JSON.stringify({
        error:
          'Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.',
      }),
      { status: 500, headers }
    );
  }
};
