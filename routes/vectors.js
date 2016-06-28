// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../public/javascripts/newVector');
var newTranslate    = require('../public/javascripts/newTranslation');
var newTranscription    = require('../public/javascripts/newTranscription');

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";

//find the highest ranking child
function highestChild() {

};


//update the ranking of a set of children
function updateRanks(parent, child, newRank) {



};

//check if the text fragment in parent body is the same as child text
function compareChild(parentText, newChild) {

};

//ROUTE FUNCTIONS

exports.findAll = function(req, res) {
    newVector.find(function(err, vectors) {
        if (err)
            res.send(err);

        res.json(vectors);
    });

};

exports.addNew = function(req, res) {
    
    var vector = new newVector(); 
    var theCoords = req.body.coordinates;

    vector.feature.geometry.coordinates.push(
        req.body.coordinates
    );

    var newVectorID = vector.id;
    var newVectorURL = vectorURL.concat(newVectorID);

    vector.body.id = newVectorURL;

    vector.save(function(err, vector) {
        if (err) {res.send(err)};
        res.json(vector.id);
    });

    newVector.findByIdAndUpdate(
        newVectorID,
        { $set: { "@id": newVectorURL }}, 
        function (err) {
            if (err) {res.send(err)};
            console.log("updating @id field")
        }
    );

};

exports.getByID = function(req, res) {
    newVector.findById(req.params.vector_id, function(err, vector) {
        if (err)
            res.send(err);
        res.json(vector);
        
    });

};

exports.updateOne = function(req, res) {

    var newInfo = req.body;
    var updateDoc = newVector.findById(req.params.vector_id); 
    updateDoc.exec(function(err, vector) {
        if (err)
            res.send(err);


        res.json(vector);}
    );
};

exports.deleteOne = function(req, res) {
        newVector.remove({
            _id: req.params.vector_id
        }, 
        function(err, vector) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
};

exports.getByCoords = function(req, res) {

    newVector.findOne(req.params.coordinates, function(err, vector) {

        if (err)
            res.send(err);

        res.json(vector._id);

    })
};
