var buf = new Buffer('Change this text');
var json = buf.toJSON(buf);

console.log(json);