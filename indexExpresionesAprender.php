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
      <div class="container p-5">
        <h1 class="titulo_e p-3">Familiarízate con señas comunes </h1>



        <?php
            $titulos = ["Buenas Noches","Gracias","Hola", "No","Nos Vemos", "Perdon", "Por favor", "Si"];
            $informacion = [
            "Buenas NOches: Comienza dirigiendo la palma de tu mano hacia tu hombro, cierra tu puño y extiende el dedo indice y el pulgar, y finaliza llevándola suavemente hasta tu mandíbula. Este gesto es una forma respetuosa de despedida en la lengua de señas.",
            "Gracias: Coloca la palma de una de tus manos hacia arriba. Con la otra mano, forma un dedo medio firme que apunte hacia la palma extendida. Luego, mueve el dedo hacia la palma de un lado a otro, como un movimiento de ida y vuelta, en un gesto suave de agradecimiento.",

            "Hola:Levanta la mano y haz un pequeño movimiento hacia arriba, similar a un saludo. La palma de la mano debe estar hacia afuera.",
            "No:Extiende los dedos índice, mientras los demás están recogido. Luego, mueve la mano hacia los lados, como si negarás con la cabeza.",

            
            "Nos Vemos:Coloca tus puños frente a frente con las palmas hacia abajo. Luego, extiende y retrae suavemente los dedos índice y medio de ambas manos, haciendo un movimiento de ida y vuelta",
            "Perdon:Extiende solo los dedos pulgar y meñique dejando los demás recogidos mientras tocas la barbilla ligeramente.",
            "Por favor:Junta ambas palmas de las manos, como si estuvieras en una posición de oración. Luego, haz un pequeño movimiento hacia adelante, como un leve empuje hacia la persona a quien te diriges.",
            "Si:Forma un puño con la mano dominante. Coloca el meñique hacia arriba, luego, mueve la mano hacia arriba y hacia abajo de manera leve, como un pequeño gesto de asentir."
              ];

            $carpeta = './assets/frases/';

            $imagenes = array_diff(scandir($carpeta), array('.', '..')); 

            $imagenes = array_values($imagenes);

            foreach ($imagenes as $indice => $imagen) {

                    $titulo = $titulos[$indice];
                    $info = $informacion[$indice];
                    $nombre = pathinfo($imagen, PATHINFO_FILENAME);

                    echo '
                    <div style="display: flex; align-items: center; margin-bottom: 20px; border: 1px solid black; padding: 15px; border-radius: 10px;">
                        <div style="flex: 1; margin-right: 20px;">
                            <h2 style="margin: 0 0 10px;">' . $titulo . '</h2>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6;">' . $info . '</p>
                        </div>
                        <div style="flex-shrink: 0; margin-right: 20px;">
                            <img src="' . $carpeta . $imagen . '" alt="' . $nombre . '" style="width: 400px; height: 300px; border-radius: 10px;">
                        </div>
                      
                    </div>
                    ';
                
            }
          ?>



        <div class="modal fade" id="TabVideo" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
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

  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>