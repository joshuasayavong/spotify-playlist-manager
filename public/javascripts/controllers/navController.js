define([], function() {
    
    function navController($scope, $cookies, $window) {
        $scope.playlist = "Hullo";
        $scope.loggedIn = $cookies.getObject('SpotifyToken') != null;

        if ($scope.loggedIn) {
            console.log($cookies.getObject('access_token'));
            $scope.text = "LOGGED IN!";
        }

        $scope.logIn = function() {
            $window.location.replace('/login');
        }

        $scope.logOut = function() {
            $cookies.remove('SpotifyToken');
            $window.location.replace('/');
        }
    }

    navController.$inject = ['$scope', '$cookies', '$window'];

    return navController;
});
