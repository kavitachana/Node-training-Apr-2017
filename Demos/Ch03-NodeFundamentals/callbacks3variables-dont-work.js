
/* Demonstrating that setting variables 
 * outside of the callback to 'work around'
 * the asynchronicity doesn't work: */

let a = 1;

setTimeout(() => {
	a = 20;

	console.log("Second attempt:", a);
}, 1000);

console.log("First attempt:", a);

/* Output:
   First attempt: 1
   [... 1 second passes ...]
   Second attempt: 20
*/
