/*
 * calculations.js
 *
 * This file performs the neccessary math to convert units and find case volume, as well as footprint.
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

function convertToPreferedLength(value, preferredUnits) {
    //used by: calculateTarget
    //logToPython("Converting Length!");
    if (preferredUnits == "mm") {
        logToPython("Defaulting to mm!");
        return value;
    } else if (preferredUnits == "cm") {
        logToPython("Converting to cm!");
        return value / 10; 
    } else if (preferredUnits == "in") {
        logToPython("Converting to in!");
        return value / 25.4; 
    } else {
        // Invalid unit, return the original value
        logToPython("Invalid Unit");
        return value;
    }
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

function calculateDimensions() {
    //used by: calculateTarget, 
    // Call the grabfields() function and store the result in a variable
    logToPython("Calculations Called!");
    var dimensions = grabfields();
    changeDecimal();
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
    var targetVolume = convertToMm3(dimensions.targetVolume, selectedUnits_V);
    
    // Maybe disable Target button if locked == 3
    if (locked == 2) {
        logToPython("Locked: 2");
        if (lockLength && lockWidth) {
            var ch = targetVolume / (modifiedLength * modifiedWidth);
            if (ch > 0){
                modifiedHeight = ch - height;
                logToPython(height);
                logToPython(ch);
                logToPython(modifiedHeight);
                modifiedHeight = convertToPreferedLength(modifiedHeight, selectedUnits_L);
                document.getElementById("heightModifier").value = modifiedHeight;
            }
        }

        if (lockLength && lockHeight) {
            var cw = targetVolume / (modifiedLength * modifiedWidth);
            if (cw > 0){
                modifiedWidth = cw - width;
                logToPython(width);
                logToPython(cw);
                logToPython(modifiedWidth);
                modifiedWidth = convertToPreferedLength(modifiedWidth, selectedUnits_L);
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
                modifiedLength = convertToPreferedLength(modifiedLength, selectedUnits_L);
                document.getElementById("widthModifier").value = modifiedLength;
            }
        }
    } else if (locked == 1) {
        logToPython("Locked: 1");
        if (lockLength) {
            var area = targetVolume / modifiedLength;
            if (area > 0){
                var ratio = width / height;
                modifiedHeight = Math.sqrt(area / ratio);
                modifiedWidth = ratio * modifiedHeight;
                modifiedWidth -= width;
                modifiedHeight -= height;
                modifiedHeight = convertToPreferedLength(modifiedHeight, selectedUnits_L);
                modifiedWidth = convertToPreferedLength(modifiedWidth, selectedUnits_L);
                document.getElementById("widthModifier").value = modifiedWidth;
                document.getElementById("heightModifier").value = modifiedHeight;
            }
        }
    
        if (lockWidth) {
            var area = targetVolume / modifiedWidth;
            if (area > 0){
                var ratio = length / height;
                modifiedHeight = Math.sqrt(area / ratio);
                modifiedLength = ratio * modifiedHeight;
                modifiedLength -= length;
                modifiedHeight -= height;
                modifiedHeight = convertToPreferedLength(modifiedHeight, selectedUnits_L);
                modifiedLength = convertToPreferedLength(modifiedLength, selectedUnits_L);
                document.getElementById("lengthModifier").value = modifiedLength;
                document.getElementById("heightModifier").value = modifiedHeight;
            }
        }
    
        if (lockHeight) {
            var area = targetVolume / modifiedHeight;
            if (area > 0){
                var ratio = length / width;
                modifiedWidth = Math.sqrt(area / ratio);
                modifiedLength = ratio * modifiedWidth;
                modifiedLength -= length;
                modifiedWidth -= width;
                modifiedWidth = convertToPreferedLength(modifiedWidth, selectedUnits_L);
                modifiedLength = convertToPreferedLength(modifiedLength, selectedUnits_L);
                document.getElementById("lengthModifier").value = modifiedLength;
                document.getElementById("widthModifier").value = modifiedWidth;
            }
        }
    } else if (locked == 0){
        logToPython("Locked: 0");
        logToPython("Bringing ALL to Target");
        var v = targetVolume / (length * width * height);
        if (v > 0){
            modifiedLength = (length * (Math.cbrt(v))) - length ;
            modifiedWidth = (width * (Math.cbrt(v))) - width;
            modifiedHeight = (height * (Math.cbrt(v))) - height;
            modifiedLength = convertToPreferedLength(modifiedLength, selectedUnits_L);
            modifiedWidth = convertToPreferedLength(modifiedWidth, selectedUnits_L);
            modifiedHeight = convertToPreferedLength(modifiedHeight, selectedUnits_L);
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

