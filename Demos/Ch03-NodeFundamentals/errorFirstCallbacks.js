const fs = require('fs')  
fs.readFile('file.md', 'utf-8', function (err, content) {  
  if (err) {
    return console.log(err)
  }

  console.log(content)
})


