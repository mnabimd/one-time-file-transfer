const {
    elements
} = require('./base');

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
        elements.fileDownload.href = `http://localhost:3000${data.downloadLink}`;
        elements.fileExpiry.children[0].textContent = data.expiresOn;

        elements.fileModalBtn.click();
        return false;
    }

    // Else this is Text Modal
    // 1. Erase Previous Functions and Events:
    elements.textCopiedTextarea.innerText = '';

    // Paste Data.attachment.text into the textarea:-
    elements.textModalTextarea.value = data.attachment.text;
    elements.textExpiry.children[0].textContent = data.expiresOn

    // When the copy text button is clicked, copy the text area content into to the clipboard
    elements.copyTextBtn.addEventListener('click', (e) => {
        copyText(elements.textModalTextarea);
        document.execCommand('copy');
    })

    elements.textModalBtn.click();
};


module.exports = {
    showTextFileModal,
    copyText
}