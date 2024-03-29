var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

var jsonReader = {

	getJson: function (file){

	    var filepath = __dirname + '/' + file;
	    return readJsonFileSync(filepath);
	}
}

module.exports = jsonReader;