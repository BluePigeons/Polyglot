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

///only for searchArrays where childDoc.id is to compare with checkID --- change to find()????
var idMatching = function(searchArray, checkID) {
    return searchArray.forEach(function(childDoc){
        if (childDoc.id == checkID) {
            return childDoc;
        };
    });
};

var arrayIDCompare = function(arrayA, arrayB) {

    return arrayA.forEach(function(doc){
        var theCheck = idMatching(arrayB, arrayA.id);
        if (typeof theCheck == (null || 'undefined' || false)) {}
        else {
            return [doc, theCheck];
        };
    });
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
        var theChildDoc = function(locationIndex) {
            return idMatching(transcription.children[locationIndex].fragments, req.body.children[0].fragments[0].id);
        };
        var locationIndex = transcription.children.indexOf(theLocation());
        var fragmentIndex = transcription.children[locationIndex].fragments.indexOf(theChildDoc(locationIndex));

        var fragmentChild = function(nIndex) {
            return transcription.children[locationIndex].fragments[nIndex];
        };

        var votesChange = function(voteNumber) {
            return transcription.children[locationIndex].fragments[fragmentIndex].votesUp += voteNumber; 
        };

        var rankChange = function(indexNumber, rankChangeNumber) {
            return transcription.children[locationIndex].fragments[indexNumber].rank += rankChangeNumber;
        };

        var reload = function(newChildRank) {
            //check to see if now highest ranking child and update if so
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

        var voteRankChange = function(voteNumber) {
        ///NOTE: the ranking is ONLY changed if the vote is now above or below the neighbour, not if now equal
            var neighbourIndex = fragmentIndex - voteNumber;
            if ( (neighbourIndex >= 0) && (fragmentChild(fragmentIndex).rank < fragmentChild(neighbourIndex).rank) 
                && ( theChildDoc().votesUp > fragmentChild(neighbourIndex).votesUp ) ) {

                return rankChange(neighbourIndex, -1)
                .then(function(newNeighbourRank) {return rankChange(fragmentIndex, 1)})
                .then(function(newChildRank) {return reload(newChildRank)})
                .catch(console.log.bind(console));
            }
            else if ( (typeof fragmentChild(neighbourIndex) != (null || 'undefined')) 
                && (fragmentChild(fragmentIndex).rank > fragmentChild(neighbourIndex).rank) 
                &&  (theChildDoc().votesUp < fragmentChild(neighbourIndex)).votesUp ) {

                return rankChange(neighbourIndex, 1)
                .then(function(newNeighbourRank) {return rankChange(fragmentIndex, -1)})
                .then(function(newChildRank) {return reload(newChildRank)})
                .catch(console.log.bind(console));

            }
            else {
                return transcription;
            };
        };

        var voteCheckChange = function(voteType) {
            if (voteType == "up") {
                return votesChange(1)
                .then(function(updatedVotes) {return voteRankChange(1)})
                .catch(console.log.bind(console));
            }
            else if (voteType == "down") {
                return votesChange(-1)
                .then(function(updatedVotes) {return voteRankChange(-1)})
                .catch(console.log.bind(console));
            };
        };

        var savingFunction = function() {
            transcription.save(function(err) {
                if (err) {res.send(err)}
                else {  
                    res.json({"reloadText": transcription}); 
                    //return transcription;  
                };
            });
        };

        voteCheckChange(req.params.voteType)
        .then(function(updatedTranscription){
            savingFunction();
        })
        .catch(console.log.bind(console));

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
            newTranscription.remove({_id: transcription._id},
            function(err){
                if (err) {res.send(err)};
            });
            if (transcriptions.length == 0) {
                res.send("all gone");
            };
        });
    }); 
};

var jsonFieldPush = function(docField, bodyField) {
    if (typeof bodyField != 'undefined' || bodyField != null) {
        return docField.push(bodyField);
    }
    else {
        return docField;
    };
};

var jsonFieldEqual = function(docField, bodyField) {
    if (typeof bodyField != 'undefined' || docField, bodyField != null) {
        return bodyField;
    }
    else {
        return docField;
    };
};

var bodySetting = function(oldBody, reqDoc, bodyID) {

    if ((typeof bodyID == ('undefined' || null)) && (typeof reqDoc == ('undefined' || null)) ){
        return oldBody;
    }
    else {

        var makeNewBody = function(newBody) {
            newBody.id = jsonFieldEqual(newBody.id, bodyID);
            return newBody;
        };
        return makeNewBody(oldBody)
        .then(function(newBody) {
            newBody.text = jsonFieldEqual(newBodytext, reqDoc.text);
            return newBody;
        })
        .then(function(newBody) {
            newBody.format = jsonFieldEqual(newBody.format, reqDoc.format);
            return newBody;
        })
        .then(function(newBody) {
            newBody.language = jsonFieldEqual(newBody.language, reqDoc.language);
            return newBody;
        })
        .catch(console.log.bind(console));
    };

};

var targetSetting = function(reqTarget, oldTarget) {
    if (typeof reqTarget == ('undefined' || null)) {
        return oldTarget;
    }
    else {
        return asyncPush(req.body.target, transcription.target);
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
    var newLocation = newLocationObject(newChildren.id, [ newFragmentChild] );
    return [-1, newLocation];
};

var newChildrenChecking = function(oldChildren, newChildren) {

    if (typeof newChildren[0] != 'undefined' || newChildren[0] != null) {
        return oldChildrenChecking(oldChildren, newChildren);
    }
    else {
        return [-1,-1];
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
        return newChildrenLocationArray;
    }
    else {
        var locationIndex = oldChildren.indexOf(theLocation);
        var newRank = theLocation.fragments.length;
        var newFragmentChild = newFragmentObject(newChildren.fragments[0].id, newRank);
        return [locationIndex, newFragmentChild];
    };
};

exports.addNew = function(req, res) {
    
    var transcription = new newTranscription(); 
    var newTransID = transcription.id;
    var transURL = transcriptionURL.concat(newTransID);

/*
    req.body.target.forEach(function(newTarget){
        transcription.target.push(
            {"id": newTarget.id,
            "format": newTarget.format}
        );
    });
*/

    transcription.body = bodySetting(transcription.body, req.body.body, transURL);   
    transcription.parent = jsonFieldEqual(transcription.parent, req.body.parent);
    transcription.translation = jsonFieldEqual(transcription.translation, req.body.translation);
    transcription.metadata.addToSet(jsonFieldPush(transcription.metadata, req.body.metadata));
    transcription.creator.addToSet(jsonFieldPush(transcription.creator, req.body.creator));
    transcription.target.addToSet(targetSetting(req.body.target, transcription.target));  ///if undefined??? 

    var newChildrenArray = newChildrenChecking(transcription.children, req.body.children);
    if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
        && (newChildrenArray[0] != -1) ) {
        transcription.children[0].fragments.addToSet(newChildrenArray);
    }
    else if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
        && (newChildrenArray[0] == -1) ) {
        transcription.children.addToSet(newChildrenArray);
    };

    transcription.save(function(err) {
        if (err) {
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

    console.dir(req.body);

    var updateDoc = newTranscription.findById(req.params.transcription_id);
    updateDoc.exec(function(err, transcription) {

        if (err) {res.send(err)};

        transcription.body = bodySetting(transcription.body, req.body.body, transcription.body.id);   
        transcription.parent = jsonFieldEqual(transcription.parent, req.body.parent);
        transcription.translation = jsonFieldEqual(transcription.translation, req.body.translation);
        transcription.metadata.addToSet(jsonFieldPush(transcription.metadata, req.body.metadata));
        transcription.creator.addToSet(jsonFieldPush(transcription.creator, req.body.creator));
        transcription.target.addToSet(targetSetting(req.body.target, transcription.target));  ///if undefined??? 

        var newChildrenArray = newChildrenChecking(transcription.children, req.body.children);
        if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
            && (newChildrenArray[0] != -1) ) {
            transcription.children[0].fragments.addToSet(newChildrenArray);
        }
        else if ( (transcription.children != ('undefined' || null)) && (newChildrenArray[0] != ('undefined' || null))
            && (newChildrenArray[0] == -1) ) {
            transcription.children.addToSet(newChildrenArray);
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

var generateVoteJSON = function(fragmentChild, theJSON) {
    ///adds new field before returning
    var voteDoc = {"votingInfo" : fragmentChild};
    return asyncPush([theJSON], [])
        .then(function(theText) {
            return asyncPush([voteDoc], theText);
        });
};

var foundParent = function(textParent, spanID, textArray, fragmentsArray) {

    var findSpanLocation = function(textParent) {
        return idMatching(textParent.children, spanID);
    };
    return findSpanLocation(textParent)
        .then(function(spanLocation) {
            return arrayIDCompare(textArray, spanLocation.fragments);
        }).then(function(compareArray) {
            return generateVoteJSON(compareArray[1], compareArray[0]);
        }).then(function(theText){
            return fragmentsArray.push(theText);
        });
};

var votingInfoTexts = function(targetID, textArray) {

    var fragmentsArray = [];
    var parts = targetID.split("#", 2); //////this will work with first two not last two.....
    var parentID = parts[0];
    var spanID = parts[1];
    var textWithVotes = function() {
        newTranscription.findOne({'body.id': parentID}, function(err, textParent){
            if (err) { 
                return fragmentsArray.then(asyncPush(textArray, fragmentsArray));
            }
            else {
                return fragmentsArray.foundParent(textParent, spanID, textArray, fragmentsArray);
            };
        });
    };
    return textWithVotes();
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
            votingInfoTexts(targetID, texts).then(function(textWithVotes){
                console.log("the textWithVotes is "+JSON.stringify(textWithVotes));
                res.json({list: textWithVotes});
            });
        }
        else {
            var thePush = asyncPush(texts, []);
            res.json({list: [thePush]});
        };
    });
};


