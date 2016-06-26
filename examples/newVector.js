var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var vectorSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('newVector', vectorSchema);