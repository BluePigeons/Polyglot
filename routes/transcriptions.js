// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../public/javascripts/newVector');
var newTranslate    = require('../public/javascripts/newTranslation');
var newTranscription    = require('../public/javascripts/newTranscription');

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
    transcription.body.text = req.body.body.text;  

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
        res.json(transcription);
        
    });

};

exports.updateOne = function(req, res) {

    newTranscription.findById(req.params.transcription_id, function(err, transcription) {

        if (err)
            res.send(err);

        transcription.body.text = req.body.body.text; 
        transcription.target.id = req.body.target._id;

        transcription.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'JSON updated!' });
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

exports.getByVectorTarget = function(req, res) {
    vectorSelected = req.params.vector_target;
    newTranscription.findOne({'target': {'id': vectorSelected}});
};

exports.getByTextTarget = function(req, res) {
    textSelected = req.params.text_target;
    newTranslation.findOne({'target': {'id': textSelected}})
};
