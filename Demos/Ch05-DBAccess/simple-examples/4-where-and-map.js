'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	return db("people").where({
		firstName: "Joe"
	});
}).map((person) => {
	return `${person.firstName} ${person.lastName}`;
}).then((names) => {
	console.log("The full names of all the people named Joe:", names);
}).finally(() => {
	db.destroy();
});
