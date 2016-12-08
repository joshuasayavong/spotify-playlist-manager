define([
        'require',
        'angular',
        'angular-cookies',
        'controllers/authController',
        'controllers/playlistController',
        'controllers/navController',
        'services/authService',
        'services/navService',
        'services/playlistService'
    ],

    function(require, angular, ngCookies, 
        authController, playlistController, navController, 
        authService, navService, playlistService) {
        var app = angular.module('myApp', ['ngCookies']);
        
        app.config(['$locationProvider', function($locationProvider) {
            // In order to get the query string from the
            // $location object, it must be in HTML5 mode.
            $locationProvider.html5Mode(true);
        }]);
        //    app.factory('ideasDataSvc',ideasDataSvc);
        //    app.controller('ideasHomeController', ideasHomeController);


        app.service('authService', authService);
        app.service('navService', navService);
        app.service('playlistService', playlistService)

        app.controller('PlaylistController', playlistController);
        app.controller('NavController', navController);
        app.controller('AuthController', authController);



        return app;
    });
