const preview = document.getElementById('webcam');
const startButton = document.getElementById('startVideo');
const buttons = document.querySelectorAll(".expresion");
var expresion = "";

const stream = await navigator.mediaDevices.getUserMedia({ video: true });
preview.srcObject = stream;

startButton.addEventListener('click', async () => {

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

    const result = await response.text();

    if (result == expresion) {
      document.getElementById("Resultado").innerHTML += `
        <div class="alert alert-success" role="alert">
          Expresion detectada : ${result}.¡ Expresion correcta !
        </div>
      `;
    }
    else if (expresion == "") {
      document.getElementById("Resultado").innerHTML += `
        <div class="alert alert-warning" role="alert">
          ¡ Selecciona una expresión primero !
        </div>
      `;
    }
    else {
      document.getElementById("Resultado").innerHTML += `
        <div class="alert alert-danger" role="alert">
          Expresion detectada : ${result}. ¡ Expresion incorrecta !
        </div>
      `;
    }

    console.log(result);  // Mostrar el resultado de la respuesta del servidor
  };

  // Iniciar la grabación y detenerla después de 5 segundos
  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
    // stream.getTracks().forEach(track => track.stop()); // Detener la cámara
  }, 4500); // 4.5 segundos
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById("Resultado").innerHTML = ``;
    expresion = btn.id;
    expresion = expresion.replace('_', ' ');
    const expresion_sel = document.getElementById("ExpresionSelected");
    expresion_sel.innerHTML = ``;
    expresion_sel.innerHTML += `
      <div class="alert alert-light" role="alert">
        <h4 class="alert-heading">¡ Expresion Seleccionada !</h4>
        <p>Captura tu gesto y comprueba si realizaste la expresion correcta.</p>
        <hr>
        <p class="mb-0">Expresión: ${expresion}</p>
      </div>
    `;
  });
});
