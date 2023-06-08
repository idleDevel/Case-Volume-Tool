//Dont worry, this is just for debugging. No telemetry :) If you want to give me some usage metrics tho, follow the coffee link!
function logToPython(message) {
    //used by: convertToPreferedArea, convertToPreferredVolume, calculateDimensions
    //calculateTarget, toggleAdvanced, loadInputValues
    pywebview.api.handle_console_log(message)
}
