'use strict';

angular.module('yascApp')
  .controller('PlaylistCtrl', function ($scope, $http, socket) {
    $scope.playlists = [];

    $http.get('/api/playlists').success(function(playlists) {
      $scope.playlists = playlists;
      socket.syncUpdates('playlist', $scope.playlists);
    });

    $scope.deletePlaylist = function(playlist) {
      $http.delete('/api/playlists/' + playlist._id);
    };

    $scope.addPlaylist = function() {
      if($scope.newPlaylist === '') {
        return;
      }
      $http.post('/api/playlists', { title: $scope.newPlaylist });
      $scope.newPlaylist = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('playlist');
    });
  });
