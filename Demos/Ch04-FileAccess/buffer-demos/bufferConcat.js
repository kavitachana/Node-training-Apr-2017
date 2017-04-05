var buffer1 = new Buffer('NodeJS Intro ');
var buffer2 = new Buffer('Data Sources');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());