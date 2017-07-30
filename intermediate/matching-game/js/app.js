(function () {
  "use strict";

  var app = angular.module("MatchingGame", []);

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
