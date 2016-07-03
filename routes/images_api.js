
///// SETUP

var express    = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser')
var http = require('http');
var https = require('https');

var IIIFmongoose = require('./IIIFmongoose');

//var websiteinfo = require('../leafletiiifanno.json');
//var websiteAddress = websiteinfo.websiteAddress;

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

//because LUNA API is questionable currently using from database but will change later
var imageDevURL = "http://localhost:8080/theImage/images_api/"

exports.openImage = function(req, res, next) {

	thisImage = req.body.image_id;
	console.log("the image to check is " + thisImage);

	http.get(thisImage, (res) => {res.on('data', (d) => {
//		res.cookie("currentImage", thisImage);
	})}).on('error', (e) => {res.send(e);});
	
};

exports.tellMe = function(req,res) {
	
};

