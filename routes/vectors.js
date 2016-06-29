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
    });
//this bit isn't working for some reason

    newVector.findByIdAndUpdate(
        newVectorID,
        { $set: { "'@id'": newVectorURL }}, 
        function (err) {
            if (err) {res.send(err)};
        }
    );
//

    res.json({ "url": newVectorURL});

};

exports.getByID = function(req, res) {
    newVector.findById(req.params.vector_id).lean().exec( function(err, vector) {
        if (err)
            res.send(err);
//      console.dir(vector);        

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
/*
exports.getByCoords = function(req, res, next, coordinates) {
    
    var vectorFound;

    newVector.findOne({"feature.geometry.coordinates":coordinates}, function(err, vector) {
        if (err) {res.send(err)};
        vectorFound = vector;
    });
    console.dir(vectorFound);
    req.vector = vectorFound;
    return next();
};
*/

exports.returnVector = function(req, res) {
    var theID = req.vector.id;
    console.log("showing"+theID);

    res.json({"id": theID});
};


