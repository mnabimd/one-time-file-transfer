const express = require('express');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/download-info', auth, async (req, res) => {
    // Validations are done by the (auth) middleware.

    res.send({
        attachment: req.text || req.yourFile,
        expiresOn: req.expiresOn
    })
});


router.get('/download/:mixedName', async (req, res) => {
    const fileName = req.params.mixedName;
    const originalFileName = fileName.split('-s-')[1];

    res.download(`Storage/${fileName}`, originalFileName, (err) => {
        if (err) {
            res.status(404).send({err, error: 'File Not Found!'})
        }
    });
});

module.exports = router