define([], function() {

    var ngInjections = [ '$cookies', '$window', '$location', '$http'];

    function playlistService( $cookies, $window, $location, $http) {
        var self = this;

        self.getBaseUrl = function () {
            return ($location.protocol() + "://" + $location.host() + ":" + $location.port() + $location.path()).toString();
        };

        self.createPlaylist = function(name, selectedPlaylist, trackObjects) {

            var url = self.getBaseUrl() + "createplaylist";
            var tracks = [];

            trackObjects.forEach(function(e) {
                tracks.push(e.track.uri);
            });

            var postdata = { name: name, 
                token: $cookies.getObject('SpotifyToken'), 
                playlist: selectedPlaylist, 
                songs: tracks 
            };

            var config = {
                url: url,
                method: "POST",
                data: postdata,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

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

        self.getPlaylists = function() {

            var url = self.getBaseUrl() + "getplaylists";

            var postdata = { token: $cookies.getObject('SpotifyToken') };

            var config = { url: url, 
                method: 'POST', 
                data: postdata };

            console.log(url);

            return $http(config);

        };

        self.getTracks = function( ownerId, playlistId) {
            var url = self.getBaseUrl() + "createplaylist";
            var postdata = { name: ownerId, token: $cookies.getObject('SpotifyToken'), playlist: playlistId };
            var config = {
                url: "https://api.spotify.com/v1/users/" + ownerId + "/playlists/" + playlistId + "/tracks",
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $cookies.getObject('SpotifyToken').access_token,
                    'Content-Type': 'application.json'
                }
            };
            console.log(config);
            return $http(config);
        }

    }

    playlistService.$inject = ngInjections;

    return playlistService;
});
