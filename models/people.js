var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Visitor'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('People', peopleSchema);