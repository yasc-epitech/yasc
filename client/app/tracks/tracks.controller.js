'use strict';

angular.module('yascApp')
  .controller('TracksCtrl', function ($scope, $http, socket) {
    $scope.tracks = [];

    $http.get('/api/tracks').success(function(tracks) {
      $scope.tracks = tracks;
      socket.syncUpdates('track', $scope.tracks);
    });

    $scope.deleteTrack = function(track) {
      $http.delete('/api/tracks/' + track._id);
      _.remove($scope.tracks, function(item) { return item._id === track._id });
    };

    $scope.addTrack = function() {
      if($scope.newTrack === '') {
        return;
      }
      var newTrack = { title: $scope.newTrack };
      $http.post('/api/tracks', newTrack);
      $scope.newTrack = '';
      $scope.tracks.push(newTrack);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('track');
    });
  });
