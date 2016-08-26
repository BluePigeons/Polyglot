
// SETUP REQUIREMENTS

var databaseURL = 'mongodb://localhost:27017/testMongoDB';
var thisWebsitePort = 8080;

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var annotations = require('./routes/annotations');
var vectors = require('./routes/vectors');
var transcriptions = require('./routes/transcriptions');
var translations = require('./routes/translations');
var users = require('./routes/usersroutes');

// GET APPLICATION RUNNING

var app        = express();  

////BASIC APP ROUTES & SETUP

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/examples'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html"); 
});

app.use(cors());
//Currently using cors for all origins just for development but will need to be specific for actual deployment

///////SETUP

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var port = process.env.PORT || thisWebsitePort; 
mongoose.connect(databaseURL, { config: { autoIndex: false } });

//////MIDDLEWARE

var annoRouter = express.Router();

annoRouter.use(function(req, res, next) {
    //should have proper logging here 
    next(); 
});

var editorRouter = express.Router();

editorRouter.use(function(req, res, next) {
    //should have proper logging here 
    next(); 
});

var userRouter = express.Router();

userRouter.use(function(req, res, next) {
    //should have proper logging here 
    next(); 
});

/////////////////PAGE ROUTES

editorRouter.get('/:name', function (req, res, next) {

    var fileName = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/"+req.params.name+"/info.json";
    var options = {
        root: __dirname + '/views/',
        headers: {
            'Set-Cookie': "imageviewing="+fileName+"; path=/editors " ///expires todays date???
        }
    };

  res.sendFile("theimage.html", options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent with '+JSON.stringify(options.headers));
    }
  });

});

editorRouter.use(express.static(__dirname + '/public'));
editorRouter.use(express.static(__dirname + '/views'));
editorRouter.use(express.static(__dirname + '/examples'));

app.get('/beginnertutorial', function(req, res) {
    res.redirect("/beginnertutorial.html"); 
});

app.get('/aboutus', function(req, res) {
    res.redirect("/aboutus.html"); 
});

/////////////////USER ROUTES

userRouter.get('/username/:username', users.getByUsername);
userRouter.get('/id/:user_id', users.getByID);
userRouter.post('/', users.addNew);
userRouter.put('/:username', users.updateOne);

/////////////////API ROUTES

//VECTOR API

annoRouter.get('/vectors', vectors.findAll);
annoRouter.post('/vectors', vectors.addNew);
annoRouter.get('/vectors/:vector_id', vectors.getByID);
annoRouter.get('/vectors/targets/:target', vectors.findAllTargetVectors);
annoRouter.put('/vectors/:vector_id', vectors.updateOne);
annoRouter.delete('/vectors/:vector_id', vectors.deleteOne);
annoRouter.delete('/vectors', vectors.deleteAll);

//TRANSCRIPTION API

annoRouter.get('/transcriptions', transcriptions.findAll);
annoRouter.post('/transcriptions', transcriptions.addNew);
annoRouter.get('/transcriptions/:transcription_id', transcriptions.getByID);
annoRouter.get('/transcriptions/targets/:target', transcriptions.getByTarget);
annoRouter.put('/transcriptions/:transcription_id', transcriptions.updateOne);
annoRouter.put('/transcriptions/voting/:voteType', transcriptions.voting);
annoRouter.delete('/transcriptions/:transcription_id', transcriptions.deleteOne);
annoRouter.delete('/transcriptions', transcriptions.deleteAll);

//TRANSLATION API

annoRouter.get('/translations', translations.findAll);
annoRouter.post('/translations', translations.addNew);
annoRouter.get('/translations/:transcription_id', translations.getByID);
annoRouter.get('/translations/targets/:target', translations.getByTarget);
annoRouter.put('/translations/:transcription_id', translations.updateOne);
annoRouter.put('/translations/voting/:voteType', translations.voting);
annoRouter.delete('/translations/:transcription_id', translations.deleteOne);
annoRouter.delete('/translations', translations.deleteAll);

/////////GET STARTED

app.use('/api', annoRouter);
app.use('/editors', editorRouter);
app.use('/user', userRouter);

app.use(function(req, res, next) {
  res.status(404).redirect("/404page.html");
});

//tells the server where it should be listening for req and res
app.listen(thisWebsitePort);

//will need to configure stuff for actual deployment

