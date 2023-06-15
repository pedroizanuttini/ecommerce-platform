// variables
const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const avatar=document.getElementById('avatar');
const email=document.getElementById('email');
const password=document.getElementById('password');
const checkbox=document.getElementById('checkbox');
const urlBase = 'http://localhost:3000/api/v1';

// funciones
const showError = (input, message) => {
    if(input.classList.contains('error')) return; // si el input ya tiene la clase error no hace nada
    
    input.classList.add('error');
    const formGroup = input.parentElement; //puedo sabar cual es el elemento padre del input.
    const error = document.createElement('span'); // crea un elemento span <span></span>
    error.classList.add('error-message'); // agrega la clase error-message <span class="error-message"></span>
    error.innerText = message; // agrega el texto al elemento <span class="error-message">mensaje de error</span>
   
    formGroup.appendChild(error); // agrega el elemento span al formGroup <div class="form-group"><span class="error-message">mensaje de error</span></div>
}

const showSuccess = (input) => {
    if(!input.classList.contains('error')) return;
    input.classList.remove('error');
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('span'); // selecciona el elemento span dentro del formGroup
    formGroup.removeChild(error); // remueve el elemento span del formGroup
}

const checkRequired = (arrayInputs) => {
    arrayInputs.forEach( (input) => {
        if(input.value.trim() === ''){ // trim elimina los espacios en blanco
            showError(input, 'campo requerido');
        }else{
            showSuccess(input);
        }
    })
}

// TODO: Validar que los nombres no contengan numeros
const checkNumeros = (input) => {
    if(input.value.trim()=='')return; //si el input esta vacio no hace nada
    const regex= /^[^0-9]*$/;
    if(regex.test(input.value)){
        showSuccess(input)
    }else{
        showError(input, 'No pueden contener numeros');
    }
}

// TODO: Validar que los nombres tengan mas de 2 caracteres
const checkCharacter = (input) => {
    if(input.value.trim()=='')return; //si el input esta vacio no hace nada
    const regex=/^.{3,}$/;
    if (regex.test(input.value)){
        showSuccess(input)
    }else{
        showError(input, 'el nombre debe contener dos o mas caracteres')
    }
}


const checkCheckbox = (input) => {
    if(input.checked){
        showSuccess(input);
    }else{
        showError(input, 'debe aceptar los terminos y condiciones');
    }
}

const checkEmail = (input) => {
    if(input.value.trim()==='')return; // si el input esta vacio no hace nada    
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // expresion regular para validar email
    if(regex.test(input.value)){
        showSuccess(input);
    }else{
        showError(input, 'email no válido');
    }
}


// eventos
form.addEventListener('submit', (event) => {
    // cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
    event.preventDefault(); // evita que se envie el formulario y se refresque la pagina 

    // validacion de campos
    checkRequired([fname, lname, email, password])
    checkEmail(email);
    checkCheckbox(checkbox);
    checkNumeros(fname);
    checkCharacter(fname);

    console.log(checkbox.checked);
    const controls = document.querySelectorAll('.controls.error'); // selecciona todos los elementos con la clase controls.error

    if(controls.length > 0){
        console.error('Uno o más campos contienen errores');
        return;
    }

    console.log('enviando datos...');
    // crear un objeto FormData
    const formData = new FormData(); // crea un objeto FormData
    formData.append('fname', fname.value); // agrega un campo al objeto FormData
    formData.append('lname', lname.value);
    formData.append('avatar', avatar.files[0]);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('role_id', 'user_role');


    // envio de datos (fetch) (POST)

    fetch(`${urlBase}/auth/new`, {
        method: 'POST',
        body: formData,
    }).then( (response) => {
        return response.json();// convierte la respuesta en un objeto
    }).then( (data) => {
        console.log(data); // muestra el objeto en consola
    }).catch( (error) => {
        console.error(error); // muestra el error en consola
    })

    
})

// ejecuciones inmediatas 