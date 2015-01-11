'use strict';

angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/playlist', {
        templateUrl: 'app/playlist/playlist.html',
        controller: 'PlaylistCtrl'
      });
  });
