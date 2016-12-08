var express = require('express');
var router = express.Router();
var request = require('request');
const querystring = require('querystring');
var jsonReader = require('../jsonReader');



router.get('/', function (req, res, next) {

	var authorizeUrl = "https://accounts.spotify.com/authorize";
	var keys = jsonReader.getJson('keys.json'); 
	if(process.env.NODE_ENV != 'production'){
	var keys = jsonReader.getJson('keys.json'); 
	var client_id = keys.client_id;
	var client_secret = keys.client_secret;
	}
	else {
		var client_id = process.env.client_id;
		var client_secret = process.env.client_secret;
	}
	var scopes = "playlist-modify-public playlist-modify-private"
	var redirect_uri = "http://" + req.headers.host + "/login/verified/";
	var params = { client_id: client_id, redirect_uri: redirect_uri, response_type: "code", scope: scopes};
	var url = authorizeUrl + "/?" + querystring.stringify(params);
	
	res.redirect(url);
});

router.get('/verified', function (req, res, next) {
	res.render('verifycallback');
});

router.post('/verified', function (req, res, next) {
	var redirect_uri = "http://" + req.headers.host + "/login/verified/";
	var params = {code: req.body.code, grant_type:"authorization_code", redirect_uri : redirect_uri};
	console.log(req.body);
	console.log(params);
	
	if(process.env.NODE_ENV != 'production'){
	var keys = jsonReader.getJson('keys.json'); 
	var client_id = keys.client_id;
	var client_secret = keys.client_secret;
	}
	else {
		var client_id = process.env.client_id;
		var client_secret = process.env.client_secret;
	}
	var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: req.body.code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
	
	request.post(authOptions, function(error, response, body) {
		if(body){
			console.log(body);	
		}
	  	if(response) {
	  		console.log(response.body);
	  		console.log(response.body.access_token);
	  		res.send(response.body);
	  	}
	  	if(error){
	  		console.log(error);	
	  	}
	  
	});
});

module.exports = router;
