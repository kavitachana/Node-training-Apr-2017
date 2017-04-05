'use strict';

const express = require("express");
const path = require("path");

const config = require("./config.json");

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
});

// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
    res.send('Hello World');
});

// requests will never reach this route
app.get('/', function (req, res) {
    res.send('Welcome');
});



app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`);
});
