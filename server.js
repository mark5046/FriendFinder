var bodyParser = require('body-parser');
var express = require('express');
var path = require ("path");
var app = express();
var PORT = process.env.PORT || 8888;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);


app.listen([PORT], function(){
    console.log("Listening on port: " + PORT)
});