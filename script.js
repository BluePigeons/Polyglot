

var map;

//IIIF Viewer initial settings, not the Illustrate example settings

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

var baseLayer = L.tileLayer.iiif(
  'https://stacks.stanford.edu/image/iiif/cv770rd9515%2F0767_23A_SM/info.json'
).addTo(map);

//Leaflet Illustrate example with alterations

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

new L.Illustrate.Control({
	edit: { featureGroup: drawnItems }
}).addTo(map);

map.on('draw:created', function(evt) {
	var type = evt.layerType,
		layer = evt.layer;
	drawnItems.addLayer(layer);
});