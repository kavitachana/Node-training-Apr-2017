'use strict';

const moment = require("moment");

let students = [{
	nameFirst: "Devin",
	nameLast: "Durgan",
	email: "Devin.Durgan@gmail.com",
	hireDate: moment("01/19/2015", "MM/DD/YYYY")
}, {
	nameFirst: "Cristal",
	nameLast: "Adams",
	email: "Cristal.Adams@live.com",
	hireDate: moment("07/29/2016", "MM/DD/YYYY")
}, {
	nameFirst: "Nettie",
	nameLast: "McGlynn",
	email: "Nettie.McGlynn@gmail.com",
	hireDate: moment("08/29/2015", "MM/DD/YYYY")
}];

let router = require("express-promise-router")();

router.get("/", (req, res) => {
	res.render("index", {
		students: students
	});
});

router.get("/class", (req, res) => {
	res.render("class", {
		students: students
	});
});

router.get("/about", (req, res) => {
	res.render("about");
});

module.exports = router;
