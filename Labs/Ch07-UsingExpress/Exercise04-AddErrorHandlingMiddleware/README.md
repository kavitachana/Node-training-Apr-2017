# Chapter 7 Exercise 4: Add Error Handling Middleware
## Objectives:
* You will use express-promise-router and unhandled-error
* You will use a State object, for passing around stateful things (like the error reporter object) to modules
* Use Wrapper functions around module contents, for receiving that state object
* Object destructuring for 'unpacking' items from that state object in the wrapper function
* Use Error-handling Express middleware
## Steps
1. You need to navigate to the directory Labs/Ch07-UsingExpress/Exercise04-ErrorHandlingMiddleware/__Begin__/code
1. Install unhandled-error: `npm install --save unhandled-error`
1. Install express-promise-router: `npm install --save express-promise-router`
1. Open the file `server.js` for editing. Require the `unhandled-error` library as a `const` named `unhandledError`
1. Call `unhandledError()` with the following single argument, and store the result in a new variable named `errorReporter`: [this is the unhandled error handler]
	1. A callback that accepts an `err` argument and makes a call to `console.error()`,
	with the following argument:
		1. The `stack` property of the `err` object, which contains the message and
		stacktrace for the error
1. Open the server.js file for editing
	- Create a `state` variable containing an object, that stores the `errorReporter` in a property with the same name - this object will be passed around to other modules, so that they can access the `errorReporter` if needed.
	- Require `express-promise-router` as `expressPromiseRouter`
	- Call `expressPromiseRouter()`, which produces a new router
	- Change the existing `app.use` calls to be calls to `router.use` instead, where `router` is your new router
	- Add a new `app.use` call, passing in the `router` as an argument [this makes the router part of your application]
1. Create a new file at `middleware/error-handler.js`
	- Require the `http` library
	- Assign the result of `(process.env.NODE_ENV === "development")` to `isInDevelopmentMode`
	- Assign a new function to `module.exports`, that takes a single argument and uses object destructuring to extract the `errorReporter` property, and which returns an error handling middleware that:
		1. Assigns either `err.stack` (when in development mode) or `null` (when not in development mode) to the `stackTrace` variable
		2. Calls `errorReporter.report()` with the following arguments:
			1. The `err` object
			2. A new object containing `req` and `res` as properties with the same name
		3. Calls `res.status` with `500` as an argument, and then immediately chains on a call to `.render()` with the following arguments:
			1. The string "error", as the template name
			2. A new object, containing the properties:
				1. `errorMessage`, containing the string "Internal Server Error"
				2. `stackTrace`, containing the variable of the same name
1.  Back in server.js, Require the `./middleware/error-handler` module, as shown on the slide - immediately calling the resulting function with the `state` object as its only argument, and pass the result into a new `app.use()` call that comes right before the existing call to `app.listen()`.
1. open `routes/index.js` for editing.
	- Remove the `express` require
	- Replace the `express.Router()` call with a call to the function returned from requiring the `express-promise-router` module
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
