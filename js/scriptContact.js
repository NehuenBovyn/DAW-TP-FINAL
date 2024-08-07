document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario');
    var name = document.getElementById('nombre-id');
    var email = document.getElementById('correo-id');
    var message = document.getElementById('mensaje-id');
    var nameError = document.getElementById('nombre-error');
    var correoError = document.getElementById('correo-error');
    var mensajeError = document.getElementById('mensaje-error');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var valid = true;
        if (name.value.trim().length < 3 || !/^[a-zA-Z0-9\s]+$/.test(name.value)) {
            name.classList.add('error');
            name.classList.remove('success');
            nameError.textContent = 'El nombre debe ser alfanumérico y tener al menos 3 caracteres.';
            valid = false;
        } else {
            name.classList.remove('error');
            name.classList.add('success');
            nameError.textContent = '';
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
        if (message.value.trim().length <= 5) {
            message.classList.add('error');
            message.classList.remove('success');
            mensajeError.textContent = 'El mensaje debe tener más de 5 caracteres.';
            valid = false;
        } else {
            message.classList.remove('error');
            message.classList.add('success');
            mensajeError.textContent = '';
        }
        if (valid) {
            form.submit();
        }
    });
});