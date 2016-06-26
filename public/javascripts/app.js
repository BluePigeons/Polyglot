
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

$(document).ready(function(){
  var name;
  $("#submit").click(function(){
    name = $("#name").val();
    $.post(
      "http://localhost:8080/api/vectors",
      {name: name}, 
      function(data){
        if(data ==='done')
          {
            console.log("login success");
          }
      }
    );
  });
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

//blank if no vector has been selected
//otherwise contains JSON id url of most recently selected vector
var vectorSelected = "";

//basic function to identify text that has been selected on a page
var textSelected = "";

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


//whenever a new vector is created within the app
map.on('draw:created', function(evt) {
	var type = evt.layerType,
		layer = evt.layer;

//add the layer to the layer group
	drawnItems.addLayer(layer);

//a new geoJSON file is created
	var shape = layer.toGeoJSON();

	
//check if selectingVector is blank

//if it is then generate both translation and transcription JSONs

//if it has "trans" then look up transcription and translation JSONs currently selected

//update transcription and translation JSONs target{} field

//set selectingVector to blank

//else return error

});

//whenever a vector is clicked
//map.vector.on('click', function(vec, selectingVector) {

//identify JSON id of vector selected

//set currentVector to id

//check if selectingVector is blank 

//if it is then trigger popup

//if it has "trans" then look up transcription and translation JSONs currently selected

//update transcription and translation JSONs target{} field

//set selectingVector to blank

//else return error

//});


//find the highest ranking child
function highestChild() {

};


//update the ranking of a set of children
function updateRanks(parent, child, newRank) {



};

//check if 
function compareChild(parentText, newChild) {

};


//generate a new JSON-LD file and populate
function newJSON(textSelected, currentVector) {

//create a new JSON file and POST to database

//PUSH template to create fields

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


};

//generate new transcription JSON

//generate new translation JSON

//when vote up added

//when vote down added

//POPUP OPTIONS

//popup opened and checking to see options displayed

//VIEW TRANSCRIPTION OPTIONS clicked

//VIEW TRANSLATION OPTIONS clicked

//ADD MARKER clicked

//ADD TRANSCRIPTION OPTION

//ADD TRANSLATION OPTION

//METADATA OPTIONS

//html form submission




