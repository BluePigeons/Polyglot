var mongoose     = require('mongoose');
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
    "feature": {
	    "geometry": {

	    	"type": {
	    		type: String,
	    		default: "Polygon"
	    	},
	    	"coordinates": {
	    		type: []
	    	},
	    	"crs": {
	    		"type": String,
	    		"properties": String
	    	}
	    }
	},
    "parent": {
    	type: String
    },
    "children": {
    	type: []
    },
    "translation": {
    	type: String
    },
    "transcription": {
    	type: String
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
				type: String,
				default: "https://127.0.0.1:8080/images/"
			},
			"format": {
				type: String,
				default: "applicaiton/json"
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

	}


});

module.exports = mongoose.model('newVector', vectorSchema);