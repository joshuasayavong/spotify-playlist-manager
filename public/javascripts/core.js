require.config({
  paths: {
    'jquery': "https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min",
    'ngCookies': "//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-cookies",
  },
  waitSeconds: 40
});

require([
  'appModule',
  'ngCookies'
], function(app, ngCookies) {

    
});