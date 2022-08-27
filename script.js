const pantalla = document.getElementById("lienzo");
const anchoPantalla = pantalla.width;
const altoPantalla = pantalla.height;
const anchoBase = anchoPantalla/2;
const inicioBase = (anchoPantalla-anchoBase)/2;
const finBase = anchoPantalla-inicioBase;
const grosorLinea = 4;
const desfase = grosorLinea/2;


var listaPalabras = ["JAVA", "CSS", "MANZANA","NARANJA",
    "MANGO","GATO","PERRO","VESTIDO","ZAPATOS","LORO",
    "CELULAR","LAPIZ","MONO","CONEJO","MESA","AVION","PIÑA",
    "CAMA","COCINA" ,"SILLA","CABALLO","ARBOL","FLOR",
    "ESPEJO","CUCHARA","TREN" ,"KIWI"];
var palabraElegida = "";
var letrasIncorrectas = "";
var aciertos = 0;
var desaciertos = 0;
var anchoBaseAhorcado = 0;

//dibujar canvas



function nuevoJuego(){
    //logica para iniciar nuevo juego
    palabraElegida = elegirPalabra();
    letrasIncorrectas = "";
    // pincel.clearRect(0,0,anchoPantalla,altoPantalla);
    jugar(palabraElegida);

}
function nuevaPalabra(){
    //logica para mostrar la seccion de nueva palabra
    document.getElementById("iniciar-juego").style.display='none';  
    document.getElementById("agregar-palabra").style.display='flex';  
}
function cancelar(){
    location.reload();
}
function aleatorio(min, max){
    let numAleatorio;
    return numAleatorio = Math.floor(Math.random() * (max - min + 1) + min)

}
function elegirPalabra (){
    let indice;
    let palabra;
    indice = aleatorio(0,listaPalabras.length - 1);
    return palabra = listaPalabras[indice];
}
function crearCampos(palabra){
    let listaLetras = document.getElementById("lista-letras");
    let item;
    for (let index = 0; index < palabra.length; index++) {
        item = document.createElement('li');
        item.className = "item";
        listaLetras.appendChild(item);
    }   
}
function removerCampos(){
    let listaLetras = document.getElementById("lista-letras");
    let itemsActuales = listaLetras.childNodes.length;
    console.log(itemsActuales.lenght);
    console.log(itemsActuales);
    if(listaLetras.hasChildNodes){
        for (let index = 0; index < itemsActuales; index++) {
            listaLetras.removeChild(listaLetras.children[0]);
        }
    }
}
function jugar(palabra){
    removerCampos();
    borrarCanvas();
    borrarParrafo()
    document.getElementById("iniciar-juego").style.display='none';  
    document.getElementById("agregar-palabra").style.display='none';  
    document.getElementById("jugar").style.display='flex';
    console.log(palabra);
    crearCampos(palabra); 
    teclasPresionadas();
    dibujarLinea(inicioBase,altoPantalla-desfase,finBase,altoPantalla-desfase, grosorLinea);
}
function guardarPalabra(){
    let palabra = document.getElementById("ingresar-palabra").value.toUpperCase();
    console.log(palabra)
    console.log(palabra.length)
    if(palabra.length <= 8){
        console.log("entro al if");
        listaPalabras.push(palabra);
        palabraElegida = palabra;
        jugar(palabraElegida);
    } else {
        popUp();
    }

}

function popUp(){
    console.log("Error la palabra es muy larga");
    document.getElementById("ingresar-palabra").value = "";
}

function teclasPresionadas(){
    document.addEventListener("keyup", function(evento){
        let letra = evento.key.toUpperCase();
        validar(letra);
    })
}
function validar(letra){
    let flag = palabraElegida.includes(letra);
    console.log(flag)
    if(flag){
        añadirALista(letra);
        ganar();
    } else {
        añadirAParrafo(letra);
        console.log(letrasIncorrectas.length)
        dibujarAhorcado(letrasIncorrectas);
        perder();

    }
}
function añadirAParrafo(letra){
    let seccionLetrasIncorrectas = document.getElementById("letras-incorrectas");
    if(!letrasIncorrectas.includes(letra)){
        letrasIncorrectas = letrasIncorrectas + letra;
        seccionLetrasIncorrectas.innerHTML = letrasIncorrectas;
    }
}
function añadirALista(letra){
    let tamanio = palabraElegida.length
    for (let i = 0; i < tamanio ; i++) {
        if (palabraElegida.charAt(i) == letra) {
            let item = document.getElementsByClassName("item")[i];
            if (!item.textContent.includes(letra)) {
                item.append(letra);
                aciertos++;
            }
        }
    }
}
function ganar(){
    if(palabraElegida.length == aciertos){
        alert("Ganaste!");
    }
}
function perder(){
    if(letrasIncorrectas.length == 9 ){
        alert("Perdiste");
    }
}
function crearPincel(){
    let pincel = pantalla.getContext('2d');
    return pincel;
}
function dibujarAhorcado(texto){
    let numeroErrores = texto.length;
    let valorXi = inicioBase + (anchoBase*4/5);
    let valorYi = 0;
    let valorXf = 0;
    let valorYf = 0;
    switch (numeroErrores) {
        case 1:
            valorXi = inicioBase + (anchoBase/5);
            dibujarLinea(valorXi,0,valorXi,altoPantalla,grosorLinea);
            break;
        case 2:
            valorXf = valorXi
            valorXi = inicioBase + (anchoBase/5);
            dibujarLinea(valorXi,desfase,valorXf,desfase,grosorLinea);
            break;
        case 3:
            valorYf = altoPantalla/6;
            dibujarLinea(valorXi,0,valorXi,valorYf,grosorLinea);
            break;
        case 4:
            let radio = altoPantalla/12;
            valorYi = altoPantalla/6 + radio;
            dibujarCirculo(valorXi,valorYi,radio)
            break;
    
        case 5:
            valorYi = altoPantalla * 2/6;
            valorYf = altoPantalla * 4/6;
            dibujarLinea(valorXi,valorYi,valorXi,valorYf,grosorLinea);
            break;
    
        case 6:
            valorYi = altoPantalla * 2/6;
            valorYf = altoPantalla * 3/6;
            valorXf = inicioBase + (anchoBase*3.5/5)
            dibujarLinea(valorXi,valorYi,valorXf,valorYf,grosorLinea);
            break;
    
        case 7:
            valorYi = altoPantalla * 2/6;
            valorYf = altoPantalla * 3/6;
            valorXf = inicioBase + (anchoBase*4.5/5)
            dibujarLinea(valorXi,valorYi,valorXf,valorYf,grosorLinea);
            break;
    
        case 8:
            valorYi = altoPantalla * 4/6;
            valorYf = altoPantalla * 5/6;
            valorXf = inicioBase + (anchoBase*3.5/5)
            dibujarLinea(valorXi,valorYi,valorXf,valorYf,grosorLinea);
            break;
    
        case 9:
            valorYi = altoPantalla * 4/6;
            valorYf = altoPantalla * 5/6;
            valorXf = inicioBase + (anchoBase*4.5/5)
            dibujarLinea(valorXi,valorYi,valorXf,valorYf,grosorLinea);
            break;
    
        default:
            break;
    }
}
function dibujarLinea(xInicial, yInicial, xFinal, yFinal, grosor){
    let pincel = crearPincel();
    pincel.strokeStyle = "#2C3333";
    pincel.lineWidth = grosor;
    pincel.beginPath();
    pincel.moveTo(xInicial,yInicial);
    pincel.lineTo(xFinal,yFinal);
    pincel.stroke();
    pincel.closePath();
}
function dibujarCirculo(xInicial,yInicial,radio){
    let pincel = crearPincel();
    pincel.fillstyle = "#2C3333";
    pincel.beginPath();
    pincel.arc(xInicial, yInicial, radio, 0, 2*Math.PI)
    pincel.stroke();
    pincel.closePath();
}
function borrarCanvas(){
    let pincel = crearPincel();
    pincel.clearRect(0,0,anchoPantalla,altoPantalla);
}
function borrarParrafo(){
    let seccionLetrasIncorrectas = document.getElementById("letras-incorrectas");
    seccionLetrasIncorrectas.innerHTML = "";
}