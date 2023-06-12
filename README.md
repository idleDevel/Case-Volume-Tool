# Case-Volume-Tool
Summary:
A portable Pywebview app for helping quickly define case volume for design considerations. 

## Description
This tool started out as a widget to help with my personal computer case design projects. It has enabled me to more easily adjust values with my CAD pulled up, as opposed to spreadsheets and online calculators, and ultimately I can't imagine using something else now. The "Always On Top" functionality is especially clutch for use with CAD. 

## Features
![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/0ffa7734-b24d-4c45-96b7-f94c4c6211fb)

- Project Loading, Saving, and Deleting
- Always On Top toggle
- Ability to choose units for length (mm, cm, in) and volume (mm<sup>3</sup>, cm<sup>3</sup>, m<sup>3</sup>, in<sup>3</sup>, Liters, Gallons)
- Setting Modifiers (+ or -)
- Setting Target Volume
- Automatic Modifiers for reaching Target Volume
  - Option to lock modifiers to prevent changing them, and
  - Option to commit any changes to the base value
-  Hiding "advanced" features to make the menu smaller 

![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/caa6bc2e-e870-45d3-bfe9-e1529709549d)

## Use
- Creating a project:
  - Type the name in the box and click "Save Project"
- Loading a project:
  - Select the text box and choose the project you want from the dropdown. 
  - Typing to filter the list is also an option.
- Deleting a project:
  - Load the project and click "Delete Project"
  - Click "OK" on the prompt to proceed or "Cancel" to cancel.
- Saving a project:
  - Click "Save Project"
  - There is no autosaving or last-session cache, so remember to save. 
- Preferences:
  - Set theme from the dropdown menu.
  - Set decimal places on results, default is 0.
  - Click "Save" to automatically load these values the next time you launch the app.
  - Click "Close" to close the window without saving the changes. 
- Tooltips:
  - Hover over sections for pertinent information. 

## Themes
You are welcome to create your own! Just copy and modify one of the provided css files in the "themes" subfolder. I look forward to seeing what you make!

## Releases
The most convenient way to use this without setting up a development environment is by using the releases tab. There you will find the latest version for Windows. I am not currently able to provide releases for other operating systems.

## Bugs
Please report any bugs you find under the Issues tab and include as much information as possible about what caused it. 

## Developing 
I am developing with Python 3.10 in VS Code.  Functionality of Always-On-Top has been confirmed on Windows 11, but there may be differences across operating systems. 

## License
Please see the relevant file. 

Some clarifications: 
- You are welcome to use the app for personal or commercial use. 
- Use of the app to help design a case does NOT constitute the need to license your work under the same terms. 
- Creating derivative works of the app is allowed, and there are plenty of useful code snippets in here, but you have to license your work under the same terms, state any changes you made, and give provide appropriate notices of attribution. 
- None of this supersedes the details outlined in the license. 

## Funding
There are funding links both in the app and on the github. I've spent about 70 hours as of this commit, so if you feel inclined you are welcome to buy me a coffee :) Please note that donating is entirely optional. 

While I do have non-programming day-job, as well as several other projects, donations do encourage me to spend time developing features and investigate releases for other platforms. 
