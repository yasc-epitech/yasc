'use strict';

angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/playlist', {
        templateUrl: 'app/playlist/playlist.list.html',
        controller: 'PlaylistCtrl'
      })
      .when('/playlist/:playlist_id', {
        templateUrl: 'app/playlist/playlist.detail.html',
        controller: 'PlaylistDetailCtrl'
      });
  });
