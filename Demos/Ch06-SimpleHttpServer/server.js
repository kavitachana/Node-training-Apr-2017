//include the http package
//makes all the APIs available to the http variable
const http = require('http');

//hostname has deault of localhost

//can set the port to listen on
const port = 3000;

const requestHandler = (request, response) => {  
  console.log(request.url);
  //end method ends execution and sends message to browser
  response.end('Hello Node.js Server!');
}


const server = http.createServer(requestHandler);

//start server and listen on port, hostname(optional),
//it runs until ended. Ctrl+C or Ctrl+break 
server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})