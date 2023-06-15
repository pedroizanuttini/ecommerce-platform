// variables
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkbox = document.getElementById('checkbox');
const urlBase = 'http://localhost:3000/api/v1';

// funciones
const showError = (input, message) => {
    if (input.classList.contains('error')) return;
    input.classList.add('error');
    const formGroup = input.parentElement;
    const error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;

    formGroup.appendChild(error); //agrega el elemento span al formGroup
}

const showSuccess = (input) => {
    if (!input.classList.contains('error')) return
    input.classList.remove('error');
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('span');
    if (error) {
        formGroup.removeChild(error);
    }

}

const checkRequired = (arrayInputs) => {
    arrayInputs.forEach((input) => {
        if (input.value.trim() === '') {
            console.log('input vacio', input);
            showError(input, 'campo requerido')
        } else {
            console.log('input con valor', input);
            input.classList.remove('error');
            showSuccess(input);
        }
    })
}

const checkEmail = (input) => {
    if (input.value.trim() === '') return;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(input.value)) {
        input.classList.remove('error');
        showError(input, 'email no valido')
    } else {
        input.classList.add('error');
        input.value = 'email@example';
        showSuccess(input)
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // evita que se envie el formulario y se refresque la pagina 

    // validacion de campos
    checkRequired([email, password]);
    checkEmail(email);


    // envio de datos


    const data = {
        email: email.value,
        password: password.value
    }

    console.log(data);


    fetch(`${urlBase}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data); 
    }).catch((error) => {
        console.error(error); 
    })

})
