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

var replaceChildText = function(oldText, spanID, newInsert, oldInsert) {

    console.log("trying to replace child text of "+oldInsert+" with "+newInsert);

    var idIndex = oldText.indexOf(spanID);
    var startIndex = oldText.indexOf(oldInsert, idIndex);
    console.log("so the start index is "+startIndex); 
    var startHTML = oldText.slice(0, startIndex);
    var EndIndex = startIndex + oldInsert.length;
    var endHTML = oldText.substring(EndIndex);

    console.log("the startHTML is "+startHTML);
    console.log("but the end is "+endHTML);

    var newText = startHTML + newInsert+ endHTML;
    return newText;
};

exports.voting = function(req, res) {

    var voteOn = newTranscription.findOne({'body.id':req.body.parent});
    voteOn.exec(function(err, transcription) {

        if (err) {res.send(err)};

        var findLocationIndex = function(loc) {    
            return transcription.children.indexOf(loc);    
        };

        var theLocation = fieldMatching(transcription.children, "id", req.body.children[0].id);
        var thelocationIndex = findLocationIndex(theLocation);

        var findFragmentIndex = function(thefrag) {
            return theLocation.fragments.indexOf(thefrag); 
        };

        var theChildDoc =  fieldMatching(transcription.children[thelocationIndex].fragments, "id", req.body.children[0].fragments[0].id);
        var thefragmentIndex = findFragmentIndex(theChildDoc); 

        var fragmentChild = function(nIndex) {
            return transcription.children[thelocationIndex].fragments[nIndex];
        };

        var fragmentChildByRank = function(therank) {
            return fieldMatching(transcription.children[thelocationIndex].fragments, "rank", therank);
        };

        var votesChange = function(voteNumber) {
            return transcription.children[thelocationIndex].fragments[thefragmentIndex].votesUp += voteNumber; 
        };

        var rankChange = function(indexNumber, rankChangeNumber) {
            return transcription.children[thelocationIndex].fragments[indexNumber].rank += rankChangeNumber;
        };

        var reload = function(newChildRank) {
            console.log("in reload the new rank is "+newChildRank);
            //check to see if now highest ranking child and update the main transcription if so
            if (newChildRank == 0){ 
                var oldHTML = transcription.body.text;
                var newInsert = req.body.votedText;
                var oldInsert = req.body.topText;
                transcription.body.text = replaceChildText(oldHTML, req.body.children[0].id, newInsert, oldInsert);
                return transcription;
            }
            else {
                return transcription;
            };
        };

        var reorderByRank = function(voteIndex, nIndex) {
            var neigbourFrag = fragmentChild(nIndex);
            var voteFrag = theChildDoc;

            transcription.children[thelocationIndex].fragments.set(nIndex, voteFrag); //put the voted fragment in the neighbour's index
            transcription.children[thelocationIndex].fragments.set(voteIndex, neighbourFrag); //put the neighbour fragment in the old voted fragment's index

            if ((transcription.children[thelocationIndex].fragments[nIndex] == voteFrag)
                &&(transcription.children[thelocationIndex].fragments[voteIndex] == neighbourFrag)) {

                return transcription; ///only return once process is done
            };
        };

        var voteRankChange = function(voteNumber) {
        ///NOTE: the ranking is ONLY changed if the vote is now above or below the neighbour, not if now equal
            var neighbourRank =  theChildDoc.rank - voteNumber; 
            var theNeighbour = function() {    return fragmentChildByRank(neighbourRank);    };
            var neighbourIndex = function() {    return findFragmentIndex(theNeighbour());    };
            var votingUpNow = function() {
                rankChange(neighbourIndex(), 1);
                var newChildRank = rankChange(thefragmentIndex, -1);
                return reload(newChildRank);
            };
            var votingDownNow = function() {
                rankChange(neighbourIndex(), -1);
                var newChildRank = rankChange(thefragmentIndex, 1);
                return reload(newChildRank);                 
            };
           
            if ( (neighbourRank >= 0) && (theChildDoc.rank > neighbourRank) && ( theChildDoc.votesUp > theNeighbour().votesUp ) ) {
                return votingUpNow();
            }
            else if ( ( isUseless(fragmentChildByRank(neighbourRank)) == false) && (  theChildDoc.rank < neighbourRank  ) &&  (   theChildDoc.votesUp < theNeighbour().votesUp ) ) {
                return votingDownNow();               
            }
            else {
                return transcription;
            };
        };

        var voteCheckChange = function(voteType) {
            if (voteType == "up") {
                votesChange(1); /////make this into a promise setup ....?
                return voteRankChange(1);
            }
            else if (voteType == "down") {
                votesChange(-1);
                return voteRankChange(-1);
            };
        };

/////make saving more general in this doc....
        var savingFunction = function() {
            transcription.save(function(err) {
                if (err) {res.send(err)}
                else {  
                    res.json({"reloadText": transcription});  
                };
            });
        };

        var updateVotes = voteCheckChange(req.params.voteType);
        savingFunction();

    });

};

exports.findAll = function(req, res) {
    newTranscription.find(function(err, transcriptions) {
        if (err) {res.send(err)}
        else { res.json(transcriptions); };
    });
};

exports.deleteAll = function(req, res) {
      
    newTranscription.find(function(err, transcriptions) {
        if (err) {res.send(err)};

        transcriptions.forEach(function(transcription){
            transcription.remove({_id: transcription._id},
            function(err){
                if (err) {res.send(err)};
            });
        });
        if (transcriptions.length == 0) {
            res.send("all gone");
        };
    }); 
};

var jsonFieldEqual = function(docField, bodyDoc, bodyField) {
    if (typeof bodyDoc[bodyField] != 'undefined' || bodyDoc[bodyField] != null) {
        return bodyDoc[bodyField];
    }
    else {
        return docField;
    };
};

var bodySetting = function(oldBody, reqDoc, bodyID) {

    if ((typeof bodyID == ('undefined' || null)) || (typeof reqDoc == ('undefined' || null)) ){
        return oldBody;
    }
    else {

        var newBody = {};

        newBody.id = bodyID;
        newBody.text = jsonFieldEqual(oldBody, reqDoc, "text");
        newBody.format = jsonFieldEqual(oldBody, reqDoc, "format");
        newBody.language = jsonFieldEqual(oldBody, reqDoc, "format");

        return newBody;
        
    };

};

var newFragmentObject = function(theID, theRank) {

    return  {
        "id": theID,
        "votesUp": 0,
        "votesDown": 0,
        "rank": theRank
    };
};

var newLocationObject = function(theID, theFragments) {
    return {
        "id": theID,
        "fragments": theFragments
    };
};

var newChildrenLocationArray = function(oldChildren, newChildren) {
    var newFragmentChild = newFragmentObject(newChildren.fragments[0].id, 0);
    var newLocation = newLocationObject(newChildren.id, [ newFragmentChild ] );
    return [-1, newLocation];
};

var newChildrenChecking = function(oldChildren, newChildren) {

    if ( (typeof newChildren == 'undefined' || newChildren == null) || (typeof newChildren[0] == 'undefined' || newChildren[0] == null) ){
        return [-1,-1];
    }
    else {
        return oldChildrenChecking(oldChildren, newChildren[0]);
    };
};

var oldChildrenChecking = function(oldChildren, newChildren) {

    if (typeof oldChildren[0] != 'undefined' || oldChildren[0] != null) {
        return childrenLocationChecking(oldChildren, newChildren);
    }
    else {
        return newChildrenLocationArray(oldChildren, newChildren);
    };
};

var childrenLocationChecking = function(oldChildren, newChildren) {

    var theLocation = fieldMatching(oldChildren, "id", newChildren.id);

    if (isUseless(theLocation)) {
        return newChildrenLocationArray(oldChildren, newChildren);
    }
    else {
        ///////////same as voting problems.......
        var thelocationIndex = oldChildren.indexOf(theLocation);
        var newRank = theLocation.fragments.length;
        var newFragmentChild = newFragmentObject(newChildren.fragments[0].id, newRank);
        return [thelocationIndex, newFragmentChild];
    };
};

exports.addNew = function(req, res) {

//    console.log("being created "+JSON.stringify(req.body));
    
    var transcription = new newTranscription(); 
    var newTransID = transcription.id;
    var transURL = transcriptionURL.concat(newTransID);

    var jsonFieldPush = function(bodyDoc, theField) {
        if ( isUseless(bodyDoc[theField]) == false ) {
            bodyDoc[theField].forEach(function(subdoc){
                transcription[theField].addToSet(subdoc);
            });
        };
    };

    transcription.body = bodySetting(transcription.body, req.body.body, transURL);   
    transcription.parent = jsonFieldEqual(transcription.parent, req.body, "parent");
    transcription.translation = jsonFieldEqual(transcription.translation, req.body, "translation");

    jsonFieldPush(req.body, "metadata");
    jsonFieldPush(req.body, "target");  

    var newChildrenArray = newChildrenChecking(transcription.children, req.body.children);
    if ( ( isUseless(transcription.children) == false) && (isUseless(newChildrenArray[0]) == false )
        && (newChildrenArray[0] != -1) ) {
        transcription.children[newChildrenArray[0]].fragments.addToSet(newChildrenArray[1]);
    }
    else if ( ( isUseless(transcription.children) == false) && (isUseless(newChildrenArray[0]) == false )
        && (newChildrenArray[0] == -1) && (newChildrenArray[1] != -1) ) {
        transcription.children.addToSet(newChildrenArray[1]);
    };

    transcription.save(function(err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.json({ "url": transURL });
        }
    });

};

exports.getByID = function(req, res) {
    newTranscription.findById(req.params.transcription_id, function(err, transcription) {
        if (err) {res.send(err) }
        else { res.json(transcription) };  
    });
};

////IMPORTANT NOTE: use updateOne to add new children but NOT to change vote or rank!

exports.updateOne = function(req, res) {

    console.log("to be updated "+JSON.stringify(req.body));

    var updateDoc = newTranscription.findById(req.params.transcription_id);
    updateDoc.exec(function(err, transcription) {

        if (err) {res.send(err)};

        var jsonFieldPush = function(bodyDoc, theField) {
            if (isUseless(bodyDoc[theField]) == false ) {
                bodyDoc[theField].forEach(function(subdoc){
                    transcription[theField].addToSet(subdoc);
                });
            };
        };

        transcription.body = bodySetting(transcription.body, req.body.body, transcription.body.id);   
        transcription.parent = jsonFieldEqual(transcription.parent, req.body, "parent");
        transcription.translation = jsonFieldEqual(transcription.translation, req.body, "translation");
        jsonFieldPush(req.body, "metadata");
        jsonFieldPush(req.body, "target"); 

        var newChildrenArray = newChildrenChecking(transcription.children, req.body.children);
        if ( ( isUseless(transcription.children) == false) && (isUseless(newChildrenArray[0]) == false )
            && (newChildrenArray[0] != -1) ) {
            transcription.children[newChildrenArray[0]].fragments.addToSet(newChildrenArray[1]);
        }
        else if ( ( isUseless(transcription.children) == false) && (isUseless(newChildrenArray[0]) == false )
            && (newChildrenArray[0] == -1) && (newChildrenArray[1] != -1) ) {
            transcription.children.addToSet(newChildrenArray[1]);
        };

        transcription.save(function(err) {
            if (err) {res.send(err)}
            else {res.json(transcription)};
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

/*
var generateVoteJSON = function(fragmentChild, theJSON) {
    ///adds new field before returning
    var voteDoc = {"votingInfo" : fragmentChild};
    var JSONadded =  asyncPush([theJSON], []); 
    return asyncPush([voteDoc], JSONadded);

};
*/

var makeArray = function(anArray) {
    if (Array.isArray(anArray) == false) {
        return [anArray];
    }
    else { return anArray };
};

/////////merge as part of idmatching???
var theIDCheck = function(theArray, doc) {
    if ( typeof fieldMatching(theArray, "id", doc.body.id) != ('undefined' || null)) {
        return fieldMatching(theArray, "id", doc.body.id); 
    }
    else if ( typeof fieldMatching(theArray, "id", doc.id) != ('undefined' || null)) {
        return fieldMatching(theArray, "id", doc.id); 
    }
    else {
        return null;
    };           
};

/////should return an array of arrays of matching pairs
var arrayIDCompare = function(arrayA, arrayB) {

    var returnArray =[];
    var i = 0;

    arrayA.forEach(function(doc){

        if (typeof theIDCheck(arrayB, doc) == (null || 'undefined' || false)) { i += 1; }
        else {
            i += 1;
            returnArray.push([doc, theIDCheck(arrayB, doc)]); ////push a pair of matching docs
        };

    });

    if ( (i == arrayA.length) && (typeof returnArray[0] == ('undefined' || null)) ) {
        return null;
    }
    else if ( (i == arrayA.length) && (typeof returnArray[0] != ('undefined' || null)) ) {
        return returnArray;
    };
};

var foundParent = function(textParent, spanID, textArray) {

    var findSpanLocation = function() {
        return fieldMatching(textParent.children, "id", spanID);
    };

    return arrayIDCompare(textArray, findSpanLocation().fragments);

};

var bracketedArray = function(texts) {

    var theArray = [];
    texts.forEach(function(doc){

        theArray.push([doc]);

    });
    if (theArray.length == texts.length) {
        return theArray;
    };
};

var votingInfoTexts = function(targetID, textArray, res) {

    var parts = targetID.split("#", 2); //////this will work with first two not last two.....
    var parentID = parts[0];
    var spanID = parts[1];

    newTranscription.findOne({'body.id': parentID}, function(err, textParent){
        if (err) { 
            res.json({list: bracketedArray(textArray, res)});
        }
        else {
            var theVoteDocs = foundParent(textParent, spanID, textArray);
            res.json({list: theVoteDocs});
        };
    });
};

exports.getByTarget = function(req, res) {

    var targetID = req.params.target;
    var theSearch = newTranscription.find({'target.id': targetID});

    theSearch.exec(function(err, texts){

        if (err) {
            console.log(err);
            res.json({list: false});
        }
        else if (targetID.includes("#")==true) {
            votingInfoTexts(targetID, texts, res);            
        }
        else {

            res.json({list: bracketedArray(texts)});
        };
    });
};


