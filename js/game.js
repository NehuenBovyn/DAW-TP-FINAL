document.addEventListener('DOMContentLoaded', function () {
  // Declaraciones
  var overlay = document.querySelector('.popup-overlay');
  var timerDisplay = document.getElementById('timer');
  var restartBtn = document.getElementById('restart-btn');
  var closeButton = document.querySelector('.close-popup');
  var countdownInterval;
  var buttonStart = document.querySelector('.button-start');
  var playerInfo = document.querySelector('.player-info');
  var gameTable = document.querySelector('.game-table');
  var timeUpModal = document.getElementById('time-up-modal');

  showPopUp();

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closePopUp();
    });
  }

  function showPopUp() {
    overlay.style.display = 'block';
  }

  function closePopUp() {
    overlay.style.display = 'none';
  }

  function startCountdown(timeLimit) {
    var startTime = Date.now();
    var endTime = startTime + timeLimit * 1000;
    countdownInterval = setInterval(function () {
      var now = Date.now();
      var timeLeft = endTime - now;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = 'Tiempo agotado';
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

  function loadAndDisplayScores() {
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.points - a.points);
    var scoreTableBody = document.querySelector('#score-table tbody');
    scoreTableBody.innerHTML = '';

    scores.forEach((score) => {
      var row = document.createElement('tr');
      var nameCell = document.createElement('td');
      var pointsCell = document.createElement('td');
      var dateCell = document.createElement('td');
      nameCell.textContent = score.playerName;
      pointsCell.textContent = score.points;
      dateCell.textContent = score.timestamp;
      row.appendChild(nameCell);
      row.appendChild(pointsCell);
      row.appendChild(dateCell);
      scoreTableBody.appendChild(row);
    });
  }

  function resetGame() {
    clearInterval(countdownInterval);
    timerDisplay.textContent = '0:00';
    localStorage.removeItem('playerName');
    localStorage.removeItem('timeLimit');
    playerInfo.style.display = 'flex';
    gameTable.style.display = 'none';
    var errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = '';
    document.getElementById('player-name').value = '';
    document.getElementById('time-limit').value = '60';
    var wordsFoundList = document.getElementById('words-found');
    wordsFoundList.innerHTML = '';
    timeUpModal.style.display = 'none';
    showPopUp();
    loadAndDisplayScores();
  }

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closePopUp();
    }
  });

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
    loadAndDisplayScores();
  });

  restartBtn.addEventListener('click', function () {
    resetGame();
  });
});
