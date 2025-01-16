import nodemailer from 'nodemailer';

export async function post({ request }) {
  try {
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ message: 'Correo inválido' }), {
        status: 400,
      });
    }

    // Configuración de transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Usa tu proveedor de correo (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configuración del correo
    const mailOptions = {
      from: `"FitFlex" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Gracias por unirte a FitFlex!',
      text: 'Gracias por registrarte. Sé de los primeros en conocer nuestra plataforma.',
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Correo enviado correctamente' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error al enviar el correo' }),
      { status: 500 }
    );
  }
}
