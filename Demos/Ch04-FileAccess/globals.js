console.log( __filename );

console.log( __dirname );

function printHello(){
   console.log( "Hello, World!");
}
// Now call above function after 2 seconds
//setTimeout(printHello, 2000);


// Now call above function after 2 seconds
var t = setTimeout(printHello, 2000);

// Now clear the timer
clearTimeout(t);

function printHello2(){
   console.log( "Hello, World2!");
}
// Now call above function after 2 seconds
setInterval(printHello2, 2000);

