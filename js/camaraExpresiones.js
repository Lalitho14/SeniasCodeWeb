const preview = document.getElementById('webcam');
const startButton = document.getElementById('startVideo');

const stream = await navigator.mediaDevices.getUserMedia({ video: true });
preview.srcObject = stream;

startButton.addEventListener('click', async () => {

  console.log("Grabando")
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    // Crear un blob del video grabado
    const videoBlob = new Blob(chunks, { type: 'video/webm' });

    // Crear FormData y agregar el video
    const formData = new FormData();
    formData.append('video', videoBlob, 'video.webm'); // Es importante que la clave sea 'video'

    // Enviar el video al servidor
    const response = await fetch('http://192.168.100.79:5000/upload_video', {
      method: 'POST',
      body: formData,
    });

    const result = await response.text();
    console.log(result);  // Mostrar el resultado de la respuesta del servidor
  };

  // Iniciar la grabación y detenerla después de 5 segundos
  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
    // stream.getTracks().forEach(track => track.stop()); // Detener la cámara
  }, 5000); // 5 segundos
});
