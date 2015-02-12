'use strict';

angular.module('yascApp')
    .controller('TracksCtrl', function ($scope, $http, $location, socket) {
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

        $scope.gotoTrack = function(track_id) {
            $location.path('/tracks/' + track_id);
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
            var widgetIframe = document.getElementById('sc-widget'),
            widget = SC.Widget(widgetIframe)
            widget.load('http://api.soundcloud.com/tracks/' + track.url, {
            show_artwork: true,
            auto_play: true
          });

        });

    });

