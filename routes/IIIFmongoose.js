var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IIIFSchema   = new Schema({
	"image": String
});

module.exports = mongoose.model('IIIFmongoose', IIIFSchema);