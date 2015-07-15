angular

.module('starter')

.service('WeatherData', function() {
	this.currently = {};
	this.daily = {};
	this.formatdate = {};
	this.img = {};

	this.dataPush = function (current, daily) {
		this.currently = current
		this.daily = daily
	}

	this.imgPush = function (icon) {
		this.img = icon
	}

})

.factory('Settings', function(){
	return {
		scale: 'F',
		precision: 1
	}
})

.factory('LocalStorage', function () {
	return {
		storeScale: function(data) {
			localStorage.scale = data
		},
		storePrecision: function(data) {
			localStorage.precision = data
		}

	}
})