var express = require("express");
var router = express.Router();
// grabbing our models
var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get route -> index
router.get("/", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    console.log("I'm being read")
    // send us to the next get function instead.
    return res.render("index");
});

// get route -> index
router.get("/signup", function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup');
});

router.post('/signup', function(req, res) {
    console.log(req.body.email);
    db.Users.findAll({  where: {
        username: req.body.email,
    }})
    .then(function(dbUser){
        console.log(dbUser);
        if (dbUser.length === 0) //checking if user already has this goal set for the match user
        {
            console.log("no results found, good to go");
            db.Users.create({
                username: req.body.email, 
                password: req.body.password//bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null),
            })    
            .then(function() {
            res.render('profile');
            });
        }
    });
});

// get route -> profile
router.get("/login", function(req, res) {
    return res.render("login");
});


router.post('/login', function(req, res) {
    console.log(req.body.email);
    db.Users.findAll({  where: {
        username: req.body.email,
        password: req.body.password
    }})
    .then(function(dbLogin){
    if (dbLogin.length === 1) //checking if user matches password
    {
    res.render("index");
    }
    });
});

// get route -> profile
router.get("/profile", function(req, res) {
    console.log("Profile being read")
    // send us to the next get function instead.
    return res.render("profile");
});

// post route -> profile
router.post("/profile/create", function(req, res) {
    var response=res;
    console.log("Profile being created");
    console.log(req.body);
    console.log(db.UserProfile);
    db.UserProfile.create({
        name: req.body.name, 
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        UserUsername: req.body.counterItem
    })    
    // pass the result of our call
    .then(function(dbUserProfile) {
        // log the result to our terminal/bash window
        console.log(dbUserProfile);
        // redirect
       
        // res.redirect("../profile/interests");
    })
    .then(function(){
       return res.render("questionaire");  
    });
});

// get route -> profile
router.post("/survey/create", function(req, res) {
    var response=res;
    console.log("Profile being created");
    console.log(req.body);
    db.UserSurvey.create({
        UserProfileEmail: req.body.counterItem,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3a: req.body["answer3[]"][0],
        answer3b: req.body["answer3[]"][1],
        answer3c: req.body["answer3[]"][2],
        answer3d: req.body["answer3[]"][3],
        answer3e: req.body["answer3[]"][4],
        answer3f: req.body["answer3[]"][5],
        answer3g: req.body["answer3[]"][6],
        answer3h: req.body["answer3[]"][7],
        answer4: req.body.answer4,
        answer5: req.body.answer5,
        answer6: req.body.answer6,
        answer7: req.body.answer7,
        answer8: req.body.answer8,
        answer9: req.body.answer9,
        answer10: req.body.answer10
    })   
    // pass the result of our call
    .then(function(dbUserSurvey) {
        // log the result to our terminal/bash window
        console.log(dbUserSurvey);
        return res.render("index");  
    });
});

// get route, edited to match sequelize
router.get("/allProfiles/:key", function(req, res) {
    console.log("reading all");
    console.log(req.params.key)
    var emailUser=req.params.key;
    db.UserProfile.findAll({})
    .then(function(dbAll) {
    var allData=[];
    // into the main index, updating the page
    for (var i=0; i< dbAll.length;i++)
    {
    allData[i]=dbAll[i].dataValues;
    console.log(dbAll[i].dataValues)
    }
    var hbsObject = {
        match: allData
        };
   // hbsObject.goal = checkForGoals();
   // console.log("here " + hbsObject.goal);
    db.UserSurvey.findAll({
    })    
    .then(function(dbSurvey){
        var allSurvey=[];
        // into the main index, updating the page
        for (var i=0; i< dbSurvey.length;i++)
        {
        allSurvey[i]=dbSurvey[i].dataValues;
        }    
        hbsObject.goal = allSurvey;
        hbsObject.myUser = {'emailMainUser':emailUser};
        console.log(hbsObject.goal);
        return res.render("index", hbsObject);
    });
    });
});

// post route -> profile
router.post("/getHooked", function(req, res) {
    var response=res;
    console.log("Goal being set");
   // console.log(req.body);
   // console.log(db.UserGoals);
    db.UserGoals.findAll({  where: {
        UserProfileEmail: req.body.email,
        runningFor: req.body.running
    }})
    .then(function(dbGoal){
        console.log(dbGoal);
        if (dbGoal.length === 0) //checking if user already has this goal set for the match user
        {
            console.log("no results found, good to go");
            db.UserGoals.create({
                UserProfileEmail: req.body.email, 
                runningFor: req.body.running,
                goal:req.body.goal,
                finishedGoal: req.body.finished
            })    
            // pass the result of our call
            .then(function(dbUserUserGoals) {
                // log the result to our terminal/bash window
                console.log(dbUserUserGoals);
                // redirect
               
                return res.end();
            });
        } else
        {
            console.log(dbGoal.length + " results found don't create a new entry")
            return res.end();
        }
    });
});


function checkForGoals(){
    db.UserSurvey.findAll({
    })
    .then(function(dbSurvey){
        // into the main index, updating the page
        for (var i=0; i< dbSurvey.length;i++)
        {
        allSurvey[i]=dbSurvey[i].dataValues;
        console.log(dbSurvey[i].dataValues)
        }    
        return allSurvey;
    })
}

// get route, edited to match sequelize
router.get("/myProfile/:key", function(req, res) {
    console.log(req.params.key)
    var emailUser=req.params.key;
    db.UserGoals.findAll({})
    .then(function(dbAll) {
        var allData=[];
        // into the main index, updating the page
        for (var i=0; i< dbAll.length;i++)
        {
        allData[i]=dbAll[i].dataValues;
        console.log(dbAll[i].dataValues)
        }
        var hbsObject = {
            runningFor: allData
        };
        hbsObject.myUser = {'emailMainUser':emailUser};
       res.render('myprofile', hbsObject);
    });
});

// post route -> profile
router.post("/updateGoals", function(req, res) {
    var response=res;
    console.log("Goal being updated");
    //console.log(req.body);
    console.log(req.body.whatToDo);
    if (parseInt(req.body.whatToDo) === 1)
    {
    db.UserGoals.update({
        finishedGoal: true,
      }, {
        where: {
        UserProfileEmail:req.body.email,
        runningFor:req.body.running
        }
      })
      .then(function(){
        console.log("end of function");
        //renderMyProfile(req.body.email, response);
        return res.render('');
     });
    } else{
        db.UserGoals.destroy({
            where: {
            UserProfileEmail:req.body.email,
            runningFor:req.body.running
            }
          })
          .then(function(){
            //var hbsObject = renderMyProfile(req.body.email);
            console.log("end of function");
            //renderMyProfile(req.body.email, response);
           //return res.render("myprofile", renderMyProfile(req.body.email, response));
            return res.end();
         } );
    }
});

function renderMyProfile(email,response){
    console.log("inside function");
    var hereTest=email;
    db.UserGoals.findAll({  where: {
        UserProfileEmail: email,
        runningfor: {
            [Op.ne]: email
          }
    }})
    .then(function(dbAll) {
        var allData=[];
        // into the main index, updating the page
        for (var i=0; i< dbAll.length;i++)
        {
        allData[i]=dbAll[i].dataValues;
        console.log(dbAll[i].dataValues)
        }
        var hbsObject = {
            runningFor: allData
        };
        hbsObject.myUser = hereTest;
        console.log("returning function");
        console.log(hbsObject);
        return hbsObject;
    });
}


module.exports = router;

