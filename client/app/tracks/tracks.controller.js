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
        };

        $scope.addTrack = function() {
            if($scope.newTrack === '') {
                return;
            }
            $http.post('/api/tracks', { title: $scope.newTrack });
            $scope.newTrack = '';
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('track');
        });
    })

    .controller('TrackDetailCtrl', function ($scope, $http, $routeParams) {
        $scope.track = {};
        var track_id = $routeParams.track_id;
        $http.get('/api/tracks/' + track_id).success(function(track) {
            $scope.track = track;
        });
    });

