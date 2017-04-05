'use strict';

const Promise = require("bluebird");
const checkit = require("checkit");

const parseInterests = require("../lib/parse-interests");
const parseHireDate = require("../lib/parse-hire-date");
const createStudentValidator = require("../validators/student");
const errors = require("../errors");

module.exports = function({db}) {
	const createStudentObject = require("../lib/create-student-object")({db});
	const updateStudent = require("../lib/update-student")({db});
	let router = require("express-promise-router")();

	router.get("/", (req, res) => {
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

	router.get("/create", (req, res) => {
		res.render("students/add");
	});

	router.post("/create", (req, res) => {
		return Promise.try(() => {
			return createStudentValidator().run(req.body);
		}).then(() => {
			let hireDate = parseHireDate(req.body.hireDate);

			return db("students").insert({
				nameFirst: req.body.nameFirst,
				nameLast: req.body.nameLast,
				email: req.body.email,
				hireDate: hireDate,
				htmlSkill: req.body.html,
				cssSkill: req.body.css,
				jsSkill: req.body.js
			}).returning("*");
		}).then((students) => {
			let student = students[0];
			let interests = parseInterests(req.body.interests);

			return Promise.map(interests, (interest) => {
				return db("interests").insert({
					studentId: student.id,
					name: interest
				});
			});
		}).then(() => {
			res.redirect("/students");
		}).catch(checkit.Error, (err) => {
			res.render("students/add", {
				errors: err.errors
			});
		});
	});

	router.param("studentId", (req, res, next) => {
		return Promise.try(() => {
			return checkit({
				studentId: ["required", "natural"]
			}).run(req.params);
		}).then(() => {
			return db("students").where({
				id: req.params.studentId
			}).first();
		}).then((studentData) => {
			if (studentData == null) {
				throw new errors.NotFoundError("No such student exists.");
			} else {
				return Promise.try(() => {
					return createStudentObject(studentData, {withInterests: true});
				}).then((student) => {
					req.student = student;
					next();
				});
			}
		}).catch(checkit.Error, (err) => {
			throw new errors.NotFoundError("Student ID must be numeric.");
		});
	});

	router.get("/:studentId", (req, res) => {
		res.render("students/student", {
			student: req.student
		});
	});

	router.get("/:studentId/update", (req, res) => {
		res.render("students/update", {
			student: req.student
		});
	});

	// FIXME: Abstract out?
	router.post("/:studentId/update", (req, res) => {
		return Promise.try(() => {
			return createStudentValidator().run(req.body);
		}).then((results) => {;
			return updateStudent(req.student, Object.assign({}, req.body, {
				hireDate: parseHireDate(req.body.hireDate),
				interests: parseInterests(req.body.interests)
			}));
		}).then(() => {
			res.redirect(`/students/${req.student.id}`);
		}).catch(checkit.Error, (err) => {
			res.render("students/update", {
				student: req.student,
				errors: err.errors
			});
		});
	});

	router.post("/:studentId/delete", (req, res) => {
		return Promise.try(() => {
			return db.transaction((transaction) => {
				return Promise.try(() => {
					return transaction("interests").delete().where({
						studentId: req.student.id
					});
				}).then(() => {
					return transaction("students").delete().where({
						id: req.student.id
					});
				});
			});
		}).then(() => {
			res.redirect("/students");
		});
	});

	router.get("/:studentId/json", (req, res) => {
		res.json(req.student);
	});

	return router;
}
