'use strict';

const express = require("express");
const path = require("path");

const config = require("./config.json");

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    req.requestTime = Date.now();
    next();
});

app.use(function (req, res, next) {
    var responseText = 'Server Next!<br>';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`);
});
