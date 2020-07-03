var Tamagotchi = {
    age: 0,
    fase: 1,
    nombre: "",
    hambre: 100,
    sed: 100,
    energia: 100,
    felicidad: 100,
    vidas: 3,
    puntos: 0,
    lesionado: false
}
// Variables globales
let cantidadLineas = 0;
let terminoJuego = false;
const regex = / /gi; 

// DOM
const textoConsola = document.getElementById("textoConsola");
const botonAlimento = document.getElementById("botonAlimento");
const botonAgua = document.getElementById("botonAgua");
const botonEnergia = document.getElementById("botonDormir");
const botonTrabajo = document.getElementById("botonTrabajo");
const botonFelicidad = document.getElementById("botonJugar");
const botonYeso = document.getElementById("botonYeso");
const botonSave = document.getElementById("saveFileIco");
const volverJugarSi = document.getElementById("volverJugarSi");
const volverJugarNo = document.getElementById("volverJugarNo");
const volverJugar = document.getElementById("volverJugar");
const tamago1Fase = document.getElementById("tamago1Fase");
const tamago2Fase = document.getElementById("tamago2Fase");
const rip = document.getElementById("rip");
const huesoRoto = document.getElementById("huesoRoto");
const barraContManzana = document.getElementById("barraContManzana");
const barraContAgua = document.getElementById("barraContAgua");
const barraContEnergia = document.getElementById("barraContEnergia");
const barraContFelicidad = document.getElementById("barraContFelicidad");
const textoPuntos = document.getElementById("textoPuntos");
const textoVidas = document.getElementById("textoVidas");
const textoNombre = document.getElementById("textoNombre");
const textoEdad = document.getElementById("textoEdad");

// Eventos onClick
botonAlimento.addEventListener("click", alimentar);
botonAgua.addEventListener("click", hidratar);
botonEnergia.addEventListener("click", descansar);
botonTrabajo.addEventListener("click", trabajo);
botonFelicidad.addEventListener("click", jugar);
botonYeso.addEventListener("click", comprarYeso);
botonSave.addEventListener("click", saveData);
volverJugarSi.addEventListener("click", volverJugarTrue);
volverJugarNo.addEventListener("click", volverJugarFalse);



// Funciones 

// Tienda

// Comprar Yeso
function comprarYeso(){
    if(Tamagotchi.puntos>=10){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Compraste un yeso y sanaste a " + Tamagotchi.nombre;
        cantidadLineas++
        Tamagotchi.puntos-=10;
        Tamagotchi.lesionado=false;
    }else{
        textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= "No tenes suficientes puntos";
            cantidadLineas++
    }
}


// Funciones del HUD
function barraHambre(){
    let barraHambreInter = setInterval(function(){
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
    let barraSedInter = setInterval(function(){
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

function barraEnergia(){
    let barraEnergiaInter = setInterval(function(){
        switch(Tamagotchi.energia){
            case 100:
                barraContEnergia.style.left = "0%";
            break;
            case 80:
                barraContEnergia.style.left = "-20%";
            break;
            case 60:
                barraContEnergia.style.left = "-40%";
            break;
            case 40:
                barraContEnergia.style.left = "-60%";
            break;
            case 20:
                barraContEnergia.style.left = "-80%";
            break;
            case 0:
                barraContEnergia.style.left = "-100%";
            break;
        }
    }, 200);
}

function barraFelicidad(){
    let barraFelicidadInter = setInterval(function(){
        switch(Tamagotchi.felicidad){
            case 100:
                barraContFelicidad.style.left = "0%";
            break;
            case 80:
                barraContFelicidad.style.left = "-20%";
            break;
            case 60:
                barraContFelicidad.style.left = "-40%";
            break;
            case 40:
                barraContFelicidad.style.left = "-60%";
            break;
            case 20:
                barraContFelicidad.style.left = "-80%";
            break;
            case 0:
                barraContFelicidad.style.left = "-100%";
            break;
        }
    }, 200);
}


// Puntos HUD
function checkPuntos(){
    setInterval(function(){
        textoPuntos.textContent = "Puntos: " + Tamagotchi.puntos;
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
    let set0Inter = setInterval(function(){
        if(Tamagotchi.vidas==0){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " murio, perdiste!";
            cantidadLineas++
            terminoJuego = true;
            Tamagotchi.age = "RIP";
            mostrarCartelPerdio();
            clearInterval(set0Inter);
            return;
        }
    },500

    )
}
// Volver a Intentar
function volverJugarTrue(){
    esconderCartelPerdio();
    Tamagotchi.vidas=3;
    Tamagotchi.age=0;
    Tamagotchi.puntos=0;
    Tamagotchi.hambre = 100;
    Tamagotchi.sed = 100;
    Tamagotchi.energia = 100;
    Tamagotchi.felicidad = 100;
    terminoJuego = false;
    inicioJuego();
}
function volverJugarFalse(){
    alert("Gracias por haber jugado! \b Juego hecho por Pedro Provenzano");
    esconderCartelPerdio();
    botonAlimento.style.pointerEvents = "none";
    botonAgua.style.pointerEvents = "none";
    botonEnergia.style.pointerEvents = "none";
    botonFelicidad.style.pointerEvents = "none";
    botonYeso.style.pointerEvents = "none";
    botonTrabajo.style.pointerEvents = "none";
}
function mostrarCartelPerdio(){
    volverJugar.style.display = "block";
}
function esconderCartelPerdio(){
    volverJugar.style.display = "none";
}


// Jugar
function jugar(){
    if(Tamagotchi.hambre>20&&Tamagotchi.sed>20&&Tamagotchi.energia>20){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= Tamagotchi.nombre + " se fue a jugar, recuperando toda su felicidad";
        cantidadLineas++
        Tamagotchi.felicidad = 100;
        Tamagotchi.hambre-=20;
        Tamagotchi.sed-=20;
        Tamagotchi.energia-=20;
    }else{
        if(Tamagotchi.hambre<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy hambriento para jugar";
            cantidadLineas++
        }
        if(Tamagotchi.sed<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy sediento para jugar";
            cantidadLineas++  
        }
        if(Tamagotchi.energia<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy cansado para jugar";
            cantidadLineas++  
        }
    }
}

// Trabajar
function trabajo(){
    if(Tamagotchi.energia>20&&Tamagotchi.felicidad>20&&!Tamagotchi.lesionado){
        if(numeroAleatorio(0,100)<10){
            trabajoTrue()
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= "Oh no! " + Tamagotchi.nombre + " se lesiono trabajando";
            cantidadLineas++ 
            Tamagotchi.lesionado = true;
        }else{
            trabajoTrue()
        }
    }else{
        if(Tamagotchi.energia<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy cansado para trabajar";
            cantidadLineas++ 
        }
        if(Tamagotchi.felicidad<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy triste para trabajar";
            cantidadLineas++ 
        }
        if(Tamagotchi.lesionado){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta lesionado y no puede trabajar";
            cantidadLineas++  
        }
    }
}
// Caso True
function trabajoTrue(){
    textoConsola.textContent+= "\r\n"
    textoConsola.textContent+= Tamagotchi.nombre + " se fue a trabajar, ganando 10 puntos";
    cantidadLineas++ 
    Tamagotchi.puntos+=10;
    Tamagotchi.energia-=20;
    Tamagotchi.felicidad-=20;
}


// Numero Aleatorio
function numeroAleatorio(desde, hasta) {
    return Math.max(desde, parseInt(Math.random() * (hasta + 1)));
}


//Descansar
function descansar(){
    if(Tamagotchi.hambre>20&&Tamagotchi.sed>20){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= Tamagotchi.nombre + " se fue a dormir, recuperando toda su energia";
        cantidadLineas++
        Tamagotchi.energia = 100;
        Tamagotchi.hambre-=20;
        Tamagotchi.sed-=20;
    }else{
        if(Tamagotchi.hambre<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy hambriento para dormir";
            cantidadLineas++
        }
        if(Tamagotchi.sed<=20){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " esta muy sediento para dormir";
            cantidadLineas++  
        }
    }
}

//Alimentar
function alimentar(){
    if(Tamagotchi.puntos>=5){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Alimentaste a " + Tamagotchi.nombre + ". Ahora esta satisfecho";
        cantidadLineas++
        Tamagotchi.hambre = 100;
        Tamagotchi.puntos-=5;
    }else{
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "No tenes suficientes puntos!";
        cantidadLineas++
    }
    
}

//Dar Agua
function hidratar(){
    if(Tamagotchi.puntos>=5){
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Le diste agua a " + Tamagotchi.nombre + ". Ahora esta satisfecho";
        cantidadLineas++
        Tamagotchi.sed = 100;
        Tamagotchi.puntos-=5;
    }else{
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "No tenes suficientes puntos!";
        cantidadLineas++ 
    }
    
}

// Crecer
function crecer(){
    let crecerInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(crecerInter);
            return;
        }
        Tamagotchi.age++;
        if(Tamagotchi.age==1){
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " cumplio " + Tamagotchi.age + " año, 10 puntos de regalo!";
            cantidadLineas++
            Tamagotchi.puntos+= 10;
        }else{
            textoConsola.textContent+= "\r\n"
            textoConsola.textContent+= Tamagotchi.nombre + " cumplio " + Tamagotchi.age + " años, 10 puntos de regalo!";
            cantidadLineas++
            Tamagotchi.puntos+= 10;
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
        switch(Tamagotchi.lesionado){
            case true:
                huesoRoto.style.display = "block";
            break;
            case false:
                huesoRoto.style.display = "none";
            break;
        }
    },1000);
    
}

// Hambre
function hambre(){
    let hambreInter = setInterval(function(){
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
                reiniciarStats();
                hambre();
            break;
        }
    }
    ,1000 * 25);
    
}

// Sed
function sed(){
    let sedInter = setInterval(function(){
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
                reiniciarStats();
                sed();
            break;
        }
    }
    ,1000 * 30);
    
}

// Energia
function energia(){
    let energiaInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(energiaInter);
            return;
        }
        Tamagotchi.energia-= 20;
        switch(Tamagotchi.energia){
            case 40:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " siente cansancio";
                cantidadLineas++
            break;
            case 20:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " siente mareos del cansancio";
                cantidadLineas++
            break;
            case 0:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " murio de cansancio :(";
                cantidadLineas++
                Tamagotchi.vidas--
                clearInterval(energiaInter);
                reiniciarStats();
                energia();
            break;
        }
    }
    ,1000 * 35);
    
}

// Felicidad
function felicidad(){
    let felicidadInter = setInterval(function(){
        if(terminoJuego){
            clearInterval(felicidadInter);
            return;
        }
        Tamagotchi.felicidad-= 20;
        switch(Tamagotchi.felicidad){
            case 40:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " siente tristeza";
                cantidadLineas++
            break;
            case 20:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " siente depresion";
                cantidadLineas++
            break;
            case 0:
                textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= Tamagotchi.nombre + " murio de infelicidad :(";
                cantidadLineas++
                Tamagotchi.vidas--
                clearInterval(energiaInter);
                reiniciarStats();
                felicidad();
            break;
        }
    }
    ,1000 * 38);
    
}

// Reiniciar Stats
function reiniciarStats(){
    Tamagotchi.hambre = 100;
    Tamagotchi.sed = 100;
    Tamagotchi.energia = 100;
    Tamagotchi.felicidad = 100;
    Tamagotchi.lesionado = false;
}
// Reiniciar Texto
function reiniciarTexto(){
    let textoInter = setInterval(function(){
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
    let sumaPuntosInt = setInterval(function(){
        if(terminoJuego){
            clearInterval(sumaPuntosInt);
            return;
        }
        textoConsola.textContent+= "\r\n"
                textoConsola.textContent+= "Ganaste 5 puntos!";
                cantidadLineas++
                Tamagotchi.puntos+= 5;
    }, 1000 * 20)
}

function nombreDeTamagotchi(){
    Tamagotchi.nombre = prompt("Porfavor indica el nombre de tu Tamagotchi");
    return;
}


function FaseNombre(){
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
    inicioJuego();
}
// El juego
function inicioJuego(){ 
    autoSave();
    crecer();
    hambre();
    sed();
    energia();
    felicidad();
    reiniciarTexto();
    checkFase();
    barraHambre();
    barraSed();
    barraEnergia();
    barraFelicidad();
    contadorVidas();
    checkPuntos();
    sumaPuntos();
    checkVidasHUD();
    nombreHUD();
    edadHUD();
}

// SAVES

function autoSave(){
    let save = setInterval(function(){
        let saveData = JSON.stringify(Tamagotchi);
        localStorage.setItem("Tamagotchi", saveData);
        textoConsola.textContent+= "\r\n"
        textoConsola.textContent+= "Auto guardado realizado!";
        cantidadLineas++
        if(terminoJuego){
        clearInterval(save);
    }
    }, 1000*60);
    
}
function saveData(){
    let saveData = JSON.stringify(Tamagotchi);
    localStorage.setItem("Tamagotchi", saveData);
    textoConsola.textContent+= "\r\n"
    textoConsola.textContent+= "Guardado realizado!";
    cantidadLineas++
}
function loadData(){
    if(localStorage.Tamagotchi){
        let loadDataTam = JSON.parse(localStorage.getItem("Tamagotchi"));
        Tamagotchi = loadDataTam;
        nombreHUD();
        inicioJuego();
    }else{
        FaseNombre();
    }
    }
    

loadData();
