/* This example demonstrates how errors 'bubble up'. It's a more complex
 * example that, while it's still artificial, has a structure that's similar to
 * what real-world Promises-based code would look like. */

const Promise = require("bluebird");
const bhttp = require("bhttp");

function makeRequest(url) {
	return Promise.try(() => {
		return bhttp.get(url); // Whether an error occurs here...
	}).then((response) => {
		return response.body;  // ... or here...
	}).catch({name: "TypeError"}, (err) => { // ... and as long as it's not a TypeError in the previous two places...
		console.log("A wild TypeError appears!", err);
		process.exit(1);
	});
}

function makeManyRequests(urls) {
	return Promise.try(() => {
		if (urls.length === 0) {
			throw new Error("Must specify at least one URL"); // ... or here (even if it's a TypeError!) ...
		} else {
			return urls;
		}
	}).map((url) => {
		return makeRequest(url);
	});
}

function doMyThing(urlList) {
	return Promise.try(() => {
		return makeManyRequests(urlList);
	}).each((responseBody) => {
		console.log("Response body length:", responseBody.length);
	}).catch((err) => {
		console.log("Oh noes!", err); // ... it will always end up here, as long as it wasn't caught by our previous .catch.
	});
}

/* Example 1: Successful operation */

doMyThing([
	"http://google.com/",
	"http://bing.com/",
	"http://yahoo.com"
]);

/* Output:
   Response body length: 10989
   Response body length: 86923
   Response body length: 433637
*/



/* Example 2: TypeError (handled in line 14) */

// doMyThing([
// 	"http://google.com/",
// 	"http://bing.com/",
// 	null
// ]);

/* Output:
   A wild TypeError appears! TypeError: Parameter "url" must be a string, not object
     at Url.parse (url.js:87:11)
     at Object.urlParse [as parse] (url.js:81:5)
	 [...]
*/



/* Example 3: Unrecognized error type (handled in line 37) */

// doMyThing([
// 	"http://google.com/",
// 	"http://bing.com/",
// 	"http://nonexistentsite-wi4uhgi3u42hg9h34iughiue.com/"
// ]);

/* Output:
   Oh noes! { Error: getaddrinfo ENOTFOUND nonexistentsite-wi4uhgi3u42hg9h34iughiue.com nonexistentsite-wi4uhgi3u42hg9h34iughiue.com:80
     at errnoException (dns.js:28:10)
     at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:76:26)
   code: 'ENOTFOUND',
   errno: 'ENOTFOUND',
   syscall: 'getaddrinfo',
   hostname: 'nonexistentsite-wi4uhgi3u42hg9h34iughiue.com',
   host: 'nonexistentsite-wi4uhgi3u42hg9h34iughiue.com',
   port: 80 }
*/
