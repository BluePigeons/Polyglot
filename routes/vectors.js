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
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/";

//because LUNA API is questionable currently using from database but will change later
var imageDevURL = "http://localhost:8080/api/images_api/"

//////IMAGE HANDLING

var generateIIIFregion = function(coordinates) {

    /////how to encode polygon regions?? Are they allowed in IIIF???

    /*

    NOTE ABOUT COORDINATES

    + Leaflet Simple CRS has (0,0) in top left corner 
    + GeoJSON coordinates go clockwise from bottom left
    + IIIF has downwards +y axis
    _____________________  
    |*-----> x          |           
    ||                  |           [2] ---> [3] 
    |v                  |            ^        |
    |-y                 |            |        v
    |                   |           [1] <--- [4]
    |    L.CRS.Simple   |
    |                   |        GeoJSON Coordinates
    |                   | 
    |                   | 
    ---------------------    

    */
    var xy1 = coordinates[0];
    var xy2 = coordinates[1];
    var xy3 = coordinates[3];

    var x = xy2[0];
    var y = -xy2[1];
    var w = xy3[0] - xy2[0];
    var h = xy2[1] - xy1[1];
    var paramURL = x.toString() + "," + y.toString() + "," + w.toString() + "," + h.toString() + "/full/0/";

    return paramURL;
};

var getIIIFsectionURL = function (imageJSON, coordinates, formats) {

    var imagewithoutinfo = imageJSON.split("info.json",1);
    var imagewithoutinfoURL = imagewithoutinfo[0];
    var splitIndex = imagewithoutinfoURL.lastIndexOf("/");
    var image_id = imagewithoutinfoURL.substring(splitIndex +1);
    var baseImageURL = imagewithoutinfoURL.slice(0, splitIndex +1);

    console.log(baseImageURL);

    var regionParams = generateIIIFregion(coordinates);
    var pickAFormat = formats;

    var params = regionParams.concat(image_id + "." + pickAFormat);
    var theURL = baseImageURL.concat(params);

    console.log(theURL);

    return theURL;
};

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

    ATCarray = 0;
    req.body.geometry.coordinates[0].forEach(function(coordinatesPair){
        vector.notFeature.notGeometry.notCoordinates.push([]);
        var coordsNumbers = [];
        coordinatesPair.forEach(function(number){
            converted = Number(number);
            coordsNumbers.push(converted);
        });
        vector.notFeature.notGeometry.notCoordinates[ATCarray] = coordsNumbers;
        ATCarray += 1;      
    });

    var imageID = req.body.target.id;
    var theCoordinates = vector.notFeature.notGeometry.notCoordinates;
    var imageFormats = req.body.target.formats;

    //overall image
    vector.target.push({
        "id": imageID,
        "language": req.body.target.language,
        "format": "application/json"
    });

    //IIIF image fragment
    var IIIFsection = getIIIFsectionURL(imageID, theCoordinates, imageFormats);
    vector.target.push({
        "id": IIIFsection,
        "language": req.body.target.language,

//need to find official format name for IIIF region

        "format": "image fragment"
    });

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


