import { HandLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

let handLandarker = undefined;
let video = document.getElementById("webcam");
let canvas = document.getElementById("frame");
let palabra = "";
let palabraContainer = document.getElementById("PalabraRecibida");

let lastVideoTime = -1;
let results = undefined;
let caputarando = false;
let stream;
let numFrames = 0;
let letra = "";
var enviar_nueva_letra = true;

const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
  handLandarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: 1
  });
};

async function predictWebcam() {
  let startTimeMs = performance.now();
  if (lastVideoTime !== video.currentTime && handLandarker) {
    lastVideoTime = video.currentTime;
    results = handLandarker.detectForVideo(video, startTimeMs);
  }

  if (results.handednesses.length > 0 && caputarando == false && enviar_nueva_letra === true) {
    console.log("Mano detectada")
    numFrames++;
    if (numFrames > 60) {
      console.log(numFrames)
      numFrames = 0
      caputarando = true
      await EnviarFrame()
    }
  }
  else {
    caputarando = false
    numFrames = 0
    console.log("No hay manos")
  }

  window.requestAnimationFrame(predictWebcam);
}

async function EnviarFrame() {
  enviar_nueva_letra = false
  console.log("Grabando")
  document.getElementById("Resultado").innerHTML += `
    <div class="alert alert-warning" role="alert">
      ¡ Grabando... !
    </div>
  `;
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    document.getElementById("Resultado").innerHTML = `
      <div class="alert btn-success alert-success" role="alert">
        ¡ Enviando... !
      </div>
    `;
    // Crear un blob del video grabado
    const videoBlob = new Blob(chunks, { type: 'video/webm' });

    // Crear FormData y agregar el video
    const formData = new FormData();
    formData.append('video', videoBlob, 'video.webm'); // Es importante que la clave sea 'video'

    // Enviar el video al servidor
    const response = await fetch('http://localhost:5000/upload_video', {
      method: 'POST',
      body: formData,
    });

    document.getElementById("Resultado").innerHTML = ``;


    //////////////////////////////////////////////////////
    const result = await response.text();

    console.log(result);

    if (result == palabra[indice_letra]) {
      document.getElementById("pos" + indice_letra).classList.remove('card-letra-select')
      document.getElementById("pos" + indice_letra).classList.add('card-letra')
      n_palabra = RemplazarCaracter(n_palabra, indice_letra, palabra[indice_letra]);
      ActualizarPalabraContainer(n_palabra);
      indice_letra = IndicePalabra(n_palabra);

      if (indice_letra == -1) {
        console.log("Ganaste");
        palabraContainer.innerHTML = ``;
        document.getElementById("Resultado").innerHTML = `    
        <div class="alert alert-success" role="alert">
          ¡Completaste la palabra! Intentalo con una nueva.
        </div>
      `
      }
      else {
        document.getElementById("pos" + indice_letra).classList.remove('card-letra')
        document.getElementById("pos" + indice_letra).classList.add('card-letra-select')
      }
    }
    else {
      document.getElementById("Resultado").innerHTML += `
        <div class="alert alert-danger" role="alert">
          ¡ Letra equivocada ! Se detecto ${result},
          Pulse Enviar Nueva Letra para intentar otra vez...
        </div>
      `;
    }

  };

  // Iniciar la grabación y detenerla después de 3.5 segundos
  mediaRecorder.start();
  setTimeout(async () => {
    mediaRecorder.stop();
  }, 2500)
}

createHandLandmarker()

const constraints = { video: true };
navigator.mediaDevices.getUserMedia(constraints).then((m_stream) => {
  video.srcObject = m_stream;
  stream = m_stream
  video.addEventListener("loadeddata", predictWebcam, { once: true });
});


function RemplazarCaracter(cadena, pos, caracter) {
  if (pos < 0 || pos >= cadena.length) throw new Error("Posicion invalida.")

  return cadena.slice(0, pos) + caracter + cadena.slice(pos + 1)
}

function IndicePalabra(cadena) {
  for (let index = 0; index < cadena.length; index++) {
    if (cadena[index] == '*')
      return index;
  }

  return -1;
}

function ActualizarPalabraContainer(cadena) {
  palabraContainer.innerHTML = ``
  for (var i = 0; i < cadena.length; i++) {
    palabraContainer.innerHTML += `
    <div class="col-auto card-letra m-2" id=pos${i}>
    <h3>${cadena[i]}</h3>
    <div/>
    `
  }
}

let palabras_default = ["CONEJO", "ESCUELA", "COMIDA", "HOLA", "CINE"]
var n_palabra;
var indice_letra = -1;

const btn_generar = document.getElementById("GenerarPalabra");
btn_generar.addEventListener('click', () => {

  document.getElementById("Resultado").innerHTML = ``;

  const j = Math.floor(Math.random() * (palabras_default.length));

  palabra = palabras_default[j];

  n_palabra = palabra;
  for (var i = 0; i < 2; i++) {
    var quit_letra = Math.floor(Math.random() * (palabra.length));
    n_palabra = RemplazarCaracter(n_palabra, quit_letra, '*');
  }

  ActualizarPalabraContainer(n_palabra);

  indice_letra = IndicePalabra(n_palabra);

  document.getElementById("pos" + indice_letra).classList.remove('card-letra')
  document.getElementById("pos" + indice_letra).classList.add('card-letra-select')

  console.log(palabra)
  console.log(n_palabra)

});

const btn_enviar_nueva_letra = document.getElementById("GenerarNuevaLetra")
btn_enviar_nueva_letra.addEventListener('click', () => {
  document.getElementById("Resultado").innerHTML = ``;
  enviar_nueva_letra = true;
});