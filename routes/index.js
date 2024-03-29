var express = require('express');
var router = express.Router();
var request = require('request');
const querystring = require('querystring');
var jsonReader = require('../jsonReader');
var spotifyapi = require('../spotifyapi');

function isAuthenticated(req) {
    var redirect = "http://" + req.headers.host + "/"

    if (req.query.code) {
        return true;
    }

    return false;
}



function transferSongs(user, oldPlaylist, newPlaylist, access_token, trackids) {


    var playlistId = JSON.parse(newPlaylist).id;

    var options = {
        url: "https://api.spotify.com/v1/users/" + oldPlaylist.owner.id + "/playlists/" + oldPlaylist.id + "/tracks",
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application.json'
        }
    };
    console.log("Options below:");
    console.log(options);
    request.get(options, function(error, response, body) {
        if (body) {
            //console.log(body);
        }
        if (response) {
            console.log("Got tracks list");
            //console.log(response.body.items);
            var tracks = [];
            //var t = (response.body).items;
            //console.log(t);
            //t.forEach(function (element) {
            //	console.log(element.name);
            //	tracks.append(element.track.uri);
            //});

            var options2 = {
                url: 'https://api.spotify.com/v1/users/' + user.id + '/playlists/' + playlistId + '/tracks',
                body: JSON.stringify({
                    uris: trackids
                }),
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            };
            console.log(options2);
            request.post(options2, function(error2, response2, body2) {
                if (body2) {
                    console.log(body2);
                }
                if (response2) {
                    console.log(response2.body);

                }
                if (error2) {
                    console.log(error2);
                }

            });

        }
        if (error) {
            console.log(error2);
        }

    });

};

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(isAuthenticated);
    console.log(req.query);

    if (isAuthenticated(req)) {
        res.render('dashboard', { title: 'Logged in!' });
    } else {
        res.render('index', { title: 'Login pls' });
    }

});

router.post('/createplaylist', function(req, res, next) {

    var access_token = req.body.token.access_token;
    var originalPlaylist = req.body.playlist;
    console.log("originalPlaylist");
    console.log(originalPlaylist);
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {

        if (body) {
            console.log(body);
        }
        if (response) {
            var userId = response.body.id
            var playlistName = "No Name";
            if (req.body.name)
            	playlistName = req.body.name;
            var options2 = {
                url: 'https://api.spotify.com/v1/users/' + userId + '/playlists',
                body: JSON.stringify({
                    name: playlistName
                }),
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
            };

            request.post(options2, function(error2, response2, body2) {
                if (body2) {
                    console.log(body2);
                }
                if (response2) {

                    console.log("got player");
                    transferSongs(response.body, originalPlaylist, response2.body, access_token, req.body.songs);
                    res.send(response2.body);
                }
                if (error2) {
                    console.log(error2);
                }

            });
        }
        if (error) {
            console.log(error);
        }

    });




});
router.post('/getplaylists', function(req, res, next) {

    var access_token = req.body.token.access_token;
    var options = {
        url: 'https://api.spotify.com/v1/browse/featured-playlists',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {

        if (body) {
            console.log(body);
        }
        if (response) {
            console.log(response.body);
            res.send(response.body);
        }
        if (error) {
            console.log(error);
        }

    });

});

module.exports = router;
