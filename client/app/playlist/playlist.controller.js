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
      _.remove($scope.playlists, function(item) { return item._id === playlist._id });
    };

    $scope.addPlaylist = function() {
      if($scope.newPlaylist === '') {
        return;
      }
      var newPlaylist = { title: $scope.newPlaylist };
      $http.post('/api/playlists', newPlaylist);
      $scope.newPlaylist = '';
      $scope.playlists.push(newPlaylist);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('playlist');
    });
  })
  .controller('PlaylistDetailCtrl', function ($http, $scope, $routeParams) {
    $scope.playlist = {};
    $scope.tracks = {};

    var playlist_id = $routeParams.playlist_id;

    $http.get('/api/playlists/' + playlist_id).success(function(playlist) {
      $scope.playlist = playlist;
    });
    $http.get('/api/tracks/').success(function(tracks) {
      $scope.tracks = tracks;
    });

    $scope.playTrack = function(track) {
      var widgetIframe = document.getElementById('sc-widget'),
      widget = SC.Widget(widgetIframe)
      widget.load('http://api.soundcloud.com/tracks/' + track.url, {
        show_artwork: false,
        auto_play: true
      });
    };

  });
