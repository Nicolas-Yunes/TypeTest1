const frases = [
    "La vida es un viaje; hazlo seguro",
    "Conducir con responsabilidad, un acto de amor hacia la vida",
    "La carretera no perdona, respeta las normas de tráfico",
    "Cinturón abrochado, destino asegurado",
    "La prudencia en el volante es el mejor escudo",
    "El semáforo rojo es una pausa, no un obstáculo",
    "La velocidad no es el objetivo; la seguridad sí",
    "Mirar antes de cruzar: una regla simple, una vida salvada",
    "El peatón siempre tiene prioridad, respétala",
    "La cortesía en la carretera es la clave de un tráfico armonioso",
    "Conduce con tu mente en el camino, no en el teléfono",
    "Haz del retrovisor tu aliado, no un adorno",
    "Anticípate a los peligros; la prevención salva vidas",
    "Mantén tu distancia; el espacio salva accidentes",
    "La paciencia en el tráfico es una virtud",
    "No dejes que la prisa nuble tu juicio al volante",
    "El alcohol y la conducción son una mezcla letal",
    "El carril de emergencia no es para adelantar; es para emergencias",
    "Conducir es un privilegio, no un derecho. Hazlo con responsabilidad",
    "Las luces encendidas, una señal de respeto y visibilidad",
    "No corras, llega seguro a tu destino",
    "El freno es tu mejor amigo en la carretera",
    "La educación vial comienza en casa",
    "Si el sueño te vence, detente. La vida es más importante",
    "Cambia de carril con precaución, no con impulsividad",
    "No ignores las señales; son tu guía en el camino",
    "La cortesía vial es un acto de empatía con los demás",
    "El cinturón no solo salva vidas, también la tuya",
    "El casco es tu escudo en dos ruedas. Úsalo siempre",
    "No te distraigas, la carretera requiere tu atención"
]


let timer;
let timeLeft = 30;
let fraseActual = "";
let correctChars = 0;
let totalChars = 0;
let totalCorrectChars = 0;

const mostrarFrase = document.getElementById('frase-display');
const timerDisplay = document.getElementById('timer');
const inputArea = document.getElementById('input-area');
const resultsDisplay = document.getElementById('results');
const startButton = document.getElementById('start-button');
const imagenSemaforo = document.getElementById('imagen');

startButton.addEventListener('click', waitGame);

inputArea.addEventListener('keydown', handleEnterKey);

function waitGame() {
    imagenSemaforo.src = "resources/images/juego/semaforoAmarillo.jpg"
    imagenSemaforo.style.border = "solid yellow";
    setTimeout(() => {startGame()}, 2000)
    startButton.disabled = true;
    startButton.style.backgroundColor = "#FCC31E";
    startButton.textContent = "Espere..."
}



function startGame() {
    imagenSemaforo.src = "resources/images/juego/semaforoVerde.jpg"
    imagenSemaforo.style.border = "solid green";
    startButton.disabled = true;
    startButton.style.backgroundColor = "green";
    startButton.textContent = "Jugando..."
    inputArea.disabled = false;
    inputArea.value = "";
    correctChars = 0;
    totalChars = 0;
    totalCorrectChars = 0;
    timeLeft = 30;
    nuevaFrase();
    inputArea.focus();
    timer = setInterval(updateTimer, 1000);
}

function nuevaFrase() {
    fraseActual = frases[Math.floor(Math.random() * frases.length)];
    mostrarFrase.textContent = fraseActual;
    inputArea.value = "";
    correctChars = 0; 
    totalChars += fraseActual.length;
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Tiempo: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}

function checkInput() {
    const input = inputArea.value;
    let correctCount = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === fraseActual[i]) {
            correctCount++;
        }
    }
    totalCorrectChars += correctCount;
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkInput();
        nuevaFrase();
    }
}

function endGame() {
    inputArea.disabled = true;
    checkInput();
    const totalPalabras = totalCorrectChars / 5; // 5 es el promedio de .length de las palabras
    const wpm = totalPalabras * 2;
    const accuracy = (totalCorrectChars / totalChars) * 100;
    resultsDisplay.textContent = `Palabras por Minuto: ${wpm.toFixed(2)}, Precisión: ${accuracy.toFixed(2)}%`;
    if (accuracy < 25) {
        imagenSemaforo.src = "resources/images/juego/sadCar.png"
        imagenSemaforo.style.border = "solid red";
        mostrarFrase.textContent = "Precisión menor al 25%, ¡inténtalo de nuevo!";
    } else if (accuracy > 25 && accuracy < 70) {
        imagenSemaforo.src = "resources/images/juego/happyCar.png"
        imagenSemaforo.style.border = "solid yellow";
        mostrarFrase.textContent = "¡Gracias por jugar!";
    } else if (accuracy > 70) {
        imagenSemaforo.src = "resources/images/juego/autoDedoArriba.png"
        imagenSemaforo.style.border = "solid green";
        mostrarFrase.textContent = "¡¡Felicitaciones!! ¡Excelente precisión!";
    }
    startButton.disabled = false;
    startButton.textContent = "Volver a Jugar"
}