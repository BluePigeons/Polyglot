
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
var cookieParser = require('cookie-parser');
var cors = require('cors');

var annotations = require('./routes/annotations');
var vectors = require('./routes/vectors');
var transcriptions = require('./routes/transcriptions');
var translations = require('./routes/translations');

//var websiteinfo = require('./leafletiiifanno.json');
//var websiteAddress = websiteinfo.website;

// GET APPLICATION RUNNING

var app        = express();  

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/examples'));

app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html"); 

});

app.use(cors());
//Currently using cors for all origins just for development but will need to be specific for actual deployment

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var port = process.env.PORT || 8080; 

//eventually adjust for any database connection??
mongoose.connect(databaseURL, { config: { autoIndex: false } });

//MIDDLEWARE

//really ought to make a nice 404 page

var annoRouter = express.Router();
var gameRouter = express.Router();

annoRouter.use(function(req, res, next) {

    //should have proper logging here but for now just to console

    console.log('something is using the APIs');

    next(); 
});

gameRouter.use(function(req, res, next) {

    //should have proper logging here but for now just to console

    console.log('something is using the game routes');

    next(); 
});

/*

app.get('/FAQs', function(req, res) {
    res.redirect("/FAQs.html");
});
app.get('/contactus', function(req, res) {
    res.redirect"/contactus.html");
});

*/

/////////////////IMAGE ROUTES

app.get('/theimage', function(req, res) {
    res.redirect("/theimage.html"); 
});

/////////////////API ROUTES

//PARAMETERS

//app.param('parent', annotations.parentParams);
//make a generic trigger for updating rankings?

//VECTOR API

//route /api/vectors GET -> get all vector JSONs
annoRouter.get('/vectors', vectors.findAll);

//route /api/vectors POST -> add a single new vector JSON
annoRouter.post('/vectors', vectors.addNew);

//route /api/vectors/:vector_id GET -> get specific vector JSON
annoRouter.get('/vectors/:vector_id', vectors.getByID);

annoRouter.get('/vectors/targets/:target', vectors.findAllTargetVectors);

//route /api/vectors/:vector_id PUT -> update vector JSON with new info
annoRouter.put('/vectors/:vector_id', vectors.updateOne);

//route /api/vectors/:vector_id DELETE -> delete vector JSON
annoRouter.delete('/vectors/:vector_id', vectors.deleteOne);

//exists mainly for testing purposes
annoRouter.delete('/vectors', vectors.deleteAll);

//TRANSCRIPTION API

//route /api/transcriptions GET -> get all transcriptions JSONs
annoRouter.get('/transcriptions', transcriptions.findAll);

//route /api/transcriptions POST -> add a single new transcription JSON
annoRouter.post('/transcriptions', transcriptions.addNew);

//route /api/transcriptions/:transcriptions_id GET -> get specific transcription JSON
annoRouter.get('/transcriptions/:transcription_id', transcriptions.getByID);

annoRouter.get('/transcriptions/:vector_target', transcriptions.getByVectorTarget);
annoRouter.get('/transcriptions/:text_target', transcriptions.getByTextTarget);

//route /api/transcriptions/:transcriptions_id PUT -> update transcription JSON with new info
annoRouter.put('/transcriptions/:transcription_id', transcriptions.updateOne);

//route /api/transcriptions/:transcription_id DELETE -> delete vector JSON
annoRouter.delete('/transcriptions/:transcription_id', transcriptions.deleteOne);

annoRouter.delete('/transcriptions', transcriptions.deleteAll);

/////////////////GAME ROUTES
/*

gameRouter.get('/', function(req, res) {
    res.sendFile(__dirname + "/thegame.html");
});

*/

/////////GET STARTED

app.use('/api', annoRouter);

//tells the server where it should be listening for req and res
app.listen(8080);

//will need to configure stuff for actual deployment

