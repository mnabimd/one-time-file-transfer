const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
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
    }
}, {
    timestamps: true
});

// textSchema.methods.toJSON = function() {
//     const text = this;
//     // Text is a JSON object rightnow. Let's convert it to real object.
//     const textObj = text.toObject();
//     delete textObj.keycode;

//     return textObj;
// }

const Text = mongoose.model('text', textSchema);

module.exports = Text