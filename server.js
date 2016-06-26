
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
//var jsonfile = require('jsonfile');


var newVector     = require('./examples/newVector');
var newTranslate    = require('./examples/newTranslation');

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
    //should have proper logging here but for now just to console
    console.log('Something is happening.');
    next(); // need to go to the next routes and not stop here
});

//route /api/vectors GET
//get all vector JSONs
router.get('/vectors', function(req, res) {
    newVector.find(function(err, vectors) {
        if (err)
            res.send(err);

        res.json(vectors);
    });

});

//route /api/vectors POST
//add a single new vector JSON
router.post('/vectors', function(req, res) {
    
    var vector = new newVector();  
    vector.name = req.body.name;  

    vector.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'JSON created!' });
    });

});

//route /api/vectors/:vector_id GET
//get specific vector JSON
router.get('/vectors/:vector_id', function(req, res) {
    newVector.findById(req.params.vector_id, function(err, vector) {
        if (err)
            res.send(err);
        res.json(vector);
        
    });

});

//route /api/vectors/:vector_id PUT
//update vector JSON with new info
router.put('/vectors/:vector_id', function(req, res) {

    newVector.findById(req.params.vector_id, function(err, vector) {

        if (err)
            res.send(err);

        vector.name = req.body.name; 

        vector.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'JSON updated!' });
        });

    });
});


//route /api/vectors/:vector_id DELETE
//delete vector JSON


app.use('/api', router);

//tells the server where it should be listening for req and res
app.listen(8080);



