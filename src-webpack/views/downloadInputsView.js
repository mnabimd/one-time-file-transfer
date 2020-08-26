const { elements } = require('./base');

const getAccesskey = () => {
    const keycode = elements.accessKeyInput.value;
    const request = elements.downloadTypeSelected.textContent.toLowerCase();
    const pin = elements.downloadPIN.value

    // First Validation!
    if (!keycode || !pin) {
        elements.accessKeyValidationMsg.innerHTML = 'Please provide your <span class="font-weight-bold text-dark">KEY</span> & <span class="font-weight-bold text-dark">PIN</span> to download your file!'
        elements.accessKeyValidationMsg.classList.remove('text-muted');
        elements.accessKeyValidationMsg.classList.add('text-danger');

        return false;
    }

    return {
        keycode, request, pin
    }
};


const disableElement = (element, falseOrTrue) => {
    element.disabled = falseOrTrue;
}

module.exports = {
    getAccesskey,
    disableElement
}