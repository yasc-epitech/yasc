'use strict';

angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tracks', {
        templateUrl: 'app/tracks/track.list.html',
        controller: 'TracksCtrl'
      })
      .when('/tracks/:track_id', {
        templateUrl: 'app/tracks/track.detail.html',
        controller: 'TrackDetailCtrl'
      });
  });
