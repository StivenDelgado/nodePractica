const fs = require('fs').promises;

async function crearArchivo(nombre, contenido) {
  return fs.writeFile(`${nombre}.txt`, contenido)
    .then(() => `Archivo ${nombre}.txt creado`)
    .catch((error) => console.error(`Error al crear ${nombre}.txt:`, error));
}

let arregloPromesas = [];

for (let index = 1; index <= 10; index++) {
  arregloPromesas.push(crearArchivo(String(index), "Hola VankVersity"))
}
Promise.all(arregloPromesas)