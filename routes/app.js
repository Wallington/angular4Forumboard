var express = require('express');
var router = express.Router();
var request = require('request');



//connect to the db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useMongoClient: true});
mongoose.Promise = global.Promise;
/*equire('../models/forum');
require('../models/thread');
require('../models/post');
// want call a model to which use to get and put data into mongodb aka database
/*var Forum = mongoose.model('Forum');
var Thread = mongoose.model('Thread');
var Post = mongoose.model('Post');
*/


router.get('/auth/valdate/:gCaptcha', function(req,res,next)
{
    //url set the values and codes for the valdating
    var url = 'https://www.google.com/recaptcha/api/siteverify?secret=6LcNriwUAAAAANscAG0T05pInNp6Q3PMh1QLtnoe&response=' + req.params.gCaptcha;  
    //requseting to valdate the google response then send back as JSON to caller
    request
   (
       {
            method: 'POST',
            url: url
       },
       function(error, response, body)
       {
           if(error)
            {
                console.log(['request-error', error.toString()]);
            }
            else
            {
                //respond the response (code 200) from google of the results of the test
                res.send(body);
                
                res.end();
            }
            
       }
    );
   
});


module.exports = router;