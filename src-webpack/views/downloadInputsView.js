const { elements } = require('./base');

const getAccesskey = () => {
    const keycode = elements.accessKeyInput.value;
    const request = elements.downloadTypeSelected.textContent.toLowerCase();

    
    // First Validation!
    if (!keycode) {
        elements.accessKeyValidationMsg.textContent = 'Please provide your accesskey to download your file!'

        return false;
    }

    return {
        keycode, request
    }
};


const disableElement = (element, falseOrTrue) => {
    element.disabled = falseOrTrue;
}

module.exports = {
    getAccesskey,
    disableElement
}