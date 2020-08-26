const express = require('express');
const Text = require('../models/Text');
const File = require('../models/File');
const multer = require('multer');
const uniqueString = require('unique-string');
// Settings:-
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `Storage/`)
    },
    filename: function (req, file, cb) {
        const shortString = uniqueString().slice(0, 12);

        cb(null, `${shortString} -s- ${file.originalname}`)
        // A Call back Function:- Name of the file of the uploader's computer.
    }
});


const upload = multer({
    storage
});

// Settings END:)-->
const router = new express.Router();

router.post('/file-upload', upload.single('myfile'), async (req, res) => {
    try {

        var id = uniqueString().slice(0, 12);
    
        const fileInfoToArray = Object.values(req.file).join('|--|');
        const file = await File.create({
            id,
            keycode: req.body.keycode,
            deleteTime: req.body.deleteTime,
            fileInfo: fileInfoToArray,
            pin: req.body.pin
        });

        await file.save();

        res.send({
            file,
            status: 'Your file has been uploaded successfully!'
        })
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
})

router.post('/text-upload', async (req, res) => {
    try {
        var id = uniqueString().slice(0, 12);

        const text = await Text.create({id, ...req.body});
        
        res.status(200).send({
            text,
            status: 'Your text has been uploaded successfully!'
        });
    } catch (e) {
        res.status(400).send({e, data: {id, ...req.body}})
    }
})

module.exports = router;