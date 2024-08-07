document.addEventListener('DOMContentLoaded', function () {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var grid = document.getElementById('grid-container');
  var wordInput = document.getElementById('word');
  var shuffleBtn = document.getElementById('shuffle-btn');
  var submitWordBtn = document.getElementById('submit-word-btn');
  var pointsDisplay = document.getElementById('points');
  var points = 0;
  var selectedButtons = [];
  var wordsFound = [];

  function generateGrid() {
    grid.innerHTML = '';
    selectedButtons = [];
    for (var i = 0; i < 16; i++) {
      var letter = letters.charAt(Math.floor(Math.random() * letters.length));
      var button = document.createElement('button');
      button.className = 'grid-item';
      button.textContent = letter;
      button.addEventListener('click', function () {
        handleButtonClick(this);
      });
      grid.appendChild(button);
    }
  }

  function handleButtonClick(button) {
    var letter = button.textContent;
    if (selectedButtons.length === 0 || isValidMove(button)) {
      addToWord(letter);
      selectedButtons.push(button);
      grid.querySelectorAll('.grid-item').forEach(function (btn) {
        btn.classList.remove('last-selected');
      });
      button.classList.add('selected');
      button.classList.add('last-selected');

      button.disabled = true;
      grid.childNodes.forEach(function (btn) {
        if (selectedButtons.includes(btn)) {
          btn.disabled = true;
        } else {
          btn.disabled = false;
        }
      });
    } else {
      showSubmitMessage('Movimiento inválido.');
    }
  }

  function isValidMove(button) {
    if (selectedButtons.length === 0) {
      return true;
    }
    var lastButton = selectedButtons[selectedButtons.length - 1];
    var lastButtonIndex = Array.prototype.indexOf.call(
      grid.children,
      lastButton
    );
    var currentButtonIndex = Array.prototype.indexOf.call(
      grid.children,
      button
    );
    var lastIndexRow = Math.floor(lastButtonIndex / 4);
    var lastIndexCol = lastButtonIndex % 4;
    var currentRow = Math.floor(currentButtonIndex / 4);
    var currentCol = currentButtonIndex % 4;

    return (
      Math.abs(lastIndexRow - currentRow) <= 1 &&
      Math.abs(lastIndexCol - currentCol) <= 1
    );
  }

  function addToWord(letter) {
    var currentWord = wordInput.value;
    wordInput.value = currentWord + letter;
  }

  function submitWord() {
    var word = wordInput.value.toLowerCase().trim();
    if (word.length < 3) {
      showSubmitMessage('La palabra debe contener al menos 3 letras.');
      clearSelectedButtons();
      return;
    }
    if (wordsFound.includes(word)) {
      showSubmitMessage('La palabra ya fue descubierta.');
      clearSelectedButtons();
      return;
    }
    var apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('La palabra no existe.');
        }
      })
      .then(function () {
        var pointGets = calculatePoints(word.length);
        points += pointGets;
        pointsDisplay.textContent = points;
        showSubmitMessage(
          'La palabra "' + word + '" existe! Sumas: ' + pointGets + ' puntos.'
        );
        wordsFound.push(word);
        updateWordsFoundList();
        clearSelectedButtons();
      })
      .catch(function (error) {
        console.error(error);
        points -= 1;
        pointsDisplay.textContent = points;
        showSubmitMessage(
          'La palabra "' + word + '" no existe. Restas: 1 punto.'
        );
        clearSelectedButtons();
      });
  }

  function calculatePoints(wordLength) {
    switch (wordLength) {
      case 3:
        return 1;
      case 4:
        return 1;
      case 5:
        return 2;
      case 6:
        return 3;
      case 7:
        return 5;
      default:
        return 11;
    }
  }

  function showSubmitMessage(message) {
    var showMessageDiv = document.getElementById('show-message');
    showMessageDiv.textContent = message;
    setTimeout(function () {
      showMessageDiv.textContent = '';
    }, 2000);
  }

  function updateWordsFoundList() {
    var wordsFoundListMobile = document.getElementById('words-found-mobile');
    var wordsFoundListDesktop = document.getElementById('words-found-desktop');
    wordsFoundListMobile.innerHTML = '';
    wordsFoundListDesktop.innerHTML = '';
    wordsFound.forEach(function (word) {
      var listItemMobile = document.createElement('li');
      var listItemDesktop = document.createElement('li');
      listItemMobile.textContent = word;
      listItemDesktop.textContent = word;
      wordsFoundListMobile.appendChild(listItemMobile);
      wordsFoundListDesktop.appendChild(listItemDesktop);
    });
  }

  function clearSelectedButtons() {
    selectedButtons.forEach(function (button) {
      button.disabled = false;
      button.classList.remove('selected', 'last-selected');
    });
    selectedButtons = [];
    wordInput.value = '';
  }

  shuffleBtn.addEventListener('click', function () {
    generateGrid();
    wordInput.value = '';
    setTimeout(function () {}, 2000);
  });

  submitWordBtn.addEventListener('click', function () {
    submitWord();
  });

  document.addEventListener('timeUp', function () {
    var playerName = localStorage.getItem('playerName');
    var currentTime = new Date().toLocaleString();
    var scoreData = {
      playerName: playerName,
      points: points,
      timestamp: currentTime,
    };
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(scoreData);
    localStorage.setItem('scores', JSON.stringify(scores));
    var timeUpModal = document.getElementById('time-up-modal');
    var playerSpan = document.getElementById('time-up-player');
    var pointsSpan = document.getElementById('time-up-points');
    var timestampSpan = document.getElementById('time-up-timestamp');
    playerSpan.textContent = playerName;
    pointsSpan.textContent = points;
    timestampSpan.textContent = currentTime;
    timeUpModal.classList.add('active');
  });

  var restartBtn = document.getElementById('restart-btn');

  restartBtn.addEventListener('click', function () {
    points = 0;
    pointsDisplay.textContent = points;
    wordsFound = [];
    updateWordsFoundList();
    generateGrid();
    timeUpModal.classList.remove('active');
  });
  
  generateGrid();
});
