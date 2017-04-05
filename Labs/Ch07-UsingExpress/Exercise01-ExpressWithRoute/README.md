# Chapter 7 Exercise 1: Simple Express Server with routes
## Objectives:
* You will create a basic server using Express.
* A router will be used to set a response for / 
## Steps
1. You need to navigate to the directory `Labs/Ch07-UsingExpress/Exercise01-SimpleExpressServer/Begin`
1. In this folder, create a new Node.js project: `npm init -y`
1. Install Express: `npm install --save express`
1. Create a `config.json` file, containing a `port` key with the value `3000`
1. Create a server.js file
    - Require the `express` library as a `const` named `express`
    - Call `express()`, and store the result in a new variable named `app` [this is the Express application]
 Require the `config.json` file as a `const` named `config`
    - Call the `app.listen()` method, and pass in as arguments:  
        - The port number, coming from `config.port`
        - A callback function that uses `console.log` to display a message that you're listening on the configured port
1. Create a `routes/index.js` file
    - Require the `express` library as a `const` named `express`
    - Call `express.router()`, and store the result in a new variable named `router` [this is an Express router]
    - Call the `router.get()` method, passing in as the arguments: [this creates a GET route]
        - The string "/" - this is the path on which the new route should be created
        - A callback (accepting a `req` and `res` argument), that specifies the logic to execute for the route [this is the 'route']
1. Edit routes/index.js. In the route, call the `res.send()` method, with the arguments: [this sends a plaintext response]
    - The string "Hello world!" - this is the text that will be sent to the user as a response.
    - Export the new router, by assigning it to `module.exports`
1. In server.js require the `./routes/index` module, and pass it into a call to `app.use()`
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems. And refresh the browser.

