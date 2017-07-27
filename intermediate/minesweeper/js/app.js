
var app = angular.module("Minesweeper", []);

app.controller("MinesweeperController", function($scope) {
    $scope.minefield = createMinefield(7); // Default is 7

    function createMinefield(size) {
        var minefield = {},
            i,
            j;

        minefield.rows = [];

        for (i = 0; i < size; i += 1) {
            var row = {};
            row.spots = [];

            for (j = 0; j < size; j += 1) {
                var spot = {};
                spot.isRevealed = false;
                spot.content = "empty";
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        placeRandomMine(minefield, size); // One mine
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
});