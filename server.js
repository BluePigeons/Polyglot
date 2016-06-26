
// SETUP REQUIREMENTS

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var newVector     = require('./examples/newVector');
var newTranslate    = require('./examples/newTranslation');
var newTranscription    = require('./examples/newTranscription');

var vectors = require('./routes/vectors');
var transcriptions = require('./routes/transcriptions');
//var translations = require('./routes/translations');

// GET APPLICATION RUNNING

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

mongoose.connect('mongodb://localhost:27017/testMongoDB');

//API ROUTES

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    //should have proper logging here but for now just to console
    console.log('Something is happening.');
    next(); // need to go to the next routes and not stop here
});

//route /api/vectors GET -> get all vector JSONs
router.get('/vectors', vectors.findAll);

//route /api/vectors POST -> add a single new vector JSON
router.post('/vectors', vectors.addNew);

//route /api/vectors/:vector_id GET -> get specific vector JSON
router.get('/vectors/:vector_id', vectors.getByID);

//route /api/vectors/:vector_id PUT -> update vector JSON with new info
router.put('/vectors/:vector_id', vectors.updateOne);

//route /api/vectors/:vector_id DELETE -> delete vector JSON


app.use('/api', router);

//tells the server where it should be listening for req and res
app.listen(8080);



