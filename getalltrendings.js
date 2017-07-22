var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

fs.stat(__dirname + '/alltrendings.txt', function (err, stats) {
   // console.log(stats);
   if (err) {
       return console.error(err);
   }
   fs.unlink(__dirname + '/alltrendings.txt', function(err){
        if(err) return console.log(err);
        // console.log('file deleted successfully');
   });  
});

readFiles(__dirname + '/trendings/', function(filename, content) {
	  fs.appendFile('alltrendings.txt', content, (err) => {
		  if (err) throw err;
		  // console.log('The trending was appended to file!');
		});
	}, function(err) {
	  throw err;
});

module.exports = readFiles;