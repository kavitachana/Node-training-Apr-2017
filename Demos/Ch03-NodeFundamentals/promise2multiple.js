/* Multiple steps: */

const Promise = require("bluebird");
const bhttp = require("bhttp");

Promise.try(() => {
	return bhttp.get("http://google.com/");
}).then((response) => {
	return bhttp.get(`https://http.cat/${response.statusCode}`);
}).then((response) => {
	console.log("Content-type of Status Cat image:", 
							response.headers["content-type"]);
});

/* Output:
   Content-type of Status Cat image: image/jpeg
*/
