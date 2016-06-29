// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../public/javascripts/newVector');
var newTranslate    = require('../public/javascripts/newTranslation');
var newTranscription    = require('../public/javascripts/newTranscription');

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/"

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

    var newTransID = transcription.id;
    var transURL = transcriptionURL.concat(newTransID);

    transcription.body.text = req.body.body.text; 
    transcription.body.id = transURL; 
    transcription.target.push(
        {"id": req.body.target.id,
        "format": req.body.target.format}
    );

    transcription.save(function(err) {
        if (err)
            res.send(err);
    });

/*    newTranscription.findByIdAndUpdate(
        newTransID,
        { $set: { "@id": transURL }}, 
        function (err) {
            if (err) {res.send(err)};
        }
    );
*/
    res.json({ "url": transURL });

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
            if (err) {res.send(err)};
            res.json(transcription);
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

