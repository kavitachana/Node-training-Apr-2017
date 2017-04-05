'use strict';

const Promise = require("bluebird");

module.exports = function(req, res, next) {
	req.saveSession = Promise.promisify(req.session.save, {context: req.session});
	req.destroySession = Promise.promisify(req.session.destroy, {context: req.session});
	req.reloadSession = Promise.promisify(req.session.reload, {context: req.session});
	next();
};
