var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

// SERVER PORT
var PORT = process.env.PORT || 3000;
var app = express();
var bodyParser   = require('body-parser');

//INITIALIZING EXPRESS SERVER METHODS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Import routes and give the server access to them.
var routes = require("./controllers/alphaHookController.js");
app.use(routes);
app.use("/", routes);
app.use("/profile", routes);
app.use("/allProfile", routes);
app.use("/update", routes);
app.use("/create", routes);
app.use("/myProfile", routes);
app.use("/updateGoals", routes);



// set handlebars
var exphbs = require("express-handlebars");
var helpers = require('handlebars-helpers')();
app.engine("handlebars", exphbs({defaultLayout:"main"})); // takes mainh.handlebars as default layout?
app.set("view engine", "handlebars");


db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App now listening on port" + PORT);
    })
});

  