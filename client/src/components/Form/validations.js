export default function validations(input) {
    let err = {};
  
    if (!input.name) { // Dog name
      err.name = "El perro debe tener un nombre.";
    } else {
      err.name = "";
    }
    if (!input.weight_max) { // Max weight
      err.weight_max = "Por favor, ingrese un peso máximo.";
    } else if (!/\d{1,2}/gi.test(input.weight_max)) {
      err.weight_max = "Por favor, ingrese un peso mínimo válido.";
    } else {
      err.weight_max = "";
    }
    if (!input.weight_min) { // Min weight
      err.weight_min = "Por favor, ingrese un peso mínimo.";
    } else if (!/\d{1,2}/gi.test(input.weight_min)) {
      err.weight_min = "Por favor, ingrese un peso mínimo válido.";
    } else {
      err.weight_min = "";
    }
    // HEIGHTS
    if (!input.height_max) { // Max height
      err.height_max = "Por favor, ingrese una altura máxima.";
    } else if (!/\d{1,2}/gi.test(input.height_max)) {
      err.height_max = "Por favor, ingrese una altura máxima válida.";
    } else {
      err.height_max = "";
    }
    if (!input.height_min) { // Min height
      err.height_min = "Por favor, ingrese una altura mínima.";
    } else if (!/\d{1,2}/gi.test(input.height_min)) {
      err.height_min = "Por favor, ingrese una altura mínima válida.";
    } else {
      err.height_min = "";
    }
    return err;
  }