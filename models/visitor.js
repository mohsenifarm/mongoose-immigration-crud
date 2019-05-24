var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var visitorsSchema = new Schema({
    title: String,
    content: String,
    
})

module.exports = mongoose.model('Visitor', visitorsSchema);