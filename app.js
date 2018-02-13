var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerApp', ['users'])

var app = express();

// Body-parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//View ENGINE
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
//Set static path 
app.use(express.static(path.join(__dirname,'public')));

//Global VARS
app.use(function(req,res,next){
    res.locals.errors = null;
    next()
});
//express-validator MIDDLEWARE
app.use(expressValidator());
var users = [
    {
        id : 1,
        firstName : "farhan",
        lastName : "abdi",
        email : "fabdi@gmail.com"
    },
    {
        id : 2,
        firstName : "fan",
        lastName : "ai",
        email : "fai@gmail.com"
    }]
app.get('/',function(req,res){
    // find everything
    db.users.find(function (err, docs) {
       console.log(docs);
       res.render('index', {users: docs});
    })

   
});

app.post('/users/add',function(req,res){
    req.checkBody('firstName','Firstname is required').notEmpty();
    req.checkBody('lastName','lastname  is required').notEmpty();
    req.checkBody('email','email is required').notEmpty();

    var errors = req.validationErrors();
    if (errors){
      res.render('index',{
          users : users,
          errors : errors
      })
      console.log("ERRORS")
    }else{
        var newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        console.log("Success");
        console.log(newUser);

    }
    
});
app.listen(3005, function(){
    console.log("server started on port 3000");
});