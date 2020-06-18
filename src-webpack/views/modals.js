const { elements } = require('./base');

const copyText = (textArea) => {
    textArea.select();
    document.execCommand('copy');

    elements.textCopiedTextarea.textContent = 'Text has been copied to the clipboard!';
}

const showTextFileModal = (data) => {
    if (!data.attachment.text) {
        // File Modal

        console.log('Hi')
        return false;
    }

    // Else this is Text Modal
    // 1. Erase Previous Functions and Events:
    elements.textCopiedTextarea.innerText = '';

    // Paste Data.attachment.text into the textarea:-
    elements.textModalTextarea.value = data.attachment.text;

    elements.textModalBtn.click();
};


module.exports = {
    showTextFileModal,
    copyText
}