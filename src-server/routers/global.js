const express = require('express');

const router = new express.Router();


router.get('/global', (req, res) => {

    const date = new Date();
    res.send({
        serverTime: date
    })
});

module.exports = router;