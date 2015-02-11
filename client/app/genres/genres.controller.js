'use strict';

angular.module('yascApp')
  .controller('GenresCtrl', function ($scope, $http, socket) {
    $scope.genres = [];

    $http.get('/api/genres').success(function(genres) {
      $scope.genres = genres;
      socket.syncUpdates('genre', $scope.genres);
    });

    $scope.deleteGenre = function(genre) {
      $http.delete('/api/genres/' + genre._id);
    };

    $scope.addGenre = function() {
      if($scope.newGenre === '') {
        return;
      }
      $http.post('/api/genres', { name: $scope.newGenre });
      $scope.newGenre = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('genre');
    });
  });
