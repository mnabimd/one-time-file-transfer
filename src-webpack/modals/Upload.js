class Upload {
    constructor(textFile){
        this.keycode = textFile.keycode;
        this.deleteTime = textFile.deleteTime;
        this.pin = textFile.pin

        // This value will be deleted since there is no need for it after finding if it is a file or text
        this.attachment = textFile;
    };

    textFileFinder() {
        if (this.attachment.text) {
            this.text = this.attachment.text
        } else {
            this.myfile = this.attachment.myfile
        };

        // The attachment is back removed!
        delete this.attachment;

    };

}

module.exports = Upload;