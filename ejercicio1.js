const fs = require('fs').promises;

async function crearArchivo(nombre, contenido) {
  fs.mkdir(`archivos`);
  return fs.writeFile(`archivos/${nombre}.txt`, contenido)
    .then(() => `Archivo ${nombre}.txt creado`)
    .catch((error) => console.error(`Error al crear ${nombre}.txt:`, error));
}

let arregloPromesas = [];

for (let index = 1; index <= 100; index++) {
  arregloPromesas.push(crearArchivo(String(index), "Hola VankVersity"))
}
Promise.all(arregloPromesas)