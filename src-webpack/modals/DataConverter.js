const convertToTextOrFile = (obj) => {
    let newObj = {
        keycode: obj.accessKey,
        deleteTime: obj.deleteTime,
    };

    if (!obj.formText) {
        newObj.myfile = obj.formFile
    } else {
        newObj.text = obj.formText
    }
    return newObj
};

module.exports = {
    convertToTextOrFile
}