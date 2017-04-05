/* Demonstration of error handling (and filtering): */

const Promise = require("bluebird");

Promise.try(() => {
	/* The below could also have been an asynchronous error (Promise rejection),
	 * but for the sake of demonstration this one is synchronous. They're
	 * treated the same when they occur within a Promise.try, .then, .map, or
	 * some other equivalent type of callback. */
	let parsed = JSON.parse("{"); // This is invalid JSON!
}).catch(SyntaxError, (err) => {
	console.log("A syntax error occurred!");
}).catch((err) => {
	console.log("Some other kind of error occurred!");
});

/* Output:
   A syntax error occurred!
*/
