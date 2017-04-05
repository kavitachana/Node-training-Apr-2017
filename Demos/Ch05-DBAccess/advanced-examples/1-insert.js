'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

/* We're going to insert each location in its own transaction - this means
	   that if any of the queries for a given location fails, none of the
	   queries for that location will be applied, but queries for other
	   locations (that didn't fail), will be.

	   There are no failures in this example, though.
*/

return Promise.try(() => {
	return [{
		name: "New York",
		items: [{
			description: "Stapler",
			amount: 1
		}, {
			description: "Tape",
			amount: 5
		}, {
			description: "Printer",
			amount: 0
		}]
	}, {
		name: "Los Angeles",
		items: [{
			description: "Server",
			amount: 1
		}, {
			description: "Lunchbox",
			amount: 2
		}]
	}];
}).map((location) => {
	return db.transaction((transaction) => {
		return Promise.try(() => {
			return transaction("locations").insert({
				name: location.name
			}).returning("id");
		}).then((locationIds) => {
			let locationId = locationIds[0];

			return Promise.map(location.items, (item) => {
				 return transaction("items").insert({
					 description: item.description,
					 amount: item.amount,
					 locationId: locationId
				 });
			});
		});
	});
}).then(() => {
	return Promise.all([
		db("locations"),
		db("items")
	]);
}).then(([locations, items]) => { // Note the array destructuring ("unpacking") syntax!
	console.log("All locations:", locations);
	console.log("All items:", items);
}).finally(() => {
	db.destroy();
});
