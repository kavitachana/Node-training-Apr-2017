const fs = require("fs");

fs.readFile("./input.txt", (err, fileContents) => {
	if (err != null) {
		console.error("An error occurred", err);
	} else {
		console.log(fileContents.toString());
	}
})
