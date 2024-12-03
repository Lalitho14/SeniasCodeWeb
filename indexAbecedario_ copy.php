<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <head>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
    crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
  <title>Señas Code</title>
</head>

<body>
  <main>
    <h1>Probar Abecedario</h1>
    <div style="position: relative;">
      <video id="webcam" autoplay class="videoView"></video>
      <canvas id="frame" style="display:none;"></canvas>
    </div>
  </main>
  <script src="./js/camara.js" type="module"></script>
</body>

</html>