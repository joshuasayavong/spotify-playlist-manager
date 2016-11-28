var express = require('express');
var router = express.Router();
var request = require('request');
const querystring = require('querystring');
var jsonReader = require('../jsonReader');



function isAuthenticated(req) {
    var redirect = "http://" + req.headers.host + "/"

    if (req.query.code) {
        return true;
    }
    return false;
}

function getToken(code, redirect_uri) {

    var tokenUrl = "https://accounts.spotify.com/api/token";
    var params = { grant_type: "authorization_code", code: code, redirect_uri: redirect_uri };
    var url = tokenUrl + "/?" + querystring.stringify(params);

    request(tokenUrl, function(error, response, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        //All is good. Print the body
        console.log(body); // Show the HTML for the Modulus homepage.

    });
}

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
        	console.log(response.body);
            var userId = response.body.id
            var options2 = {
                url: 'https://api.spotify.com/v1/users/' + userId + '/playlists',
                body: JSON.stringify({
                    name: req.body.name
                }),
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                },
                dataType:'json',
            };
            console.log(options2);
            request.post(options2, function(error2, response2, body2) {
                if (body2) {
                    console.log(body2);
                }
                if (response2) {
                    console.log(response2.body);
                    console.log(response2.body.access_token);
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

module.exports = router;
