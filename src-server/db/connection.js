const Sequelize = require('sequelize');

// 1. DB_NAME 2. DB-USERNAME 3. DB_PASSWORD 4. DB_HOST
const sequelize =  new Sequelize('mnabimd_transfer_api', 'mnabimd_mnabimd', 'Afghan321', { 
    host: 'mnabi.heliohost.org', 
    dialect: 'mysql', 
    operatorsAliases: 0, 
    logging: false, 
    dialectModule: require('mysql2')
});

const connectStatus = sequelize.authenticate().then(function(){
    console.log('Connected Successfully!');
}).catch(function(e) {
    console.log({error: 'Error', e});
});

module.exports = {sequelize};
global.sequelize = sequelize;