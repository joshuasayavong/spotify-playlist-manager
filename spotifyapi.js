var fs = require("fs"),
    json;

var spotifyapi = {

	requestToken: function (file){
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
}

module.exports = spotifyapi;