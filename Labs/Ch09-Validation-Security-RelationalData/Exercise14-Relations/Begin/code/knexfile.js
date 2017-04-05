const config = require("./config.json");

module.exports = {
	client: "pg",
	connection: {
		host: config.database.hostname,
		user: config.database.username,
		password: config.database.password,
		database: config.database.database
	}
}
