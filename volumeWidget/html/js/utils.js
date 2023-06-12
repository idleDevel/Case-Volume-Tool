/*
 * utils.js
 *
 * This file provides utility functions for updating the DOM and saving json files as well as interacting with Pywebview
 *
 * Author: Jakob Edwards (Github: @idleDevel) (SFF Forum: @Biowarejak)
 *
 * License: GPL-3.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
    //used by: DOMContentLoaded listener 
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
        } else if (field.getAttribute("id") === "decimalPlaces") {
            var updatedTitle = "Decimal Places";
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
    saveProjectValues(inputValuesString);
}

function saveProjectValues(data) {
    //used by: serializeInputValues
    pywebview.api.save_project(data)
}

function loadInputValues() {
    //used by: ?
    var input_element = document.getElementById('project');
    var selected_value = input_element.value;
    pywebview.api.load_project(selected_value)
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
    pywebview.api.delete_project(selected_value);
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

function showAbout() {
    //used by: ?
    var aboutDialog = document.getElementById("about-dialog");
    aboutDialog.style.display = "block";
}

function hideAbout() {
    //used by: ?
    var aboutDialog = document.getElementById("about-dialog");
    aboutDialog.style.display = "none";
}

function showPreferences() {
    //used by: ?
    var preferenceDialog = document.getElementById("preferences-dialog");
    preferenceDialog.style.display = "block";
}

function hidePreferences() {
    //used by: savePreferences
    var confirmationDialog = document.getElementById("preferences-dialog");
    confirmationDialog.style.display = "none";
}

//used by: calculateDimensions
var decimalPlaces = 0;
function changeDecimal() {
    // this doesn't like to update onchange, so it is called by calculateDimensions
    var input_element = document.getElementById('decimalPlaces');
    var selected_value = input_element.value;
    decimalPlaces = selected_value;
}

function selectTheme() {
    //used by: ?
    var input_element = document.getElementById('theme');
    var selected_value = input_element.value;
    logToPython(selected_value);
    replaceThemeCSS(selected_value);
}

function replaceThemeCSS(newFilename) {
    //used by: ?
    // load new stylesheet
    var file = document.getElementById("themeStyle");
    file.href = 'themes/' + newFilename + '.css';
    
 }

function savePreferences() {
    //used by: ?
    // Get the input values
    var theme_name = document.getElementById("theme").value;
    var decimal_value = document.getElementById("decimalPlaces").value;
    // Save the input values as a JSON object
    var inputValues = {
        theme: theme_name, 
        decimalPlaces: decimal_value
    };
    logToPython(inputValues);
    // Convert the JSON object to a string
    var inputValuesString = JSON.stringify(inputValues);
    //console.log(inputValuesString);
    // Call the Python function and pass the JSON string
    //saveInputValues(inputValuesString);
    pywebview.api.save_preferences(inputValuesString);
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