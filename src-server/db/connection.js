const Sequelize = require('sequelize');
const log4js = require('log4js');
const express = require('express');
const logger = require('../logger/log');

const router = new express.Router();

const sequelize =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'mysql', operatorsAliases: 0, logging: false});

const connectStatus = sequelize.authenticate().then(function(){
    console.log('Connected Successfully!');
    logger.trace('Connected Successfully!')
}).catch(function(e) {
    console.log({error: 'Error', e});
    logger.error({error: 'Error', e});
});

router.get('/connection', (req, res) => {
    res.send(status);
})

module.exports = {sequelize, router};
global.sequelize = sequelize;