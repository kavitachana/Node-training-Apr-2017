buf = new Buffer(256);
len = buf.write("Change this text");

console.log("Octets written : "+  len);