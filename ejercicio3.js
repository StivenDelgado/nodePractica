const APIs = [
    {
        name: "Primero",
        url: "https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current_weather=true",
    },
    {
        name: "Segundo",
        url: "https://wttr.in/Medellín?format=j1",
    },
    {
        name: "Tercero",
        url: "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=6.25184&lon=-75.56359",
    },
];



async function obtenerClima(api) {

    try {
        const response = await fetch(api.url);
        if (!response.ok) {
            throw new Error(`Error en la API ${api.name}: ${response.statusText}`);
        }
        const data = await response.json();

        switch (api.name) {
            case "Primero":
                return {
                    fuente: api.name,
                    temperatura: data.current_weather.temperature
                };
            case "Segundo":
                return {
                    fuente: api.name,
                    temperatura: data.current_condition[0].temp_C
                };
            case "Tercero":
                return {
                    fuente: api.name,
                    temperatura: data.properties.timeseries[0].data.instant.details.air_temperature
                };
            default:
                throw new Error("Fuente desconocida");
        }
    } catch (error) {
        throw new Error(`Error al obtener el clima de ${api.name}: ${error.message}`);
    }
}

async function mostrarClima() {
    try {
        const promesas = APIs.map((api) => obtenerClima(api));
        const resultado = await Promise.race(promesas);
        console.log("Clima obtenido de la fuente más rápida:");
        console.log(`Fuente: ${resultado.fuente}`);
        console.log(`Temperatura: ${resultado.temperatura}°C`);
    } catch (error) {
        console.error("Ocurrió un error al obtener el clima:", error.message);
    }
}

mostrarClima();
