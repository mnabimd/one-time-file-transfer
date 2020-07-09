const express = require('express');
const Text = require('../models/Text');
const File = require('../models/File');

const router = new express.Router();

// This route will check if the given keycode is taken or not before sending the request:-
router.get('/keycode-check', async (req, res) => {
    const {type, keycode} = req.query;

    if (!keycode) {
        res.status(200).send('Insert an access key!');
    };

    const TextFile = type === 'file' ? File : Text;

    const recKeycode = await TextFile.findOne({
        where: {
            keycode
        }
    });

    if (!recKeycode) return res.status(200).send('Available!');

    res.status(200).send('Not Available!')
});

module.exports = router;