
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var jsonfile = require('jsonfile');
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

var Bear     = require('./examples/bear');

var app        = express();  

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/examples'));


app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html"); 

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

mongoose.connect('mongodb://localhost:27017/testMongoDB'); // connect to our database

//API ROUTES

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

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

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/bears', function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.hobby = req.body.hobby;
        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    });
 
    router.get('/bears', function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });

    });

    router.get('/bears/:bear_id', function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
            

        });

    });



/*

jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})

    router.put('/bears/:bear_id', function(req, res) {

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



