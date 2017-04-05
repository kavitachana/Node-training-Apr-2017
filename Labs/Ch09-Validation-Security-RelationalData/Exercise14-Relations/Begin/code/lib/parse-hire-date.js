'use strict';

const moment = require("moment");

module.exports = function parseHireDate(hireDate) {
	return moment(hireDate, "MM/DD/YYYY").toDate();
};
