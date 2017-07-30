(function () {
  "use strict";

  var app = angular.module("MatchingGame", ['ngAnimate']);

  // Constants to use in the game
  var constants,
      currentSessionOpen = false,
      previousCard = null,
      numberOfPairs = 0;

  constants = new (function() {
    var rows = 3,
        columns = 6,
        numberOfMatches = (rows * columns) / 2;

    this.getRows = function() {
      return rows;
    };

    this.getColumns = function() {
      return columns;
    };

    this.getNumberOfMatches = function() {
      return numberOfMatches;
    };
  })();

  function createDeck() {
    var rows = constants.getRows(),
        columns = constants.getColumns(),
        key = createRandom(),
        deck = {},
        i,
        j;
    deck.rows = [];

    // Create each row
    for (i = 0; i < rows; i += 1) {
      var row = {};
      row.cards = [];

      for (j = 0; j < columns; j += 1) {
        var card = {};
        card.isFaceUp = false;
        card.item = key.pop();
        row.cards.push(card);
      }
      deck.rows.push(row);
    }
    return deck;
  }

  function removeByIndex(array, index) {
    array.splice(index, 1);
  }

  function insertByIndex(array, index, item) {
    array.splice(index, 0, item);
  }

  // Create an array of items that simulates a matching scheme
  function createRandom() {
    var matches = constants.getNumberOfMatches(),
        pool = [],
        answers = [],
        letters = [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],
        items = letters,
        i,
        j;

    for (i = 0; i < (matches * 2), i += 1) {
      pool.push(i);
    }

    // Generate an array with the random items
    for (j = 0; j < matches; j += 1) {
      var randomLetter = Math.floor((Math.random() * items.length)),
          letter = items[randomLetter],
          randomPool = Math.floor((Math.random() * pool.length));
      removeByIndex(items, randomLetter);
      insertByIndex(answers, pool[randomPool], letter);
      removeByIndex(pool, randomPool);

      // Second placement
      randomPool = Math.floor((Math.random() * pool.length));
      insertByIndex(answers, pool[randomPool], letter);
      removeByIndex(pool, randomPool);
    }
    return answers;
  }

  app.controller("CardController", function ($scope, $timeout) {
    $scope.deck = createDeck();
    $scope.isGuarding = true;
    $scope.inGame = false;
    $scope.timeLimit = 60000; // 60 seconds
    $scope.isCritical = false;
    $scope.timer = null;

    // Check the current state of the game based on a card click
    $scope.check = function(card) {
      if ((currentSessionOpen && previousCard != card) && (previousCard.item == card.item) && (!card.isFaceUp)) {
        card.isFaceUp = true;
        previousCard = null;
        currentSessionOpen = false;
        numberOfPairs += 1;
      } else if((currentSessionOpen && previousCard != card) && (previousCard.item != card.item) && (!card.isFaceUp)) {
        $scope.isGuarding = true;
        card.isFaceUp = true;
        currentSessionOpen = false;
        $timeout(function() {
          previousCard.isFaceUp = card.isFaceUp = false;
          previousCard = null;
          $scope.isGuarding = $scope.timeLimit ? false : true;
        }, 1000);
      } else {
        card.isFaceUp = true;
        currentSessionOpen = true;
        previousCard = card;
      }

      if (numberOfPairs == constants.getNumberOfMatches()) {
        $scope.stopTimer();
      }
    }

    // Start the timer as soon as the start button is pressed
    $scope.start = function() {
      ($scope.startTimer = function() {
        $scope.timeLimit -= 1000;
        $scope.isCritical = $scope.timeLimit <= 10000 ? true : false;
        $scope.timer = $timeout($scope.startTimer, 1000);

        if ($scope.timeLimit === 0) {
          $scope.stopTimer();
          $scope.isGuarding = true;
        }
      })();

      // Stop the timer when time is up
      $scope.stopTimer = function() {
        $timeout.cancel($scope.timer);
        $scope.inGame = false;
        $previousCard = null;
        currentSessionOpen = false;
        numberOfPairs = 0;
      }
    }
  });
}());
