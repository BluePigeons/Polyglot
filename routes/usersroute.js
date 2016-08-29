
// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('./newVector');
var newTranslate    = require('./newTranslation');
var newTranscription    = require('./newTranscription');
var newUser = require('./newUser');

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);

//ROUTE FUNCTIONS

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


////EXPORTED FUNCTIONS

///is this appropriate??
exports.findAll = function(req, res) {
    newUser.find(function(err, allusers) {
        if (err) {res.send(err)}
        else { res.json(allusers); };
    });
};

///just for dev purposes, probably don't want to deploy with unless caching
exports.deleteAll = function(req, res) {
      
    newUserfind(function(err, allusers) {
        if (err) {res.send(err)};

        allusers.forEach(function(theuser){
            theuser.remove({_id: theuser._id},
            function(err){
                if (err) {res.send(err)};
            });
        });
        if (allusers.length == 0) {
            res.send("all gone");
        };
    }); 
};

exports.addNew = function(req, res) {
    
    var theuser = new newUser(); 

    theuser.username = req.body.username;

    theuser.save(function(err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(theuser);
        }
    });

};

exports.getByID = function(req, res) {
    newUser.findById(req.params.user_id, function(err, theuser) {
        if (err) {res.send(err) }
        else { res.json(theuser) };  
    });
};

exports.getByUsername = function(req, res) {
    newUser.findOne({ "username" : req.params.username }, function(err, theuser) { /////
        if (err) {res.send(err) }
        else { res.json(theuser) };  
    });
};


////unlike annos, the users are expecting to be updated one piece of info at a time - no arrays
exports.updateOne = function(req, res) {

    var updateDoc = newUser.findOne({ "username" : req.params.username }); ///////
    updateDoc.exec(function(err, theuser) {

        if (err) {res.send(err)};

        var updateDocs = function(annoType, editType) {
        	if ( !isUseless(req.body.docs_edited[annoType][editType]) ) { 
        		theuser.docs_edited[annoType][editType].addToSet(req.body.docs_edited[annoType][editType]);
        	};
        };

        var updateAllEdits = function(annoType) {
        	if (!isUseless(req.body.docs_edited[annoType])) {
	        	updateDocs(annoType, "created");
	        	updateDocs(annoType, "edited");
	        	updateDocs(annoType, "deleted");
        	};
        };

        if (!isUseless(req.body.docs_edited)) {
        	updateAllEdits("vectors");
        	updateAllEdits("transcriptions");
        	updateAllEdits("translations");
        };

        var updateFavourite = function(theFavourite) {
        	if (!isUseless(req.body.favourites.the_image)) { theFavourite.the_image = req.body.favourites.the_image };
        	if (!isUseless(req.body.favourites.translations)) { theFavourite.translations = [req.body.favourites.translations] };
        	if (!isUseless(req.body.favourites.transcriptions)) { theFavourite.transcriptions = [req.body.favourites.transcriptions] };
        	return theFavourite;
        };

        var createNewFavourite = function() {
        	var theNew = { "image_id" : req.body.favourites.image_id };
        	var newFavourite = updateFavourite(theNew);
        	theuser.favourites.addToSet(newFavourite);
        };

        if (!isUseless(req.body.favourites)) {
        	var existingFav = false;
        	theuser.favourites.forEach(function(userFavourite) {
        		if (userFavourite.image_id == req.body.favourites.image_id) {
        			userFavourite = updateFavourite(userFavourite);
        			existingFav = true;
        		};
        	});
        	if (existingFav == false) {	createNewFavourite(); };
        };

        if (!isUseless(req.body.removefavourite)) {
        	var thefavourite;
        	theuser.favourites.forEach(function(userFavourite) {
        		if (theuser.favourites.image_id == req.body.removefavourite.image_id) {	thefavourite = userFavourite;	};
        	});
        	if (!isUseless(req.body.removefavourite.the_image)) { thefavourite.the_image = false; };
        	if (!isUseless(req.body.removefavourite.transcriptions)) { thefavourite.transcriptions.pull(req.body.removefavourite.transcriptions); };
        	if (!isUseless(req.body.removefavourite.translations)) { thefavourite.translations.pull(req.body.removefavourite.translations); };
        };

        theuser.save(function(err) {
            if (err) {res.send(err)}
            else {res.json(theuser)};
        });

    });
};

/////necessary?
exports.deleteOne = function(req, res) {
    newUser.remove({
        _id: req.body.user_id
    }, 
    function(err, theuser) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};



