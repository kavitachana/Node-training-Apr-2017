'use strict';

const Promise = require("bluebird");
const checkit = require("checkit");
const scryptForHumans = require("scrypt-for-humans");
const databaseError = require("database-error");

let duplicateUsername = {
	name: "UniqueConstraintViolationError",
	table: "accounts",
	column: "username"
}

/* The following are checkit-style error messages, that are used to display the
   non-checkit errors to the user. */

let wrongUsernameErrors = {
	username: {
		message: "No such username exists."
	}
}

let wrongPasswordErrors = {
	password: {
		message: "The specified password is invalid."
	}
}

let duplicateUsernameErrors = {
	username: {
		message: "This username already exists."
	}
}

module.exports = function({db}) {
	let router = require("express-promise-router")();

	router.get("/register", (req, res) => {
		res.render("admin/register");
	});

	router.post("/register", (req, res) => {
		return Promise.try(() => {
			return checkit({
				username: "required",
				password: "required" // Shouldn't there be a 'confirm password' too?
			}).run(req.body);
		}).then(() => {
			return scryptForHumans.hash(req.body.password);
		}).then((hash) => {
			return db("accounts").insert({
				username: req.body.username,
				hash: hash
			}).returning("*");
		}).then((users) => {
			let user = users[0];

			req.session.userId = user.id;
			return req.saveSession();
		}).then(() => {
			res.redirect("/");
		}).catch((err) => {
			databaseError.rethrow(err);
		}).catch(duplicateUsername, (err) => {
			res.render("admin/register", {
				errors: duplicateUsernameErrors
			});
		}).catch(checkit.Error, (err) => {
			res.render("admin/register", {
				errors: err.errors
			});
		});
	});

	router.get("/login", (req, res) => {
		res.render("admin/login");
	});

	router.post("/login", (req, res) => {
		return Promise.try(() => {
			return checkit({
				username: "required",
				password: "required"
			}).run(req.body);
		}).then(() => {
			return db("accounts").where({
				username: req.body.username
			}).first();
		}).then((user) => {
			if (user == null) {
				res.render("admin/login", {
					errors: wrongUsernameErrors
				})
			} else {
				return Promise.try(() => {
					return scryptForHumans.verifyHash(req.body.password, user.hash);
				}).then((result) => {
					req.session.userId = user.id;
					return req.saveSession();
				}).then(() => {
					res.redirect("/");
				});
			}
		}).catch(scryptForHumans.PasswordError, (err) => {
			res.render("admin/login", {
				errors: wrongPasswordErrors
			});
		}).catch(checkit.Error, (err) => {
			res.render("admin/login", {
				errors: err.errors
			});
		});
	});

	router.get("/logout", (req, res) => {
		return Promise.try(() => {
			return req.destroySession();
		}).then(() => {
			res.redirect("/");
		});
	})

	return router;
}
