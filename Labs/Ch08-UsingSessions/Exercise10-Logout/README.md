# Chapter 8: Exercise 10: Logging Out
## New Concepts
* Add logout button to layout, only visible when user is logged in
* Add logout route to routes/users.js that destroys the session


## Steps:
1. You need to navigate to the directory `Labs/Ch08-UsingSessions/Exercise10-Logout/End/code`
1. Note how in `routes/users.js`, a new route for `/logout` has been added - this route will destroy the session that the user has (effectively logging them out), and then redirects them back to `/`.
1. Accordingly, the `views/layout.pug` template has been updated to include a Logout button, that’s only visible when the user is logged in.
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems