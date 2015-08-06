angular

.module('starter')

.service('WeatherData', function() {
	this.currently = {};
	this.hourly = {};
	this.daily = {};
	this.formatdate = {};
	this.img = {};

	this.dataPush = function (current, daily, hourly) {
		this.currently = current;
		this.daily = daily;
		this.hourly = hourly;
	}

	this.imgPush = function (icon) {
		this.img = icon;
	}

	this.colorPush = function (color, i) {
		this.hourly.data[i].color = color
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