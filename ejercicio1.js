import { promises as fs } from 'fs';
console.log("hola");
async function crearArchivo(nombre, contenido) {
  return fs.writeFile(`archivos/${nombre}.txt`, contenido)
    .then(() => `Archivo ${nombre}.txt creado`)
    .catch((error) => console.error(`Error al crear ${nombre}.txt:`, error));
}

let arregloPromesas = [];
let cantidad = parseInt(prompt("¿Cuántos archivos quieres crear?"))

for (let index = 1; index <= cantidad; index++) {
  arregloPromesas.push(crearArchivo(String(index), "Hola VankVersity"))
}

Promise.all(arregloPromesas)