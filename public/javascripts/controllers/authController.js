define([], function() {

    var ngInjections = ['$scope','authService'];

    function authController($scope, authService) {

        authService.redirect();

    };
    
  authController.$inject = ngInjections;

  return authController;
});