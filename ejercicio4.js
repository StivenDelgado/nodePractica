const nodemailer = require("nodemailer");

// Configuración del transportador SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stiven03dg@gmail.com", // Reemplaza con tu correo
    pass: "kqnf ijru ekbt qgzx",  // Contraseña de aplicación de Google
  },
});

// Función para enviar un correo individual
async function enviarCorreo(destinatario, asunto, contenido) {
  try {
    const info = await transporter.sendMail({
      from: '"Stiven Delgado 👻" <stiven03dg@gmail.com>', // Cambia el nombre y correo del remitente si lo deseas
      to: destinatario, // Dirección del destinatario
      subject: asunto, // Asunto del correo
      text: contenido, // Contenido en texto plano
      html: `<p>${contenido}</p>`, // Contenido en HTML
    });
    console.log(`Correo enviado a ${destinatario}: ${info.messageId}`);
    return info.messageId;
  } catch (error) {
    console.error(`Error al enviar correo a ${destinatario}:`, error.message);
    return null;
  }
}

// Función principal para enviar correos masivos
async function enviarCorreosMasivos(correos) {
  // Mapear cada destinatario a una promesa que envía un correo
  const promesas = correos.map(({ destinatario, asunto, contenido }) =>
    enviarCorreo(destinatario, asunto, contenido)
  );

  // Esperar a que se completen todas las promesas
  const resultados = await Promise.all(promesas);

  console.log("Resultados del envío de correos:", resultados);
}

// Lista de correos a enviar
const correosMasivos = [
  { destinatario: "correo1@example.com", asunto: "Promoción 1", contenido: "Oferta especial para ti." },
  { destinatario: "correo2@example.com", asunto: "Promoción 2", contenido: "No te pierdas nuestra oferta." },
  { destinatario: "correo3@example.com", asunto: "Promoción 3", contenido: "Descuentos imperdibles." },
  // Agrega más destinatarios aquí
];

// Llamar a la función para enviar los correos
enviarCorreosMasivos(correosMasivos)
  .then(() => console.log("Envío masivo completado."))
  .catch((error) => console.error("Error en el envío masivo:", error));
