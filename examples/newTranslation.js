var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var translationSchema   = new Schema({
    translation: String
});

module.exports = mongoose.model('newTranslation', translationSchema);