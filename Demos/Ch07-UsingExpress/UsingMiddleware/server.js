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
			Array Element One: <input type="text" name="arr[]"><br>
			Array Element Two: <input type="text" name="arr[]"><br>
			Starter:
			<select id="starters" name="starters">
				<option value="soup">Soup</option>
				<option value="oysters">Oysters</option>
				<option value="salmon">Smoked Salmon</option>
			</select><br/>
			
			<button type="submit">Submit</button>
		</form>
	`);
});

app.post("/submit", (req, res) => {
	res.json(req.body);
});

app.listen(3000);
