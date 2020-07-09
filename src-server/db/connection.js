const Sequelize = require('sequelize');

const sequelize =  new Sequelize('transfer_api', 'root', '', { host: '127.0.0.1', dialect: 'mysql', operatorsAliases: 0, logging: false});

module.exports = sequelize;
global.sequelize = sequelize;