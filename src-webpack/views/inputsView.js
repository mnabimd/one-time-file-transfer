const { elements } = require('./base');

// This function will return the inputs' values written in UI.
const getInputs = () => {
    let values = {
        formText: elements.formText.value,
        formFile: elements.formFile.files[0],
        accessKey: elements.accessKey.value
    };

    // This function will calculate the current timestamp + the more time user elected in the input.
    const deleteTime = () => {
        const timestamp = new Date().getTime();

        const moreTime = () => {
            // This is the value written in the input:
            const formTimeInput = parseInt(elements.formTimeInput.value);
      
            // This is the hour, minutes, days value elected by the user.
            const formTimeType = elements.formTimeBtn.textContent.trim();

            let multiplier;
            if (formTimeType === 'Minutes') {
                multiplier = 60 * 1000;
            } else if (formTimeType === 'Hour') {
                multiplier = 3600 * 1000;
            } else if (formTimeType === 'Days') {
                multiplier = 86400 * 1000;
            };

            return formTimeInput * multiplier;
        };

        // Let's convert it to seconds from miliseconds.
        return (timestamp + moreTime()) / 1000;
    };

    // Add the delete Time Property!
    values.deleteTime = deleteTime();
    return values
};

const inputValidations = () => {
    // Before validations, let's clear previous validations messages!
    elements.validationMsg.textContent = '';

    const inputs = getInputs();

    if (!inputs.formText && !inputs.formFile && !inputs.accessKey) {
        elements.validationMsg.textContent = 'Please upload a text or a file with an access key!'
        return false;
    } else if (!inputs.formText && !inputs.formFile) {
        elements.validationMsg.textContent = 'Please upload a text or a file!'
    } else if (!inputs.accessKey) {
        elements.validationMsg.textContent = 'Please insert an access key!'
        return false;
    };

    // This means, everything is allright.
    return true;
}

module.exports = {
    getInputs,
    inputValidations
}