// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../examples/newVector');
var newTranslate    = require('../examples/newTranslation');
var newTranscription    = require('../examples/newTranscription');

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
    vector.name = req.body.name;  

    vector.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'JSON created!' });
    });

};

exports.getByID = function(req, res) {
    newVector.findById(req.params.vector_id, function(err, vector) {
        if (err)
            res.send(err);
        res.json(vector);
        
    });

};

exports.updateOne = function(req, res) {

    newVector.findById(req.params.vector_id, function(err, vector) {

        if (err)
            res.send(err);

        vector.name = req.body.name; 

        vector.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'JSON updated!' });
        });

    });
};

