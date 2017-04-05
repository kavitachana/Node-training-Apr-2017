'use strict';

const express = require("express");
const moment = require("moment");

let router = express.Router();

router.get("/", (req, res, next) => {
	req.message += 'In router line 9 ';
    next();
});

router.get("/", (req, res, next) => {
	res.send(req.message);
});

module.exports = router;
