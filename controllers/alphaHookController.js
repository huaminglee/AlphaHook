var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");


// get route -> index
router.get("/", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    console.log("I'm being read")
    // send us to the next get function instead.
    return res.render("index");
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
        dob: req.body.dob
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
        UserProfileId: 1,
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
        answer9: req.body.answer9
    })   
    // pass the result of our call
    .then(function(dbUserSurvey) {
        // log the result to our terminal/bash window
        console.log(dbUserSurvey);
        // redirect
       
        // res.redirect("../profile/interests");
    })
    .then(function(){
      return res.render("questionaire");  
    });
});


module.exports = router;
