const API_KEY = 'AIzaSyAB9sO0o40p65-3cuw8skZo7jamZW-cm9s';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const textos = [
    "El cambio climático es una preocupación global que afecta a todos los aspectos de la vida en la Tierra. Las emisiones de gases de efecto invernadero han incrementado las temperaturas promedio globales, causando eventos climáticos extremos.",
    "La inteligencia artificial está transformando diversas industrias, desde la salud hasta el transporte. Las tecnologías basadas en IA están mejorando la eficiencia y permitiendo innovaciones sin precedentes.",
    "La exploración espacial ha dado pasos significativos en los últimos años, con misiones a Marte y avances en la tecnología de cohetes reutilizables.",
];
fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents: [{
            parts: [
                {
                    text: `Eres un asistente que genera resúmenes claros y concisos. Escribe por cada resumen un separacion entre ellos.
                  ### Información de entrada del usuario:
                    Por favor genera un resumen para el siguiente texto:\n\n${textos}`
                }
            ]
        }]
    })
})
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(datos => {
        const textoGenerado = datos.candidates[0].content.parts[0].text;
        console.log(textoGenerado);
    })
    .catch(error => {
        console.error('Error al llamar a la API de Gemini:', error);
    });