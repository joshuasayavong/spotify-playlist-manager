require.config({
  paths: {
    angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies.js',
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min",
    angularCookies: "//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies.js",
  },
  shim: {
    'angular' : {'exports' : 'angular'},
    'angularCookies': ['angular']
  },
  priority: [
    'angular'
  ]
});

require([
  'angular',
  'appModule',
  'angularCookies'
], function(angular, app, ngCookies) {
  'use strict';
  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app['myApp']]);
  });
});