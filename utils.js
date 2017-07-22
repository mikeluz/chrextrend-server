//////////////////////
// HELPER FUNCTIONS //
//////////////////////
function onlyLettersAndNumbers(char) {
	return char !== "." && char !== "[" && char !== "]" && char !=='\'';
}

function removeLeadingAndTrailingSpaces(array) {
	var copy = [].slice.call(array);
	var firstNonSpace = false;
	var i = 0;
	while (!firstNonSpace) {
		copy.shift();
		if (copy[i] !== " ") {
			firstNonSpace = true;
		}
	}
	if (copy[copy.length - 1] === " ") {
		copy.pop();
	}
	return copy;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var fs = require('fs');

function promisifiedWriteFile (filename, str) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filename,
      str,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve("Success")
        }
      }
    );
  });
}

module.exports = {
	onlyLettersAndNumbers,
	removeLeadingAndTrailingSpaces,
	promisifiedWriteFile
};