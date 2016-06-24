
//var fs = require('fs');

var map;

//IIIF Viewer initial settings, not the Illustrate example settings

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

var baseLayer = L.tileLayer.iiif(
  'http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/UoEsha~3~3~54530~102219/info.json'
).addTo(map);

//Leaflet Illustrate example with alterations

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

//whenever a new vector is created within the app
map.on('draw:created', function(evt) {
	var type = evt.layerType,
		layer = evt.layer;

//add the layer to the layer group
	drawnItems.addLayer(layer);

//a new geoJSON file is created
	//var shape = layer.toGeoJSON()
	
//checks if this is was created to link to an existing transcription/translation anno

//if it is, then the transcription/translation fields are updated

//

});

//basic function to identify text that has been selected on a page
function getSelectionText() {

  var textSelected = "";
  if (window.getSelection) {
      textSelected = window.getSelection().toString();
  } 
  else if (document.selection && document.selection.type != "Control") {
      textSelected = document.selection.createRange().textSelected;
  }
    return textSelected;
};

//function to find the highest ranking child
function highestChild()


//function to update the ranking of 
function updateRanks(parent, child, newRank) {



};
