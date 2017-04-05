const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

console.log("Going to open file!");

Promise.try(() => {
	return fs.openAsync("input.txt", "r+");
}).then((fd) => {
	console.log("File opened successfully!");
});
