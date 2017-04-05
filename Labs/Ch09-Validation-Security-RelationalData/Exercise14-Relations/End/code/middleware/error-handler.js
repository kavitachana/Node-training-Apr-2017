'use strict';

const http = require("http");

let isInDevelopmentMode = (process.env.NODE_ENV === "development");

module.exports = function({errorReporter}) {
	return function(err, req, res, next) {
		let statusCode, errorMessage, stackTrace;

		if (err.isCustomError && err.statusCode != null) {
			statusCode = err.statusCode;
		} else {
			statusCode = 500;
		}

		if (isInDevelopmentMode || (statusCode >= 400 && statusCode < 500)) {
			/* We only want to display the original error message if we're either in
			   development mode, or the statusCode is a 4XX code (meaning an error
		       that's caused by the client). */
			errorMessage = err.message;
		} else {
			errorMessage = http.STATUS_CODES[statusCode];
		}

		if (isInDevelopmentMode) {
			stackTrace = err.stack;
		} else {
			stackTrace = null;
		}

		if (statusCode < 400 || statusCode >= 500) {
			/* Non-client errors should always be displayed on the terminal, even
			   if we're running in production (so that the service manager can log
		       them, just in case we need them there). */
			console.error(err.stack);
		}

		if (statusCode === 500) {
			/* This is an internal server error; this category includes any kind
			   of unexpected error (ie. a bug). It should be reported to the
			   error reporter, which will then likely crash the process and let
			   it get restarted. */
			errorReporter.report(err, {
				req: req,
				res: res
			});
		}

		res.status(statusCode).render("error", {
			errorMessage: errorMessage,
			stackTrace: stackTrace
		});
	};
}
