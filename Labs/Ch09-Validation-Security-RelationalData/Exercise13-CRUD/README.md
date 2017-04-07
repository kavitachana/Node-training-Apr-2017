# Chapter 9: Exercise13: CRUD
## New Concepts
* Selecting specific single database items
* "Edit item" forms that prefill the original data
* Updating database items
* Sending JSON responses
* Add NotFoundError error type to errors.js
* Provide data validation using checkit

## Steps
1. You need to navigate to the directory Labs/Ch09-Validation-Security-RelationalData/Exercise13-CRUD/__End__/code
1. Note how in `errors.js`, a `NotFoundError` error type has been added.
1. Note how in `views/layout.pug`, a new mixin was created (`valueInput`), for generating form fields that implement the “highlight invalid fields and pre-fill all fields” functionality that we’ve seen before. This allows us to repeat ourselves less - instead of reimplementing this logic for every single input field, we can just use the mixin. It works a bit like a function, but for templates.
1. A new module is created at `lib/parse-hire-date.js`, containing a function that turns a user-specified date string into a JavaScript Date object (for insertion into the database). This is used later on, in the student add/edit routes.
1. Another new module is created at `lib/update-student.js` - this one using a state object wrapper - that handles updating a user object in the database. This is also used later on, in the student edit route.
1. A new file is created at `validators/student.js`, containing a `checkit` validator for student information, that will later be used in multiple routes. Because it’s used in multiple places, it’s abstracted out into a separate module.
1. Note how a new router is created as `routes/student.js`, containing a number of thing:
	- A route for listing the students - it used to be in `routes/index.js`, before we created this router module.
		- However, note that the `views/index.pug` template was updated, to highlight and link the items in the student table to their respective ‘view student’ pages. For the same reason, `public/js/script.js` was created.
	- A route pair (display + handle form) for handling user creation, using the validator we’ve defined, and inserting the new student into the database.
		- A corresponding form template is created as `views/students/add.pug`.
		- Note that this form uses the `valueInput` mixin we created earlier.
	- A route parameter handler, used for the routes defined after it, that automatically fetches the student data from the database for every route that contains a `studentId` parameter.
	- A route for displaying details of a specific student (relying on the route parameter handler to obtain the student data).
		- A corresponding template is created as `views/students/student.pug`.
		- A default icon is also added to `public/img`, to display on the page.
	- A route pair for editing a specific student (also relying on the route parameter handler).
		- A corresponding template is created as `views/students/edit.pug`.
		- Note that this form also uses the `valueInput` mixin we created earlier, but it also passes in the value from the existing student data - if this is the first time we’re showing the form, then we want to fill in the existing data of the student, not the (non-existent) form data from the (non-existent) previous submission.
	- A single route for deleting a specific student - the reason there’s no form rendering needed here, is that the ‘delete’ button is shown directly on the ‘view student’ page, rather than having a dedicated page with a form.
	- Finally, a route for returning all the details about a student in JSON form.
1. Note how `server.js`:
	- has been modified to use this router - but also note how `requireLogin` is used to prevent access to the entire router by unregistered users, instead of just preventing access to a single route.
	- now redirects from `/` to `/students`.
1. Note how the stylesheet at `public/css/custom.css` has been updated accordingly.
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
