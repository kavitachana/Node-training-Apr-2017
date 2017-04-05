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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// requests will never reach this route
app.get('/', function (req, res) {
    res.send('Welcome');
});



app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}...`);
});
