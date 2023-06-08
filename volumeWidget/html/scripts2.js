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

const mm3_to_m3 = 1000000000;
const mm3_to_liters = 1000000;
const mm3_to_cm3 = 1000;
const mm3_to_in3 = 16387.1;
const mm3_to_gallons = 3785411.7954;

function convertToMm(value, selectedUnits) {
    //used by: calculateDimensions, calculateTarget
    if (selectedUnits == "mm") {
        return value;
    } else if (selectedUnits == "cm") {
        return value * 10; // Convert cm to mm
    } else if (selectedUnits == "in") {
        return value * 25.4; // Convert inches to mm
    } else {
        // Invalid unit, return the original value
        return value;
    }
}

function convertToMm3(value, selectedUnits) {
    //used by: calculateDimensions, calculateTarget
    if (selectedUnits == "mm3") {
        return value;
    } else if (selectedUnits == "cm3") {
        return value * mm3_to_cm3; // Convert cm3 to mm3
    } else if (selectedUnits == "liters") {
        return value * mm3_to_liters; // Convert liters to mm3
    } else if (selectedUnits == "in3") {
        return value * mm3_to_in3; // Convert in3 to mm3
    } else if (selectedUnits == "gallons") {
        return value * mm3_to_gallons; // Convert gallons to mm3
    } else if (selectedUnits == "m3") {
        return value * mm3_to_m3; // Convert m3 to mm3
    } else {
        // Invalid unit, return the original value
        return value;
    }
}

function grabfields() {
    //used by: Commit, calculateDimensions, calculateTarget
    // Get the input values
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var lengthModifier = parseFloat(document.getElementById("lengthModifier").value);
    var widthModifier = parseFloat(document.getElementById("widthModifier").value);
    var heightModifier = parseFloat(document.getElementById("heightModifier").value);
    var targetVolume = parseFloat(document.getElementById("targetVolume").value);
    // Return the values as a dictionary
    return {
        length: length,
        width: width,
        height: height,
        lengthModifier: lengthModifier,
        widthModifier: widthModifier,
        heightModifier: heightModifier,
        targetVolume: targetVolume,
    };
}

function convertToPreferedArea(value, preferredUnits) {
    //used by: calculateDimensions
    logToPython("Converting Area!");
    if (preferredUnits == "mm") {
        return value;
    } else if (preferredUnits == "cm") {
        return value / 100; 
    } else if (preferredUnits == "in") {
        return value / 645.16; 
    } else {
        // Invalid unit, return the original value
        logToPython("Invalid Unit");
        return value;
    }
}

function convertToPreferredVolume(value, preferredUnits) {
    logToPython("Converting Volume!");
    if (preferredUnits == "mm³") {
        return value;
    } else if (preferredUnits == "cm³") {
        return value / mm3_to_cm3; // Convert mm³ to cm³
    } else if (preferredUnits == "liters") {
        return value / mm3_to_liters; // Convert mm³ to liters
    } else if (preferredUnits == "in³") {
        return value / mm3_to_in3; // Convert mm³ to cubic inches
    } else if (preferredUnits == "gallons") {
        return value / mm3_to_gallons; // Convert mm³ to gallons
    } else if (preferredUnits == "m³") {
        return value / mm3_to_m3; // Convert mm³ to m³
    } else {
        // Invalid unit, return the original value
        logToPython("Invalid Unit");
        return value;
    }
}

function calculateDimensions() {
    //used by: calculateTarget, 
    // Call the grabfields() function and store the result in a variable
    logToPython("Calculations Called!");
    var dimensions = grabfields();
    // Convert to base length units, mm for consistency
    var unitSelect_L = document.getElementById("lengthUnits");
    var selectedUnits_L = unitSelect_L.options[unitSelect_L.selectedIndex].value;
    // Use the returned dictionary to perform calculations or access the values
    var length = convertToMm(dimensions.length, selectedUnits_L);
    var width = convertToMm(dimensions.width, selectedUnits_L);
    var height = convertToMm(dimensions.height, selectedUnits_L);
    var lengthModifier = convertToMm(dimensions.lengthModifier, selectedUnits_L);
    var widthModifier = convertToMm(dimensions.widthModifier, selectedUnits_L);
    var heightModifier = convertToMm(dimensions.heightModifier, selectedUnits_L);
    logToPython("Values Grabbed!");

    // Calculate modified dimensions
    var modifiedLength = length + lengthModifier;
    var modifiedWidth = width + widthModifier;
    var modifiedHeight = height + heightModifier;
    logToPython("modified!");

    // Convert to selected volume units
    var unitSelect_V = document.getElementById("volumeUnits");
    var selectedUnits_V = unitSelect_V.options[unitSelect_V.selectedIndex].value;
    var targetVolume = convertToMm3(dimensions.targetVolume, selectedUnits_V); // Only need to convert this one to mm3
    logToPython(targetVolume);

    // Perform Calculations
    // Calculate Footprints
    var footprint = length * width;
    var modifiedFootprint = modifiedLength * modifiedWidth;

    // Convert to selected area units (derived from length)
    footprint = convertToPreferedArea(footprint, selectedUnits_L);
    modifiedFootprint = convertToPreferedArea(modifiedFootprint, selectedUnits_L);

    // Should be in mm3
    var base_volume = length * width * height;  
    var modified_volume = modifiedLength * modifiedWidth * modifiedHeight;

    var percent_target = (base_volume / targetVolume) * 100;
    var percent_target_modified = (modified_volume / targetVolume) * 100;
    logToPython("did math!");

    // Convert to Prefered
    base_volume = convertToPreferredVolume(base_volume, selectedUnits_V);
    modified_volume = convertToPreferredVolume(modified_volume, selectedUnits_V);
    logToPython("Converted to Preferred!");

    // Display the results (wip)
    const decimalPlaces = 3;
    base_volume = base_volume.toFixed(decimalPlaces);
    modified_volume = modified_volume.toFixed(decimalPlaces);
    percent_target = percent_target.toFixed(decimalPlaces);
    percent_target_modified = percent_target_modified.toFixed(decimalPlaces);

    footprint = footprint.toFixed(decimalPlaces);
    modifiedFootprint = modifiedFootprint.toFixed(decimalPlaces);

    document.getElementById("baseVolume").innerHTML = base_volume + " " + selectedUnits_V;
    document.getElementById("modifiedVolume").innerHTML = modified_volume + " " + selectedUnits_V;
    document.getElementById("percentTarget").innerHTML = percent_target + "%";
    document.getElementById("percentTarget_Modified").innerHTML = percent_target_modified + "%";
    document.getElementById("footprint").innerHTML = footprint + " " + selectedUnits_L + "²";
    document.getElementById("modifiedFootprint").innerHTML = modifiedFootprint + " " + selectedUnits_L + "²";

}

function calculateTarget() {
    //used by: ?
    logToPython("Calculating Target!");
    // Call the grabfields() function and store the result in a variable
    var dimensions = grabfields();
    // Convert to base length units, mm for consistency
    var unitSelect_L = document.getElementById("lengthUnits");
    var selectedUnits_L = unitSelect_L.options[unitSelect_L.selectedIndex].value;
    // Use the returned dictionary to perform calculations or access the values
    var length = convertToMm(dimensions.length, selectedUnits_L);
    var width = convertToMm(dimensions.width, selectedUnits_L);
    var height = convertToMm(dimensions.height, selectedUnits_L);
    var lengthModifier = convertToMm(dimensions.lengthModifier, selectedUnits_L);
    var widthModifier = convertToMm(dimensions.widthModifier, selectedUnits_L);
    var heightModifier = convertToMm(dimensions.heightModifier, selectedUnits_L);

    // Calculate modified dimensions
    var modifiedLength = length + lengthModifier;
    var modifiedWidth = width + widthModifier;
    var modifiedHeight = height + heightModifier;

    // Convert to selected volume units
    var unitSelect_V = document.getElementById("volumeUnits");
    var selectedUnits_V = unitSelect_V.options[unitSelect_V.selectedIndex].value;
    var targetVolume = convertToMm3(dimensions.targetVolume, selectedUnits_V); // Only need to convert this one to mm3

    if (locked == 2) {
        if (lockLength && lockWidth) {
            var ch = targetVolume / (modifiedLength * modifiedWidth);
            if (ch > 0){
                modifiedHeight = ch - height;
                logToPython(height);
                logToPython(ch);
                logToPython(modifiedHeight);
                document.getElementById("heightModifier").value = modifiedHeight + 0;
            }
        }

        if (lockLength && lockHeight) {
            var cw = targetVolume / (modifiedLength * modifiedWidth);
            if (cw > 0){
                modifiedWidth = cw - width;
                logToPython(width);
                logToPython(cw);
                logToPython(modifiedWidth);
                document.getElementById("widthModifier").value = modifiedWidth;
            }
        }

        if (lockWidth && lockHeight) {
            var cl = targetVolume / (modifiedLength * modifiedLength);
            if (cl > 0){
                modifiedLength = cl - width;
                logToPython(length);
                logToPython(cl);
                logToPython(modifiedLength);
                document.getElementById("widthModifier").value = modifiedLength;
            }
        }
    } else if (locked == 1) {
        if (lockLength) {
            var a = targetVolume / modifiedLength;
            if (a > 0){
                modifiedWidth = Math.sqrt(a) - width;
                modifiedHeight = Math.sqrt(a) - height;
                document.getElementById("widthModifier").value = modifiedWidth;
                document.getElementById("heightModifier").value = modifiedHeight;
            }
        }

        if (lockWidth) {
            var a = targetVolume / modifiedWidth;
            if (a > 0){
                modifiedLength = Math.sqrt(a) - length;
                modifiedHeight = Math.sqrt(a) - height;
                document.getElementById("lengthModifier").value = modifiedLength;
                document.getElementById("heightModifier").value = modifiedHeight;
            }
        }

        if (lockHeight) {
            var a = targetVolume / modifiedHeight;
            if (a > 0){
                modifiedLength = Math.sqrt(a) - length;
                modifiedWidth = Math.sqrt(a) - width;
                document.getElementById("lengthModifier").value = modifiedLength;
                document.getElementById("widthModifier").value = modifiedWidth;
            }
        }
    } else if (locked == 0){
        logToPython("Bringing ALL to Target");
        var v = targetVolume / (length * width * height);
        if (v > 0){
            modifiedLength = (length * (Math.cbrt(v))) - length ;
            modifiedWidth = (width * (Math.cbrt(v))) - width;
            modifiedHeight = (height * (Math.cbrt(v))) - height;
            document.getElementById("lengthModifier").value = modifiedLength;
            document.getElementById("widthModifier").value = modifiedWidth;
            document.getElementById("heightModifier").value = modifiedHeight;
        }
    } else {
        logToPython("None case");
    }
    // Display the results
    calculateDimensions();
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

function commit(event) {
    //used by: ?
    var buttonId = event.target.id;
    var dimensions = grabfields();
    if (buttonId == "commitLength") {
        var length = dimensions.length;
        var lengthModifier = dimensions.lengthModifier;
        var modifiedLength = length + lengthModifier;
        document.getElementById('length').value = modifiedLength;
        document.getElementById('lengthModifier').value = 0;

    } else if (buttonId == "commitWidth") {
        var width = dimensions.width;
        var widthModifier = dimensions.widthModifier;
        var modifiedWidth = width + widthModifier;
        document.getElementById('width').value = modifiedWidth;
        document.getElementById('widthModifier').value = 0;
    } else if (buttonId == "commitHeight") {
        var height = dimensions.height;
        var heightModifier = dimensions.heightModifier;
        var modifiedHeight = height + heightModifier;
        document.getElementById('height').value = modifiedHeight;
        document.getElementById('heightModifier').value = 0;
    }
}

function serializeInputValues() {
    //used by: ?
    // Get the input values
    var project_name = document.getElementById("project").value;
    if (project_name == "") {
        alert("Input cannot be blank or contain only whitespace.");
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

function logToPython(message) {
    //used by: convertToPreferedArea, convertToPreferredVolume, calculateDimensions
    //calculateTarget, toggleAdvanced, loadInputValues
    pywebview.api.handle_console_log(message)
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