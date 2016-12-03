var app = angular.module('myApp', ['ngCookies']);

app.config(['$locationProvider', function($locationProvider) {
    // In order to get the query string from the
    // $location object, it must be in HTML5 mode.
    $locationProvider.html5Mode(true);
}]);

app.controller('PlaylistController', ['$scope', '$cookies', '$window', '$location', '$http',
    function Playlistcontroller($scope, $cookies, $window, $location, $http) {
        $scope.playlist = "Hullo";
        $scope.header1 = "Spotify Playlist Manager";
        $scope.loggedIn = $cookies.getObject('SpotifyToken') != null;

        if ($scope.loggedIn) {
            console.log($cookies.getObject('SpotifyToken'));
            $scope.text = "LOGGED IN!";
        }

        $scope.logOut = function() {
            $cookies.remove('SpotifyToken');
            $window.location.replace('/');
        };

        $scope.newPlaylist = "spotify-playlist-manager";
        $scope.createPlaylist = function() {
            var url = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString() + "createplaylist";
            var tracks = [];
            $scope.playlists.selectedtracks.forEach(function (e) {
              tracks.push(e.track.uri);
            });
            var postdata = { name: $scope.newPlaylist, token: $cookies.getObject('SpotifyToken'), playlist: $scope.playlists.selected, songs: tracks };
            var config = { 
                  url: url,
                  method: "POST",
                  data: postdata,
                  headers: {
                    'Content-Type': 'application/json'
                  }};
            console.log(config);
            $http(config).then(
                function(res) {
                    console.log("Playlist created!");
                    console.log(res);
                },
                function(res) {
                    console.log(res);
                }
            );
        }

        $scope.getPlaylists = function () {
            var url = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString() + "getplaylists";
            var postdata = { token: $cookies.getObject('SpotifyToken') };
            var config = { url: url, method: 'POST', data: postdata };
            console.log(url);
            $http(config).then(
                function(res) {
                    console.log(res);
                    $scope.playlists = { options: res.data.playlists.items};
                },
                function(res) {
                    console.log(res);
                }
            );

        };
        $scope.getTracks = function() {
            var url = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString() + "createplaylist";
            var postdata = { name: $scope.newPlaylist, token: $cookies.getObject('SpotifyToken'), playlist: $scope.playlists.selected };
            var config = { 
                  url: "https://api.spotify.com/v1/users/" +$scope.playlists.selected.owner.id+ "/playlists/" + $scope.playlists.selected.id  +"/tracks",
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + $cookies.getObject('SpotifyToken').access_token,
                      'Content-Type': 'application.json'
                  }};
            console.log(config);
            $http(config).then(
                function(res) {
                    console.log("Got tracks!");
                    console.log(res);
                    $scope.playlists.selectedtracks = res.data.items;
                },
                function(res) {
                    console.log(res);
                }
            );          
        }
        $scope.getPlaylists();


    }
]);

app.controller('NavController', ['$scope', '$cookies', '$window',
    function NavController($scope, $cookies, $window) {
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
]);

app.controller('AuthController', ['$scope', '$http', '$cookies', '$location', '$window',
    function AuthController($scope, $http, $cookies, $location, $window) {

        $scope.header1 = "Spotify Playlist Manager";
        var query = $location.search();
        console.log(query);


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


    }
]);

