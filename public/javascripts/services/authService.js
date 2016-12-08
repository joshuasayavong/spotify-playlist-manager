define([], function() {

    var ngInjections = ['$http', '$location', '$cookies', '$window'];

    function authService( $http, $location, $cookies, $window) {
        var self = this;
        
        self.redirect = function() {
            var url = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString();
            var query = $location.search();
            var config = { url: url, method: 'POST', data: { code: query.code } };

            $http(config).then(
                function(res) {
                    $cookies.putObject('SpotifyToken', res.data);
                    $window.location.replace('/');
                },
                function(res) {
                    $window.location.replace('/');
                }
            );

        };


    };
    
    authService.$inject = ngInjections;

    return authService;
});
