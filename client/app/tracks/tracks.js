'use strict';

angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tracks', {
        templateUrl: 'app/tracks/tracks.html',
        controller: 'TracksCtrl'
      });
  });
