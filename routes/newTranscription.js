var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var transcriptionSchema   = new Schema({
	"@context": {
		type: [], 
		default: [
		"http://127.0.0.1:8080/context.json",
		"http://www.w3.org/ns/anno.jsonld"
		]},
	"@id": {
		type: String,
		default: "http://127.0.0.1:8080/transcriptions/" 
	},
    "type": {
    	type: []
    },
    "parent": {
    	type: String
    },
    "children": [{

    	"id": {
    		type: String
    	},
    	"fragment": [{
    		"id": {
    			type: String
    		},
    		"rank": {
    			type: Number
    		}
    	}]

    }],
    "translation": {
    	type: String
    },
	"body": [{
		"id": {
			type: String,
			default: "https://127.0.0.1:8080/transcriptions/"
		},
		"format": {
			type: String,
			default: "TextualBody"
		},
		"text": {
			type: String,
			default: ""
		},
		"language": {
			type: String,
			default: "en"
		}
	}],
	"target": [{
		"id": {
			type: String,
			default: "https://127.0.0.1:8080/transcriptions/"
		},
		"format": {
			type: String,
			default: "plain"
		},
		"language": {
			type: String,
			default: "en"
		}
	}],
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
		default: "transcription"
	}

});

module.exports = mongoose.model('newTranscription', transcriptionSchema);