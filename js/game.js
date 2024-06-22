document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.querySelector('.popup-overlay');
  function showPopUp() {
      overlay.style.display = 'block';
  }

  function closePopUp() {
    overlay.style.display = 'none';
  }
  showPopUp();
  overlay.addEventListener('click', function(event) {
    
    if (event.target === overlay) {
      closePopUp();
    }
  });
  var closeButton = document.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      closePopUp();
    });
  }
  var buttonStart = document.querySelector('.button-start');
  var playerInfo = document.querySelector('.player-info');
  var gameTable = document.querySelector('.game-table');
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

      playerInfo.style.display = 'none';
      gameTable.style.display = 'flex';
  });
});
