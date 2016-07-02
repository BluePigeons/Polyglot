
///// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('./newVector');
var newTranslate    = require('./newTranslation');
var newTranscription    = require('./newTranscription');
var IIIFmongoose = require('./IIIFmongoose');

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

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


