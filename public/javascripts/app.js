
//The main Annotator script
/*
if (typeof annotator === 'undefined') {
  alert("Oops! it looks like you haven't built Annotator. " +
        "Either download a tagged release from GitHub, or build the " +
        "package by running `make`");
} else {
  var app = new annotator.App();
  app.include(annotator.ui.main);
  app.start();
}
*/
var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";

var vectorSelected = "";
var textSelected = "";
var textTypeSelected = "";
var currentCRS;

var vectorSelectedURL = vectorURL.concat(vectorSelected);

/*
var getVectorByCRS = function(CRS) {
  var currentCRSurl = vectorURL.concat(CRS);
//  var vector = $.get(currentCRSurl);
//  return vector;
};
*/
var getTranscriptionByVector = function(vector) {
    var targetVectorURL = transcriptionURL.concat(vector);
//  var vectorParent = $.get(targetVectorURL);
//    return vectorParent;
};

var getTranslationByVector = function(vector) {
    var targetVectorURL = translationURL.concat(vector);
//  var vectorParent = $.get(targetVectorURL);
//    return vectorParent;
};

var getTranscriptionByText = function(text) {
    var targetTextURL = transcriptionURL.concat(text);
//    var textParent = $.get(targetTextURL);
//    return textParent;
};

var getTranslationByText = function(text) {
    var targetTextURL = translationURL.concat(text);
//    var textParent = $.get(targetTextURL);
//    return textParent;
};

var updateVectorSelection = function() {

  if (selectingVector == "transcription") {

//    var textSelectedURL = transcriptionURL.concat(textSelected);
//    var parentTranscription = $.put(textSelectedURL, {target: vectorSelectedURL});
//    selectingVector = "";

  }

  else if (selectingVector == "translation") {

//    var textSelectedURL = translationURL.concat(textSelected);
//    var parentTranslation = $.put(textSelectedURL, {target: vectorSelectedURL});
//    selectingVector = "";

  }

  else {
    return handleError(err);
  }

};

//POPUP OPTIONS

//popup opened and checking to see options displayed
var popupMenu = function () {

};

//VIEW TRANSCRIPTION OPTIONS clicked
var viewTranscription = function () {
  if (vectorSelected != "") {

//    var transcriptionText = getTranscriptionByVector(vectorSelected).body.text;

//generate display with content


  }
  else if (textSelected != "") {

//    var transcriptionText = getTranscriptionByText(textSelected).body.text;

//generate display with content

  }
  else {
    alert("What are you viewing the transcription of?")
  }
};

//VIEW TRANSLATION OPTIONS clicked


//ADD TRANSCRIPTION OPTION
var addTranscription = function(){

  transcriptionText = $("#transcription").val();
  //alert(transcriptionText);
  $.post(
    "http://localhost:8080/api/transcriptions",
    {body: {text: transcriptionText}},
    null

//need to save the id of the JSON just created as a variable
//    var createdTranscription = "";

  );

//  var createdTranscriptionURL = transcriptionURL.concat(createdTranscription);

  //if textSelected is not empty
  if (textSelected != "") {

    if (textTypeSelected == "transcription") {
      var textSelectedURL = transcriptionURL.concat(textSelected);
    }
    else if (textTypeSelected == "translation") {
      var textSelectedURL = translationURL.concat(textSelected);
    }
    else {
      alert("Please only add transcriptions to the document and not the website");
    };

//  $.put(createdTranscriptionURL, {target: {id: textSelectedURL}, {format: "text Fragment"}}, null);

//PUT shared metadata

  }
  //else if currentVector is not empty
  else if (vectorSelected != "") {

//  $.put(createdTranslationURL, {target: {id: vectorSelectedURL}, {format: "text Fragment"}}, null);

  //PUSH shared metadata

  }

  else {
    alert("What are you adding the transcription of?");
  };

};

//ADD TRANSLATION OPTION


var selectingVector = "";

$(document).ready(function(){

  var transcriptionText;

  $(".addTranscription").click(addTranscription());

  $(".linkVectorTranscription").click(function(){

    selectingVector = "transcription";

  //highlight or emphasise image viewer

  });

  $(".linkVectorTranslation").click(function(){

    selectingVector = "translation";

  //highlight or emphasise image viewer

  });

  $('.viewTranscription').click(viewTranscription());

  $('.viewTranslation').click(viewTranslation());

});


///////LEAFLET 

var map;

//IIIF Viewer initial settings

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

var baseLayer = L.tileLayer.iiif(
  'http://ids.lib.harvard.edu/ids/iiif/25286610/info.json'
).addTo(map);

//initialises layer group called drawItems and adds it to the map - standard Leaflet Draw setup
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var controlOptions = {

    draw: {
// disables the polyline feature as this is unnecessary for annotation of text as it cannot enclose it
        polyline: false,
        marker: false
    },
//passes draw controlOptions to the FeatureGroup of editable layers
    edit: {
        featureGroup: drawnItems        
    }
};

//adds new draw control features to the map
new L.Control.Draw(controlOptions).addTo(map);

/*if (window.getSelection) {
    textSelected = window.getSelection().toString();
} 
else if (document.selection && document.selection.type != "Control") {
    textSelected = document.selection.createRange().textSelected;
};

function selectingText() {
  alert(textSelected);
};

var elem = document.getElementById('thing');
elem.addEventListener('select', function() {
  alert('Selection changed!');
}, false);



var gettext = (function () {
    if (typeof global.Gettext === 'function') {
        var _gettext = new global.Gettext({domain: "annotator"});
        return function (msgid) { return _gettext.gettext(msgid); };
    }

    return function (msgid) { return msgid; };
}());
*/


//look up parent text JSON for target

//store fragment selector info as textSelected

//trigger popup


////whenever a new vector is created within the app
map.on('draw:created', function(evt) {
	var type = evt.layerType;
	var layer = evt.layer;

	drawnItems.addLayer(layer);

//a new geoJSON file is always created
  var shape = layer.toGeoJSON();
  currentCRS = shape.geometry.coordinates;
  //alert(currentCRS);

  var vectorType = shape.geometry.type;

  $.post(
      "http://localhost:8080/api/vectors",

      {coordinates: [currentCRS]}, 

      null

//need to save the id of the JSON just created as a variable
//      createdVector = "";

      );

//identify JSON id of vector just created??
//  vectorSelected = getVectorByCRS(currentCRS)._id;
//  vectorSelected = createdVector;

  if (selectingVector == "") {

//  $.post("http://localhost:8080/api/transcriptions", {target:{id: vectorSelectedURL}}, null);
//  $.post("http://localhost:8080/api/translations", {target:{id: vectorSelectedURL}}, null);

    popupMenu();

  }

  else {
    updateVectorSelection();
  }

});

/////whenever a vector is clicked
drawnItems.on('click', function(vec) {

  var shape = vec.layer.toGeoJSON();
  var currentCRS = shape.geometry.coordinates;
  //alert(currentCRS);

//find id of vector selected
  vectorSelected = getVectorByCRS(currentCRS)._id;

  if (selectingVector == "") {
    popupMenu();
  }

  else {
    updateVectorSelection();
  }

});


//find the highest ranking child
function highestChild() {

};


//update the ranking of a set of children
function updateRanks(parent, child, newRank) {



};

//check if the text fragment in parent body is the same as child text
function compareChild(parentText, newChild) {

};

//when vote up added

//when vote down added


