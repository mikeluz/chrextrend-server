const express = require('express');
const app = express();
const morgan = require('morgan');
const models = require('./db/models');
const Trending = require('./db//models/trending');
const Promise = require('bluebird');

app.use(morgan('dev'));

app.use('/api', require('./api'));

// app.listen((process.env.PORT || 3001), () => {
// 	console.log("server listening on port 3001")
// });

// in case we add more models, use Promise.all for scalability
Promise.all([
		// sync model
		Trending.sync({force: false})
	])
	.then(function () {
		// turn server on
		app.listen((process.env.PORT || 3001), function () {
			console.log('Server is listening on port 3001');
		});
	})
	.catch(console.error);

module.exports = app;

