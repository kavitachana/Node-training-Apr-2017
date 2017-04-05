'use strict';

const Promise = require("bluebird");
const simpleArrayDiff = require("simple-array-diff");

module.exports = function({db}) {
	return function updateStudent(student, newData) {
		let wrappedInterests = newData.interests.map(interest => {
			return {
				name: interest
			};
		});

		let diff = simpleArrayDiff(student.interests, wrappedInterests, "name");

		return db.transaction((transaction) => {
			return Promise.all([
				Promise.map(diff.added, (addedInterest) => {
					return transaction("interests").insert({
						name: addedInterest.name,
						studentId: student.id
					});
				}),
				Promise.map(diff.removed, (removedInterest) => {
					return transaction("interests").delete().where({
						id: removedInterest.id
					});
				})
			]).then(() => {
				return transaction("students").update({
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
			});
		});
	}
};
