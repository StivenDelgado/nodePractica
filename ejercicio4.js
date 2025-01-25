const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stiven03dg@gmail.com",
    pass: "kqnf ijru ekbt qgzx",  
  },
});


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


async function enviarCorreosMasivos(correos) {

  const promesas = correos.map(({ destinatario, asunto, contenido }) =>
    enviarCorreo(destinatario, asunto, contenido)
  );

  const resultados = await Promise.all(promesas);

  console.log("Resultados del envío de correos:", resultados);
}

const correos = [
  { destinatario: "delgadostiven123@gmail.com", asunto: "Primer correo", contenido: "Primer mensaje" },
  { destinatario: "vkenda64@gmail.com", asunto: "Segundo correo", contenido: "Segundo mensaje" },
  { destinatario: "kendacius@gmail.com", asunto: "Tercer correo", contenido: "Tercer mensaje" },

];


enviarCorreosMasivos(correos)
  .then(() => console.log("Envío completado."))
  .catch((error) => console.error("Error en el envío:", error));
