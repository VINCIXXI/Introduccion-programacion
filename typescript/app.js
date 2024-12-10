"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importamos el módulo redline para capturar datos desde la consola 
var readline = require("readline");
//creamos una interfaz para manejar la entrada y salida desde la consola 
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//preugntamos al usuario su nombre y edad
rl.question('¿Cuál es tu nombre? ', function (nombre) {
    rl.question('¿Cuál es tu edad? ', function (edad) {
        //mostramos los datos capturados
        console.log("Hola ".concat(nombre, ", tienes ").concat(edad, " a\u00F1os"));
        //cerramos la interfaz
        rl.close();
    });
});
