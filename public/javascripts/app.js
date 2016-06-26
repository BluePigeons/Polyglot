
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

var vectorSelected = "";
//var findTranscriptionByVector = $.get();
//var findTranslationByVector = $.get();

var textSelected = "";
//var findTranscriptionByText ;
//var findTranscriptionByVector ;

//POPUP OPTIONS

//popup opened and checking to see options displayed
var popupMenu = function () {

};

//VIEW TRANSCRIPTION OPTIONS clicked
var viewTranscription = function () {
  if (vectorSelected != "") {
    findTranscriptionByVector.select('body');
    findTranscriptionByVector.exec(function(err, transcription){
      if (err) return handleError(err);

//open the body text in a display textarea

    })
  }
  else if (textSelected != "") {

    findTranscriptionByText.select('body');
    findTranscriptionByText.exec(function(err, transcription){
      if (err) return handleError(err);

//open the body text in a display textarea

    })
  }
  else {
    alert("What are you viewing the transcription of?")
  }
};

//VIEW TRANSLATION OPTIONS clicked
var viewTranslation = function (){

};

//ADD VECTOR clicked
var linkVector = function () {
  selectingVector = "trans";
};

//ADD TRANSCRIPTION OPTION

//ADD TRANSLATION OPTION

//METADATA OPTIONS



var selectingVector = "";

$(document).ready(function(){

  var transcriptionText;

  $(".addTranscription").click(function(){
      transcriptionText = $("#transcription").val();
      //alert(transcriptionText);
      $.post(
        "http://localhost:8080/api/transcriptions",
        {body: {text: transcriptionText}},
        null
      );

  //if textSelected is not empty

  //find textSelected JSON file

  //READ textSelected relevant fields

  //PUSH shared values to new JSON file

  //PUSH target field of text fragment

  //else if currentVector is not empty

  //find currentVector JSON file

  //READ currentVector relevant fields

  //PUSH shared values to new JSON file

  //PUSH target field of geoJSON

  //else return error

  });

  $(".linkVector").click(linkVector());

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

//add the layer to the layer group
	drawnItems.addLayer(layer);

//a new geoJSON file is created
  var shape = layer.toGeoJSON();
  var coordinates = shape.geometry.coordinates;
  //alert(coordinates);

  var vectorType = shape.geometry.type;
  //alert(vectorType);
  $.post(
      "http://localhost:8080/api/vectors",

      {coordinates: [coordinates]}, 

      null

      );

  //$.put("http://localhost:8080/api/vectors" + vector_id);

//check if selectingVector is blank
  if (selectingVector == "") {
//if it is then generate both translation and transcription JSONs
//  $.post("http://localhost:8080/api/transcriptions");
//  $.post("http://localhost:8080/api/translations");

  }

  else if (selectingVector == "trans") {
//if it has "trans" then look up transcription and translation JSONs currently selected

//update transcription and translation JSONs target{} field

  }

//otherwise it's an error

  else {

  }

//reset selectingVector to blank
  selectingVector = "";

});

/////whenever a vector is clicked
drawnItems.on('click', function(vec) {

  currentCRS = vec.layer.toGeoJSON().geometry.coordinates;
  //alert(currentCRS);

//identify JSON id of vector selected
  var findByCrs = newVector.findOne({'coordinates': currentCRS});
  findByCRS.select('_id @id');

//set vectorSelected to id
  findByCRS.exec(function (err, vector){
    if (err) return handleError(err);
    vectorSelected = vector._id;
  });
  //alert(vectorSelected);

//check if selectingVector is blank 
  if (selectingVector == "") {
//if it is then trigger popup
    popupMenu();
  }

//if it has "trans" then look up transcription and translation JSONs currently selected
  else if (selectingVector == "trans") {

//update transcription JSON target{} field
    findTranscriptionByVector.select('_id @id');
    findTranscriptionByVector.exec(function(err, transcription){
      if (err) return handleError(err);

  //    $.put();

      })

//update translation JSON target{} field

//set selectingVector to blank
    selectingVector = "";

  }

//else return error
  else {
    return handleError(err);
  };
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


