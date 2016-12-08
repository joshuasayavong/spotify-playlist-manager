define([], function() {

    var ngInjections = ['$cookies', '$window'];

    function navService( $cookies, $window) {

        var self = this;

        self.isLoggedIn = function() {
            return $cookies.getObject('SpotifyToken') != null;
        }

        self.logIn = function() {
            $window.location.replace('/login');
        }

        self.logOut = function() {
            $cookies.remove('SpotifyToken');
            $window.location.replace('/');
        }
    }    

    navService.$inject = ngInjections;

    return navService;
});
