const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

console.log("Going to get file info!");

Promise.try(() => {
	return fs.statAsync("input.txt");
}).then((stats) => {
	console.log(stats);
	console.log("Got file info successfully!");

	// Check file type
	console.log(`isFile ? ${stats.isFile()}`);
	console.log(`isDirectory ? ${stats.isDirectory()}`);
});
