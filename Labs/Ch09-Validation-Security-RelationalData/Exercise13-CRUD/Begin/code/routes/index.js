'use strict';

const Promise = require("bluebird");
const faker = require("faker");
const range = require("range");
const pickItem = require("pick-item");

const requireLogin = require("../middleware/require-login");

module.exports = function({db}) {
	const createStudentObject = require("../lib/create-student-object")({db});
	let router = require("express-promise-router")();

	router.get("/", requireLogin, (req, res) => {
		return Promise.try(() => {
			return db("students");
		}).map((student) => {
			return createStudentObject(student);
		}).then((students) => {
			res.render("index", {
				students: students
			});
		});
	});

	router.get("/class", (req, res) => {
		return Promise.try(() => {
			return db("students");
		}).map((student) => {
			return createStudentObject(student);
		}).then((students) => {
			res.render("class", {
				students: students
			});
		});
	});

	router.get("/about", (req, res) => {
		res.render("about");
	});

	router.post("/generate", requireLogin, (req, res) => {
		let skillLevel = [1, 2, 3, 4, 5, 6];
		let domains = ['@gmail.com', '@yahoo.com', '@live.com', '@aol.com'];

		return Promise.try(() => {
			return range.range(0, 10);
		}).map((i) => {
			let nameFirst = faker.name.firstName();
			let nameLast = faker.name.lastName();
			let email = `${nameFirst}.${nameLast}${pickItem(domains)}`;

			return db("students").insert({
				nameFirst: nameFirst,
				nameLast: nameLast,
				email: email,
				hireDate: faker.date.between('2015-01-01', '2016-12-31'),
				htmlSkill: pickItem(skillLevel),
				cssSkill: pickItem(skillLevel),
				jsSkill: pickItem(skillLevel),
			});
		}).then(() => {
			res.redirect("/");
		});
	});

	return router;
}
