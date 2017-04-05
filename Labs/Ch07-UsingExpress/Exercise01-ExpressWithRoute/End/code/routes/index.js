'use strict';

const express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello world! From the main page");
});

router.get("/about", (req, res) => {
	res.send("Hello world! From about page");
});

router.get("/class", (req, res) => {
	res.send("Hello world! From class tools page");
});

module.exports = router;

