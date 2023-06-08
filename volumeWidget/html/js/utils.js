document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function (inputField) {
        inputField.addEventListener('blur', function () {
            if (inputField.value === '') {
                inputField.value = inputField.getAttribute('data-default');
            }
        });
        inputField.setAttribute('data-default', inputField.value);
        addTitleToNumberFields();
    });
});

function addTitleToNumberFields() {
    //used by: DOMContentLoaded listener, 
    var unitSelect_L = document.getElementById("lengthUnits");
    var selectedUnits_L = unitSelect_L.options[unitSelect_L.selectedIndex].value;
    var unitSelect_V = document.getElementById("volumeUnits");
    var selectedUnits_V = unitSelect_V.options[unitSelect_V.selectedIndex].value;
    // Get all number fields in the form
    var numberFields = document.querySelectorAll("input[type='number']");
  
    // Iterate through each number field
    numberFields.forEach(function(field) {
        if (field.getAttribute("id") === "targetVolume") {
            var updatedTitle = selectedUnits_V;
            // Set the updated title attribute
            field.setAttribute("title", updatedTitle);
        } else {
            var updatedTitle = selectedUnits_L;
            // Set the updated title attribute
            field.setAttribute("title", updatedTitle);
        } 
    });
}

function toggleAdvanced() {
    logToPython("toggle advanced");
    var items = document.getElementsByClassName("advanced");
    
    // Toggle the display of elements and set window size
    var newSize;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.style.display === "none") {
            item.style.display = ""; // Set to default display value
            newSize = "large";
        } else {
            item.style.display = "none";
            newSize = "small";
        }
    }
    
    setWindowSize(newSize);
}

function setWindowSize(value) {
    //used by: toggleAdvanced
    pywebview.api.set_Window_Size(value);
}

//used by: calculateTarget, lock
var lockLength = false;
var lockWidth = false;
var lockHeight = false;
var locked = 0;

function lock(event) {
    //used by: ?
    var buttonId = event.target.id;

    length = document.getElementById("length");
    lengthModifier = document.getElementById("lengthModifier");
    lengthButton = document.getElementById("commitLength");
    

    width = document.getElementById("width");
    widthModifier = document.getElementById("widthModifier");
    widthButton = document.getElementById("commitWidth");
    

    height = document.getElementById("height");
    heightModifier = document.getElementById("heightModifier");
    heightButton = document.getElementById("commitHeight");
    

    if (buttonId === "lockLength" && lockLength === false) {
        lockLength = true;
        //length.disabled = true;
        lengthModifier.disabled = true;
        lengthButton.disabled = true;
        locked++;
    } else if (buttonId === "lockLength" && lockLength === true) {
        lockLength = false;
        //length.disabled = false;
        lengthModifier.disabled = false;
        lengthButton.disabled = false;
        locked--;
    } else if (buttonId === "lockWidth" && lockWidth === false) {
        lockWidth = true;
        //width.disabled = true;
        widthModifier.disabled = true;
        widthButton.disabled = true;
        locked++;
    } else if (buttonId === "lockWidth" && lockWidth === true) {
        lockWidth = false;
        //width.disabled = false;
        widthModifier.disabled = false;
        widthButton.disabled = false;
        locked--;
    } else if (buttonId === "lockHeight" && lockHeight === false) {
        lockHeight = true;
        //height.disabled = true;
        heightModifier.disabled = true;
        heightButton.disabled = true;
        locked++;
    } else if (buttonId === "lockHeight" && lockHeight === true) {
        lockHeight = false;
        //height.disabled = false;
        heightModifier.disabled = false;
        heightButton.disabled = false;
        locked--;
    }

    var targetButton = document.getElementById("targetButton");
    if (locked == 3) {
        targetButton.disabled = true;
    } else if (locked < 3) {
        targetButton.disabled = false;
    }
}

function serializeInputValues() {
    //used by: ?
    // Get the input values
    var project_name = document.getElementById("project").value;
    if (project_name == "") {
        showAlert();
        return;
    }
    var unit_l = document.getElementById("lengthUnits").value;
    var l = parseFloat(document.getElementById("length").value);
    var w = parseFloat(document.getElementById("width").value);
    var h = parseFloat(document.getElementById("height").value);
    var ml = parseFloat(document.getElementById("lengthModifier").value);
    var mw = parseFloat(document.getElementById("widthModifier").value);
    var mh = parseFloat(document.getElementById("heightModifier").value);
    var unit_v = document.getElementById("volumeUnits").value;
    var tv = document.getElementById("targetVolume").value;
    var ll = document.getElementById("lockLength").checked;
    var lw = document.getElementById("lockWidth").checked;
    var lh = document.getElementById("lockHeight").checked;
    var aot = document.getElementById("alwaysOnTop").checked;
    var at = document.getElementById("advancedToggle").checked;
    // Save the input values as a JSON object
    var inputValues = {
        project: project_name,
        dimensionUnits: unit_l,
        length: l,
        width: w,
        height: h,
        lengthModifier: ml,
        widthModifier: mw,
        heightModifier: mh,
        volumeUnits: unit_v,
        targetVolume: tv,
        lockLength: ll, 
        lockWidth: lw, 
        lockHeight: lh, 
        alwaysOnTop: aot,
        advancedToggle: at
    };

    // Convert the JSON object to a string
    var inputValuesString = JSON.stringify(inputValues);
    //console.log(inputValuesString);
    // Call the Python function and pass the JSON string
    saveInputValues(inputValuesString);
}

function saveInputValues(data) {
    //used by: serializeInputValues
    pywebview.api.save_json(data)
}

function loadInputValues() {
    //used by: ?
    var input_element = document.getElementById('project');
    var selected_value = input_element.value;
    pywebview.api.load_json(selected_value)
    //logToPython(selected_value);
    //logToPython("Called Load!");
}

function validateFilename(input) {
    //used by: ?
    var filenameInput = input;

    filenameInput.addEventListener('keypress', function (event) {
        var charCode = event.which || event.keyCode;
        var charTyped = String.fromCharCode(charCode);

        // Regular expression to validate the input
        var allowedRegex = /^[a-zA-Z0-9_. -]+$/;

        if (!allowedRegex.test(charTyped)) {
            event.preventDefault();
        }
    });
}

function showConfirmation() {
    //used by: ?
    var confirmationDialog = document.getElementById("confirmation-dialog");
    confirmationDialog.style.display = "block";
}

function hideConfirmation() {
    //used by: performAction
    var confirmationDialog = document.getElementById("confirmation-dialog");
    confirmationDialog.style.display = "none";
}



function performAction() {
    //used by: ?
    hideConfirmation();
    var input_element = document.getElementById('project');
    var selected_value = input_element.value;
    pywebview.api.delete_json(selected_value);
    input_element.value = "";
}

function showAlert() {
    //used by: ?
    var alertDialog = document.getElementById("alert-dialog");
    alertDialog.style.display = "block";
}

function hideAlert() {
    //used by: ?
    var alertDialog = document.getElementById("alert-dialog");
    alertDialog.style.display = "none";
}

function clearField() {
    //used by: ?
    var textField = document.getElementById("project");
    textField.value = "";
    
    //hacky but refreshes the list
    textField.blur();
    textField.focus();
}

function toggleOnTop() {
    //used by: ?
    pywebview.api.toggle_Top();
}