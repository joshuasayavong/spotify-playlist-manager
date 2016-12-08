define([], function() {
    
    var ngInjections = ['$scope', 'navService'];

    function navController($scope, navService) {
        $scope.playlist = "Hullo";

        if (navService.isLoggedIn()) {
            $scope.text = "LOGGED IN!";
        }

        $scope.logIn = navService.logIn;

        $scope.logOut = navService.logOut;

        $scope.loggedIn=navService.isLoggedIn();
    }

    navController.$inject = ngInjections;

    return navController;
});
