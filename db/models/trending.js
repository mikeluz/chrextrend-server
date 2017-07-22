const Sequelize = require('sequelize');
const db = require('./index');

const Trending = db.define('trendings', {
    text: {
        type: Sequelize.TEXT
    },
    date: {
    	type: Sequelize.STRING
    }
}, {});

module.exports = Trending;
