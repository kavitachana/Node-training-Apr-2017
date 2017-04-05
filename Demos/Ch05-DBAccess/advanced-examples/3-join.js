'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	return db("items").join("locations", "items.locationId", "locations.id").select([
		"items.id",
		"items.description",
		"items.amount",
		"locations.name as locationName"
	]);
}).each((item) => {
	console.log(`${item.id}: ${item.description} (${item.amount} in ${item.locationName})`)
}).finally(() => {
	db.destroy();
});
