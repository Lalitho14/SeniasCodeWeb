<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/style.css">
  <title>Señas Code</title>
</head>

<body>
  <main class="container">
    <div class="principal menu">
      <img src="./assets/aprendeyjuega.jpeg" alt="">
      <div class="container">

        <div class="row justify-content-center m-3">
          <div class="col-auto col-lg-6 align-self-center">
            <video id="webcam" autoplay class="videoView w-10"></video>
            <canvas id="frame" style="display:none;"></canvas>
          </div>
        </div>
        <div class="row justify-content-center m-3">
          <div class="col-auto col-lg-6 align-self-center">
            <button class="btn btn-color-azul btn-outline-dark" id="GenerarPalabra">Generar Palabra</button>
          </div>
        </div>
        <div class="row justify-content-center m-3" id="PalabraRecibida">
        </div>
        <div class="row justify-content-center m-3" id="Resultado">
        </div>
        <div class="row justify-content-center m-3">
          <div class="col-auto col-lg-6 align-self-center">
            <a href="./index.php" class="btn btn-color-azul btn-outline-dark">Regresar</a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="./js/camaraEjercicios.js" type="module"></script>
</body>

</html>