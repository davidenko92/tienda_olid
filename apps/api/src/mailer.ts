/**
 * Módulo de envío de emails
 * Configuración de nodemailer con Gmail SMTP
 */

import nodemailer from 'nodemailer';

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un email de contacto desde el formulario web
 */
export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email, // Para que puedas responder directamente al remitente
    subject: `Nuevo mensaje de contacto - ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .message { background-color: white; padding: 15px; border-left: 4px solid #e74c3c; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 Nuevo Mensaje de Contacto</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Nombre:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="message">
                <div class="label">Mensaje:</div>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}

Mensaje:
${message}
    `,
  };

  await transporter.sendMail(mailOptions);
};
