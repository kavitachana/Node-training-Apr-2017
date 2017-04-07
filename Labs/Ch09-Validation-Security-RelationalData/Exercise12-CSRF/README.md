# Chapter 9: Exercise12: CSRFModifyLoginRegister
## New Concepts
* Install csurf
* Set up csurf app-wide
* Use an inline middleware in server.js that automatically exposes the CSRF token to every template through res.locals
* Use UnauthorizedError error type to errors.js
* Use an inline error-handling middleware in server.js to rethrow CSRF errors as UnauthorizedErrors


## Steps
1. You need to navigate to the directory Labs/Ch09-Validation-Security-RelationalData/Exercise12-CSRF/__End__/code
1. Install: `csurf`
	- Note how in `errors.js`, a new type of error has been added: `UnauthorizedError`
	- Note in `server.js` how:
		- `csurf` is set up as a middleware - this middleware will produce a CSRF error when no CSRF token is found on a route that requires it (eg. for a POST, PUT or DELETE request).
		- A custom middleware is created that makes the CSRF token accessible to every template through `res.locals`
		- A custom error-handling middleware is added right before the generic error-handling middleware, that rethrows a CSRF token error as an `UnauthorizedError`.
	- Note how all the forms - in `views/index.pug`, `views/admin/login.pug`, and `views/admin/register.pug` - a hidden form field has been added, containing the CSRF token. This token is sent along with the form submissions, and verified by the `csurf` middleware.
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
