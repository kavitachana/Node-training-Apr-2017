/* Simple example: */

const Promise = require("bluebird");
const bhttp = require("bhttp");

Promise.try(() => {
	return bhttp.get("http://google.com/");
}).then((response) => {
	console.log("Status code:", response.statusCode);
});

/* Output:
   Status code: 200
*/
