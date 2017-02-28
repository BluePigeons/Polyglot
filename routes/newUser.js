
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({

	"username": String,

	"docs_edited": {
		"vectors" : {
			"created" : [{
				"id": String,
				"date": Date
			}],
			"edited" : [{
				"id": String,
				"date": Date
			}],
			"deleted" : [{
				"id": String,
				"date": Date
			}]
		},
		"transcriptions" : {
			"created" : [{
				"id": String,
				"date": Date
			}],
			"edited" : [{
				"id": String,
				"date": Date
			}],
			"deleted" : [{
				"id": String,
				"date": Date
			}]
		},
		"translations" : {
			"created" : [{
				"id": String,
				"date": Date
			}],
			"edited" : [{
				"id": String,
				"date": Date
			}],
			"deleted" : [{
				"id": String,
				"date": Date
			}]
		}
	},

	"favourites" : [{
		"image_id" : String,
		"the_image" : {
			"type": Boolean,
			"default": false
		},
		"transcriptions" : [],
		"translations" : [],
		"vectors" : []
	}]

},

{ autoIndex: false }

);

module.exports = mongoose.model('newUser', userSchema);
