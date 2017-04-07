# Chapter 8: Exercise8: UserManagementDB-Registration
## New Concepts
* Password hashing with scrypt-for-humans
* Handling duplicates (via UNIQUE constraints)
* Keeping track of the currently-logged-in user in session data
* Using a custom middleware to make the user object itself available on the `req` object, doing a database query for each request

## Steps
1. You need to navigate to the directory Labs/Ch08-UsingSessions/Exercise08-UsingSessions/__End__/code
1. Install: `scrypt-for-humans`, `database-error`
	- Note how a new migration has been added at `20170325191954_users.js`, defining the ‘users’ table. Especially important is the `.unique()` property on the `username` column.
	- Note how `routes/users.js` has changed:
		- The `/login` route now no longer checks for a hardcoded password, but instead:
		- Fetches the specified user from the database (throwing an error if it doesn’t exist)
		- Verifies the password against the hash in the database
			- Sets a user ID in the session upon successful login.
		- New `/register` routes have been added (one for displaying the form, one for processing its submission). The form handling route:
		- Hashes the password using `scrypt-for-humans`
			- Tries to store a new user in the database with the given details
		- If successful, logs the user in and redirects to `/`
			- Note how there’s no explicit check of whether the user already exists - this is handled by the database, because of the `UNIQUE` requirement on the `username` column.
			- If a duplicate is inserted, the database will reject the operation, and throw an error - this error is caught by `database-error`, turned into a more easily identifiable error, and then caught again using the `duplicateUsername` definition.
			- That then results in a new `AuthenticationError` being thrown, telling the user that their chosen username already exists.
	- Note how the `views/admin/login.pug` template has been updated to ask for a username, and how a new `views/admin/register.pug` template has been created for the registration form.
	- The `middleware/require-login.js` middleware has changed, too - now instead of checking whether `req.session.loggedIn` is `true`, it checks whether a user ID has been set in the session data.
	- Note how a new middleware has been defined in `middleware/fetch-user.js` - this middleware, that runs on every request (see `server.js` for the `router.use`):
		- Tries to fetch the user from the database that corresponds to the “logged in user” ID stored in the session data.
		- If successful, stores it as `req.user` so that other routes can access it.
		- If unsuccessful, forcibly logs the user out (as their account has been removed since they logged in).
1. Install database-error, scrypt-for-humans
	- Note migration for users table
	- Note fetch-user middleware, which (when a valid session exists) automatically fetches the user object for that session from the DB and stores it on the `req`, or destroys the session if that user no longer exists
1. Note the usage of fetch-user middleware in server.js
	- Note the change for require-login middleware to check for a req.user instead of a `loggedIn` status in the session data
		- Instead of storing a `loggedIn` status on the session (in routes/users.js), store the userId of the logged-in user
1. Note the register route and template, for creating a new account (using scrypt-for-humans for password hashing), and using database-error to detect already-existing accounts in the database (enforced by a UNIQUE constraint)
1. Note update to login template to take in a username as well, not just a password
1. Note update to login route to fetch the specified user from the database and check their password (using scrypt-for-humans), throwing an AuthenticationError if either of those steps fail
1. Note update to layout to add a registration button
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
