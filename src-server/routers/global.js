const express = require('express');
const moment = require('moment');

const router = new express.Router();


router.get('/global', (req, res) => {

    const date = new Date();
    const dateToUTC = date.toUTCString();
    res.send({
        serverTime: {
            min: date.getMinutes(),
            hour: date.getHours(),
            minUTC: date.getUTCMinutes(),
            hourUTC: date.getUTCHours(),
            fullDate: date,
            fullDateUTC: moment(new Date(dateToUTC).toString()).format('YYYY-MM-DD - hh:mm a'),
            dateUTC: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()),
            get utcTimestamp() {
                return this.dateUTC.getTime()
            },
            get utcTimestampToString() {
                return moment(this.utcTimestamp).format('YYYY-MM-DD - hh:mm a')
            }
        }
    })
});

module.exports = router;