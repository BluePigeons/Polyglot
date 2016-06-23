
//var fs = require('fs');

 
    fs.writeFile('message.txt', 'Just now, we have created this file', function (err) {
        if (err) throw err;
        console.log('It\'s saved! in same location.');
    });
 
