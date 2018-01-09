var express = require('express');
var router = express.Router();
var request = require('request');



//connect to the db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/angular4Forumboard', {useMongoClient: true});
mongoose.Promise = global.Promise;

//importing our models for our DB/Mongoose
require('../src/models/forum.js');
var Forum = mongoose.model('Forum');

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

//this create a demo forum board call X default: 'Main Board'
router.head('/db/create/forumboard/:boardName', function(req, res)
{
    var newForum = new Forum
    ({
        name: req.params.boardName
    });
    newForum.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Saved');
        }
    });
    req.end();
});

// this for only auth page since want look data by ID not by name
// this find and send back JSON of the target forum board name 
router.get('/db/get/forumboard/byname/:boardName', function(req, res)
{
    
    //finding the json and send back to requester
    Forum.findOne({name: req.params.boardName}, function(err, forumData)
    {
        if(err)
        {
            console.log(err);
            res.write(null);
            res.statusCode(500);
        }
        else
        {
            res.json(forumData);
        }
    });

});

router.get('/db/get/forumboard/byid/:boardID', function(req, res)
{
    
    //finding the json and send back to requester
    Forum.findById(req.params.boardID, function(err, forumData)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(forumData);
        }
    });

});

//we are test what all in forum board db has, for testing only
router.head('/db/check/forumboard/', function(req, res)
{
    Forum.find(function(err, data)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
        }
    });
    req.end();
});

module.exports = router;