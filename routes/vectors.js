// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('./newVector');
var newTranslate    = require('./newTranslation');
var newTranscription    = require('./newTranscription');

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);

var isUseless = function(something) {
  if (rejectionOptions.has(something) || rejectionOptions.has(typeof something)) {  return true;  }
  else {  return false;  };
};

var asyncPush = function(addArray, oldArray) {
    var theArray = oldArray;
    var mergedArray = function() {
        addArray.forEach(function(addDoc){
            theArray.push(addDoc);
        });
        if (theArray.length = (oldArray.length + addArray.length)) {
            return theArray;
        };
    };
    return mergedArray();
};

var fieldMatching = function(searchArray, field, fieldValue) {
  if (isUseless(searchArray) || isUseless(field) || isUseless(fieldValue)) {  return false  }
  else {
    var theMatch = false; 
    searchArray.forEach(function(childDoc){
      if (childDoc[field] == fieldValue) {
          theMatch = childDoc;
      };
    });
    return theMatch;
  };
};

var jsonFieldEqual = function(docField, bodyDoc, bodyField) {
    if (isUseless(bodyDoc[bodyField]) == false ) {    return bodyDoc[bodyField];    }
    else {    return docField;    };
};

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

    var imagewithoutinfo = imageJSON.split("/info.json",1);
    var imagewithoutinfoURL = imagewithoutinfo[0];
    var splitIndex = imagewithoutinfoURL.lastIndexOf("/");
    var image_id = imagewithoutinfoURL.substring(splitIndex +1);
    var baseImageURL = imagewithoutinfoURL.slice(0, splitIndex +1);

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
                vectorAnnos.push(vectorJSON);
            });

            res.json({list: vectorAnnos});
        };
    });

};

exports.addNew = function(req, res) {
    
    var vector = new newVector(); 

    var jsonFieldPush = function(bodyDoc, theField) {
        if ( !isUseless(bodyDoc[theField])) {
            bodyDoc[theField].forEach(function(subdoc){    vector[theField].addToSet(subdoc);    });
        };
    };

    ////Coordinates
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
        "format": "jpg"
    });

    var newVectorID = vector.id;
    var newVectorURL = vectorURL.concat(newVectorID);
    vector.body.id = newVectorURL;
    jsonFieldPush(req.body, "metadata");
    vector.parent = jsonFieldEqual(vector.parent, req.body, "parent");
    vector.translation = jsonFieldEqual(vector.translation, req.body, "translation");
    vector.transcription = jsonFieldEqual(vector.transcription, req.body, "transcription");

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

exports.getByID = function(req, res) {
    newVector.findById(req.params.vector_id).lean().exec( function(err, vector) {
        if (err)
            res.send(err);      

        res.json(vector);
        
    });

};

exports.updateOne = function(req, res) {

    var newInfo = req.body;

    console.dir(newInfo);

    var updateDoc = newVector.findById(req.params.vector_id); 
    updateDoc.exec(function(err, vector) {
        if (err) {res.send(err)};

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

        if (typeof newInfo.geometry != 'undefined' || newInfo.geometry != null) {
            if (typeof newInfo.geometry.coordinates != 'undefined' || newInfo.geometry.coordinates != null) {

                ATCarray = 0;
                newInfo.geometry.coordinates[0].forEach(function(coordinatesPair){
                    var coordsNumbers = [];
                    coordinatesPair.forEach(function(number){
                        converted = Number(number);
                        coordsNumbers.push(converted);
                    });
                    vector.notFeature.notGeometry.notCoordinates[ATCarray] = coordsNumbers;
                    ATCarray += 1;      
                });
                var theCoordinates = vector.notFeature.notGeometry.notCoordinates;

                //the image fragment is always pushed in after the json target
                var imageID = vector.target[0].id;
                var imageFormats = vector.target[1].format;
                var newIIIFsection = getIIIFsectionURL(imageID, theCoordinates, imageFormats);

                vector.target[1].id = newIIIFsection;
            };
        };

        if (typeof req.body.metadata != 'undefined' || req.body.metadata != null) {
            vector.metadata.push(req.body.metadata);
        };

        if (typeof req.body.children != 'undefined' || req.body.children != null) {
            vector.children.push(req.body.children);
        };

        if (typeof req.body.creator != 'undefined' || req.body.creator != null) {
            vector.creator = req.body.creator;
        };
        
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


