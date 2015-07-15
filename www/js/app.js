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
        controller: 'WeatherCtrl'
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

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
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
  $urlRouterProvider.otherwise('/app/playlists');
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
      console.log(WeatherData.formatdate)
    },

    getWeather: function() {
      $http
        .get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.long)
        .success(function (data){
 
          WeatherData.dataPush(data.currently, data.daily) 
          var icon = data.currently.icon

          console.log(data.currently.icon)

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

          WeatherData.imgPush(icon) 
      })
    }

  }
})


