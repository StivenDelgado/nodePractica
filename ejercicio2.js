const API_KEY = 'AIzaSyAB9sO0o40p65-3cuw8skZo7jamZW-cm9s';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const textos = [
    "El cambio climático es una preocupación global que afecta a todos los aspectos de la vida en la Tierra. Las emisiones de gases de efecto invernadero han incrementado las temperaturas promedio globales, causando eventos climáticos extremos.",
    "La inteligencia artificial está transformando diversas industrias, desde la salud hasta el transporte. Las tecnologías basadas en IA están mejorando la eficiencia y permitiendo innovaciones sin precedentes.",
    "La exploración espacial ha dado pasos significativos en los últimos años, con misiones a Marte y avances en la tecnología de cohetes reutilizables.",
    "Los avances en medicina están revolucionando el tratamiento de enfermedades crónicas, con la ayuda de terapias genéticas y medicina personalizada.",
    "La economía global está experimentando un cambio hacia modelos más sostenibles, fomentando la transición hacia energías renovables y prácticas más ecológicas.",
    "El desarrollo de tecnologías de comunicación ha permitido conectar a personas de todo el mundo, mejorando la colaboración y el acceso a la información.",
    "La biodiversidad está disminuyendo a un ritmo alarmante debido a la deforestación y el cambio climático, lo que pone en peligro ecosistemas enteros.",
    "La educación a distancia se ha convertido en una alternativa viable para millones de personas, facilitada por plataformas digitales y contenido en línea.",
    "El auge de los vehículos eléctricos está reduciendo las emisiones de carbono, marcando un cambio significativo en la industria del transporte.",
    "Las ciudades inteligentes están integrando tecnologías avanzadas para mejorar la calidad de vida de sus habitantes, optimizando recursos y servicios.",
];

async function generarResumen(texto) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Eres un asistente que genera resúmenes claros y concisos.
                                    ### Información de entrada del usuario:
                                    Por favor genera un resumen para el siguiente texto:\n\n${texto}`,
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const resumenGenerado = data.candidates[0].content.parts[0].text;
        return resumenGenerado;
    } catch (error) {
        console.error(`Error al procesar el texto: "${texto}":`, error);
        return `No se pudo generar el resumen para el texto: "${texto}"`;
    }
}

// Procesar todos los textos en paralelo
async function procesarTextos(textos) {
    try {
        const promesas = textos.map((texto) => generarResumen(texto));
        const resumenes = await Promise.all(promesas);
        return resumenes;
    } catch (error) {
        console.error('Error al procesar los textos:', error);
        return [];
    }
}


(async () => {
    const resumenes = await procesarTextos(textos);
    console.log("Resúmenes generados:");
    resumenes.forEach((resumen, index) => {
        console.log(`Resumen ${index + 1}:`, resumen);
    });
})();
