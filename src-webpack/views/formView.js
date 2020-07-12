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
    progressBar.style.width = '0%';
}

const updateProgressbar = (percent) => {

    const interval = setInterval(function() {
        let percentage = parseInt(percent());
        
        if (percentage >= 100) percentage = 99;
        
        const progressbar = document.getElementById('progress-bar-upload');
        if (progressbar.getAttribute('complete') === 'no')  {
            progressbar.style.width = `${percentage}%`;
            progressbar.innerText = `${percentage}%`;
        } else {
            clearInterval(interval);
        }

    }, 100);

};

const deleteProgressbar = () => {
    const accessGroup = Array.from(document.getElementsByClassName('access-group')[0].children);
    
    // Search Children and find Progressbar:-
    const progressBar = accessGroup.filter(child => {
        return child.className === 'progress'
    });

    // Meaning that there is an elemnt with a class list!
    if (progressBar.length != 0) {
        const progress = document.getElementById('progress-bar-upload').parentElement;
        progress.remove()
    }
    
}

module.exports = {
    renameHeaderName,
    updateProgressbar,
    renderProgressbar,
    successProgressbar,
    resetProgressbar,
    deleteProgressbar
}