export default function validations(input) {

    let err = {};

    
    // Nombre del perro
    if(!input.name) err.name = "El perro debe tener un nombre.";
    else err.name = "";
    
    // Peso máximo
    if(!input.weight_max) err.weight_max = "Por favor, ingrese un peso máximo.";
    else err.weight_max = "";

    // Peso mínimo
    if (!input.weight_min) err.weight_min = "Por favor, ingrese un peso mínimo.";
    else if(input.weight_min <= 0) err.weight_min = "Este campo no puede ser cero o tener valores negativos."
    else if(input.weight_min > input.weight_max) err.weight_min = "El mínimo no puede ser mayor al máximo."
    else err.weight_min = "";

    // Altura máxima
    if (!input.height_max) err.height_max = "Por favor, ingrese una altura máxima.";
    else err.height_max = "";

    // Altura mínima
    if(!input.height_min) err.height_min = "Por favor, ingrese una altura mínima.";
    else if(input.height_min <= 0) err.height_min = "Este campo no puede ser cero o tener valores negativos."
    else if(input.height_min > input.height_max) err.height_min = "El mínimo no puede ser mayor al máximo."
    else err.height_min = "";

    // Esperanza de vida
    if(!input.life_span) err.life_span = "Por favor, ingrese un rango de edad.";
    else err.life_span = "";

    return err;

}