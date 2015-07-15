angular

.module('starter')

.controller('WeatherCtrl', function ($scope, $http, $stateParams, $ionicModal, Weather, WeatherData) {

	$scope.city = $stateParams.city


	$ionicModal.fromTemplateUrl('templates/weather/modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  		}).then(function(modal) {
	    	$scope.modal = modal;
	  	});
	  	$scope.openModal = function() {
	    $scope.modal.show();
	  	};
	  	$scope.closeModal = function() {
	  	  $scope.modal.hide();
	  	};
	  	$scope.$on('$destroy', function() {
	    	$scope.modal.remove();
	  	});
	 

	(function() {
		Weather.getWeather()
		Weather.date()
		$scope.date = WeatherData.formatdate.toString()
		$scope.data = WeatherData
		console.log(WeatherData)
	})();

	$scope.forecast = $scope.data.daily.data

	


	

	// $scope.city = $stateParams.city;

	


})

