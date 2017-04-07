# Chapter 8: Exercise9: User Management: Show LoggedIn Status
## New Concepts
* Access to user-specific data via res.locals
* Conditional logic in Pug templates
* Modify fetch-user.js to store the user on res.locals as well, making it available to every template

## Steps:
1. You need to navigate to the directory Labs/Ch08-UsingSessions/Exercise09-LoggedInStatus/__End__/code
1. Note how the `middleware/fetch-user.js` middleware has been modified to also show the currently logged-in user in `res.locals` - this makes it available to all templates as a template local.
1. Accordingly, the `views/layout.pug` template was modified to check whether a `user` local exists - if not, it shows the login/signup menu items.
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems
