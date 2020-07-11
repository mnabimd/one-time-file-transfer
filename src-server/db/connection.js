const Sequelize = require('sequelize');
const log4js = require('log4js');
const express = require('express');
const logger = require('../logger/log');

const router = new express.Router();

const sequelize =  new Sequelize('codemfhv_nodeapps', 'codemfhv_codemfhv', '3xVhU7E-89x%', { host: 'localhost', dialect: 'mysql', operatorsAliases: 0, logging: false});

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