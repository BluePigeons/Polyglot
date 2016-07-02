
///// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('./newVector');
var newTranslate    = require('./newTranslation');
var newTranscription    = require('./newTranscription');
var IIIFmongoose = require('./IIIFmongoose');

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/";

//because LUNA API is questionable currently using from database but will change later
var imageDevURL = "http://localhost:8080/api/images_api/"

////INTERNAL FUNCTIONS

//find the highest ranking child
function highestChild() {

};


//update the ranking of a set of children
function updateRanks(parent, child, newRank) {



};

//check if the text fragment in parent body is the same as child text
function compareChild(parentText, newChild) {

};

// ROUTE FUNCTIONS

exports.parentParams = function (req, res, next, parent) {
	var childrenOfParent;
	Schema.findAll(parent, function(){}

	);
	req.children = childrenOfParent;
};

exports.findImageTarget = function (req, res, next, image) {

	var vectorAnnos = [];

	console.log("running findImageTarget");

/*	newVector.find({'target.id': image});
	newVector.limit(3);
	newVector.exec(function(err, vectors){

		if (err) {next(err)};

		vectors.forEach(function(vectorJSON){
			var vectorID = vectorJSON.body.id;
			vectorAnnos.push(vectorID);
		});

//		console.dir(vectors);

//		req.vectorAnnos = vectors;

		next();
	});
*/
/*	newTranscription.find({'target.id': image});
	newTranscription.exec(function(err, transcriptions){

		if (err) {res.send(err)};

		var transcriptionAnnos = transcriptions;

		req.transcriptionAnnos = transcriptionAnnos;
	});

	newTranslation.find({'target.id': image});
	newTranslation.exec(function(err, translations){

		if (err) {res.send(err)};

		var translationAnnos = translations;

		req.translationAnnos = translationAnnos;
	});
*/
	next();

};