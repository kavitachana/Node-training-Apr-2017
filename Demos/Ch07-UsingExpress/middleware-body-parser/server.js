'use strict';

const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send(`
		<form method="post" action="/submit">
			One: <input type="text" name="one"><br>
			Two: <input type="text" name="two"><br>
			Array one: <input type="text" name="arr[]"><br>
			Array two: <input type="text" name="arr[]"><br>
			<button type="submit">Submit</button>
		</form>
	`);
});

app.post("/submit", (req, res) => {
	res.json(req.body);
});

app.listen(3000);
