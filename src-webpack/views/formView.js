const {
    elements
} = require('./base');

//  Rename Header when a file is added to header:-
const renameHeaderName = function (e) {
    var fullPath = e.target.value;

    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }

        elements.draggedFileHeader.textContent = filename;

        return filename;
    }
};

module.exports = {
    renameHeaderName
}