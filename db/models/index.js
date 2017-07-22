var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/trending', {
	logging: false,
  define: {
    underscored: true,       
    freezeTableName: true,   
    timestamps: true,        
	}
});

module.exports = db;