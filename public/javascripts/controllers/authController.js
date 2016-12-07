define([], function() {
    function authController($scope, $http, $cookies, $location, $window) {
        var query = $location.search();

        if (query.error == "access_denied") {
            console.log("access denied!")
                //$window.location.replace('/failed');
            return;
        }

        var url = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString();
        var config = { url: url, method: 'POST', data: { code: query.code } };
        console.log(url);
        $http(config).then(
            function(res) {
                console.log(res.data);
                $cookies.putObject('SpotifyToken', res.data);
                console.log("Cookie:" + $cookies.getObject('SpotifyToken'));
                $window.location.replace('/');
            },
            function(res) {
                $window.location.replace('/failed');
                console.log(res);
            }
        );

  authController.$inject=['$scope','$http', '$cookies', '$location', '$window'];

  return authController;
}});