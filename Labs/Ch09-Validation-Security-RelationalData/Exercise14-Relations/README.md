# Chapter 9 Exercise 14: Database Relations
## Objectives:
* Working with transactions
* Working with FKs/relations in databases

## Overview of Steps:
* Install and use simple-array-diff
* Add migration for interests table (presupplied)
* Update create-student-object.js to also auto-load interests for students when asked to
* Modify update-student.js to diff last-known interests against new set of interests, and remove/add interests accordingly, in a transaction along with the update of the student object itself
* Add parse-interests.js module for parsing user input in the interests form field
* Update 'create student' route to also store interests
* Update forms and detail pages to accommodate interests

## Steps
1. You need to navigate to the directory Labs/Ch09-Validation-Security-RelationalData/Exercise14-Relations/__End__/code
1. Install: `simple-array-diff`
1. Note how a new migration file has been added as `migrations/20170325192133_interests.js`. This specifies the schema for the new `interests` table, that relates to the `students` table that we already have.
1. Note the use of a foreign key.
1. Note how the `lib/create-student-object.js` module has been updated, to also automatically fetch a student’s interests (when the calling code asks for it, using an option).
1. Note how a module has been added as `lib/parse-interests.js`. The function in this module is used to turn a comma-separated list of interests (provided by the user) into an array of items, that can each be stored separately.
1. Note how `lib/update-student.js` has been updated to:
1. Find the differences between the existing list of interests, and the new list of interests
1. Run a query for each interest addition and deletion, plus for the student itself - but all of this in a single transaction, to make sure that the process isn’t interrupted halfway through.
1. Note how the templates at `views/students/add.pug`, `views/students/student.pug` and `views/students/edit.pug` have been updated to include an “Interests field”.
1. Note how `routes/students.js` has gained corresponding logic, using the `parse-interests.js` module created earlier:
    - When creating a student, each specified interest is stored as well, with a reference to the ID of the new student object.
    - When deleting a student, all their interests in the database are deleted, too - again using a transaction.
    - When modifying a student, the modified logic in `lib/update-student.js` is used.
    - When fetching an existing student for any reason, in the router parameter logic, the interests are also retrieved (using the modified `lib/create-student-object.js` logic).
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
