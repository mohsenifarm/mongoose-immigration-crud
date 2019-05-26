var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comment: String
})

var visitorsSchema = new Schema({
    title: String,
    content: String,
    comment: [commentsSchema]
    
})

module.exports = mongoose.model('Visitor', visitorsSchema);

