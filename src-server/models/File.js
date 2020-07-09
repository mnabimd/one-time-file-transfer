// const mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//     keycode: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true
//     },
//     deleteTime: {
//         type: Number,
//         required: true,
//         trim: true
//     },
//     fileInfo: {
//         type: JSON,
//         required: true,
//         trim: true
//     }
// }, {
//     timestamps: true
// });

// const File = mongoose.model('file', fileSchema);
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const File = sequelize.define("File", {
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