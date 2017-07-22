const Promise = require('bluebird');
const db = require('../db/models');
const Trending = require('../db/models/trending');

const fs = require('fs');
const readFiles = require('../getalltrendings.js');

const readAllTrendingsToSeed = () => {
  var seedArray = [];
  readFiles(__dirname + '/../trendings/', function(filename, content) {
      var trendingObj = {
        text: content,
        date: filename.slice(0, -4)
      };
      console.log(trendingObj);
      seedArray.push(trendingObj);
    }, function(err) {
      throw err;
  });
  return seedArray;
};

const trendingSeed = new Promise((res, rej) => {
  var trendingsToSeed = readAllTrendingsToSeed();
  res(trendingsToSeed);
}).then((trendingSeed) => {
  return new Promise(resolve =>
    // 'child_process.exec' docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    require('child_process').exec('createdb trending', resolve)
  ).then(() => {
    db.sync({force: true})
    .then(function () {
      console.log("Dropped old data, now inserting data");
        return Promise.map(trendingSeed, function (obj) {
          return Trending
          .create(obj);
        });
    })
    .then(function () {
      console.log("Finished inserting data");
    })
    .catch(function (err) {
      console.error('There was totally a problem', err, err.stack);
    })
    .finally(function () {
      db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
      console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
      return null; // silences bluebird warning about using non-returned promises inside of handlers.
    });
  });
});