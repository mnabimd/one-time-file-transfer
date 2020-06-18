const {
    elements
} = require('./base');

const textApplier = (elementNameToShowOn, className, text) => {

    const element = elementNameToShowOn;

    if (className) {
        element.classList = className;
    }

    if (text) {
        element.innerText = text;
    } else {
        element.innerText = '';
    }
};

module.exports = {
    textApplier
}