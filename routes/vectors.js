// SETUP

var express    = require('express');
var bodyParser = require('body-parser');

var newVector     = require('../public/javascripts/newVector');
var newTranslate    = require('../public/javascripts/newTranslation');
var newTranscription    = require('../public/javascripts/newTranscription');

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
    vector.body.coordinates = req.body.coordinates;
    //vector.body.type = req.body.type;

    vector.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'JSON created!' });
//need a response that sends the id of the JSON just created

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

        vector.body.text = req.body.body.text; 
        vector.target.id = req.body.target._id;

        vector.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'JSON updated!' });
        });

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

exports.getByCRS = function(req, res) {

    newVector.findOne(req.params.coordinates, function(err, vector) {

        if (err)
            res.send(err);

    })
};
