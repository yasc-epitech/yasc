'use strict';

angular.module('yascApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });


angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });


angular.module('yascApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });


angular.module('yascApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });


angular.module('yascApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });


angular.module('yascApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });


angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });


angular.module('yascApp')
  .controller('GenresCtrl', function ($scope, $http, socket) {
    $scope.genres = [];

    $http.get('/api/genres').success(function(genres) {
      $scope.genres = genres;
      socket.syncUpdates('genre', $scope.genres);
    });

    $scope.deleteGenre = function(genre) {
      $http.delete('/api/genres/' + genre._id);
      _.remove($scope.genres, function(item) { return item._id === genre._id });
    };

    $scope.addGenre = function() {
      if($scope.newGenre === '') {
        return;
      }
      var newGenre = { name: $scope.newGenre };
      $http.post('/api/genres', newGenre);
      $scope.newGenre = '';
      $scope.genres.push(newGenre);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('genre');
    });
  });


angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/genres', {
        templateUrl: 'app/genres/genres.html',
        controller: 'GenresCtrl'
      });
  });


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


angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });


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



angular.module('yascApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tracks', {
        templateUrl: 'app/tracks/track.list.html',
        controller: 'TracksCtrl'
      })
      .when('/tracks/:track_id', {
        templateUrl: 'app/tracks/track.detail.html',
        controller: 'TrackDetailCtrl'
      });
  });
