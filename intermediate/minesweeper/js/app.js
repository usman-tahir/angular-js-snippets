
var app = angular.module("Minesweeper", []);

app.controller("MinesweeperController", function($scope) {
    $scope.minefieldSize = 9;
    $scope.minefield = createMinefield(); // Default is 9

    $scope.uncoverSpot = function (spot) {
        spot.isRevealed = true;

        if (spot.content == "mine") {
            $scope.hasLostMessageVisible = true;
        } else {
            if (hasWon($scope.minefield)) {
                $scope.hasWonMessageVisible = true;
            }
        }
    }

    function createMinefield() {
        var minefield = {},
            i,
            j,
            k;

        minefield.rows = [];

        for (i = 0; i < $scope.minefieldSize; i += 1) {
            var row = {};
            row.spots = [];

            for (j = 0; j < $scope.minefieldSize; j += 1) {
                var spot = {};
                spot.isRevealed = false;
                spot.content = "empty";
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }

        // Add mines based on the size of the board
        // Revise later to an algorithmic approach to adding mines
        for (k = 0; k < $scope.minefieldSize; k += 1) {
            placeRandomMine(minefield, $scope.minefieldSize);
        }
        calculateNeighboringNumbers(minefield);
        return minefield;
    }

    function getSpot(minefield, row, column) {
        return minefield.rows[row].spots[column];
    }

    function placeRandomMine(minefield, size) {
        var row = Math.round(Math.random() * (size - 1)),
            column = Math.round(Math.random() * (size - 1)),
            spot = getSpot(minefield, row, column);
        spot.content = "mine";
    }

    function calculateNeighboringMines(minefield, row, column) {
        var currentSpot = getSpot(minefield, row, column),
            mineCount = 0,
            tempSpot;

        if (currentSpot.content == "mine") {
            return;
        }

        if (row > 0) {
            if (column > 0) {
                tempSpot = getSpot(minefield, row - 1, column - 1);
                if (tempSpot.content == "mine") mineCount += 1;
            }

            tempSpot = getSpot(minefield, row - 1, column);
            if (tempSpot.content == "mine") mineCount += 1;

            if (column < ($scope.minefieldSize - 1)) {
                tempSpot = getSpot(minefield, row - 1, column + 1);
                if (tempSpot.content == "mine") mineCount += 1;
            }
        }

        if (column > 0) {
            tempSpot = getSpot(minefield, row, column - 1);
            if (tempSpot.content == "mine") mineCount += 1;
        }

        if (column < ($scope.minefieldSize - 1)) {
            tempSpot = getSpot(minefield, row, column + 1);
            if (tempSpot.content == "mine") mineCount += 1;
        }

        if (row < ($scope.minefieldSize - 1)) {
            if (column > 0) {
                tempSpot = getSpot(minefield, row + 1, column - 1);
                if (tempSpot.content == "mine") mineCount += 1;
            }

            tempSpot = getSpot(minefield, row + 1, column);
            if (tempSpot.content == "mine") mineCount += 1;

            if (column < ($scope.minefieldSize - 1)) {
                tempSpot = getSpot(minefield, row + 1, column + 1);
                if (tempSpot.content == "mine") mineCount += 1;
            }
        }

        if (mineCount > 0) {
            currentSpot.content = mineCount;
        }
    }

    function calculateNeighboringNumbers(minefield) {
        var i,
            j;
        
        for (i = 0; i < $scope.minefieldSize; i += 1) {
            for (j = 0; j < $scope.minefieldSize; j += 1) {
                calculateNeighboringMines(minefield, j, i);
            }
        }
    }

    function hasWon(minefield) {
        var currentSpot,
            x,
            y;
        
        for (x = 0; x < $scope.minefieldSize; x += 1) {
            for (y = 0; y < $scope.minefieldSize; y += 1) {
                currentSpot = getSpot(minefield, y, x);
                if (currentSpot.isRevealed && currentSpot.content != "mine") {
                    return false;
                }
            }
        }
        return true;
    }
});