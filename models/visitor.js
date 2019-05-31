var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    comment: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'People'
    }
})

var visitorsSchema = new Schema({
    title: String,
    content: String,
    comment: [commentsSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'People'
    },
    category:{
       type:String,
       enum:['lottery','business','tourist','student','family','job']
    }
})

module.exports = mongoose.model('Visitor', visitorsSchema);