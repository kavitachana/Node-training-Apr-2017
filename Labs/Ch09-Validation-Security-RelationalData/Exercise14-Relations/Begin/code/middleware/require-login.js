'use strict';

const errors = require("../errors");

module.exports = function(req, res, next) {
	if (req.user != null) {
		next();
	} else {
		next(new errors.AuthenticationError("You must be logged in to access this page."));
	}
};
