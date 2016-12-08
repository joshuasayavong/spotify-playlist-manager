require.config({

    // alias libraries paths
    baseUrl: "/javascripts",
    paths: {
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'angular': '/bower_components/angular/angular',
        'angular-cookies': '/bower_components/angular-cookies/angular-cookies'          
    },
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-cookies':{
            deps:['angular']
        }

    }
});

define(['angular', 'appModule'], function (angular, app) {
    'use strict';
    
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        angular.bootstrap(document.documentElement, [app.name]);
    } else {
        document.onreadystatechange = function () {
            if (document.readyState === 'interactive') {
                angular.bootstrap(document.documentElement, [app.name]);
            }
        };
    }
});