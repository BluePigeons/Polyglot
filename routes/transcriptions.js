// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../examples/newVector');
var newTranslate    = require('../examples/newTranslation');
var newTranscription    = require('../examples/newTranscription');

//ROUTE FUNCTIONS

exports.findAll = function(req, res) {
    newVector.find(function(err, transcriptions) {
        if (err)
            res.send(err);

        res.json(transcriptions);
    });

};

exports.addNew = function(req, res) {
    
    var transcription = new newTranscription();  
    transcription.name = req.body.name;  

    transcription.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'JSON created!' });
    });

};

exports.getByID = function(req, res) {
    newTranscription.findById(req.params.transcription_id, function(err, transcription) {
        if (err)
            res.send(err);
        res.json(vector);
        
    });

};

exports.updateOne = function(req, res) {

    newTranscription.findById(req.params.transcription_id, function(err, transcription) {

        if (err)
            res.send(err);

        transcription.name = req.body.name; 

        transcription.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'JSON updated!' });
        });

    });
};

