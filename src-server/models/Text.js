const Sequelize = require('sequelize');
const {sequelize} = require('../db/connection');

const Text = sequelize.define("texts", {
    id: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        trim: true,
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
    }
})

module.exports = Text