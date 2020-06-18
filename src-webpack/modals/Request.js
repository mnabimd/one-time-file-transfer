const axios = require('axios');

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

        const data = await axios.post(`http://localhost:3000/${uploadType}-upload`, fileTextData, {
            headers: {
                'Content-Type': uploadType === 'text' ? 'application/json' : 'multipart/form-data'
            }
        });

        return data
    } catch (e) {
        return {
            e
        }
    }
};

const makeDownloadRequest = async (data) => {
    let obj = data;

    try {
        const data = await axios({
            method: 'post',
            url: 'http://localhost:3000/download-info',
            data: obj
        });

        return data;
    } catch (e) {
        return {
            e
        }
    }
}

module.exports = {
    makeUploadRequest,
    makeDownloadRequest
}