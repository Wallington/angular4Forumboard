var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema
({
     name: 
     {
       type: String,
       required: true
     },
     threads : 
     [{
         type: Schema.Types.ObjectId,
         ref: 'Thread'
     }]  
});

module.exports = mongoose.model('Forum',schema);