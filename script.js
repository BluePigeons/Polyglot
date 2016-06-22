

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

//initialise the extended draw control functions enabled in Illustrated 
//passes it the FeatureGroup of editable layers
//adds it to the map
new L.Illustrate.Control({
	edit: { featureGroup: drawnItems }
}).addTo(map);

//whenever a new vector is created within the app
map.on('draw:created', function(evt) {
	var type = evt.layerType,
		layer = evt.layer;

//if it's a textbox then export the text, remove it from image, and just add rectangle
	/*if (type == 'textbox') {
		var newAnno = L.Illustrate.textbox.getContent();
		var fs = require('fs');
		fs.writeFile("/tmp/test", newAnno, function(err) {
		    if(err) {
		        return console.log(err);
		    }
    		console.log("The file was saved!");
		});

		//L.Illustrate.textbox.setStyle();
		L.Illustrate.textbox.setContent(" ");

	}*/
//add the layer to the layer group
	drawnItems.addLayer(layer);

});

