
// SETUP REQUIREMENTS

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var polyanno = require('polyanno_storage');

////have released polyanno_storage as a separate NPM package so you should be able to simply "npm install" it the same as the other packages
///need to set a function to (re)define those variables here within this package rather than just recalling what is defined in the node_modules package...
var databaseURL = polyanno.setup.databaseport;
var thisWebsitePort = polyanno.setup.applicationport;

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
  ///logging here
    console.log("the body is "+JSON.stringify(req.body)+" and params "+JSON.stringify(req.params));
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
      //console.log('Sent with '+JSON.stringify(options.headers));
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

userRouter.get('/username/:username', polyanno.users.getByUsername);
userRouter.get('/id/:user_id', polyanno.users.getByID);
userRouter.post('/', polyanno.users.addNew);
userRouter.put('/:username', polyanno.users.updateOne);

/////////////////API ROUTES

//ANNOTATIONS API

annoRouter.post('/annotations', polyanno.annotations.addNew );
annoRouter.put( polyanno.annotations.updateOne ); ///
annoRouter.get('/annotations', polyanno.annotations.getAll);
annoRouter.get('/annotations/vectors', polyanno.annotations.getAllVectorAnnos);
annoRouter.get('/annotations/transcriptions', polyanno.annotations.getAllTranscriptionAnnos);
annoRouter.get('/annotations/translations', polyanno.annotations.getAllTranslationAnnos);
annoRouter.get('/annotations/:anno_id', polyanno.annotations.getByID);
annoRouter.get('/annotations/target/:target_id', polyanno.annotations.getByTarget);

//VECTOR API

annoRouter.get('/vectors', polyanno.vectors.findAll);
annoRouter.post('/vectors', polyanno.vectors.addNew);
annoRouter.delete('/vectors', polyanno.vectors.deleteAll);

annoRouter.get('/vectors/:vector_id', polyanno.vectors.getByID);
annoRouter.put('/vectors/:vector_id', polyanno.vectors.updateOne);
annoRouter.delete('/vectors/:vector_id', polyanno.vectors.deleteOne);

annoRouter.get('/vectors/targets/:target', polyanno.annotations.getVectorsByTarget);
annoRouter.get('/vectors/ids/:_ids', polyanno.vectors.searchByIds);

//TRANSCRIPTION API

annoRouter.get('/transcriptions', polyanno.transcriptions.findAll);
annoRouter.post('/transcriptions', polyanno.transcriptions.addNew);
annoRouter.get('/transcriptions/:transcription_id', polyanno.transcriptions.getByID);
annoRouter.put('/transcriptions/:transcription_id', polyanno.transcriptions.updateOne);
annoRouter.put('/transcriptions/voting/:voteType', polyanno.transcriptions.voting);
annoRouter.delete('/transcriptions/:transcription_id', polyanno.transcriptions.deleteOne);
annoRouter.delete('/transcriptions', polyanno.transcriptions.deleteAll);

annoRouter.get('/transcriptions/targets/:target', polyanno.annotations.getTranscriptionsByTarget);
annoRouter.get('/transcriptions/ids/:_ids', polyanno.transcriptions.searchByIds);

//TRANSLATION API

annoRouter.get('/translations', polyanno.translations.findAll);
annoRouter.post('/translations', polyanno.translations.addNew);
annoRouter.get('/translations/:transcription_id', polyanno.translations.getByID);
annoRouter.put('/translations/:transcription_id', polyanno.translations.updateOne);
annoRouter.put('/translations/voting/:voteType', polyanno.translations.voting);
annoRouter.delete('/translations/:transcription_id', polyanno.translations.deleteOne);
annoRouter.delete('/translations', polyanno.translations.deleteAll);

annoRouter.get('/translations/targets/:target', polyanno.annotations.getTranslationsByTarget);
annoRouter.get('/translations/ids/:_ids', polyanno.translations.searchByIds);

/////////GET STARTED

app.use('/api', annoRouter);
app.use('/editors', editorRouter);
app.use('/user', userRouter);

app.use(function(req, res, next) {
  res.status(404).redirect("/404page.html");
});

//tells the server where it should be listening for req and res
app.listen(thisWebsitePort);

