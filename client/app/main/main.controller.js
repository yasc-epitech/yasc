'use strict';

angular.module('yascApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.awesomeTracks = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/tracks').success(function(awesomeTracks) {
      $scope.awesomeTracks = awesomeTracks;
      socket.syncUpdates('track', $scope.awesomeTracks);
    });

    $scope.deleteTrack = function(track) {
      $http.delete('/api/tracks/' + track._id);
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('track');
      socket.unsyncUpdates('thing');
    });
  });
