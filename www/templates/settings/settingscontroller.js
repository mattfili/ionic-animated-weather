angular

.module('starter')

.controller('settings', function ($scope, $http, Weather, WeatherData, Settings, LocalStorage) {
	$scope.scale = !localStorage.scale ? Settings.scale : localStorage.scale
	$scope.precision = !localStorage.precision ? Settings.precision : localStorage.precision

	$scope.randomScale = function () {
		$ionicLoading.show({
			template: '<img src="img/whathappening.gif">',
			duration: 5000
		})
	}

	$scope.precisionChanged = function () {
		console.log($scope.precision)
	}

	$scope.$watch('scale', function() {
		LocalStorage.storeScale($scope.scale)
	})


	$scope.$watch('precision', function() {
		LocalStorage.storePrecision($scope.precision)
	})



})