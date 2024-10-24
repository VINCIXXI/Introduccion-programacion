const cartas=['❤️','👱‍♀️','😁','🐒','💯','💪','💩','🤡']
let baraja=[...cartas, ...cartas]
let primeraCarta=null
let bloqueoTablero=false
let paresEncontrados=0

const crearTablero=()=>{
    const tablero=document.getElementById('tablero')
    tablero.innerHTML=''
    baraja=baraja.sort(() => 0.5-Math.random())
    paresEncontrados=0

    baraja.forEach(carta=>{
        const cartaElemento=document.createElement('div')
        cartaElemento.classList.add('carta')
        cartaElemento.dataset.carta=carta
        cartaElemento.addEventListener('click',voltearCarta)
        tablero.appendChild(cartaElemento)
    })
}

const voltearCarta=(e)=>{
    const cartaSeleccionada=e.target
    if(bloqueoTablero || cartaSeleccionada===primeraCarta || 
        cartaSeleccionada.classList.contains('volteada')) return
    cartaSeleccionada.classList.add('volteada')
    cartaSeleccionada.textContent=cartaSeleccionada.dataset.carta
    if(!primeraCarta){
        primeraCarta=cartaSeleccionada
    }else{
        comprobarPareja(cartaSeleccionada)
    }
}

const comprobarPareja=(segundaCarta)=>{
    bloqueoTablero=true
    const esPareja=primeraCarta.dataset.carta===segundaCarta.dataset.carta
    esPareja?desactivarPareja(segundaCarta):ocultarCartas(segundaCarta)
}

const desactivarPareja=(segundaCarta)=>{
    primeraCarta.removeEventListener('click',voltearCarta)
    segundaCarta.removeEventListener('click',voltearCarta)
    paresEncontrados++
    if(paresEncontrados=== cartas.length){
        setTimeout(()=>alert('¡Felicidades! Has ganado'),500)
    }
    resetTablero()
}

const ocultarCartas=(segundaCarta)=>{
    setTimeout(()=>{
        primeraCarta.classList.remove('volteada')
        segundaCarta.classList.remove('volteada')
        primeraCarta.textContent=''
        segundaCarta.textContent=''
        resetTablero()
    },1000)
}

const resetTablero=()=>{
    [primeraCarta,bloqueoTablero]=[null,false]
}

document.getElementById('reiniciar').addEventListener('click',crearTablero)
crearTablero()