const { elements } = require('./views/base');
const { getInputs, inputValidations } = require('./views/inputsView');
const { renameHeaderName } = require('./views/formView');
const { convertToTextOrFile } = require('./modals/DataConverter');
const Upload = require('./modals/Upload');
const { makeUploadRequest } = require('./modals/Request');

// Dragged File Header Name:-
elements.formFile.onchange = (e) => {
    // Apply The New File Name:
    renameHeaderName(e);
};

// Change Hours, Minutes, Days Dropdown TextContent When one of their instance is clicked.
const dropDownChildren = elements.formTimeType.children;
let newChildren = [];

// Return an Array of dropDown Children:
for(let i = 0; i < dropDownChildren.length; i++) {
    newChildren.push(dropDownChildren[i]);
};

// Clicks Event
newChildren.forEach(child => {
    child.onclick = (e) => {
        // If Minute, Hour or Day is clicked, it's contentText will be applied to it's parent.
        elements.formTimeBtn.textContent = e.target.textContent;
    }
});

// Text and File Dropdowns => Clear previous values:-
const textFileDropdowns = [elements.fileDropdown, elements.textDropdown];

textFileDropdowns.forEach(dropdown => {
    dropdown.onclick = (e) => {

        if (e.target.parentElement.id.split('-')[0] != 'file') {
            
            elements.formFile.value = '';
            elements.draggedFileHeader.textContent = 'Drag files here or click to upload';

            // Stop the function.
            return false;
        }

        // Default:
        elements.formText.value = '';
    }
});

// When the submit BTN is clicked:-
elements.submitBtn.addEventListener('click', async (e) => {

    // If there was any input validation, return false!
    if (!inputValidations()) return false;
    const inputValues = getInputs();

    // Here let's swift/exchange the data if it is a text or a file!
    const TextFile = convertToTextOrFile(inputValues);
    
    // Finally, let's send the HTTP request by AXIOS :- 
    let upload = new Upload(TextFile);
    // 1. Let's find out if the data is a text or a file.
    upload.textFileFinder();
    // 2. Let's send the data with HTTP request:-
    const data = await makeUploadRequest(upload);

    console.log(data)
});


console.log('Client-Side JS Loaded.')
