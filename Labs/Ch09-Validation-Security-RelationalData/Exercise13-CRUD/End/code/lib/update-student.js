'use strict';

const Promise = require("bluebird");

module.exports = function({db}) {
	return function updateStudent(student, newData) {
		return db("students").update({
			nameFirst: newData.nameFirst,
			nameLast: newData.nameLast,
			email: newData.email,
			hireDate: newData.hireDate,
			htmlSkill: newData.html,
			cssSkill: newData.css,
			jsSkill: newData.js
		}).where({
			id: student.id
		});
	}
};
