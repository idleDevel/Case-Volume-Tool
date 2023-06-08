document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function (inputField) {
        inputField.addEventListener('blur', function () {
            if (inputField.value === '') {
                inputField.value = inputField.getAttribute('data-default');
            }
        });
        inputField.setAttribute('data-default', inputField.value);
    });
});

function grabfields() {
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

const mm_to_liters = 1000000;
const mm_to_cm3 = 1000;
const cm_to_liters = 1000;
const cm_to_mm3 = 100;

function calculateDimensions() {
    // Call the grabfields() function and store the result in a variable
    var dimensions = grabfields();

    // Use the returned dictionary to perform calculations or access the values
    var length = dimensions.length;
    var width = dimensions.width;
    var height = dimensions.height;
    var lengthModifier = dimensions.lengthModifier;
    var widthModifier = dimensions.widthModifier;
    var heightModifier = dimensions.heightModifier;

    //serializeInputValues(length, width, height, lengthModifier, widthModifier, heightModifier);
    // Calculate modified dimensions
    var modifiedLength = length + lengthModifier;
    var modifiedWidth = width + widthModifier;
    var modifiedHeight = height + heightModifier;


    // Convert to selected length units
    var unitSelect_L = document.getElementById("lengthUnits");
    var selectedUnits_L = unitSelect_L.options[unitSelect_L.selectedIndex].value;
    switch (selectedUnits_L) {
        case "mm":
            console.log("mm");
            break;
        case "cm":
            console.log("cm");
            //flag for cm
            break;
        default:
            console.log("Unknown length unit");
            break;
    }

    //caluculate the volume:
    var base_volume = length * width * height;
    var modified_volume = modifiedLength * modifiedWidth * modifiedHeight;
    var decimalPlaces = 3;

    // Convert to selected volume units
    var unitSelect_V = document.getElementById("volumeUnits");
    var selectedUnits_V = unitSelect_V.options[unitSelect_V.selectedIndex].value;

    switch (selectedUnits_V) {
        case "mm3":
            console.log("mm3");
            break;
        case "cm3":
            console.log("cm3");
            break;
        case "liters":
            console.log("L");
            base_volume /= 1000000; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume /= 1000000;
            break;
        default:
            console.log("Unknown volume unit");
            break;
    }

    if ((selectedUnits_L = "mm" && selectedUnits_V === "mm3") || (selectedUnits_L = "" && selectedUnits_V === "") || (selectedUnits_L = "" && selectedUnits_V === "")) {
        if (selectedUnits_L = "mm" && selectedUnits_V === "mm3") {
            //do nothing
        }
        if (selectedUnits_L = "mm" && selectedUnits_V === "cm3") {
            //divide for calculation
            base_volume /= mm_to_cm3;
            modified_volume /= mm_to_cm3;
        }
        if (selectedUnits_L = "mm" && selectedUnits_V === "L") {
            base_volume /= mm_to_liters; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume /= mm_to_liters;
        }
        if (selectedUnits_L = "cm" && selectedUnits_V === "mm3") {
            base_volume /= cm_to_mm3; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume /= cm_to_mm3;
        }
        if (selectedUnits_L = "cm" && selectedUnits_V === "cm3") {
            //do nothing
        }
        if (selectedUnits_L = "cm" && selectedUnits_V === "L") {
            base_volume /= mm_to_liters; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume /= mm_to_liters;
        }
    }

    var target = dimensions.targetVolume;
    var percent_target = base_volume / target * 100;
    var percent_target_modified = modified_volume / target * 100;

    percent_target = percent_target.toFixed(decimalPlaces);
    percent_target_modified = percent_target_modified.toFixed(decimalPlaces);

    base_volume = base_volume.toFixed(decimalPlaces);
    modified_volume = modified_volume.toFixed(decimalPlaces);
    // Display the results
    document.getElementById("baseVolume").innerHTML = "Base Volume: " + base_volume;
    document.getElementById("modifiedVolume").innerHTML = "Modified Volume: " + modified_volume;
    document.getElementById("percentTarget").innerHTML = "Percent Target: " + percent_target + "%";
    document.getElementById("percentTarget_Modified").innerHTML = "Percent Target: " + percent_target_modified + "%";


}

function calculateTarget() {
    var dimensions = grabfields();
    // Use the returned dictionary to perform calculations or access the values
    var length = dimensions.length;
    var width = dimensions.width;
    var height = dimensions.height;
    var lengthModifier = dimensions.lengthModifier;
    var widthModifier = dimensions.widthModifier;
    var heightModifier = dimensions.heightModifier;
    var target = dimensions.targetVolume;

    //serializeInputValues(length, width, height, lengthModifier, widthModifier, heightModifier);
    // Calculate modified dimensions
    var modifiedLength;
    var modifiedWidth;
    var modifiedHeight;
    // Convert to selected length units
    var unitSelect_L = document.getElementById("lengthUnits");
    var selectedUnits_L = unitSelect_L.options[unitSelect_L.selectedIndex].value;
    switch (selectedUnits_L) {
        case "mm":
            console.log("mm");
            break;
        case "cm":
            console.log("cm");
            length *= 10; // Conversion from millimeters (mm) to centimeters (cm)
            width *= 10;
            height *= 10;
            modifiedLength *= 10;
            modifiedWidth *= 10;
            modifiedHeight *= 10;
            break;
        default:
            console.log("Unknown length unit");
            break;
    }
    // Convert to selected volume units
    var unitSelect_V = document.getElementById("volumeUnits");
    var selectedUnits_V = unitSelect_V.options[unitSelect_V.selectedIndex].value;
    switch (selectedUnits_V) {
        case "mm3":
            console.log("mm3");
            break;
        case "cm3":
            console.log("cm3");
            base_volume /= mm_to_cm3; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume *= mm_to_cm3;
            break;
        case "liters":
            console.log("L");
            base_volume *= mm_to_liters; // Conversion from cubic centimeters (cm³) to liters (L)
            modified_volume *= mm_to_liters;
            break;
        default:
            console.log("Unknown volume unit");
            break;
    }

    if (locked == 2) {
        // Case 1: variable1 and variable2 are true
        if (lockLength && lockWidth) {
            //logToPython("Case 1: variable1 and variable2 are true");
            modifiedLength = length + lengthModifier;
            modifiedWidth = width + widthModifier;
            var ch = target / (modifiedLength * modifiedWidth);
            modifiedHeight = ch - height;
            logToPython(height);
            logToPython(ch);
            logToPython(modifiedHeight);
            document.getElementById("heightModifier").value = modifiedHeight;

            // Perform action for case 1
            // ...
        }

        // Case 2: variable1 and variable3 are true
        if (lockLength && lockHeight) {
            logToPython("Case 2: variable1 and variable3 are true");
            modifiedLength = length + lengthModifier;
            modifiedHeight = height + heightModifier;
            // Perform action for case 2
            // ...
        }

        // Case 3: variable2 and variable3 are true
        if (lockWidth && lockHeight) {
            logToPython("Case 3: variable2 and variable3 are true");
            modifiedWidth = width + widthModifier;
            modifiedHeight = height + heightModifier;
            // Perform action for case 3
            // ...
        }
    } else if (locked == 1) {
        // Check if any two variables are true
        if ((lockLength && lockWidth) || (lockLength && lockHeight) || (lockWidth && lockHeight)) {
            // Case 1: variable1 and variable2 are true
            if (lockLength) {
                logToPython("Case 1: variable1 and variable2 are true");
                modifiedLength = length + lengthModifier;
                modifiedWidth = width + widthModifier;

                modifiedHeight = height - (target / (modifiedLength * modifiedWidth));
                document.getElementById("heightModifier").value = modifiedHeight;
                // Perform action for case 1
                // ...
            }

            // Case 2: variable1 and variable3 are true
            if (lockWidth) {
                logToPython("Case 2: variable1 and variable3 are true");
                modifiedLength = length + lengthModifier;
                modifiedHeight = height + heightModifier;
                // Perform action for case 2
                // ...
            }

            // Case 3: variable2 and variable3 are true
            if (lockHeight) {
                logToPython("Case 3: variable2 and variable3 are true");
                modifiedWidth = width + widthModifier;
                modifiedHeight = height + heightModifier;
                // Perform action for case 3
                // ...
            }
        } else {
            logToPython("None of the cases: any two variables are true");
        }
    }
    // Display the results
    document.getElementById("baseVolume").innerHTML = "Base Volume: " + base_volume;
    document.getElementById("modifiedVolume").innerHTML = "Modified Volume: " + modified_volume;
    document.getElementById("percentTarget").innerHTML = "";
    document.getElementById("percentTarget_Modified").innerHTML = "";
}

function calculateStackup() {
    //logToPython("Called stackup!");
    // Get the input values
    var glass = parseFloat(document.getElementById("glass").value);
    var frame = parseFloat(document.getElementById("frame").value);
    var gasket = parseFloat(document.getElementById("gasket").value);
    var cr = parseFloat(document.getElementById("cratio").value);
    //logToPython("GATHERED VALUES!");
    //serializeInputValues(length, width, height, lengthModifier, widthModifier, heightModifier);
    // Calculate modified dimensions
    var modifiedGasket = gasket - (gasket * cr);
    var stackup = glass + frame + gasket;
    var modifiedStackup = glass + frame + modifiedGasket;
    var decimalPlaces = 6;
    //logToPython("DID CALCULATIONS!");
    //stackup = base_volume.toFixed(decimalPlaces);
    //modifiedStackup = modified_volume.toFixed(decimalPlaces);
    //logToPython("SET PLACES");
    // Display the results
    document.getElementById("stackup").innerHTML = "Stackup: " + stackup;
    document.getElementById("modifiedStackup").innerHTML = "Compressed Stackup: " + modifiedStackup;
    document.getElementById("compressedGasket").innerHTML = "Compressed Gasket: " + modifiedGasket;
    //logToPython("DISPLAYED RESULTS!");
}

// 

var lockLength = false;
var lockWidth = false;
var lockHeight = false;
var locked = 0;

function lock(event) {
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
        length.disabled = true;
        lengthModifier.disabled = true;
        lengthButton.disabled = true;
        locked++;
    } else if (buttonId === "lockLength" && lockLength === true) {
        lockLength = false;
        length.disabled = false;
        lengthModifier.disabled = false;
        lengthButton.disabled = false;
        locked--;
    } else if (buttonId === "lockWidth" && lockWidth === false) {
        lockWidth = true;
        width.disabled = true;
        widthModifier.disabled = true;
        widthButton.disabled = true;
        locked++;
    } else if (buttonId === "lockWidth" && lockWidth === true) {
        lockWidth = false;
        width.disabled = false;
        widthModifier.disabled = false;
        widthButton.disabled = false;
        locked--;
    } else if (buttonId === "lockHeight" && lockHeight === false) {
        lockHeight = true;
        height.disabled = true;
        heightModifier.disabled = true;
        heightButton.disabled = true;
        locked++;
    } else if (buttonId === "lockHeight" && lockHeight === true) {
        lockHeight = false;
        height.disabled = false;
        heightModifier.disabled = false;
        heightButton.disabled = false;
        locked--;
    }
}

function commit(event) {
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

    //l, w, h, ml, mw, mh
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
    };

    // Convert the JSON object to a string
    var inputValuesString = JSON.stringify(inputValues);
    //console.log(inputValuesString);
    // Call the Python function and pass the JSON string
    saveInputValues(inputValuesString);
}

function saveInputValues(data) {
    pywebview.api.save_json(data)
}

function loadInputValues() {
    var input_element = document.getElementById('project');
    var selected_value = input_element.value;
    pywebview.api.load_json(selected_value)
    //logToPython(selected_value);
    //logToPython("Called Load!");
}

function validateFilename(input) {
    var filenameInput = input;

    filenameInput.addEventListener('keypress', function (event) {
        var charCode = event.which || event.keyCode;
        var charTyped = String.fromCharCode(charCode);

        // Regular expression to validate the input
        var allowedRegex = /^[a-zA-Z0-9_.-]+$/;

        if (!allowedRegex.test(charTyped)) {
            event.preventDefault();
        }
    });
}
function logToPython(message) {
    pywebview.api.handle_console_log(message)
}

function showConfirmation() {
    var confirmationDialog = document.getElementById("confirmation-dialog");
    confirmationDialog.style.display = "block";
}

function hideConfirmation() {
    var confirmationDialog = document.getElementById("confirmation-dialog");
    confirmationDialog.style.display = "none";
}

function performAction() {
    hideConfirmation();
    var input_element = document.getElementById('project');
    var selected_value = input_element.value;
    pywebview.api.delete_json(selected_value);
    input_element.value = "";
}

function clearField() {
    var textField = document.getElementById("project");
    textField.value = "";
}