var express = require('express');
var router = express.Router();
var request = require('request');



//connect to the db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/angular4Forumboard', {useMongoClient: true});
mongoose.Promise = global.Promise;

//importing our models for our DB/Mongoose
require('../src/models/forum.js');
require('../src/models/thread.js');
var Forum = mongoose.model('Forum');
var Thread = mongoose.model('Thread');

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
// this find and send back JSON of the target forum data
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

});

//this will generate threads inside our selected forum 
router.head('/db/create/threads/:boardName', function(req, res)
{

    
    var newThread1CreateDate = new Date(2018,0,1);
    var newThread2CreateDate = new Date(2018,0,10);
    var newThread3CreateDate = new Date(2018,0,3);

    var date = new Date();

    Forum.findOne({name: req.params.boardName}, function(err, targetForum)
    {
        if(!err)
        {
            console.log('has been found!');
            newThread1 = Thread
            ({
                f_id: targetForum._id,
                name: 'Awesome of Fullstack Development',
                authorName: 'Optimus Prime',
                createdDate: newThread1CreateDate,
                lastedPostDate: date,
                message: 'This quite amazing how we can achieve in JavaScript without the usage of other languages like PHP, Mircosoft.Net, Python, and etc.',
                postCount: 2
            });

            newThread2 = Thread
            ({
                f_id: targetForum._id,
                name: 'Welcome!',
                authorName: 'Wall-E',
                createdDate: newThread2CreateDate,
                lastedPostDate: date,
                message: "Welcome this site was created to showcase the work that I was most pleased in Raid Plus Interactive, LLC creating a basic forum however with modification from the original. The prototype with Raid Plus uses an Angular 1.x, PHP, MySQL as a hybrid software stack. Where I recreate and learn by using a Full stack of Pure JavaScript Power! This project uses an Angular 4.x, Node.JS, Express, and MongoDB. Please try out the applications, this was created with a labor of love, Have a wonderful day!",
                postCount: 3
            });

            newThread3 = Thread
            ({
                f_id: targetForum._id,
                name: 'TESTING!',
                authorName: 'Wheatley',
                createdDate: newThread3CreateDate,
                lastedPostDate: date,
                message: "Testing",
                postCount: 1
            });

            newThread1.save(function(err)
            {
                if(!err)
                {
                    console.log('Thread 1 been Saved to the DB');
                }
                else
                {
                    console.log(err);
                }
            });
            newThread2.save(function(err)
            {
                if(!err)
                {
                    console.log('Thread 2 been Saved to the DB');
                }
                else
                {
                    console.log(err);
                }
            });
            newThread3.save(function(err)
            {
                if(!err)
                {
                    console.log('Thread 3 been Saved to the DB');
                }
                else
                {
                    console.log(err);
                }
            });
        }
    })
    

    /*Thread.find({}).remove(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('deleted');
        } 
    });
    */
    
});

router.head('/db/remove/threads/', function(req, res)
{
    Thread.find({}).remove(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('deleted');
        } 
    });
});

//we are test what all in threads db has, for testing only
router.head('/db/check/threads/', function(req, res)
{

    Thread.find(function(err, data)
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
       
});

router.get('/db/get/threads/byid/:forumBoardID', function(req, res)
{
    
    //finding the json and send back to requester
    Thread.find({f_id: req.params.forumBoardID}, function(err, threadData)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(threadData);
        }
    });
    
});

//create a new thread
router.head('/db/create/thread/:f_id/:name/:authorName/:message', function(req, res)
{
    var newThread = new Thread
    ({
        f_id: req.params.f_id,
        name: req.params.name,
        authorName: req.params.authorName,
        message: req.params.message
    });

    newThread.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }  
    })
});


module.exports = router;