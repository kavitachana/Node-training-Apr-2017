/* Demonstration of synchronous return values
   being turned into Promises automatically: */

const Promise = require("bluebird");
const bhttp = require("bhttp");

Promise.try(() => {
	return bhttp.get("http://google.com/");
}).then((response) => {
	return response.statusCode;
}).then((statusCode) => {
	console.log("Status code:", statusCode);
});

/* Output:
   Status code: 200
*/
