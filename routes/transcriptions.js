// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../public/javascripts/newVector');
var newTranslate    = require('../public/javascripts/newTranslation');
var newTranscription    = require('../public/javascripts/newTranscription');

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";

//ROUTE FUNCTIONS

exports.findAll = function(req, res) {
    newTranscription.find(function(err, transcriptions) {
        if (err)
            res.send(err);

        res.json(transcriptions);
    });

};

exports.addNew = function(req, res) {
    
    var transcription = new newTranscription();  
    var newTransID;

    transcription.body.text = req.body.body.text;  

    transcription.save(function(err) {
        if (err)
            res.send(err);
        newTransID = transcription._id;
        res.json(transcription._id);
    });

    var transURL = transcriptionURL.concat(newTransID);

    transcription.update(
        { "_id": newTransID},

//this bit isn't working

        {
            "@id": transURL,
            "body.id": transURL
        },
        function (err) {
            if (err) {res.send(err)};
            console.log("updated IDs too!");
        }
    );

};

exports.getByID = function(req, res) {
    newTranscription.findById(req.params.transcription_id, function(err, transcription) {
        if (err)
            res.send(err);
        res.json(transcription);
        
    });

};

exports.updateOne = function(req, res) {

    var updateDoc = newTranscription.findById(req.params.transcription_id);
    updateDoc.exec(function(err, transcription) {

        if (err) {res.send(err)};

        transcription.body.text = req.body.body.text;

        transcription.save(function(err) {
            if (err)
                res.send(err);
        });
    });

};


exports.deleteOne = function(req, res) {
        newTranscription.remove({
            _id: req.params.transcription_id
        }, 
        function(err, transcription) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
};

//fix these functions

exports.getByVectorTarget = function(req, res) {
    vectorSelected = req.params.vector_target;
    newTranscription.findOne(
        {'target': {'id': vectorSelected}},
        function(err, transcription) {
            if (err)
                res.send(err);
            res.json(transcription);           
        }
    );

};

exports.getByTextTarget = function(req, res) {
    textSelected = req.params.text_target;
    newTranslation.findOne(
        {'target': {'id': textSelected}},
        function(err, transcription) {
            if (err)
                res.send(err);
            res.json(transcription);
        }
    );
};

