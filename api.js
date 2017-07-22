const router = require('express').Router();
const exec = require('child_process').exec;
const fs = require('fs');
const db = require('./db/models');
const Trending = require('./db/models/trending');

const { onlyLettersAndNumbers, removeLeadingAndTrailingSpaces } = require('./utils.js');

function printFile(res, output, name) {
	fs.writeFile(`${__dirname}/${name}.txt`, output, function (err, written, string) {
	  if (err) throw err;
	  res.json(output.slice(1, 11));
	});
}

///////////////////////
module.exports = router
///////////////////////
	.get('/trending', (req, res, next) => {
		exec('npm run get', { cwd: __dirname }, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
			var truncated = stdout.split("...");
			var trunc = truncated[1].split("\n");
	    var name = Date();
	    Trending.create({
	    	text: trunc.slice(1, 11).join("\n"),
	    	date: name
	    })
	    .then(newEntry => {
	      res.json(trunc.slice(1, 11));
	    });
		});
	})

	.get('/trending/stats', (req, res, next) => {
		exec('npm run calc', (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
			var truncated = stdout.split("\n").slice(4);
			var filtered = truncated.slice().map(el => {
				if (el.length) {
					var scrubbed = el
						.split(',')
						.map(word => {
							var toRemoveSpaces = word.split('').filter((t, i) => onlyLettersAndNumbers(t));
							return removeLeadingAndTrailingSpaces(toRemoveSpaces);
						})
						.filter(el => el.length)
						.map(el => el.join(''));
					return scrubbed;
				}
			});
			res.send(filtered);
		});
	});
