const { elements } = require('./views/base');
const { getInputs, inputValidations, keycodeValidations } = require('./views/inputsView');
const { getAccesskey, disableElement } = require('./views/downloadInputsView');
const { renameHeaderName, renderProgressbar, updateProgressbar, successProgressbar, resetProgressbar, deleteProgressbar } = require('./views/formView');
const { convertToTextOrFile } = require('./modals/DataConverter');
const Upload = require('./modals/Upload');
const { makeUploadRequest, makeDownloadRequest, getPercentUpload } = require('./modals/Request');
const { textApplier } = require('./views/utils');
const { dataValidator } = require('./modals/DataValidator');
const { showTextFileModal, responseMessage } = require('./views/modals');
// Dragged File Header Name:-
elements.formFile.onchange = (e) => {
    // Apply The New File Name:
    renameHeaderName(e);
};

// Change Hours, Minutes, Days Dropdown TextContent When one of their instance is clicked.
const dropDownChildren = elements.formTimeType.children;
let newChildren = Array.from(dropDownChildren);

// Clicks Event
newChildren.forEach(child => {
    child.onclick = (e) => {
        // If Minute, Hour or Day is clicked, it's contentText will be applied to it's parent.
        elements.formTimeBtn.textContent = e.target.textContent;
        elements.tempType.textContent = `${e.target.textContent.toLowerCase()}/s`
    }
});

// FormTimeInput onchange :-
elements.formTimeInput.onchange = e => {
    elements.tempNumber.textContent = e.target.value;
    console.log(e.target)
}

// Text and File Dropdowns => Clear previous values:-
const textFileDropdowns = [elements.fileDropdown, elements.textDropdown];

textFileDropdowns.forEach(dropdown => {
    dropdown.onclick = (e) => {

        // If file dropdown was not clicked, meaning text was clicked, that means File has to be cleared.
        if (e.target.parentElement.id.split('-')[0] != 'file') {
            
            elements.formFile.value = '';
            elements.draggedFileHeader.textContent = 'Drag files here or click to upload';
            elements.accessKey.value = '';
            elements.accessKey.click();
            deleteProgressbar();
            textApplier(elements.validationMsg, 'text-muted');

            // Stop the function.
            return false;
        }

        // Default:
        elements.formText.value = '';
        elements.accessKey.value = '';
        elements.accessKey.click();
    };
});

// Keycode Check:-
const events = ['keyup', 'click'];
events.forEach(event => {
    elements.accessKey.addEventListener(event, keycodeValidations);
});

// When the submit BTN (Upload) is clicked:-
elements.submitBtn.addEventListener('click', async (e) => {
    // Reset Access key value:

    // Remove the progress first!
    resetProgressbar();

    // If there was any input validation, return false!
    if (!inputValidations()) return false;
    const inputValues = getInputs();

    // Here let's swift/exchange the data if it is a text or a file!
    const TextFile = convertToTextOrFile(inputValues);
    
    // Finally, let's create the correct Obj Data for AXIOS :- 
    let upload = new Upload(TextFile);
    // 1. Let's find out if the data is a text or a file.
    upload.textFileFinder();

    // Uploading a file? Let's show a loader:- 

    if (upload.myfile) {
        // 2. Show Loader For File Uploads and Disable the Upload Button:-
        //  1> Disable Upload Button:
        disableElement(e.target, true);
        //  2> Render Progress Bar
        renderProgressbar(e.target);
        //  3> Update the percentage each 100ms:-
        // Note: getPercentUpload is a function, and it will be called each 100ms later in updatProgressbar in order to get the real-time percentage number.
        
        updateProgressbar(getPercentUpload);
    }
    
    // 3. Let's send the data with HTTP request by AXIOS:-
    const data = await makeUploadRequest(upload);

    if (upload.myfile) {
        // Data/Response recieved? Enable The Upload Button and remove progress bar:-
        disableElement(e.target, false);
        successProgressbar();
    };
    
    // Delete The Accesskey written in the input.
    elements.accessKey.value = '';
    textApplier(elements.validationMsg, 'text-muted', responseMessage(data));

});


const downloadDropdowns = Array.from(elements.formDownloadType.children);

downloadDropdowns.forEach(dropdown => {
    dropdown.onclick = (e) => {
        elements.downloadTypeSelected.textContent = e.target.textContent;
        elements.formDownloadDropdownBtn.textContent = e.target.textContent;
    }
})


// When the download btn is clicked and an accesskey is givin :-
elements.accessKeyDwnBtn.addEventListener('click', async (e) => {
    // Before Everything, reset every validation messages:-
    textApplier(elements.accessKeyValidationMsg, 'text-muted');
    // Get the value if no value provided then the function will automatically do validations.
    const key = getAccesskey();
    if (!key) return false;

    // Provide the object with nesessary data such as: keycode and request type :-
    const accesskeyWithRequest = getAccesskey();

    // Let's send the HTTP Get request:-
    const response = await makeDownloadRequest(accesskeyWithRequest);

    // Validate The Data:- Check if error is recieved or a repsone(data);
    const data = dataValidator(response);
    if (!data) return false;

    console.log(data)
    showTextFileModal(data);

});

console.log('Client-Side JS Loaded.')
