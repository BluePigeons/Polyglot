
var express    = require('express');
var bodyParser = require('body-parser');
//Node module to specify server info
//var http = require('http');
//Node file system module
//var fs = require('fs');
//var stream = require('stream');
//var request = require('request');
//var es = require('event-stream');
//var JSONstream = require('JSONstream');

//Package to parse multibody forms
//var formidable = require("formidable");

/*
// create server called "server"
var server = http.createServer(function (req, res) {
    
    //GET requests are processed by "displayForm" code
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } 

    //POST requests are processed by "submittingForm" code
    else if (req.method.toLowerCase() == 'post') {
        submittingForm(req, res);
    }

});

var jsonfile = require('jsonfile')

var file = 'package.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})

var file = 'data.json'
var obj = {name: 'JP'}

jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})

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

var Bear     = require('./examples/bear');

var app        = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testMongoDB'); // connect to our database

//API ROUTES

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


//testing testing
/*router.get('/', function(req, res) {

    res.json({ message: 'hooray! welcome to our api!' });  

});*/

//route /api/vectors GET
//get all vector JSONs

//route /api/vectors POST
//add a single new vector JSON

//route /api/vectors/:vector_id GET
//get specific vector JSON

//route /api/vectors/:vector_id PUT
//update vector JSON with new info

//route /api/vectors/:vector_id DELETE
//delete vector JSON
/*
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    });
*/
/*    
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });

    });

    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    });
*/
app.use('/api', router);

//tells the server where it should be listening for req and res
app.listen(8080);



