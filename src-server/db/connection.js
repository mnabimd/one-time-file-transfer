const Sequelize = require('sequelize');
const log4js = require('log4js');

log4js.configure({
  appenders: {cheese: { type: 'file', filename: './src-server/logs/log4js.log'} },
  categories: { default: { appenders: ['cheese'], level: 'error'}}
});

const logger = log4js.getLogger('cheese');

const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'mysql', operatorsAliases: 0, logging: false});

const connectStatus = sequelize.authenticate().then(function(){
    console.log('Connected Successfully!');
    logger.error('Connected Successfully!');
}).catch(function(e) {
    console.log({error: 'Error', e});
    logger.error(e);
});

module.exports = sequelize;
global.sequelize = sequelize;