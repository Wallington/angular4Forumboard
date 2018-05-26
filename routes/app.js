

var express = require('express');
var router = express.Router();
var request = require('request');
var Config  = require('../src/app/config');



//connect to the db
var mongoose = require('mongoose');
mongoose.connect(Config.dataBaseAddress + "/Flexitutor", {useMongoClient: true},function(err)
{
    if(err)
    {
        console.log(err);
    }
});
mongoose.Promise = global.Promise;

//importing our models for our DB/Mongoose
require('../src/models/account.model.js');

var Account = mongoose.model('Account');
/*router.head('/test', function(req)
{
    var newAccount = new Account
    (
        {
            email: "demo@demo.com",
            password: "RGVtbzEyMw==",
            firstName: "Demo",
            lastName: "Bot"
        }
    );
    newAccount.save(function(err)
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
});*/
router.get('/auth/account/:email/:auth', function(req,res)
{
    Account.findOne({"email": req.params.email, "password" : req.params.auth},function(err, accountData)
    {
        if(err)
        {
            res.write(null);
        }
        else
        {
            res.json(accountData);
        }

    });
})



module.exports = router;