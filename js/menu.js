const btn = document.getElementById("menu")
const screen = document.getElementById("principal")

btn.addEventListener('click', () => {
  console.log("pene")
  screen.classList.remove("inicio")
  screen.classList.add("menu")
  screen.classList.add("fadeInDown")
  screen.innerHTML = `
    <div class="container p-5">
      <div class="row justify-content-center m-3">
        <div class="col-auto">
          <h2>¡Bienvenido al aprendizaje de señas!</h2>
          <h2>¿Qué te gustaría aprender?</h2>
        </div>
      </div>
      <div class="row justify-content-center m-3">
        <div class="col-auto col-lg-6 align-self-center">
          <a href="./indexAbecedario.php">
            <img src="./assets/asset02.png" alt="asset02" class="img-fluid">
          </a>
        </div>
        <div class="col-auto col-lg-6 align-self-center">
          <a href="./indexExpresiones.php">
            <img src="./assets/asset03.png" alt="asset03" class="img-fluid">
          </a>
        </div>
      </div>
    </div>
  `
});