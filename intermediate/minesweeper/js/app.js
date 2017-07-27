
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
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        return minefield;
    }
});