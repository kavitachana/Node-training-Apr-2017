'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	/* In this example, there *will* be an intentional failure! The result is
	   that the "Chicago" location is never added to the database. */

	return [{
		name: "Chicago",
		items: [{
			description: "Keyboard",
			amount: 12
		}, {
			description: "Mouse",
			amount: "This is not a number, so it will fail!"
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
}).catch((err) => {
	console.error("The insert failed!");
}).finally(() => {
	return Promise.try(() => {
		return Promise.all([
			db("locations"),
			db("items")
		]);
	}).then(([locations, items]) => {
		console.log("All locations:", locations);
		console.log("All items:", items);
	});
}).finally(() => {
	db.destroy();
});
