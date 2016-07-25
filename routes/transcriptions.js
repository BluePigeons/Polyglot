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

//ROUTE FUNCTIONS

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

///only for searchArrays where childDoc.id is to compare with checkID
var idMatching = function(searchArray, checkID) {
  var theMatch;
  searchArray.forEach(function(childDoc){
    if (childDoc.id == checkID) {
        theMatch = childDoc;
    };
  });
  return theMatch;
};

var replaceChildText = function(oldText, newInsert, oldInsert) {

    var StartIndex = oldText.indexOf(oldInsert);
    var startHTML = oldText.slice(0, StartIndex).concat(newInsert);
    var EndIndex = oldText.indexOf(oldInsert) + oldInsert.length;
    var endHTML = oldText.substring(EndIndex);

    var newText = startHTML + endHTML;
    return newText;
};

exports.voting = function(req, res) {

    var voteOn = newTranscription.findOne({'body.id':req.body.parent});
    voteOn.exec(function(err, transcription) {

        if (err) {res.send(err)};

        var theLocation = function() {
            return idMatching(transcription.children, req.body.children[0].id);
        };
        var locationIndex = function() {
            return transcription.children.indexOf(theLocation());
        };
        var theChildDoc = function(locIndex) {
            return idMatching(transcription.children[locIndex].fragments, req.body.children[0].fragments[0].id);
        };
        var fragmentIndex = function() {
            return theLocation().fragments.indexOf(theChildDoc(locationIndex())); 
        };

        var fragmentChild = function(nIndex) {
            return transcription.children[locationIndex()].fragments[nIndex];
        };

        var votesChange = function(voteNumber) {
            return transcription.children[locationIndex()].fragments[fragmentIndex()].votesUp += voteNumber; 
        };

        var rankChange = function(indexNumber, rankChangeNumber) {
            return transcription.children[locationIndex()].fragments[indexNumber].rank += rankChangeNumber;
        };

        var reload = function(newChildRank) {
            //check to see if now highest ranking child and update the main transcription if so
            if (newChildRank == 0){ 
                var oldHTML = transcription.body.text;
                var newInsert = req.body.votedText;
                var oldInsert = req.body.topText;
                transcription.body.text = replaceChildText(oldHTML, newInsert, oldInsert);
                return transcription;
            }
            else {
                return transcription;
            };
        };

        var reorderByRank = function(voteIndex, nIndex) {
            var neigbourFrag = fragmentChild(nIndex);
            var voteFrag = fragmentChild(locationIndex());

            transcription.children[locationIndex()].fragments.set(nIndex, voteFrag); //put the voted fragment in the neighbour's index
            transcription.children[locationIndex()].fragments.set(voteIndex, neighbourFrag); //put the neighbour fragment in the old voted fragment's index

            if ((transcription.children[locationIndex()].fragments[nIndex] == voteFrag)
                &&(transcription.children[locationIndex()].fragments[voteIndex] == neighbourFrag)) {

                return transcription; ///only return once process is done
            };
        };

        var voteRankChange = function(voteNumber) {
        ///NOTE: the ranking is ONLY changed if the vote is now above or below the neighbour, not if now equal
            var neighbourIndex = fragmentIndex() - voteNumber;
            if ( (neighbourIndex >= 0) && (fragmentChild(fragmentIndex()).rank < fragmentChild(neighbourIndex).rank) 
                && ( theChildDoc(locationIndex()).votesUp > fragmentChild(neighbourIndex).votesUp ) ) {

                var votingUpNow = function() {
                    rankChange(neighbourIndex, 1);
                    var newChildRank = rankChange(fragmentIndex(), -1);
                    reload(newChildRank);
                    return reorderByRank(fragmentIndex(), neighbourIndex);
                };
                return votingUpNow();

            }
            else if ( (typeof fragmentChild(neighbourIndex) != (null || 'undefined')) 
                && (fragmentChild(fragmentIndex()).rank > fragmentChild(neighbourIndex).rank) 
                &&  (theChildDoc(locationIndex()).votesUp < fragmentChild(neighbourIndex)).votesUp ) {

                var votingDownNow = function() {
                    rankChange(neighbourIndex, -1);
                    var newChildRank = rankChange(fragmentIndex(), 1);
                    reload(newChildRank);  
                    return reorderByRank(fragmentIndex(), neighbourIndex);                 
                };
                return votingDownNow();               

            }
            else {
                return transcription;
            };
        };

        var voteCheckChange = function(voteType) {
            if (voteType == "up") {
                votesChange(1);
                return voteRankChange(1);
            }
            else if (voteType == "down") {
                votesChange(-1);
                return voteRankChange(-1);
            };
        };

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

    var theLocation = idMatching(oldChildren, newChildren.id);

    if (typeof theLocation == ('undefined' || null)) {
        return newChildrenLocationArray(oldChildren, newChildren);
    }
    else {
        ///////////same as voting problems.......
        var locationIndex = oldChildren.indexOf(theLocation);
        var newRank = theLocation.fragments.length;
        var newFragmentChild = newFragmentObject(newChildren.fragments[0].id, newRank);
        return [locationIndex, newFragmentChild];
    };
};

exports.addNew = function(req, res) {

//    console.log("being created "+JSON.stringify(req.body));
    
    var transcription = new newTranscription(); 
    var newTransID = transcription.id;
    var transURL = transcriptionURL.concat(newTransID);

    var jsonFieldPush = function(bodyDoc, theField) {
        if (typeof bodyDoc[theField] != 'undefined' || bodyDoc[theField] != null) {
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
    if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
        && (newChildrenArray[0] != -1) ) {
        transcription.children[newChildrenArray[0]].fragments.addToSet(newChildrenArray[1]);
    }
    else if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
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
            if (typeof bodyDoc[theField] != 'undefined' || bodyDoc[theField] != null) {
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
        if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
            && (newChildrenArray[0] != -1) ) {
            transcription.children[newChildrenArray[0]].fragments.addToSet(newChildrenArray[1]);
        }
        else if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
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
    if ( typeof idMatching(theArray, doc.body.id) != ('undefined' || null)) {
        return idMatching(theArray, doc.body.id); 
    }
    else if ( typeof idMatching(theArray, doc.id) != ('undefined' || null)) {
        return idMatching(theArray, doc.id); 
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
        return idMatching(textParent.children, spanID);
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


