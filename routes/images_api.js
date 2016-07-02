
///// SETUP

var express    = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');

var IIIFmongoose = require('./IIIFmongoose');

//var websiteinfo = require('./leafletiiifanno.json');
//var websiteAddress = websiteinfo.websiteAddress;

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/";

//because LUNA API is questionable currently using from database but will change later
var imageDevURL = "http://localhost:8080/theImage/images_api/"

var currentImage = "";

exports.loadOne = function(req, res) {

	currentImage = req.params.image_id;

	https.get(currentImage, (res) => {

	  res.on('data', (d) => {




	  });

	}).on('error', (e) => {
	  res.send(e);
	});

};

exports.tellMe = function(req,res) {
	res.send(currentImage);
};

