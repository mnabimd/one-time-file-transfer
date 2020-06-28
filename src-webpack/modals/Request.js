const axios = require('axios');
const dotEnv = require('../config/env');

// For Sending and receving some data!
const state = {
    percentage: 0
};

// If the request is a file upload, then FormData have to take care of the data (freshUpload);
const formDataForFileUpload = (freshUploadParam) => {
    var formData = new FormData();
    formData.append('keycode', freshUploadParam.keycode);
    formData.append('deleteTime', freshUploadParam.deleteTime);
    formData.append('myfile', freshUploadParam.myfile);
    
    return formData;
}

// Make an HTTP request to the API for file/text upload.
const makeUploadRequest = async (FreshUpload) => {
    let uploadType;
    if (FreshUpload.text) { uploadType = 'text' } else { uploadType = 'file'};

    try {
        // This will change the data for text or file.
        const fileTextData = uploadType === 'text' ? FreshUpload : formDataForFileUpload(FreshUpload);

        let config = {
            headers: {
                'Content-Type': uploadType === 'text' ? 'application/json' : 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                const origSize = FreshUpload.myfile.size;

                let percentage = (progressEvent.loaded / origSize) * 100;

                if (percentage >= 100) percentage = 100;

                state.percentage = percentage;
            }
        }

        // If the type is text, then we don't have file so we leave the progress bar!
        if (uploadType === 'text') delete config.onUploadProgress

        const data = await axios.post(`${dotEnv.HOST}/${uploadType}-upload`, fileTextData, config);

        return data
    } catch (e) {
        return {
            e
        }
    }
};

const getPercentUpload = () => {
    if (state.percentage === 100) state.percentage = 0;
    return state.percentage;
}

const makeDownloadRequest = async (data) => {
    let obj = data;

    try {
        const data = await axios.post(`${dotEnv.HOST}/download-info`, obj)
        return data;
    } catch (e) {
        return {
            e
        }
    }
};


const makeKeycodeRequest = async (keycode, type) => {
    try {
        const data = await axios.get(`${dotEnv.HOST}/keycode-check?type=${type}&keycode=${keycode}`);
        return {data};
    } catch (e) {
        return {e};
    }
}

module.exports = {
    makeUploadRequest,
    makeDownloadRequest,
    getPercentUpload,
    makeKeycodeRequest
}