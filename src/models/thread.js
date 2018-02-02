var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

var schema = new Schema
({
    f_id: 
    {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required : true
    }, 
    authorName: 
    {
        type: String
    },
    createdDate: 
    {
        type: Date,
        default: Date.now()
    },
    lastedPostDate:
    {
        type: Date
    },
    message:
    {
        type: String
    },
    beenRemove:
    {
        type: Boolean,
        default: false
    },
    postCount:
    {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Thread',schema);