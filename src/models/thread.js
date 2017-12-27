var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

var schema = new Schema
({
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
        type: String
    },
    lastedPostDate:
    {
        type: String
    },
    message:
    {
        type: String
    },
    posts:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    beenRemove:
    {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Thread',schema);