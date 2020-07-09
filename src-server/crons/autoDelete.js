const File = require('../models/File');
const Text = require('../models/Text');
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const {Op} = require('sequelize');

const storagePath = path.join(__dirname, '../../Storage');
// New timestamps:-
const newTimestamp = () => new Date().getTime() / 1000;

// Delete Texts
const deleteText = async () => {
    const text = await Text.destroy({
        where: {
            deleteTime: {
                [Op.lt]: newTimestamp()
            }
        }
    })
};

// Delete Files
const deleteFiles = async () => {
    // Find Files' FileInfo -> filename:-
    const files = await File.findAll({
        where: {
            deleteTime: {
                [Op.lt]: newTimestamp()
            }
        }
    });

    // Let's convert each (file)'fileInfo to a real Obj:
    files.forEach(file => {
        delete file.fileInfo;

        const fileInfoArray = file.fileInfo.split('|--|');
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

        file.fileInfo = fileInfo;
    });

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
        // console.log(file, file.prototype)
        await file.destroy();
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