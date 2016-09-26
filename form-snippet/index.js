
function OrderFormController($scope) {
	/*
      Define the model properties. The view will loop through the services array
      and generate a <li> element for each service
  */
  $scope.services = [
    {
      name: "Web Development",
      price: 300,
      active: true
    },
    {
      name: "Design",
      price: 400,
      active: false
    },
    {
      name: "Integration",
      price: 250,
      active: false
    },
    {
      name: "Training",
      price: 250,
      active: false
    }
  ];

  $scope.toggleActive = function(s) {
    s.active = !s.active;
  };

  // Helper method for calculating the total price
  $scope.total = function() {
    var total = 0;

    // Use the angular forEach helper method to loop through the services array
    angular.forEach($scope.services, function(s) {
      if (s.active) {
        total += s.price;
      }
    });
    
    return total;

  };

}