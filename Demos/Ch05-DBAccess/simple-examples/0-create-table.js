'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

Promise.try(() => {
	return db.schema.createTable("people", (table) => {
		table.increments("id").primary();
		table.text("firstName");
		table.text("lastName");
		table.integer("age");
	});
}).then(() => {
	console.log("Done!");
}).finally(() => {
	db.destroy();
});
