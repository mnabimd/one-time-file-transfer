const Sequelize = require('sequelize');
const {sequelize} = require('../db/connection');

const File = sequelize.define("files", {
    id: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    keycode: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        trim: true
    },
    pin: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        trim: true
    },
    deleteTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        trim: true
    },
    fileInfo: {
        type: Sequelize.TEXT
    }
})

module.exports = File;