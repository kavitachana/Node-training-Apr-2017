'use strict';

const Promise = require("bluebird");

module.exports = function({db}) {
	return function(req, res, next) {
		if (req.session.userId == null) {
			next();
		} else {
			return Promise.try(() => {
				return db("accounts").where({
					id: req.session.userId
				}).first();
			}).then((user) => {
				if (user == null) {
					/* Logged-in user no longer exists in database. */
					return req.destroySession();
				} else {
					req.user = user;
				}
			}).then(() => {
				next();
			});
		}
	};
}
