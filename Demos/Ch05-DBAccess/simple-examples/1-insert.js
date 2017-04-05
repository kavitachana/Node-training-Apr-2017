'use strict';

const Promise = require("bluebird");
const knex = require("knex");
let db = knex(require("./knexfile"));

return Promise.try(() => {
	return db("people").insert([{
		firstName: "Joe",
		lastName: "Bloggs",
		age: 42
	}, {
		firstName: "Joe",
		lastName: "Smith",
		age: 52
	}, {
		firstName: "John",
		lastName: "Doe",
		age: 21
	}, {
		firstName: "Jane",
		lastName: "Doe",
		age: 23
	}, {
		firstName: "Beth",
		lastName: "Smith",
		age: 24
	}]);
}).then(() => {
	console.log("Done!");
}).finally(() => {
	db.destroy();
});
