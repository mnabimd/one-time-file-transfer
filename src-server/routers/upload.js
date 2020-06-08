const express = require('express');
const Text = require('../models/Text');
const File = require('../models/File');
const multer = require('multer');

// Settings:-
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `Storage/`)
    },
    filename: function (req, file, cb) {
        let timestamp, minutes;
        timestamp = new Date().getTime();
        minutes = Math.floor((timestamp / 1000) / 1000); 

        cb(null, `${minutes}-s-${file.originalname}`)
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
       const file = new File({
           keycode: req.body.keycode,
           deleteTime: req.body.deleteTime,
           fileInfo: req.file
       });

       await file.save();
    
        res.send({
            file
        })
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
})

router.post('/text-upload', async (req, res) => {
    try {
        const text = new Text(req.body);
    
        await text.save();
        res.status(200).send(text);
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;