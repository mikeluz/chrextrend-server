var fs = require('fs');

function createRank(tArr) {

  var ranks = {};
  var rankArr = [];
  var copy = tArr.slice();

  copy.forEach(t => {
    var trimmed = t.slice(1);
    if (!ranks[trimmed]) {
      ranks[trimmed] = 1;
    } else {
      ranks[trimmed]++;
    }
  });

  for (var key in ranks) {
    var array = [];
    array.push(key);
    array.push(ranks[key]);
    rankArr.push(array);
  }

  return rankArr;
}

fs.readFile(__dirname + '/alltrendings.txt', (err, data) => {
  if (err) throw err;
  var array = data.toString().split('.');

  array.forEach((t, i) => {
    array[i] = t.split('\n')[0];
  });

  var rank = createRank(array);

  rank.sort(function(a, b) {
    return b[1] - a[1];
  });

  // console.log(rank);
  // console.log(rank.length)

  rank.forEach(el => {
    console.log(el);
  });

});