//////////////////////////////////////////

/* Calling callbacks from within 
callbacks for sequential behaviour: */

setTimeout(() => {
	console.log("Hello");

	setTimeout(() => {
		console.log("World!");
	}, 1000);
}, 1000);

/* Output:
   [... 1 second passes ...]
   Hello
   [... 1 second passes ...]
   World!
*/


