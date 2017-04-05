/* Promises make it easy to move functionality into a separate function, too: */

const Promise = require("bluebird");
const bhttp = require("bhttp");

function getStatusCode(url) {
	return Promise.try(() => {
		return bhttp.get(url);
	}).then((response) => {
		return response.statusCode;
	});
}

/* ... and then you follow the same pattern again here, but now using your
       custom function (that also returns a Promise, because every chain of
       Promises will itself result in a new Promise): */

Promise.try(() => {
	return getStatusCode("http://google.com/");
}).then((statusCode) => {
	console.log("Status code:", statusCode);
})

/* Output:
   Status code: 200
*/
