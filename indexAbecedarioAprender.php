<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/style.css">
  <title>Señas Code</title>
</head>

<body>
  <main class="container">
    <div class="principal menu">
      <div class="container p-5">
        <h1>A L F A B E T O</h1>
        <div class="d-flex flex-row justify-content-center align-items-center flex-wrap mt-5">
          <?php
          for ($i = 0; $i < 26; $i++) {
            $letra = chr(321 + $i);
            echo '
              <div class="m-2">
                <img src="./assets/Abecedario/' . $letra . '.jpg" alt="' . $letra . '">
                <h2>' . $letra . '</h2>
                <button class="btn btn-color-azul btn-outline-dark IniciarCamara" data-bs-toggle="modal" data-bs-target="#TabVideo" id="'.$letra.'">PROBAR</button>
              </div>
            ';
          }
          ?>
          <div class="modal fade" id="TabVideo" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalLabel">Prueba de letra</h5>
                </div>
                <div class="modal-body">
                  <video id="webcam" autoplay class="videoView w-10"></video>
                  <canvas id="frame" style="display:none;"></canvas>
                  <div style="display: none;" id="resultado">
                    
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="cerrar_modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="./js/camara.js" type="module"></script>
</body>

</html>