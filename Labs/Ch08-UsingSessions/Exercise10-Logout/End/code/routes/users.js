'use strict';

const Promise = require("bluebird");
const scryptForHumans = require("scrypt-for-humans");
const databaseError = require("database-error");
const errors = require("../errors");

let duplicateUsername = {
	name: "UniqueConstraintViolationError",
	table: "accounts",
	column: "username"
}

module.exports = function({db}) {
	let router = require("express-promise-router")();

	router.get("/register", (req, res) => {
		res.render("admin/register");
	});

	router.post("/register", (req, res) => {
		return Promise.try(() => {
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
			throw new errors.ValidationError("Username already exists");
		});
	});

	router.get("/login", (req, res) => {
		res.render("admin/login");
	});

	router.post("/login", (req, res) => {
		return Promise.try(() => {
			return db("accounts").where({
				username: req.body.username
			}).first();
		}).then((user) => {
			if (user == null) {
				throw new errors.AuthenticationError("Incorrect username");
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
			throw new errors.AuthenticationError("Incorrect password");
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
