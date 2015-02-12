'use strict';

angular.module('yascApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }, ];

        $scope.logedInMenu = [{
            'title': 'Playlist',
            'link': '/playlist'
        },{
            'title': 'Tracks',
            'link': '/tracks'
        },{
            'title': 'Genres',
            'link': '/genres'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            // FIXME: too tired, don't know what this doesn't work (both).
            //        I've updated bower.json for the last version of Lo-Dash
            // return _.startsWith($location.path(), route);
            // return route.indexOf($location.path()) == 0;
            return $location.path() === route;
        };
    });
