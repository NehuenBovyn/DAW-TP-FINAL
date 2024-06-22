document.addEventListener('DOMContentLoaded', function() {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var grid = document.getElementById('grid-container');
  var wordInput = document.getElementById('word');
  var shuffleBtn = document.getElementById('shuffle-btn');
  var submitWordBtn = document.getElementById('submit-word-btn');
  var pointsDisplay = document.getElementById('points');
  var wordsFoundList = document.getElementById('words-found');
  var points = 0;
  var selectedButtons = [];
  var wordsFound = [];
  var shuffleMessage = document.getElementById('shuffle-message');
  var submitMessage = document.getElementById('submit-message');

  function generateGrid() {
      grid.innerHTML = '';
      selectedButtons = [];
      for (var i = 0; i < 16; i++) {
          var letter = letters.charAt(Math.floor(Math.random() * letters.length));
          var button = document.createElement('button');
          button.className = 'grid-item';
          button.textContent = letter;
          button.addEventListener('click', function() {
              handleButtonClick(this);
          });
          grid.appendChild(button);
      }
  }

  function handleButtonClick(button) {
      if (selectedButtons.length === 0 || isValidMove(button)) {
          var letter = button.textContent;
          addToWord(letter);
          selectedButtons.push(button);
          button.disabled = true;
      } else {
          showSubmitMessage('Invalid move! Select an adjacent letter.');
      }
  }

  function isValidMove(button) {
      if (selectedButtons.length === 0) {
          return true;
      }
      var lastButton = selectedButtons[selectedButtons.length - 1];
      var lastButtonIndex = Array.from(grid.children).indexOf(lastButton);
      var currentButtonIndex = Array.from(grid.children).indexOf(button);
      var lastIndexRow = Math.floor(lastButtonIndex / 4);
      var lastIndexCol = lastButtonIndex % 4;
      var currentRow = Math.floor(currentButtonIndex / 4);
      var currentCol = currentButtonIndex % 4;

      return Math.abs(lastIndexRow - currentRow) <= 1 && Math.abs(lastIndexCol - currentCol) <= 1;
  }

  function addToWord(letter) {
      var currentWord = wordInput.value;
      wordInput.value = currentWord + letter;
  }

  function submitWord() {
      var word = wordInput.value.toLowerCase().trim();
      if (word.length >= 3) {
          var uniqueLetters = new Set(word);
          if (uniqueLetters.size === word.length) {
              var apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
              fetch(apiUrl)
                  .then(function(response) {
                      if (response.ok) {
                          return response.json();
                      } else {
                          throw new Error('Word not found in dictionary.');
                      }
                  })
                  .then(function(data) {
                      console.log(data);
                      points += 1;
                      pointsDisplay.textContent = points;
                      showSubmitMessage(`Word "${word}" found in dictionary! Points: ${points}`);
                      wordsFound.push(word);
                      updateWordsFoundList();
                      clearSelectedButtons();
                  })
                  .catch(function(error) {
                      console.error(error);
                      points -= 1;
                      pointsDisplay.textContent = points;
                      showSubmitMessage(`Word "${word}" not found in dictionary. Points: ${points}`);
                      clearSelectedButtons();
                  });
          } else {
              showSubmitMessage('Word contains duplicate letters.');
              clearSelectedButtons();
          }
      } else {
          showSubmitMessage('Word must be at least 3 letters long.');
          clearSelectedButtons();
      }
  }

  function showSubmitMessage(message) {
      submitMessage.textContent = message;
      submitMessage.classList.add('show-message');
      setTimeout(function() {
          submitMessage.classList.remove('show-message');
      }, 2000);
  }

  function updateWordsFoundList() {
      wordsFoundList.innerHTML = '';
      wordsFound.forEach(function(word) {
          var listItem = document.createElement('li');
          listItem.textContent = word;
          wordsFoundList.appendChild(listItem);
      });
  }

  function clearSelectedButtons() {
      selectedButtons.forEach(function(button) {
          button.disabled = false;
      });
      selectedButtons = [];
      wordInput.value = '';
  }

  shuffleBtn.addEventListener('click', function() {
      generateGrid();
      shuffleMessage.classList.add('show-message');
      setTimeout(function() {
          shuffleMessage.classList.remove('show-message');
      }, 2000);
      wordInput.value = ''; 
  });

  submitWordBtn.addEventListener('click', function() {
      submitWord();
  });

  generateGrid();
});
