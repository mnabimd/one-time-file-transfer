const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    keycode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    deleteTime: {
        type: Number,
        required: true,
        trim: true
    },
    fileInfo: {
        type: JSON,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const File = mongoose.model('file', fileSchema);

module.exports = File;