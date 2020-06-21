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

const renderProgressbar = (element) => {

    const progressBar = document.getElementById('progress-bar-upload');

    if (progressBar) return false;

    const markup =  `
        <div class="progress">
            <div id="progress-bar-upload" complete="no" class="progress-bar" role="progressbar"
             aria-valuemin="0" aria-valuemax="100">0%</div>
        </div>    
    `;

    element.insertAdjacentHTML('beforebegin', markup);
};

const successProgressbar = () => {
    const progressBar = document.getElementById('progress-bar-upload');
    progressBar.classList = 'progress-bar bg-success';
    progressBar.setAttribute('complete', 'yes');
    progressBar.innerText = '100%';
    progressBar.style.width = '100%';
}

const resetProgressbar = () => {
    const progressBar = document.getElementById('progress-bar-upload');

    if (!progressBar) return false;
    progressBar.classList = 'progress-bar'

    progressBar.setAttribute('complete', 'no');
    progressBar.innerText = '0%';
    progressBar.style.width = '%';
}

const updateProgressbar = (percent) => {

    const interval = setInterval(function() {
        let percentage = parseInt(percent());
        console.log(percentage)
        
        if (percentage >= 100) percentage = 100;
        
        const progressbar = document.getElementById('progress-bar-upload');
        console.log(progressbar.getAttribute('complete'))
        if (progressbar.getAttribute('complete') === 'no')  {
            progressbar.style.width = `${percentage}%`;
            progressbar.innerText = `${percentage}%`;
        } else {
            clearInterval(interval);
        }

    }, 100);

};


module.exports = {
    renameHeaderName,
    updateProgressbar,
    renderProgressbar,
    successProgressbar,
    resetProgressbar
}