document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');
    var nombre = document.getElementById('nombreid');
    var email = document.getElementById('correoid');
    var mensaje = document.getElementById('mensajeid');

    var nombreError = document.getElementById('nombreError');
    var correoError = document.getElementById('correoError');
    var mensajeError = document.getElementById('mensajeError');
    var nombreRealTime = document.getElementById('nombreRealTime');

    nombre.addEventListener('input', function() {
        nombreRealTime.textContent = nombre.value;
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var valid = true;

        if (nombre.value.trim().length < 3 || !/^[a-zA-Z0-9\s]+$/.test(nombre.value)) {
            nombre.classList.add('error');
            nombre.classList.remove('success');
            nombreError.textContent = 'El nombre debe ser alfanumérico y tener al menos 3 caracteres.';
            valid = false;
        } else {
            nombre.classList.remove('error');
            nombre.classList.add('success');
            nombreError.textContent = '';
        }

        if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error');
            email.classList.remove('success');
            correoError.textContent = 'Ingrese un correo electrónico válido.';
            valid = false;
        } else {
            email.classList.remove('error');
            email.classList.add('success');
            correoError.textContent = '';
        }

        if (mensaje.value.trim().length <= 5) {
            mensaje.classList.add('error');
            mensaje.classList.remove('success');
            mensajeError.textContent = 'El mensaje debe tener más de 5 caracteres.';
            valid = false;
        } else {
            mensaje.classList.remove('error');
            mensaje.classList.add('success');
            mensajeError.textContent = '';
        }

        if (valid) {
            form.submit();
        }
    });
});