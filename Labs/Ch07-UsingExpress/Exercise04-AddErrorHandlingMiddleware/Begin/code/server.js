'use strict';

const express = require("express");
const path = require("path");

const config = require("./config.json");

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes/index.js"));

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}...`);
});
