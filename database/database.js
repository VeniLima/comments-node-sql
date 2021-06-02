const Sequelize = require('sequelize');

const connection = new Sequelize('comments', 'root', 'DBA123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;