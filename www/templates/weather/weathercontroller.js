angular

.module('starter')

.controller('WeatherCtrl', function ($scope, $http, $stateParams, $ionicModal, Weather, WeatherData) {	 


	(function() {
		Weather.getWeather()
		Weather.date()
		$scope.date = WeatherData.formatdate.toString()
		$scope.data = WeatherData
	})();




	

	// $scope.city = $stateParams.city;

	


})

