const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

console.log("Going to read file!");

Promise.try(() => {
	return fs.readFileAsync("input.txt");
}).then((data) => {
	console.log(`Asynchronous read: ${data.toString()}`);
});
