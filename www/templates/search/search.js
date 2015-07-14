angular

.module('starter')

.controller('SearchCtrl', function($scope, $http, GEOCODE) {

	$scope.queryChanged = _.debounce(function () {
		$http
		.get(GEOCODE, {
			params: {address: $scope.query}
		})
		.success(function(data){
			$scope.cities = data.results
		})

	}, 2000);




})
