var express = require('express');
var router = express.Router();
var request = require('request');
const querystring = require('querystring');
var jsonReader = require('../jsonReader');



function isAuthenticated (req) {
	var redirect = "http://" + req.headers.host + "/" 

	if(req.query.code){
		return true;
	}
	return false;
}

function getToken (code, redirect_uri) {

	var tokenUrl = "https://accounts.spotify.com/api/token";
	var params = { grant_type : "authorization_code", code : code, redirect_uri: redirect_uri};
	var url = tokenUrl + "/?" + querystring.stringify(params);
	
	request(tokenUrl, function (error, response, body) {
    //Check for error
	    if(error){
	        return console.log('Error:', error);
	    }

	    //Check for right status code
	    if(response.statusCode !== 200){
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
		res.render('dashboard', { title: 'Logged in!'});
	} else {
		res.render('index', { title: 'Login pls' });
	}

});

module.exports = router;
