var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema
({
    f_id:
    {
        type: String,
        required: true
    },
    t_id: 
    {
        type: String,
        required: true
    },
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