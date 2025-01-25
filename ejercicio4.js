const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stiven03dg@gmail.com",
    pass: "kqnf ijru ekbt qgzx",  
  },
});

// Función para enviar un correo individual
async function enviarCorreo(destinatario, asunto, contenido) {
  try {
    const info = await transporter.sendMail({
      from: '"Stiven Delgado" <stiven03dg@gmail.com>',
      to: destinatario, 
      subject: asunto, 
      text: contenido, 
      html: `<p>${contenido}</p>`, 
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

  const promesas = correos.map(({ destinatario, asunto, contenido }) =>
    enviarCorreo(destinatario, asunto, contenido)
  );

  const resultados = await Promise.all(promesas);

  console.log("Resultados del envío de correos:", resultados);
}

const correosMasivos = [
  { destinatario: "delgadostiven123@gmail.com", asunto: "Promoción 1", contenido: "Oferta especial para ti." },
  { destinatario: "vkenda64@gmail.com", asunto: "Promoción 2", contenido: "No te pierdas nuestra oferta." },
  { destinatario: "kendacius@gmail.com", asunto: "Promoción 3", contenido: "Descuentos imperdibles." },

];


enviarCorreosMasivos(correosMasivos)
  .then(() => console.log("Envío masivo completado."))
  .catch((error) => console.error("Error en el envío masivo:", error));
