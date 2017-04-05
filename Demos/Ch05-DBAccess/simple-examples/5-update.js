'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	return db("people").update({
		firstName: "Joey"
	}).where({
		firstName: "Joe"
	});
}).then(() => {
	console.log("Changed name of all the Joes!");

	return db("people");
}).then((people) => {
	console.log("Now, all the people:", people);
}).finally(() => {
	db.destroy();
});
