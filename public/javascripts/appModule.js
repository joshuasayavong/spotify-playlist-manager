define([
        'controllers/authController',
        'controllers/playlistController',
        'controllers/navController'
    ],

    function(authController, playlistController, navController) {
        var app = angular.module('myApp', ['ngCookies']);
        app.config(['$locationProvider', function($locationProvider) {
            // In order to get the query string from the
            // $location object, it must be in HTML5 mode.
            $locationProvider.html5Mode(true);
        }]);
        //    app.factory('ideasDataSvc',ideasDataSvc);
        //    app.controller('ideasHomeController', ideasHomeController);

        app.controller('PlaylistController', playlistController);

        app.controller('NavController', navController);
        app.controller('AuthController', authController);
        return angular.bootstrap(document, ['myApp']);
    });
