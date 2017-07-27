
var app = angular.module("ShoppingCart", []);

app.controller("ShoppingCartController", function ($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
    $scope.lowercaseProducts = [];

    $scope.addItem = function () {
        // Check the existing products
        $scope.products.forEach(function(product) {
            $scope.lowercaseProducts.push(product.toLowerCase());
        });
        $scope.errorText = "";

        if (!$scope.addItem) {
            return;
        }

        if ($scope.lowercaseProducts.indexOf($scope.item.toLowerCase()) == -1) {
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