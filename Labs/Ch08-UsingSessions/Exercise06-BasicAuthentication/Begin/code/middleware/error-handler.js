'use strict';

let isInDevelopmentMode = (process.env.NODE_ENV === "development");

module.exports = function({errorReporter}) {
	return function(err, req, res, next) {
		let stackTrace;

		if (isInDevelopmentMode) {
			stackTrace = err.stack;
		} else {
			stackTrace = null;
		}

		/* This is an internal server error; this category includes any kind
		   of unexpected error (ie. a bug). It should be reported to the
		   error reporter, which will then likely crash the process and let
		   it get restarted. */
		errorReporter.report(err, {
			req: req,
			res: res
		});

		res.status(500).render("error", {
			errorMessage: "Internal Server Error",
			stackTrace: stackTrace
		});
	};
}
