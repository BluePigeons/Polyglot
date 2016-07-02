var mongoose     = require('mongoose');
//var GeoJSON = require('mongoose-geojson-schema');

var Schema       = mongoose.Schema;

var vectorSchema   = new Schema({

	"@context": {
		type: [], 
		default: [
		"http://127.0.0.1:8080/context.json",
		"http://www.w3.org/ns/anno.jsonld"
		]},
	"@id": {
		type: String,
		default: "http://127.0.0.1:8080/vectors/" 
	},
    "notFeature": {
    	"notType": {
    		type: String,
    		default: "Feature"
    	},
    	"notProperties": {
    		"notName": String
    	},
	    "notGeometry": {
	    	"notType":{
	    		type: String,
	    		default: "Polygon"
	    	},
	    	"notCoordinates": {
	    		type:[]
	    	},
	    },

	    "notCrs": {
    		"notType": {
    			type: String,
    			default: "name"
    		},
    		"notProperties": {
    			type: String,
    			default: "L.CRS.Simple"
    		}
    	}
	},
	"metadata": [],
    "parent": {
    	type: String
    },
    "children": {
    	type: []
    },
    "translation": {
    	type: String,
    	default: ""
    },
    "transcription": {
    	type: String,
    	default: ""
    },
	"body": {
		"id": {
			type: String,
			default: "https://127.0.0.1:8080/vectors/"
		},
		"format": {
			type: String,
			default: "application/json"
		},
	},
	"target": 
		[{
			"id": {
				type: String
			},
			"format": {
				type: String,
				default: "application/json"
			},
			"language": {
				type: String
			}
		}]
	,
	"created": { type: Date, default: Date.now },
	"creator": {
		"id": {
			type: String
		},
		"name": {
			type: String
		},
		"motivation": {
			type: String,
			default: "identifying"
		}
	},
	"Annotation": {
		type: String,

	},
	"type": {
		type: "string",
		default: "GeoJSON, Annotation"
	}

},

{ autoIndex: false }

);

vectorSchema.index({"coordinates": "2d"}, {min: -1000000, max: 1000000});
vectorSchema.index({"feature": "2d"}, {min: -1000000, max: 1000000});
vectorSchema.index({"geometry": "2d"}, {min: -1000000, max: 1000000});

module.exports = mongoose.model('newVector', vectorSchema);
