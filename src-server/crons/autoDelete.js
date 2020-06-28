const File = require('../models/File');
const Text = require('../models/Text');
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;

const storagePath = path.join(__dirname, '../../Storage');
// New timestamps:-
const newTimestamp = () => new Date().getTime() / 1000;

// Delete Texts
const deleteText = async () => {
    const text = await Text.deleteMany({deleteTime: { $lt: newTimestamp() }});
};

// Delete Files
const deleteFiles = async () => {
    // Find Files' FileInfo -> filename:-
    const files = await File.find({deleteTime: { $lt :newTimestamp() }});

    // If no file found stop:-
    if (files.length === 0) return false;
    
    // Operations on each return file:-
    files.forEach(async file => {
        const filename = file.fileInfo.filename;
        
        // Delete their file source on Storage:-
        fs.unlink(`${storagePath}/${filename}`, (e) => {
            if (e) console.log(e);
        });

        // Now remove it:-
        await file.remove();
    });
};

// Set Cron Job:-
let job = new CronJob('20/5 * * * * *', async function() {
    deleteText();
    deleteFiles();
}, null, true, 'America/Los_Angeles');

module.exports = { 
    job
}