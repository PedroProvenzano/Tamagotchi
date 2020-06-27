var Tamagotchi = {
    age: 0,
    fase: 1,
    nombre: "",
    hambre: 100,
    sed: 100,
    vidas: 3
}
// Variables globales
var cantidadLineas = 0;
var terminoJuego = false;
var puntos = 0;
const regex = / /gi; 

// DOM
const textoConsola = document.getElementById("textoConsola");
const botonAlimento = document.getElementById("botonAlimento");
const botonAgua = document.getElementById("botonAgua");
const tamago1Fase = document.getElementById("tamago1Fase");
const tamago2Fase = document.getElementById("tamago2Fase");
const rip = document.getElementById("rip");
const barraContManzana = document.getElementById("barraContManzana");
const barraContAgua = document.getElementById("barraContAgua");
const textoPuntos = document.getElementById("textoPuntos");
const textoVidas = document.getElementById("textoVidas");
const textoNombre = document.getElementById("textoNombre");
const textoEdad = document.getElementById("textoEdad");

// Eventos onClick
botonAlimento.addEventListener("click", alimentar);
botonAgua.addEventListener("click", hidratar);



// Funciones 

// Funciones del HUD
function barraHambre(){
    var barraHambreInter = setInterval(function(){
        switch(Tamagotchi.hambre){
            case 100:
                barraContManzana.style.left = "0%";
            break;
            case 80:
                barraContManzana.style.left = "-20%";
            break;
            case 60:
                barraContManzana.style.left = "-40%";
            break;
            case 40:
                barraContManzana.style.left = "-60%";
            break;
            case 20:
                barraContManzana.style.left = "-80%";
            break;
            case 0:
                barraContManzana.style.left = "-100%";
            break;
        }
    }, 200);
}

function barraSed(){
    var barraSedInter = setInterval(function(){
        switch(Tamagotchi.sed){
            case 100:
                barraContAgua.style.left = "0%";
            break;
            case 80:
                barraContAgua.style.left = "-20%";
            break;
            case 60:
                barraContAgua.style.left = "-40%";
            break;
            case 40:
                barraContAgua.style.left = "-60%";
            break;
            case 20:
                barraContAgua.style.left = "-80%";
            break;
            case 0:
                barraContAgua.style.left = "-100%";
            break;
        }
    }, 200);
}

// Puntos HUD
function checkPuntos(){
    setInterval(function(){
        textoPuntos.textContent = "Puntos: " + puntos;
    },200)
}

// Vidas HUD
function checkVidasHUD(){
    setInterval(function(){
        textoVidas.textContent = "Vidas: " + Tamagotchi.vidas;
    },200)
}

// Nombre HUD
function nombreHUD(){
        textoNombre.textContent = Tamagotchi.nombre;
}

// Edad HUD
function edadHUD(){
    setInterval(function(){
        textoEdad.textContent = "Edad: " + Tamagotchi.age;
    },200)
}

// Contador de vidas
function contadorVidas(){
    var set0Inter = setInterval(function(){
        if(Tamagotchi.vidas==0){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " murio, perdiste!";
            cantidadLineas++
            terminoJuego = true;
            Tamagotchi.age = "RIP";
            setTimeout(volverIntentar(),1000);
            clearInterval(set0Inter);
            return;
        }
    },500

    )
}
// Volver a Intentar
function volverIntentar(){
    var volveraIntentar = confirm("Queres volver a jugar?");
    if(volveraIntentar){
        Tamagotchi.vidas=3;
        Tamagotchi.age=0;
        Tamagotchi.hambre = 100;
        Tamagotchi.sed = 100;
        terminoJuego = false;
        inicioJuego();
    }else{
        return;
    }
}

//Alimentar
function alimentar(){
    if(puntos>=5){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Alimentaste a " + Tamagotchi.nombre + ". Ahora esta satisfecho";
        cantidadLineas++
        Tamagotchi.hambre = 100;
        puntos-=5;
    }else{
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "No tenes suficientes puntos!";
        cantidadLineas++
    }
    
}

//Dar Agua
function hidratar(){
    if(puntos>=5){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Le diste agua a " + Tamagotchi.nombre + ". Ahora esta satisfecho";
        cantidadLineas++
        Tamagotchi.sed = 100;
        puntos-=5;
    }else{
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "No tenes suficientes puntos!";
        cantidadLineas++ 
    }
    
}

// Crecer
function crecer(){
    var crecerInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(crecerInter);
            return;
        }
        Tamagotchi.age++;
        if(Tamagotchi.age==1){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " cumplio " + Tamagotchi.age + " año, 10 puntos de regalo!";
            cantidadLineas++
            puntos+= 10;
        }else{
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " cumplio " + Tamagotchi.age + " años, 10 puntos de regalo!";
            cantidadLineas++
            puntos+= 10;
        }
    }
    ,1000 * 100);
}
// Fase (TERMINAR DE AGREGAR 3RA FASE)
function checkFase(){
    setInterval(function(){
        switch(Tamagotchi.age){
            case "RIP":
                tamago2Fase.style.display = "none";
                tamago1Fase.style.display = "none";
                rip.style.display = "block";
            break;
            case 0:
                tamago2Fase.style.display = "none";
                rip.style.display = "none";
                tamago1Fase.style.display = "block";
            break;
            case 10:
                tamago1Fase.style.display = "none";
                rip.style.display = "none";
                tamago2Fase.style.display = "block";
            break;        
        }
    },1000);
    
}

// Hambre
function hambre(){
    var hambreInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(hambreInter);
            return;
        }
        Tamagotchi.hambre-= 20;
        switch(Tamagotchi.hambre){
            case 40:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " tiene hambre";
                cantidadLineas++
            break;
            case 20:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " va a morir de hambre!";
                cantidadLineas++
            break;
            case 0:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " murio de hambre :(";
                cantidadLineas++
                Tamagotchi.vidas--
                clearInterval(hambreInter);
                Tamagotchi.hambre = 100;
                Tamagotchi.sed = 100;
                hambre();
            break;
        }
    }
    ,1000 * 25);
    
}

// Sed
function sed(){
    var sedInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(sedInter);
            return;
        }
        Tamagotchi.sed-= 20;
        switch(Tamagotchi.sed){
            case 40:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " tiene sed";
                cantidadLineas++
            break;
            case 20:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " va a morir de sed!";
                cantidadLineas++
            break;
            case 0:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " murio de sed :c";
                cantidadLineas++
                Tamagotchi.vidas--
                clearInterval(sedInter);
                Tamagotchi.sed = 100;
                Tamagotchi.hambre = 100;
                sed();
            break;
        }
    }
    ,1000 * 30);
    
}


// Reiniciar Texto
function reiniciarTexto(){
    var textoInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(textoInter);
            return;
        }
        if(cantidadLineas>=5){
            textoConsola.innerText = "";
            cantidadLineas=0;
        }
    }
    ,1000 * 5)
}

// Suma Puntos
function sumaPuntos(){
    var sumaPuntosInt = setInterval(function(){
        if(terminoJuego){
            clearInterval(sumaPuntosInt);
            return;
        }
        textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= "Ganaste 5 puntos!";
                cantidadLineas++
        puntos+= 5;
    }, 1000 * 20)
}

function nombreDeTamagotchi(){
    Tamagotchi.nombre = prompt("Porfavor indica el nombre de tu Tamagotchi");
    return;
}

// El juego
function inicioJuego(){ 
    nombreDeTamagotchi();
    while(Tamagotchi.nombre==null){
        nombreDeTamagotchi();
    }
    Tamagotchi.nombre = Tamagotchi.nombre.replace(regex,"");                                               
    if((Tamagotchi.nombre == '')){
        alert("Porfavor, agrega un nombre");
        inicioJuego();
        return;
    }
    crecer();
    hambre();
    sed();
    reiniciarTexto();
    checkFase();
    barraHambre();
    barraSed();
    contadorVidas();
    checkPuntos();
    sumaPuntos();
    checkVidasHUD();
    nombreHUD();
    edadHUD();
}

inicioJuego();