# Chapter 8: Exercise 6: Basic Authentication
## New Concepts
* body-parser usage
* Sessions + express-session usage
* First use of Promises + promisifying
* Using a custom regular middleware
* Custom error types
* Access control (require login before allowing access to certain routes)
* Because of access control: specifying route-level middleware (requireLogin) before the route handler
* Conditional error logic; expose and log certain information under certain circumstances, but not under others

## Steps:
1. You need to navigate to the directory `Labs/Ch08-UsingSessions/Exercise06-BasicAuthentication/End/code`
1. Install: `body-parser`, `express-session`
1. Open server.js, and note how the `body-parser` and `express-session` modules are required and set up on the application using `router.use`.
1. Install: `bluebird`. 
	- Note how a new file is created at `middleware/sessions-promises.js`, and it specifies a middleware that adds promisified session methods on every request object.
	- Note how in server.js, the new `sessions-promises` module is required, and passed into `router.use` right after the initialization of the express-session middleware.
	- Note how config.json now contains a randomly generated secret key, and how this is used in the express-session configuration in server.js.
1. Install: `create-error`
	- Note how a new `errors.js` file was created, containing custom error types that are created using the `create-error` module.
	- Note how a new `routes/users.js` file is created. This is going to contain the router that specifies all authentication-related routes (eg. login).
		- The new router specifies two routes: one to display the login page, and one to handle the form submission from that login page.
		- Note how the ‘form handling’ route validates the password, and either saves the session and redirects (if valid) or throws an error (if invalid).
	- Note also how a corresponding template was created at `views/admin/login.pug`, and how `views/layout.pug` was updated to include a link to the login page.
1. In `server.js`, you can see the new `routes/users.js` module being required and added to the application using `router.use`.
	- Note how a new `middleware/require-login.js` module is created, and how it validates whether the user is logged in, by inspecting the session data. If so, it calls `next()`, allowing the request to proceed. If not, it instead produces an error.
	- Note how `routes/index.js` is modified to use this new `require-login` middleware, to ensure that only logged-in users can access the student list.
1. Finally, note how the `middleware/error-handler.js` middleware is modified, to change its behaviour depending on scenario:
	- A default status code of 500 is set for any error that doesn’t have an explicit status code defined on it.
	- The original error message and stack trace are only displayed in situations where it’s safe to do so, depending on the status code of the error and whether the application is running in development mode or not.
	- Non-client errors (which usually means a bug has occurred, or something else that is of interest to the developer) are logged to the terminal.
 	- Error reporting is changed to only happen when a bug occurs, but not for other kinds of errors.
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems