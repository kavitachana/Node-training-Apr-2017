'use strict';

const express = require("express");

const config = require("./config.json");

let app = express();

app.use(require("./routes/index.js"));

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}...`);
});
