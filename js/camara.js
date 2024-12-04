import { HandLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

let handLandarker = undefined;
let video = document.getElementById("webcam");
let canvas = document.getElementById("frame")

let lastVideoTime = -1;
let results = undefined;
let caputarando = false;
let stream;
let numFrames = 0;

let letra = "";
let runcam = true

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

  if (results.handednesses.length > 0 && caputarando == false) {
    console.log("Mano detectada")
    numFrames++;
    if (numFrames > 60) {
      console.log(numFrames)
      numFrames = 0
      runcam = false
      console.log(numFrames)
      caputarando = true
      const mostrarResultado = document.getElementById("resultado");
      mostrarResultado.style.display = "block";
      mostrarResultado.innerHTML = ``;
      mostrarResultado.innerHTML += `
      <div class="alert alert-warning" role="alert">
        Enviando...
      </div>`
      await EnviarFrame()
    }
  }
  else {
    caputarando = false
    numFrames = 0
    console.log("No hay manos")
  }

  if(runcam) window.requestAnimationFrame(predictWebcam);
}

async function EnviarFrame() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const base64Image = canvas.toDataURL('image/jpg').split(',')[1];

  const response = await fetch('http://192.168.198.65:5000/uploadFrame', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Image }),
  });

  const result = await response.text();
  const mostrarResultado = document.getElementById("resultado");
  mostrarResultado.style.display = "block";
  mostrarResultado.innerHTML = ``;

  if (result == letra) {
    mostrarResultado.innerHTML += `
    <div class="alert alert-success" role="alert">
      Letra Dectada : ${result}. ¡Correcto!
    </div>`
  }
  else {
    mostrarResultado.innerHTML += `
    <div class="alert alert-danger" role="alert">
      Letra Dectada : ${result}. ¡Incorrecto!
    </div>`
  }

  console.log(result);
  runcam = true
}

const cerrar = document.getElementById("cerrar_modal")
cerrar.addEventListener('click', async () => {
  if (stream) {
    // Detener todas las pistas del stream
    stream.getTracks().forEach(track => track.stop());
    console.log("Video detenido");
    stream = null;
    // Eliminar el evento predictWebcam del video
    video.removeEventListener("loadeddata", predictWebcam);
    handLandarker = undefined;
    caputarando = false;
    numFrames = 0;
    runcam = false
    lastVideoTime = -1;
    const mostrarResultado = document.getElementById("resultado");
    mostrarResultado.innerHTML = ``;
    mostrarResultado.style.display = "none";
  }
});

const iniciar_camara = document.querySelectorAll(".IniciarCamara");
iniciar_camara.forEach(ic => {
  ic.addEventListener('click', async () => {
    numFrames = 0;
    lastVideoTime = -1;
    runcam = true
    letra = ic.id; // Obtener el id del botón clickeado
    console.log(`Clic en el botón con id: ${letra}`);

    await createHandLandmarker();
    console.log(video)

    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((m_stream) => {
      video.srcObject = m_stream;
      stream = m_stream
      video.addEventListener("loadeddata", predictWebcam, { once: true });
    });
  });
});

