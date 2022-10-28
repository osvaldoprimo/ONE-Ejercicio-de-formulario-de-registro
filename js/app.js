import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {                               //aquí trabajo con todos los inputs que hay en html
    input.addEventListener("blur", (input) =>{
        valida(input.target);
    })
})