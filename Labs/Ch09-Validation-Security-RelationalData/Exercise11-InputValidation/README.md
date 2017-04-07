# Chapter 9 Exercise 11: Input Validation
## New concepts:
* Validating input
* Displaying errors to the user by re-rendering forms
* Pre-filling form data
* Highlighting invalid fields + conditional classes in Pug

## Steps
1. You need to navigate to the directory Labs/Ch09-Validation-Security-RelationalData/Exercise11-InputValidation/__End__/code
1. Install: `checkit`
1. Note how `server.js` has a new middleware defined that:
    - Stores the form data in a template local, so that templates can access it
    - Stores a default, empty errors object as a template local
1. Note how `errors.js` no longer contains a `ValidationError` - because we’re going to re-display a form for a failed form submission, there’s no longer a need for a separate error object (as we won’t render an error page for this anymore).
1. Note how in `routes/users.js`:
1. Validators have been added in the route handlers, using `checkit` to validate the form data on `req.body`.
1. Some custom objects have been defined near the top of the file - these are errors that follow the format of `checkit` error objects, but that are used for validation errors that do not come from `checkit`. This is so that the templates only need to care about a single error object format.
1. Within the route handlers, the various `throw` statements (in `/register` and `/login`) have been replaced with `res.render` calls, passing in the error objects described above as the `errors` local.
1. An extra `.catch` has been added for `checkit` errors, that also re-renders the form, but this time passing in the error object supplied by `checkit`.
1. Note how `views/admin/login.pug`, `views/admin/register.pug`, `views/layout.pug` and `public/css/custom.css` have been modified to:
    - Display a list of validation errors near the top of the page
    - Highlight invalid fields by assigning a class to them, that makes them color red
    - Pre-fill fields with their previous input, from the `body` local that was added in step 2
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
