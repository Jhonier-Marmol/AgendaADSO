let nombre = "Jhonier Alexander Marmol Montero";
const ficha = "3412785"
const notas = [1.0, 4.5, 2.8];
const promedio = (notas[0] + notas[1] + notas[2]) / 3;
console.log(`Aprendiz: ${nombre}`);
console.log(`ficha: ${ficha}`)
console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${promedio>= 3 ? "Aprobado" : "No Aprobado"}`);