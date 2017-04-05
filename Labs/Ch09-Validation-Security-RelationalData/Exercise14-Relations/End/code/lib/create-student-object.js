'use strict';

const Promise = require("bluebird");
const moment = require("moment");

module.exports = function({db}) {
	return function createStudentObject(student, options = {}) {
		return Promise.try(() => {
			if (options.withInterests) {
				return db("interests").where({studentId: student.id});
			} else {
				return [];
			}
		}).then((interests) => {
			return Object.assign({}, student, {
				interests: interests,
				hireDate: moment(student.hireDate)
			});
		});
	};
}
