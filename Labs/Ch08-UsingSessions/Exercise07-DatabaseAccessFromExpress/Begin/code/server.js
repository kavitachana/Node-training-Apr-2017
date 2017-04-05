'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressPromiseRouter = require("express-promise-router");
const expressSession = require("express-session");
const unhandledError = require("unhandled-error");

const config = require("./config.json");

let errorReporter = unhandledError((err) => {
	/* This should eventually be hooked into some sort of error reporting
	   mechanism. */
	console.error("UNHANDLED ERROR:", err.stack);
});

/* The 'state' object is an object that we pass to everything that needs some
   sort of stateful dependency; all of the stateful dependencies are initialized
   here in server.js, and then passed into the modules that need them using a
   wrapper function. The wrapper function can unpack the stateful dependencies
   that it needs, eg. using object destructuring. */
let state = {
	errorReporter: errorReporter
}

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/* All routers and middlewares are wrapped into an express-promise-router to
   make sure that error handling is consistent throughout the application. */
let router = expressPromiseRouter();

router.use(express.static(path.join(__dirname, "public")));
router.use(bodyParser.urlencoded({extended: true}));

router.use(expressSession({
	secret: config.sessions.secret,
    resave: false,
    saveUninitialized: false
}));

router.use(require("./middleware/sessions-promises"));

router.use(require("./routes/index.js"));
router.use(require("./routes/users.js"));

app.use(router);

app.use(require("./middleware/error-handler")(state));

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}...`);
});
