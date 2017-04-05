'use strict';

module.exports = function parseInterests(interests) {
	if (interests == null) {
		return [];
	} else {
		return interests.split(",").map((item) => {
			return item.trim();
		}).filter((item) => {
			return (item !== "");
		});
	}
};
