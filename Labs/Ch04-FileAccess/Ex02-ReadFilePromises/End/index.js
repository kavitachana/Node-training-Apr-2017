const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

Promise.try(() => {
	return fs.readFileAsync("./input.txt");
}).then((fileContents) => {
	console.log(fileContents.toString());
}).catch((err) => {
	console.error("An error occurred", err);
});
