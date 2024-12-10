//importamos el módulo redline para capturar datos desde la consola 
import {resolve} from 'path';
import * as readline from 'readline';

//creamos una interfaz para manejar la entrada y salida desde la consola 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntas=(pregunta:string): Promise<string>=>{
    return new Promise((resolve)=>{
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta.trim());
        });
    });
}

const iniciarFormulario=async()=>{
    console.log('=== Formulario Interactivo ===');
    const nombre=await preguntas('¿Cuál es tu nombre? ');
    const edad=await preguntas('¿Cuál es tu edad? ');
    const email=await preguntas('¿Cuál es tu correo electronico? ');
    const pais=await preguntas('¿En que pais vives? ');

    if (isNaN(Number(edad))||Number(edad)<=0){
        console.log('La edad debe ser un número mayor a 0');
        rl.close();
        return;
    }
    if (!email.includes('@')){
        console.log('El correo electronico no es valido');
        rl.close();
        return;
    }
    console.log('\n=== Resumen del formulario ===');
    console.log(`Nombre: ${nombre}`);
    console.log(`Edad: ${edad}`);
    console.log(`Email: ${email}`);
    console.log(`Pais: ${pais}`);
    console.log('\nGracias por llenar el formulario');
    rl.close();
}

iniciarFormulario();
