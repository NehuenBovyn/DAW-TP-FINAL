document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.querySelector('.popup-overlay');
  var timerDisplay = document.getElementById('timer');
  var countdownInterval;

  function showPopUp() {
    overlay.style.display = 'block';
  }

  function closePopUp() {
    overlay.style.display = 'none';
  }

  showPopUp();

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closePopUp();
    }
  });

  var closeButton = document.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closePopUp();
    });
  }

  var buttonStart = document.querySelector('.button-start');
  var playerInfo = document.querySelector('.player-info');
  var gameTable = document.querySelector('.game-table');

  buttonStart.addEventListener('click', function () {
    var playerName = document.getElementById('player-name').value;
    var timeLimitSelect = document.getElementById('time-limit');
    var timeLimit = parseInt(timeLimitSelect.value, 10) || 60;
    var errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = '';

    if (playerName.length < 3) {
      errorMessageDiv.textContent =
        'El nombre del jugador debe tener al menos 3 caracteres.';
      return;
    }

    localStorage.setItem('playerName', playerName);
    localStorage.setItem('timeLimit', timeLimit);

    playerInfo.style.display = 'none';
    gameTable.style.display = 'flex';

    startCountdown(timeLimit);
  });

  function startCountdown(timeLimit) {
    var startTime = Date.now();
    var endTime = startTime + timeLimit * 1000;

    countdownInterval = setInterval(function () {
      var now = Date.now();
      var timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = 'Tiempo agotado';

        // Emitir evento de tiempo agotado
        var timeUpEvent = new CustomEvent('timeUp');
        document.dispatchEvent(timeUpEvent);

        return;
      }

      var secondsLeft = Math.ceil(timeLeft / 1000);
      var minutes = Math.floor(secondsLeft / 60);
      var seconds = secondsLeft % 60;

      timerDisplay.textContent =
        minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
  }
});
