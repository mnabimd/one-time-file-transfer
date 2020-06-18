const { elements } = require('../views/base');
const { textApplier } = require('../views/utils');

const dataValidator = (responseFromServer) => {
    // Data and Errors
    const data = responseFromServer.data || responseFromServer.e.response.data;

    // If Error Found! 
    if (data.error) {
        textApplier(elements.accessKeyValidationMsg, 'text-danger', data.error);

        return false;
    }

    return data;

};


module.exports = {
    dataValidator
}