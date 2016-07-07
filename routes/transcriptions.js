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

var replaceChildText = function(oldText, newInsert, oldInsert) {

    var StartIndex = oldText.indexOf(oldInsert);
    startHTML = oldText.slice(0, StartIndex).concat(newInsert);

    var EndIndex = oldText.indexOf(oldInsert) + oldInsert.length;
    endHTML = oldText.substring(EndIndex);

    var newText = startHTML + endHTML;
    return newText;
};

//basically the rank will currently only change if it outranks above or below existing
//produces array where 
//first is rank change made to current child
//second is the index of relevant neighbour to be swapped
//third is rank change made to relevant neighbour

var compareChild = function(vote, alternative, index, currentArray) {

    var rankChange;
    if(vote>0) {
        var indexUp = index -1;
        if (indexUp >= 0) {
            var upChild = currentArray[indexUp];
            var upChildNet = upChild.votesUp - upChild.votesDown;
            var currentNet = 1 + alternative.votesUp - alternative.votesDown;
            if (currentNet > upChildNet) {
                rankChange = [-1, indexUp, 1];
            }
            else {rankChange = [0,indexUp,0]};
        }
        else {
            rankChange = [0,indexUp,0];
        };
    }

    else if (vote<0) {
        var indexDown = index +1;
        var downChild = currentArray[indexDown];
        var downChildNet = downChild.votesUp - downChild.votesDown;
        var currentNet = alternative.votesUp - alternative.votesDown - 1;
        if (currentNet < upChildNet) {
            rankChange = [1, indexDown, -1];
        }
        else {rankChange = [0, indexDown, 0]};
    }

    else {
        return false;
    };
    return rankChange;
};

exports.voting = function(req, res) {

    var voteOn = newTranscription.findById(req.body.parent);
    voteOn.exec(function(err, transcription) {

        if (err) {res.send(err)};

        var reload;

        transcription.children.forEach(function(location){
            if (location.id == req.body.children.id) {
                location.fragments.forEach(function(alternative, index, currentArray){
                    if(alternative.id == req.body.children.fragments.id) {
                        var oldRank = alternative.rank;
                        var rankChange;
                        if (req.params.voteType == "votesUp") {
                            rankChange = compareChild(1, alternative, index, currentArray);
                            alternative.votesUp += 1;
                        };
                        if (req.params.voteType == "votesDown") {
                            rankChange = compareChild(1, alternative, index, currentArray);
                            alternative.votesUp -= 1;
                        };
                        var currentRank = oldRank + rankChange[0];
                        alternative.rank = currentRank;
                        location.fragments[rankChange[1]].rank += rankChange[2];
                        //check to see if now highest ranking child and update
                        if (oldRank != 0 && currentRank == 0){ 
                            var oldHTML = transcription.body.text;
                            var newInsert = req.body.wholeText;
                            var oldInsert = req.body.wholeCurrentText;
                            transcription.body.text = replaceChildText(oldHTML, newInsert, oldInsert);
                            reload = "yes";
                        }
                        else {
                            reload = "no";
                        };
                    }
                    else { res.json({"fail":"what are you voting for??"}) };
                });
            }
            else { res.json({"fail":"what are you voting for??"}) };
        });

        transcription.save(function(err) {
            if (err) {res.send(err)};
            res.json({"reloadText": reload});
        });

    });

};

exports.findAll = function(req, res) {
    newTranscription.find(function(err, transcriptions) {
        if (err)
            res.send(err);

        res.json(transcriptions);
    });

};

exports.deleteAll = function(req, res) {
      
    newTranscription.find(function(err, transcriptions) {
        if (err) {res.send(err)};

        transcriptions.forEach(function(transcription){
            newTranscription.remove({_id: transcription._id},
            function(err){
                if (err) {res.send(err)};
            })
        });

        res.send("all gone");
    }); 
};

exports.addNew = function(req, res) {
    
    var transcription = new newTranscription(); 

    var newTransID = transcription.id;
    var transURL = transcriptionURL.concat(newTransID);
    console.dir(req.body);

    transcription.body.text = req.body.body.text;
    transcription.body.id = transURL;
    transcription.body.format = req.body.body.format;

    if (typeof req.body.body.language != 'undefined' || req.body.body.language != null) {
        transcription.body.language = req.body.body.language;
    };

    transcription.target.push(
        {"id": req.body.target.id,
        "format": req.body.target.format}
    );

    if (typeof req.body.metadata != 'undefined' || req.body.metadata != null) {
        transcription.metadata.push(req.body.metadata);
    };

    if (typeof req.body.parent != 'undefined' || req.body.parent != null) {
        transcription.parent = req.body.parent;
    };

    if (typeof req.body.children != 'undefined' || req.body.children != null) {

        transcription.children.forEach(function(location){
            if (location.id == req.body.children.id) {
                location.fragments.push({
                        "id": req.body.children.fragments.id,
                        "votesUp": 0,
                        "votesDown": 0,
                        "rank": 0
                    });
            }
            else {
                transcription.children.push({
                    "id": req.body.children.id,
                
                    "fragments": [{
                        "id": req.body.children.fragments.id,
                        "votesUp": 0,
                        "votesDown": 0,
                        "rank": 0
                    }]
                });
            };
        });
    };

    transcription.save(function(err) {
        if (err)
            res.send(err);
    });

    res.json({ "url": transURL });

};

exports.getByID = function(req, res) {
    newTranscription.findById(req.params.transcription_id, function(err, transcription) {
        if (err)
            res.send(err);
        res.json(transcription);
        
    });

};

////IMPORTANT NOTE: use updateOne to add new children but NOT to change vote or rank!

exports.updateOne = function(req, res) {

    var updateDoc = newTranscription.findById(req.params.transcription_id);
    updateDoc.exec(function(err, transcription) {

        if (err) {res.send(err)};

        //none of this is working!!!

        if (typeof req.body.body.text != 'undefined' || req.body.body.text != null) {
            transcription.body.text = req.body.body.text;
        };

        if (typeof req.body.body.language != 'undefined' || req.body.body.language!= null) {
            transcription.body.language = req.body.body.language;
        };

        if (typeof req.body.parent != 'undefined' || req.body.parent != null) {
            transcription.parent = req.body.parent;
        };

        if (typeof req.body.metadata != 'undefined' || req.body.metadata != null) {
            vector.metadata.push(req.body.metadata);
        };

        if (typeof req.body.children != 'undefined' || req.body.children != null) {

            transcription.children.forEach(function(location){
                if (location.id == req.body.children.id) {
                    location.fragments.push({
                            "id": req.body.children.fragments.id,
                            "votesUp": 0,
                            "votesDown": 0,
                            "rank": 1
                        });
                }
                else {
                    transcription.children.push({
                        "id": req.body.children.id,
                    
                        "fragments": [{
                            "id": req.body.children.fragments.id,
                            "votesUp": 0,
                            "votesDown": 0,
                            "rank": 0
                        }]
                    });
                };
            });
        };

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

exports.getByTarget = function(req, res) {

    var textAnnos = [];
    var targetID = req.params.target;
    var theSearch = newTranscription.find({'target.id': targetID});

    theSearch.exec(function(err, texts){

        if (err) {
            console.log(err);
            res.json({list: false});
        }
        else {
            texts.forEach(function(textJSON){
                textAnnos.push(textJSON);
            });

            res.json({list: textAnnos});
        };
    });

};


