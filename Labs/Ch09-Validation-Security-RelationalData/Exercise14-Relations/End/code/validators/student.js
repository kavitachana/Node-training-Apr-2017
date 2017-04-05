'use strict';

const checkit = require("checkit");

module.exports = function createStudentValidator() {
	return checkit({
		nameFirst: "required",
		nameLast: "required",
		email: ["required", "email"],
		hireDate: ["required", {
			rule: (value) => {
				if (!value.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
					throw new Error("The hiring date must be in MM/DD/YYYY format.");
				}
			}
		}]
	});
};
