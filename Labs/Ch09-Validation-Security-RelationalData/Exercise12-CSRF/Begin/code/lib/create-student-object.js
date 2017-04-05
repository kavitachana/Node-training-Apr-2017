'use strict';

const Promise = require("bluebird");
const moment = require("moment");

module.exports = function({db}) {
	return function createStudentObject(student, options = {}) {
		return Object.assign({}, student, {
			hireDate: moment(student.hireDate)
		});
	};
}
