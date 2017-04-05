'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	return db("people").where({
		firstName: "Joe"
	});
}).then((people) => {
	console.log("All the people named Joe:", people);
}).finally(() => {
	db.destroy();
});
