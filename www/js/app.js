// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.constant('GEOCODE', 'https://maps.googleapis.com/maps/api/geocode/json')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search/search.html",
        controller: 'SearchCtrl',
      }
    }
  })

  .state('app.weather', {
    url: "/weather/:city/:lat/:long",
    views: {
      'menuContent': {
        templateUrl: "templates/weather/weather.html",
        controller: 'WeatherCtrl',
        controllerAs: 'WeatherCtrl'
      }
    }
  })
  .state('app.weather.modal', {
    url: "",
    views: {
      'modal': {
        // templateUrl: "templates/weather/modal.html",
        controller: 'modal',
        controllerAs: 'modal'
      }
    }
  })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent': {
          templateUrl: "templates/settings/settings.html",
          controller: 'settings',
          controllerAs: 'settings'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
  })

  .factory('Weather', function (WeatherData, $http, $stateParams) {
    return {

      date: function() {
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
        var datemonth = day + ',' + month

        WeatherData.formatdate = datemonth
      },

      getWeather: function() {
        $http
          .get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.long)
          .success(function (data){
   
            WeatherData.dataPush(data.currently, data.daily, data.hourly) 
            
            var iconFrame = data.hourly.data



            for (var i =0; i < iconFrame.length; i++)

              if (iconFrame[i].icon  === 'clear-day') {
                WeatherData.iconPush('sun.svg', i)

              } else if (iconFrame[i].icon ==='clear-night') {
                WeatherData.iconPush('moonPhase.svg', i)

              } else if (iconFrame[i].icon ==='rain' && iconFrame[i].summary==='Rain') {
                WeatherData.iconPush('cloudRain.svg', i)

              } else if (iconFrame[i].summary === 'Light Rain') {
                WeatherData.iconPush('cloudDrizzleAlt.svg', i)

              } else if (iconFrame[i].icon === 'rain' && iconFrame[i].summary==='Drizzle') {
                WeatherData.iconPush('cloudDrizzle.svg', i)

              } else if (iconFrame[i].icon ==='snow') {
                WeatherData.iconPush('cloudSnow.svg', i)

              } else if (iconFrame[i].icon ==='sleet') {
                WeatherData.iconPush('cloudSnowAlt.svg', i)

              } else if (iconFrame[i].icon ==='wind') {
                WeatherData.iconPush('wind.svg', i)

              } else if (iconFrame[i].icon ==='fog') {
                WeatherData.iconPush('cloudFog.svg', i)

              } else if (iconFrame[i].icon ==='cloudy') {
                WeatherData.iconPush('cloud.svg', i)

              } else if (iconFrame[i].icon ==='partly-cloudy-day') {
                WeatherData.iconPush('cloudSun.svg', i)

              } else if (iconFrame[i].icon ==='partly-cloudy-night') {
                WeatherData.iconPush('cloudMoon.svg', i)
              }

            

            var colorTime = data.hourly.data

            for (var i=0; i < colorTime.length; i++) {
              var unUnixDate = new Date(colorTime[i].time *1000)
              var formattedDate = unUnixDate.getHours();

            if (formattedDate >= 0 && formattedDate <=2 || formattedDate === 23) {
                WeatherData.colorPush('#071826', i);
              } else if (formattedDate >=3 && formattedDate <= 5){
                WeatherData.colorPush('#071940', i);
              } else if (formattedDate === 6 ){
                WeatherData.colorPush('#FA6551', i);
              } else if (formattedDate >= 7 && formattedDate <=11 ){
                WeatherData.colorPush('#2A91CF', i);
              } else if (formattedDate >= 12 && formattedDate <= 15){
                WeatherData.colorPush('#9DDEFF', i);
              } else if (formattedDate >= 16 && formattedDate <= 18){
                WeatherData.colorPush('#2A91CF', i);
              } else if (formattedDate === 19){
                WeatherData.colorPush('#FA6A67', i);
              } else if (formattedDate >= 20 && formattedDate <= 22){
                WeatherData.colorPush('#133778', i);
              } 
          }

        })


      }

    }
  })

  .filter('Time', function () {
    return function(input) {
        var unUnixDate = new Date(input*1000)
        var formattedDate = unUnixDate.getHours();
          if (formattedDate <= 23 && formattedDate >= 13) {
            var output = formattedDate-12 + 'pm'
          } else if (formattedDate === 0){
            var output = formattedDate+12 + 'am'
          } else if (formattedDate === 12){
            var output = formattedDate + 'pm'
          } else {
            var output = formattedDate + 'am'
          }
          return output;
        }
   })

   .filter('Percent', function () {
    return function(input) {
        var output = input * 100
        return output + '%'
        console.log(output)
    }
  })






