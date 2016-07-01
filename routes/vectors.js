// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('./newVector');
var newTranslate    = require('./newTranslation');
var newTranscription    = require('./newTranscription');
var IIIFmongoose = require('./IIIFmongoose');

var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/"

//ROUTE FUNCTIONS

exports.findAll = function(req, res) {
      
    newVector.find(function(err, vectors) {
        if (err) {res.send(err)};
        res.json(vectors);
    }); 
};

exports.deleteAll = function(req, res) {
      
    newVector.find(function(err, vectors) {
        if (err) {res.send(err)};

        vectors.forEach(function(vector){
            newVector.remove({_id: vector._id},
            function(err){
                if (err) {res.send(err)};
            })
        });

        res.send("all gone");
    }); 
};

exports.findAllTargetVectors = function(req, res) {

    var vectorAnnos = [];

    var targetID = req.params.target;

    var vectorSearch = newVector.find({'target.id': targetID});

    vectorSearch.exec(function(err, vectors){

        if (err) {
            console.log(err);
            res.json({list: false});
        }
        else {
            vectors.forEach(function(vectorJSON){
                var vectorID = vectorJSON.body.id;
                vectorAnnos.push(vectorJSON);
            });

            res.json({list: vectorAnnos});
        };
    });

};

exports.addNew = function(req, res) {
    
    var vector = new newVector(); 

//    console.dir(req.body.geometry.coordinates);

//    vector.feature.geometry.coordinates = req.body.geometry.coordinates;
/*    req.body.geometry.coordinates[0].forEach(function(pair){
        vector.feature.geometry.coordinates.push(pair);
        //geo values must be 'legacy coordinate pairs' for 2d indexes
    });
*/
    allTheCoordinates = [];
    ATCarray = 0;
    req.body.geometry.coordinates[0].forEach(function(coordinatesPair){
        vector.notFeature.notGeometry.notCoordinates.push([]);
        allTheCoordinates.push([]);
        var coordsNumbers = [];
        coordinatesPair.forEach(function(number){
            converted = Number(number);
            coordsNumbers.push(converted);
        });
        allTheCoordinates[ATCarray].push(coordsNumbers);
        vector.notFeature.notGeometry.notCoordinates[ATCarray] = coordsNumbers;
        ATCarray += 1;      
    });
    console.dir(allTheCoordinates);
//    vector.feature.geometry.coordinates.push(allTheCoordinates[0]); 

    console.dir(vector.notFeature.notGeometry);

    var newVectorID = vector.id;
    var newVectorURL = vectorURL.concat(newVectorID);

    vector.body.id = newVectorURL;
//    vector.'@id' = newVectorURL;

    vector.save(function(err, vector) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            res.json({ "url": newVectorURL})
        };
    });

};

/*
*/

exports.getByID = function(req, res) {
    newVector.findById(req.params.vector_id).lean().exec( function(err, vector) {
        if (err)
            res.send(err);      

        res.json(vector);
        
    });

};

exports.updateOne = function(req, res) {

    var newInfo = req.body;

//    console.dir(newInfo);

    var updateDoc = newVector.findById(req.params.vector_id); 
    updateDoc.exec(function(err, vector) {
        if (err) {res.send(err)};

//        vector.feature.geometry.coordinates = req.params.coordinates;

        if (typeof newInfo.target != 'undefined' || newInfo.target != null) {

            vector.target.push({
                "id": req.body.target.id,
                "language": req.body.target.language,
                "format": req.body.target.format
            });

        };
        if (typeof newInfo.transcription != 'undefined' || newInfo.transcription != null) {
            vector.transcription = req.body.transcription;
        };

        if (typeof newInfo.transcription != 'undefined' || newInfo.transcription != null) {
            vector.translation = req.body.translation;
        };

        if (typeof newInfo.coordinates != 'undefined' || newInfo.coordinates != null) {

        };

//        vector.children.push()
        
        vector.save(function(err, vector) {
            if (err) {res.send(err)};
            res.json(vector);
        })
    });
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


