var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema
({
    authorName: 
    {
        type: String
    },
    message:
    {
        type: String
    },
    beenRemove:
    {
        type: Boolean
    }
});

module.exports = mongoose.model('Post',schema);