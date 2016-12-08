define([], function() {

    var ngInjections = ['$scope', '$cookies', '$window', '$location', '$http', 'playlistService'];

    function playlistController($scope, $cookies, $window, $location, $http, playlistService) {
        $scope.playlist = "Hullo";
        $scope.header1 = "Spotify Playlist Track Streamer";
        $scope.loggedIn = $cookies.getObject('SpotifyToken') != null;
        
        $scope.updatePlaylists = function(res) {
            console.log(res);
            $scope.playlists = { options: res.data.playlists.items };
        };

        $scope.displayError = function(res) {
            console.log(res);
        };

        $scope.updateTracks = function(res) {
            console.log("Got tracks!");
            console.log(res);
            $scope.playlists.selectedtracks = res.data.items;
        }

        if ($scope.loggedIn) {
            console.log($cookies.getObject('SpotifyToken'));
            $scope.text = "LOGGED IN!";
        }

        $scope.logOut = function() {
            $cookies.remove('SpotifyToken');
            $window.location.replace('/');
        };

        $scope.newPlaylist = "spotify-playlist-manager";

        $scope.createPlaylist = function(){ 
            playlistService.createPlaylist($scope.newPlaylist, $scope.playlists.selected, $scope.playlists.selectedtracks);
        };

        $scope.getPlaylists = function () { 
            playlistService.getPlaylists().then(
            $scope.updatePlaylists,
            $scope.displayError
        );
    }

        $scope.getTracks = function() {
            playlistService.getTracks($scope.playlists.selected.owner.id, $scope.playlists.selected.id).then(
            $scope.updateTracks, $scope.displayError);
        }




        $scope.getPlaylists();

    }

    playlistController.$inject = ngInjections;

    return playlistController;
});
