
// SETUP REQUIREMENTS

//ask user to create javascript file that can export their database variables
//var databaseThings = require('../../databaseThings');
//file route assuming node_modules folder location
//var databaseURL = databaseThings.dbURL();

//learn how the require() path works so that the api routes can be added by starting app
//in addition the user will also have to add a minified script tag with the app.js functionality OR require() and Browserify etc

var databaseURL = 'mongodb://localhost:27017/testMongoDB';

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cors = require('cors');

var annotations = require('./routes/annotations');
var vectors = require('./routes/vectors');
var transcriptions = require('./routes/transcriptions');
//var translations = require('./routes/translations');
//var images = require('./routes/images');

// GET APPLICATION RUNNING

var app        = express();  

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/examples'));

//Currently using cors for all origins just for development but will need to be specific for actual deployment
app.use(cors());

app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html"); 

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

mongoose.connect(databaseURL);

//MIDDLEWARE

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {

    //should have proper logging here but for now just to console

    console.log('Something is happening.');

    next(); 
});

/*
app.get('/FAQs', function(req, res) {
    res.sendFile(__dirname + "/FAQs.html");
});
app.get('/contactus', function(req, res) {
    res.sendFile(__dirname + "/contactus.html");
});
app.get('/thegame', function(req, res) {
    res.sendFile(__dirname + "/thegame.html");
});

*/

/////////////////API ROUTES

//PARAMETERS

//app.param('parent', annotations.parentParams);
//make a generic trigger for updating rankings?

//app.param('imageTarget', annotations.findImageTarget);

//VECTOR API

//app.param('coordinates', vectors.getByCoords);

//route /api/vectors GET -> get all vector JSONs
router.get('/vectors', vectors.findAll);

//route /api/vectors POST -> add a single new vector JSON
router.post('/vectors', vectors.addNew);

//route /api/vectors/:vector_id GET -> get specific vector JSON
router.get('/vectors/:vector_id', vectors.getByID);

router.get('/vectors/targets/:target', vectors.findAllTargetVectors);

//route /api/vectors/:vector_id PUT -> update vector JSON with new info
router.put('/vectors/:vector_id', vectors.updateOne);

//route /api/vectors/:vector_id DELETE -> delete vector JSON
router.delete('/vectors/:vector_id', vectors.deleteOne);

//exists mainly for testing purposes
router.delete('/vectors', vectors.deleteAll);

//TRANSCRIPTION API

//route /api/transcriptions GET -> get all transcriptions JSONs
router.get('/transcriptions', transcriptions.findAll);

//route /api/transcriptions POST -> add a single new transcription JSON
router.post('/transcriptions', transcriptions.addNew);

//route /api/transcriptions/:transcriptions_id GET -> get specific transcription JSON
router.get('/transcriptions/:transcription_id', transcriptions.getByID);

router.get('/transcriptions/:vector_target', transcriptions.getByVectorTarget);
router.get('/transcriptions/:text_target', transcriptions.getByTextTarget);

//route /api/transcriptions/:transcriptions_id PUT -> update transcription JSON with new info
router.put('/transcriptions/:transcription_id', transcriptions.updateOne);

//route /api/transcriptions/:transcription_id DELETE -> delete vector JSON
router.delete('/transcriptions/:transcription_id', transcriptions.deleteOne);

router.delete('/transcriptions', transcriptions.deleteAll);

//IMAGE API

//router.get('/images_api', images.findAll);
//router.post('/images_api', images.addNew);
//router.get('/images_api/:vector_id', images.getByID);
//router.put('/images_api', images.updateOne);

app.use('/api', router);

//tells the server where it should be listening for req and res
app.listen(8080);



