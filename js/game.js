document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.querySelector('.popup-overlay');
  function mostrarPopup() {
      overlay.style.display = 'block';
  }

  function cerrarPopup() {
    overlay.style.display = 'none';
  }
  mostrarPopup();
  overlay.addEventListener('click', function(event) {
    
    if (event.target === overlay) {
      cerrarPopup();
    }
  });
  var closeButton = document.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      cerrarPopup();
    });
  }
  var buttonStart = document.querySelector('.button-start');

  buttonStart.addEventListener('click', function() {
      var playerName = document.getElementById('player-name').value;
      var timeLimit = document.getElementById('time-limit').value;
      var errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.textContent = '';
      if (playerName.length < 3) {
          errorMessageDiv.textContent = 'El nombre del jugador debe tener al menos 3 caracteres.';
          return;
      }
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('timeLimit', timeLimit);
  });
});
