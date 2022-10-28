// quiero que js controle que las fechas ingresadas de nacimiento sean mayores a 18 años
/*
const inputNacimiento = document.querySelector("#birth"); //refiero el id birth que está en el html


inputNacimiento.addEventListener("blur", (evento) => {   //con blur hago referencia a la acción del uruario de hacer clic pero fuera del campo, para quitar el cursor
    validarNacimiento(evento.target);
    });

    */

// vamos a mejorar lo anterior con un data-tipo que pusimos en el html

export function valida(input){               // lo voy a exportar para pdoer usarla en otros lugares del codigo
    const tipoDeInput = input.dataset.tipo;   //con dataset obtenemos toda la colección de los data, y con tipo el data que pusimos en el html
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){                   //a esto lo agregamos para poder hacer un alert con nuestro estilo. usaremos la clase input.container--invalid
        input.parentElement.classList.remove("input-container--invalid")  //si es true, eliminará la clase
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid"); //si es false, agregará esa clase que aportará un estilo css
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [                     //este es un arreglo
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Complete con su nombre, por favor"
    },
    email: {
        valueMissing: "Complete con su email, por favor",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Escriba su contraseña, por favor",
        patternMismatch: "Mínimo ocho caracteres, al menos una letra y un número",
    },
    nacimiento: {
        valueMissing: "Escriba su fecha de nacimiento, por favor",
        customError: "Debes tener al menos 18 años de edad para registrarte"
    },
    numero: {
        valueMissing: "Escriba su número de teléfono, por favor",       // esto pusimos en el html (con el type: tel o text) para establecer la cantidad minima y maxima de numeros: pattern="\d{13}" required minlength="10" maxlength="13"
        patternMismatch: "El formato requerido es xxxxxxxxxx",
    },
    direccion: {
        valueMissing: "Escriba su dirección, por favor",
        patternMismatch: "El formato requerido es 'nombre de calle y número', hasta 40 caracteres como máximo",
    },
    ciudad: {
        valueMissing: "Escriba su ciudad, por favor",
        patternMismatch: "El formato requerido es hasta 40 caracteres como máximo y 3 como mínimo",
    },
    estado: {
        valueMissing: "Escriba su provincia, por favor",
        patternMismatch: "El formato requerido es hasta 40 caracteres como máximo y 3 como mínimo",
    },


}



const validadores = {
    nacimiento: (input) => validarNacimiento(input),  //nacimiento es el nombre del data
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
            
        }
    })
    return mensaje
}

function validarNacimiento (input){  //input para ver la fecha ingresada por el usuario
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){  //si no es mayor de edad...
        mensaje = "Debes tener al menos 18 años de edad para registrarte";
    }
    ;

    input.setCustomValidity(mensaje);   //este set.CustomValidity sirve para referir un mensaje customizable
}

function mayorDeEdad(fecha){                //para verificar si es o no mayor de edad
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return fechaActual >= diferenciaFechas;

}