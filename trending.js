// TRENDSCRAPE
var fs = require('fs');
var page = require('webpage').create();

console.log('Trending...');

page.open('https://www.yahoo.com', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    // ua = output from webpage HTML grab
    var ua = page.evaluate(function() {

    var t = document.getElementsByClassName('trending-item');

    var array = Array.prototype.slice.call(t);

    var ts = array.map(function (item) {
        return item.innerText;
    });

    return ts;

    });

    // extract rank and text from array
    var trendings = '';

    ua.slice(0,10).forEach(function (str) {
      return trendings += str.trim() + '\n';
    });

    var name = Date();
    // write trendings to .txt file in /trendings directory, naming them by date/time
    fs.write('trendings/' + name + '.txt', trendings, function (err, written, string) {
      if (err) throw err;
    });

    // fs.appendFile() will add to one file

  }
  console.log(trendings);
  console.log('File >> ' + name + ' << created');
  phantom.exit();

});
