/* Demonstration of Promise.map and nesting to retain scope: */

const Promise = require("bluebird");
const bhttp = require("bhttp");

let sites = [
	"http://google.com/",
	"http://yahoo.com/",
	"http://bing.com/"
]

Promise.map(sites, (site) => {
	return Promise.try(() => {
		return bhttp.get(site);
	}).then((response) => {
		return {
			url: site, // Note that this uses the `site` variable again!
			statusCode: response.statusCode
		}
	});
}).then((results) => {
	console.log(results);
});

/* Output:
   [ { url: 'http://google.com/', statusCode: 200 },
     { url: 'http://yahoo.com/', statusCode: 200 },
     { url: 'http://bing.com/', statusCode: 200 } ]
*/
