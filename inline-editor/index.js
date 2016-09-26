
/*
		The controller is a regular JavaScript function. It is called once, when
		AngularJS runs into the ng-controller declaration
*/
function InlineEditorController($scope) {
	/*
			$scope is a special object that makes its properties available to the view
			variables. Default values are set below:
	*/
	$scope.showTooltip = false;
	$scope.value = "Edit me.";

	// Some helper functions that will be available in the angular declarations
	$scope.hideTooltip = function () {
		/*
				When a model is changed, the view will be automatically updated by AngularJS -
				In this case, it will hide the tooltip
		*/
		$scope.showTooltip = false;
	}

	$scope.toggleTooltip = function(e) {
		e.stopPropagation();
		$scope.showTooltip = !$scope.showTooltip;
	}
}