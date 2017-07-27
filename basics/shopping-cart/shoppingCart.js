
var app = angular.module("ShoppingCart", []);

app.controller("ShoppingCartController", function ($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
    

    $scope.addItem = function () {
        $scope.errorText = "";

        if (!$scope.addItem) {
            return;
        }

        if ($scope.products.indexOf($scope.item) == -1) {
            $scope.products.push($scope.item);
            $scope.item = ''; // Clear the input
        } else {
            $scope.errorText = "The item is already in your shopping list.";
        }
    }

    $scope.removeItem = function (i) {
        $scope.products.splice(i, 1);
    }
});