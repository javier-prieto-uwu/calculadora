const pantalla = document.querySelector(".pantalla");
let numeroAnterior = "";
let OperadorActual = null;
let ReiniciarPantalla = false;

function agregar(valor) {
  if (ReiniciarPantalla) {
    pantalla.value = "";
    ReiniciarPantalla = false;
  }

  if (["+", "-", "*", "/", "√"].includes(valor)) {
    if (OperadorActual !== null && valor !== "√") {
      calcular();
    }

    if (valor === "√") {
      OperadorActual = valor;
      calcular(); 
    } else {
      numeroAnterior = pantalla.value;
      OperadorActual = valor;
      ReiniciarPantalla = true;
    }
  } else {
    pantalla.value += valor;
  }
}

function limpiar() {
  pantalla.value = "";
  numeroAnterior = "";
  OperadorActual = null;
  ReiniciarPantalla = false;
}

function eliminar() {
  pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
  if (OperadorActual === null || ReiniciarPantalla) return;

  const numero1 = parseFloat(numeroAnterior);
  const numero2 = parseFloat(pantalla.value);

  if (isNaN(numero1) && OperadorActual !== "√" || isNaN(numero2)) {
    pantalla.value = "Error";
    setTimeout(limpiar, 1500);
    return;
  }

  let resultado;
  switch (OperadorActual) {
    case "+":
      resultado = numero1 + numero2;
      break;
    case "-":
      resultado = numero1 - numero2;
      break;
    case "*":
      resultado = numero1 * numero2;
      break;
    case "/":
      if (numero2 === 0) {
        pantalla.value = "Error";
        setTimeout(limpiar, 1500);
        return;
      }
      resultado = numero1 / numero2;
      break;
    case "√":
      if (numero2 < 0) {
        pantalla.value = "Error";
        setTimeout(limpiar, 1500);
        return;
      }
      resultado = Math.sqrt(numero2);
      break;
  }

  // redondear el resultado para que tenga como maximo 8 decimales
  resultado = Math.round(resultado * 100000000) / 100000000;
  pantalla.value = resultado;
  OperadorActual = null;
  numeroAnterior = "";
  ReiniciarPantalla = true;
}

// Manejo de eventos en el teclado
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const key = event.key;

  // Nueros y operadores
  if (/[0-9\+\-\*\/\.]/.test(key)) {
    agregar(key);
  }
  // Tecla Enter para calcular
  else if (key === "Enter") {
    calcular();
  }
  // Tecla Escape para limpiar
  else if (key === "Escape") {
    limpiar();
  }
  // Tecla Backspace para borrar
  else if (key === "Backspace") {
    eliminar();
  }
});
