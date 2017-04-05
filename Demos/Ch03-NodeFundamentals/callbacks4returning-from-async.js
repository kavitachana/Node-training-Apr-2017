//////////////////////////////////////////

/* Demonstrating that returning from 
 * an asynchronous callback doesn't work
 * either: */

let result = setTimeout(() => {
	return 42;
}, 1000);

console.log("Result:", result);

/* Output:
   [... 1 second passes ...]
   Result: undefined
*/