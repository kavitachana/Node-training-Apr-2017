'use strict';

const Promise = require("bluebird");
const errors = require("../errors");

module.exports = function({db}) {
	let router = require("express-promise-router")();

	router.get("/login", (req, res) => {
		res.render("admin/login");
	});

	router.post("/login", (req, res) => {
		return Promise.try(() => {
			if (req.body.password === "secretpassword") {
				req.session.loggedIn = true;

				return Promise.try(() => {
					return req.saveSession();
				}).then(() => {
					res.redirect("/");
				});
			} else {
				throw new errors.AuthenticationError("Incorrect password");
			}
		});
	});

	return router;
}
