const Text = require('../models/Text');
const File = require('../models/File');

const auth = async (req, res, next) => {
    try {
        const keycode = req.body.keycode;
        const pin = req.body.pin;
        
        if (!keycode) return res.status(400).send({error: 'Please enter a valid access key!'});
        if (!pin) return res.status(400).send({error: 'Please enter a valid PIN code!'});

        let textFile;
        if (req.body.request === "text") {
            // It's a text:
            // Search for the text:
            textFile = await Text.findOne({
                where: {
                    keycode: req.body.keycode,
                    pin: req.body.pin
                }
            });
    
            // If no text found:
            if (!textFile) return res.status(404).send({error: 'No text found!'});
            // Else :-
            req.text = textFile;

            // Set Timestamps:-
            const timestamp = parseInt(textFile.deleteTime) * 1000;

            req.expiresOn = timestamp;
        } else if (req.body.request === 'file') {
            textFile = await File.findOne({
                where: {
                    keycode: req.body.keycode,
                    pin: req.body.pin
                }
            });

            // If no file found:-
            if (!textFile) return res.status(404).send({error: 'No file found!'});

            // Let's convert fileInfo Array to Obj:
            const fileInfoArray = textFile.fileInfo.split('|--|');
            const fileInfo = {
                fieldname: fileInfoArray[0],
                originalname: fileInfoArray[1],
                encoding: fileInfoArray[2],
                mimetype: fileInfoArray[3],
                destination: fileInfoArray[4],
                filename: fileInfoArray[5],
                path: fileInfoArray[6],
                size: fileInfoArray[7]
            };
            
            // Let's delete fileInfoArray from textFile;
            delete textFile.fileInfo;
            textFile.fileInfo = fileInfo;

            req.yourFile = textFile;

            // Set timestamps:
            const timestamp = parseInt(textFile.deleteTime) * 1000;

            req.expiresOn = timestamp;
        }

        next();
    } catch (e) {
        res.status(500).send({error: 'Error from auth middleware', e});
    }
};

module.exports = auth;