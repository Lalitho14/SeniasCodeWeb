<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/style.css">
  <title>Señas Code</title>
</head>

<body>
  <main class="container">
    <div class="principal menu">
      <h1 class="mt-3">Probar Expresiones</h1>
      <!-- <div class="alert alert-light" role="alert">
        ! Intenta usar las expresiones que aprendiste !
      </div> -->
      <div class="container mt-3">
        <div class="row justify-content-center m-3">
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Buenas_noches">Buenas Noches</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Gracias">Gracias</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Hola">Hola</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="No">No</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Nos_vemos">Nos Vemos</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Perdon">Perdon</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark expresion" id="Por_favor">Por favor</button>
          </div>
          <div class="col-auto">
            <button class="btn btn-color-amarillo btn-outline-dark">Si</button>
          </div>
        </div>
        <div class="row justify-content-center m-3" id="ExpresionSelected"></div>
        <div class="row justify-content-center">
          <div class="col-auto col-lg-6 align-self-center">
            <video id="webcam" autoplay class="videoView w-10"></video>
          </div>
        </div>
        <div class="row justify-content-center m-3">
          <div class="col-auto col-lg-6">
            <button id="startVideo" class="btn btn-color-azul btn-outline-dark">Capturar</button>
          </div>
        </div>
        <div class="row justify-content-center" id="Resultado"></div>
      </div>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="./js/camaraExpresiones.js" type="module"></script>
</body>

</html>