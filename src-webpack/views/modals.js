const {
    elements
} = require('./base');
const dotEnv = require('../config/env');
const moment = require('moment');

const copyText = (textArea) => {
    textArea.select();
    document.execCommand('copy');

    elements.textCopiedTextarea.textContent = 'Text has been copied to the clipboard!';
};

const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 };

const showTextFileModal = (data) => {
    if (!data.attachment.text) {
        // File Modal

        // File name to the modal:-
        elements.modalFilename.innerHTML = `${data.attachment.fileInfo.originalname.toUpperCase()} <small class="text-muted" style="font-size: 12px">${bytesToSize(data.attachment.fileInfo.size)}</small>`;
        elements.fileDownload.href = `${dotEnv.HOST}/${data.downloadLink}`;

        const date = new Date(data.expiresOn);
        const time = moment(date).format('YYYY-MM-DD - hh:mm a')

        elements.fileExpiry.children[0].textContent = time;

        elements.fileModalBtn.click();
        return false;
    }

    // Else this is Text Modal
    // 1. Erase Previous Functions and Events:
    elements.textCopiedTextarea.innerText = '';

    // Paste Data.attachment.text into the textarea:-
    elements.textModalTextarea.value = data.attachment.text;
    const time = moment(data.expiresOn).format('YYYY-MM-DD - hh:mm a');
    elements.textExpiry.children[0].textContent = time

    // When the copy text button is clicked, copy the text area content into to the clipboard
    elements.copyTextBtn.addEventListener('click', (e) => {
        copyText(elements.textModalTextarea);
        document.execCommand('copy');
    })

    elements.textModalBtn.click();
};

const responseMessage = (data) => {
    return data.data.status
}

module.exports = {
    showTextFileModal,
    copyText,
    responseMessage
}