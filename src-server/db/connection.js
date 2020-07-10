const Sequelize = require('sequelize');
const log4js = require('log4js');
const express = require('express');

const router = new express.Router();

const status = {};

log4js.configure({
  appenders: {cheese: { type: 'file', filename: './src-server/logs/log4js.log'} },
  categories: { default: { appenders: ['cheese'], level: 'error'}}
});

const logger = log4js.getLogger('cheese');

const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'mysql', operatorsAliases: 0, logging: false});

const connectStatus = sequelize.authenticate().then(function(){
    console.log('Connected Successfully!');
    logger.error('Connected Successfully!');
    status.success = 'Connected Successfully!';
}).catch(function(e) {
    console.log({error: 'Error', e});
    logger.error(e);
    status.error = 'Error!';
});

router.get('/connection', (req, res) => {
    res.send(status);
})

module.exports = {sequelize, router};
global.sequelize = sequelize;