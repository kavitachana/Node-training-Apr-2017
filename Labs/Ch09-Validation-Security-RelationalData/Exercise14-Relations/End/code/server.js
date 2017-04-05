'use strict';

const express = require("express");
const knex = require("knex");
const path = require("path");
const bodyParser = require("body-parser");
const expressPromiseRouter = require("express-promise-router");
const expressSession = require("express-session");
const connectSessionKnex = require("connect-session-knex")(expressSession);
const csurf = require("csurf");
const unhandledError = require("unhandled-error");

const requireLogin = require("./middleware/require-login");
const errors = require("./errors");
const config = require("./config.json");

let db = knex(require("./knexfile"));

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
	db: db,
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

router.use((req, res, next) => {
	/* This allows forms to display the previously specified values when the
	   input validation fails, and the form is shown to the user again (but with
       error mesages). */
	res.locals.body = req.body;

	/* Default value for the `errors` local, so that the templates don't throw
	   an error when displaying a form *without* errors. */
	res.locals.errors = {};

	next();
});

router.use(expressSession({
	secret: config.sessions.secret,
    resave: false,
    saveUninitialized: false,
	store: new connectSessionKnex({
		knex: db
	})
}));

router.use(csurf());

router.use((req, res, next) => {
	/* This makes the CSRF token available to all templates. */
	res.locals.csrfToken = req.csrfToken();

	next();
})

router.use(require("./middleware/sessions-promises"));
router.use(require("./middleware/fetch-user")(state));

router.use(require("./routes/index.js")(state));
router.use(require("./routes/users.js")(state));

router.use("/students", requireLogin, require("./routes/students.js")(state));

app.use(router);

app.use((err, req, res, next) => {
	/* This is a special-case error handler; if a CSRF token mismatch occurs, it
	   will rethrow the error as an UnauthorizedError, but otherwise it will let
	   the original error go through (eventually ending up in the generic error
	   handler below it). */
	if (err.code === "EBADCSRFTOKEN") {
		next(new errors.UnauthorizedError("Invalid CSRF token."));
	} else {
		next(err);
	}
});

app.use(require("./middleware/error-handler")(state));

app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}...`);
});
