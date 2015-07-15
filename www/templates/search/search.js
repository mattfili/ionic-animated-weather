angular

.module('starter')

.controller('SearchCtrl', function($scope, $http, GEOCODE) {

	$scope.display = true

	$scope.queryChanged = _.debounce(function () {
		$http
		.get(GEOCODE, {
			params: {address: $scope.query}
		})
		.success(function(data){
			$scope.cities = data.results
			$scope.display = false
		})

	}, 2000);




})
