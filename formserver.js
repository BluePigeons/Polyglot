
//var express    = require('express');        // call express
//var bodyParser = require('body-parser');
//Node module to specify server info
var http = require('http');
//Node file system module
var fs = require('fs');
var stream = require('stream');
//var request = require('request');
//var es = require('event-stream');
//var JSONstream = require('JSONstream');

//Package to parse multibody forms
//var formidable = require("formidable");
//Node module for debugging
//var util = require('util');
//Package to shortcut Node JSON interactions
//var jsonfile = require('jsonfile');

// create server called "server"
/*var server = http.createServer(function (req, res) {
    
    //GET requests are processed by "displayForm" code
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } 

    //POST requests are processed by "submittingForm" code
    else if (req.method.toLowerCase() == 'post') {
        submittingForm(req, res);
    }

});*/

/*

function displayForm(res) {

    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });


};

function submittingForm(req, res) {

	// creates new incoming form just called 'form'
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';

    // where uploaded files are stored
    form.uploadDir = "/examples";

    //parses incoming request called "req" and the callback on it is function "example"
    form.parse(req, exampleFunction);



};

function exampleFunction(err, fields, files) {

    // sends a header message back with (statusCode[, statusMessage][, headers])
        res.writeHead(200, {
            'content-type': 'text/plain'
        });

    //writeFile(filename, obj, [options], callback)
	    jsonfile.writeFile("image.json", obj, function (err) {
		  console.error(err)
		})

    // tells the server that this callback has ended
        res.end();
    };
*/

var app        = express();  

var port = process.env.PORT || 8080; 

var router = express.Router();

router.get('/', function(req, res) {
    res.write({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

//tells the server where it should be listening for req and res
app.listen(172.20.184.72:8080);

/*
    "jshint": "2.5.x",
    "uglify-js": "~2.4.3",

    "grunt": "~0.4.2",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-coffee": "~0.10.1",
    "grunt-contrib-concat": "0.4.x",
    "grunt-contrib-jshint": "~0.6.3",
    "grunt-contrib-less": "~0.11.0",
    "grunt-contrib-nodeunit": "~0.2.0",
    "grunt-contrib-uglify": "~0.2.2",
    "grunt-contrib-watch": ">=0.3.1",
    "grunt-mocha": "~0.4.11",
    "grunt-karma": "0.8.3",
    "grunt-bump": "0.0.14",
    "matchdep": "~0.3.0",
  "peerDependencies": {
    "grunt-cli": "0.1.13"
  },

*/

