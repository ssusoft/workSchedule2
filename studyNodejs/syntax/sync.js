var fs = require('fs');

// readFileSync
/*
console.log('A');
console.log(fs.readFileSync('syntax/sample.txt', 'utf8')); // 리턴값을 줌
console.log('C');
*/

// readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');