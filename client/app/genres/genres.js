'use strict';

angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/genres', {
        templateUrl: 'app/genres/genres.html',
        controller: 'GenresCtrl'
      });
  });
