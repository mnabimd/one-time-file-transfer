const express = require('express');

const router = new express.Router();


router.get('/global', (req, res) => {

    const date = new Date();
    res.send({
        serverTime: {
            min: date.getMinutes(),
            minUTC: date.getUTCMinutes(),
            hour: date.getHours(),
            hourUTC: date.getUTCHours()
        }
    })
});

module.exports = router;