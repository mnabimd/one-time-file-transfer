const Sequelize = require('sequelize');
const express = require('express');
const logger = require('../logger/log');

const router = new express.Router();

// 1. DB_NAME 2. DB-USERNAME 3. DB_PASSWORD 4. DB_HOST
const sequelize =  new Sequelize('mnabimd_transfer_api', 'mnabimd_mohammadnabi', 'Afghan321', { host: 'mnabi.heliohost.org', dialect: 'mysql', operatorsAliases: 0, logging: false});

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