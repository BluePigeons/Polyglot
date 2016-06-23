
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

	if (type == 'rectangle') {
		///////
	};

//add the layer to the layer group
	drawnItems.addLayer(layer);

});

//whenever a new textbox is made, a new JSON file is created

//whenever a textedit event is fired, the body field of text for that textbook is updated

