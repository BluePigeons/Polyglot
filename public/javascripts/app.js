
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
//the coordinates of the current vector selected
var currentCRS;

var textSelected = "";
var textSelectedFragment = "";
var textTypeSelected = "";

//Boolean to indicate if the currently selected text already has children or not
var childrenText = false;

//used to indicate if the user is currently searching for a vector to link or not
var selectingVector = "";

///// API FUNCTIONS

/*
var getVectorByCRS = function(CRS) {
  var currentCRSurl = vectorURL.concat(CRS);
//  var vector = $.get(currentCRSurl);
//  return vector;
};
*/
var getTranscriptionByVector = function(vector) {
    var targetVectorURL = transcriptionURL.concat(vector);
//  $.get(targetVectorURL);
//    return vectorParent;
};

var getTranslationByVector = function(vector) {
    var targetVectorURL = translationURL.concat(vector);
//  $.get(targetVectorURL);
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

var checkForTranscription = function(target) {

  field = $.get(target).transcription;
  if (field == "") {
    return false;
  }
  else {
    return field;
  };

};

var checkForTranslation = function(target) {

  field = $.get(target).translation;
  if (field == "") {
    return false;
  }
  else {
    return field;
  };

};

var updateVectorSelection = function(vectorURL) {

  if (selectingVector == "transcription") {

//    var textSelectedURL = transcriptionURL.concat(textSelected);

//    $.put(textSelectedURL, {target: {id: vectorURL}}, null);
//    $.put(vectorURL, {transcription: textSelectedURL}, null);

/*    

*/

//    selectingVector = "";

  }

  else if (selectingVector == "translation") {

//    var textSelectedURL = translationURL.concat(textSelected);

//    $.put(textSelectedURL, {target: vectorURL}, null);
//    $.put(vectorURL, {translation: textSelectedURL});

//    var partnerTranscription = $.get(textSelectedURL).transcription;
//    $.put(partnerTranscription, {target: {id: vectorURL}}, null);

//    selectingVector = "";

  }

  else {
    return handleError(err);
  }

};

//////POPUP OPTIONS

var popupTranscriptionChildrenMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //VIEW OTHER TRANSCRIPTIONS
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranscriptionMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //ADD NEW TRANSCRIPTION
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranslationChildrenMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //VIEW OTHER TRANSLATIONS
  //openTranslationMenu(textSelectedURL);

};

var popupTranslationMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //ADD NEW TRANSLATION
  //openTranslationMenu(textSelectedURL);

};


var popupVectorMenu = function (vector) {

  //OPEN TRANSCRIPTION 
  //contains .openTranscriptionMenu

  //OPEN TRANSLATION 
  // contains .openTranslationMenu

/*
  $(document).ready(function(){
    $(".openTranslationMenu").click(openTranslationMenu(vector));
    $(".openTranscriptionMenu").click(openTranscriptionMenu(vector));
  });
*/

};

///// VIEWER WINDOWS

var openTranscriptionMenu = function (target) {

  if (checkForTranscription(target) == false) {

    //enable the ADD TRANSCRIPTION input option and display textarea blank

  };

  var theText = viewTranscription(target);

  //set textarea contents to theText
  //load display of children transcriptions highlighted

  //META DATA OPTIONS

  //LINK VECTOR 
  //contains ".linkVectorTranscription" class

};


var openTranslationMenu = function (target) {



};

///// TRANSLATION AND TRANSCRIPTION FUNCTIONS

var viewTranscription = function (target) {
  if (vectorSelected != "") {
    var transcriptionText = getTranscriptionByVector(target).body.text;
    vectorSelected = "";
    return transcriptionText;
  }
  else if (textSelected != "") {
    var transcriptionText = getTranscriptionByText(target).body.text;
    textSelected = "";
    return transcriptionText;
  }
  else {
    alert("What are you viewing the transcription of?")
  }

};

var viewTranslation = function() {

};


var addTranscription = function(){

  var transcriptionText = $("#transcription").val();
  //alert(transcriptionText);
  $.post(
    transcriptionURL,
    {body: {text: transcriptionText}},
    null

//need to save the id of the JSON just created as a variable
//    var createdTranscription = "";

  );

//  var createdTranscriptionURL = transcriptionURL.concat(createdTranscription);

  if (textSelected != "") {

    var textSelectedURL = transcriptionURL.concat(textSelected);

//  $.put(createdTranscriptionURL, {target: {id: textSelectedURL}, {format: "text Fragment"}}, null);
//  $.put(createdTranscriptionURL, {parent: textSelectedURL}, null);

//  $.put(textSelectedURL, {children: [createdTranscriptionURL]}, null);

    textSelected = "";

  }

  else if (vectorSelected != "") {

//  var vectorSelectedURL = vectorURL.concat(vectorSelected);
//  $.put(createdTranscriptionURL, {target: {id: vectorSelectedURL}, {format: "text Fragment"}}, null);

    vectorSelected = "";

  }

  else {
    alert("What are you adding the transcription of?");
  };

};

//ADD TRANSLATION OPTION
var addTranslation = function() {

};

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
var votedUp = function () {

};

//when vote down added
var votedDown = function () {

};


$(document).ready(function(){

  $(".addTranscriptionSubmit").click(addTranscription());

  $('.addTranslationSubmit').click(addTranslation());

  $(".linkVectorTranscription").click(function(){

    selectingVector = "transcription";

  //highlight or emphasise image viewer

  });

  $(".linkVectorTranslation").click(function(){

    selectingVector = "translation";

  //highlight or emphasise image viewer

  });

  $('.votedUp').click(votedUp());

  $('.votedDown').click(votedDown());

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
//  var vectorSelectedURL = vectorURL.concat(vectorSelected);

    if (selectingVector != "") {
      updateVectorSelection(vectorSelectedURL);
    }

});

/////whenever a vector is clicked
drawnItems.on('click', function(vec) {

  var shape = vec.layer.toGeoJSON();
  var currentCRS = shape.geometry.coordinates;
  //alert(currentCRS);

//find id of vector selected
  vectorSelected = getVectorByCRS(currentCRS)._id;
  var vectorSelectedURL = vectorURL.concat(vectorSelected);

  if (selectingVector == "") {
    popupVectorMenu(vectorSelectedURL);
  }

  else {
    updateVectorSelection(vectorSelectedURL);
  }

});


///// TEXT SELECTION

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

