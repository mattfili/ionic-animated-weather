angular

.module('starter')

.controller('WeatherCtrl', function($scope, $http, $stateParams, $ionicModal) {


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


	(function () {
		var day = new Date().toDateString().substring(0, 3)
		var month = new Date().toDateString().substring(3)
		if (day === 'Tue') {
			day = 'Tuesday'
		} else if (day ==='Wed') {
			day = 'Wednesday'
		} else if (day ==='Thur') {
			day = 'Thursday'
		} else if (day ==='Fri') {
			day = 'Friday'
		} else if (day ==='Sat') {
			day = 'Saturday'
		} else if (day ==='Sun') {
			day = 'Sunday'
		} else if (day ==='Mon') {
			day = 'Monday'
		}

		$scope.date = day + ',' + month

	})();

	

	$scope.city = $stateParams.city;

	$http
		.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.long)
		.success(function (data){
			$scope.current = data.currently
			$scope.forecast = data.daily
			var icon = data.currently.icon
			console.log(icon)

			if (icon  === 'clear-day') {
				icon = 'http://media.giphy.com/media/JPumw7ImWiego/giphy.gif'
			} else if (icon ==='clear-night') {
				icon = 'https://media4.giphy.com/media/aprk75CTbT2IU/200.gif'
			} else if (icon ==='rain') {
				icon = 'https://media3.giphy.com/media/5f1tNZVLs2Lny/200.gif'
			} else if (icon ==='snow') {
				icon = 'https://media2.giphy.com/media/BDucPOizdZ5AI/200.gif'
			} else if (icon ==='sleet') {
				icon = 'https://media0.giphy.com/media/jrAjSZWmHVcaY/200.gif'
			} else if (icon ==='wind') {
				icon = 'https://media3.giphy.com/media/pqmyGJ2R8eBRC/200.gif'
			} else if (icon ==='fog') {
				icon = 'https://media3.giphy.com/media/10v3lzFmbemHv2/200_s.gif'
			} else if (icon ==='cloudy') {
				icon = 'https://media3.giphy.com/media/p5683tgqzyl1e/200_s.gif'
			} else if (icon ==='partly-cloudy-day') {
				icon = 'https://media3.giphy.com/media/DJsg1IjMronNm/200.gif'
			} else if (icon ==='partly-cloudy-night') {
				icon = 'https://media1.giphy.com/media/D7dgAXOv9yRLG/200.gif'
			}


			$scope.img = icon


		})

})

