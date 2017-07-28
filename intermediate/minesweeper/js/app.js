
var app = angular.module("Minesweeper", []);

app.controller("MinesweeperController", function($scope) {
    $scope.minefieldSize = 9;
    $scope.minefield = createMinefield(); // Default is 9

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
        console.log(minefield);
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

    function updateMineCount(spot, mineCount) {
        if (spot.content == "mine") mineCount += 1;
        return mineCount;
    }

    function calculateNeighboringMines(minefield, row, column) {
        var currentSpot = getSpot(minefield, row, column),
            mineCount = 0,
            tempSpot;
        console.log(currentSpot);

        // If the current spot contains a mine, it does not get allocated a number
        if (currentSpot.content == "mine") {
            return;
        }

        // Check the row above
        if (row > 0) {
            // Check the column to the left
            if (column > 0) {
                // Get the spot above and to the left
                tempSpot = getSpot(minefield, row - 1, column - 1);
                updateMineCount(tempSpot, mineCount);
            }

            tempSpot = getSpot(minefield, row - 1, column);
            mineCount = updateMineCount(tempSpot, mineCount);

            if (column < ($scope.minefieldSize - 1)) {
                tempSpot = getSpot(minefield, row - 1, column + 1);
                mineCount = updateMineCount(tempSpot, mineCount);
            }
        }

        if (column > 0) {
            tempSpot = getSpot(minefield, row, column - 1);
            mineCount = updateMineCount(tempSpot, mineCount);
        }

        if (column < ($scope.minefieldSize - 1)) {
            tempSpot = getSpot(minefield, row, column + 1);
            mineCount = updateMineCount(tempSpot, mineCount);
        }

        if (row < ($scope.minefieldSize - 1)) {
            if (column > 0) {
                tempSpot = getSpot(minefield, row + 1, column - 1);
                mineCount = updateMineCount(tempSpot, mineCount);
            }

            tempSpot = getSpot(minefield, row + 1, column);
            mineCount = updateMineCount(tempSpot, mineCount);

            if (column < ($scope.minefieldSize - 1)) {
                tempSpot = getSpot(minefield, row + 1, column + 1);
                mineCount = updateMineCount(tempSpot, mineCount);
            }
        }

        if (mineCount > 0) {
            tempSpot.content = mineCount;
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
});