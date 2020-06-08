const Text = require('../models/Text');
const File = require('../models/File');
const moment = require('moment');

const auth = async (req, res, next) => {
    try {
        const keycode = req.body.keycode;
        
        if (!keycode) return res.send({error: 'Please enter a valid access key!'});

        let textFile;
        if (req.body.request === "text") {
            // It's a text:
            // Search for the text:
            textFile = await Text.findOne({keycode: req.body.keycode});
    
            // If no text found:
            if (!textFile) return res.status(404).send({error: 'No text found!'});
    
            // Else :-
            req.text = textFile;

            // Set Timestamps:-
            const timestamp = parseInt(textFile.deleteTime);
            const timeData = moment(timestamp * 1000).format('YYYY-MM-DD - hh:mm a')
            req.expiresOn = timeData;
        } else if (req.body.request === 'file') {
            textFile = await File.findOne({keycode: req.body.keycode});

            // If no file found:-
            if (!textFile) return res.status(404).send({error: 'No file found!'});

            req.yourFile = textFile;

            // Set timestamps:
            const timestamp = parseInt(textFile.deleteTime);
            const timeData = moment(timestamp * 1000).format('YYYY-MM-DD - hh:mm a')
            req.expiresOn = timeData;
        }

        next();
    } catch (e) {
        res.status(500).send({error: 'Error from auth middleware', e})
    }
};

module.exports = auth;