# Case-Volume-Tool
Summary:
A portable Pywebview app for helping quickly define case volume for design considerations. 

## Description
This tool started out a widget to help with my personal computer case design projects. It would have been easy enough to just use spreadsheets, but I found this was a good programming exercise and enabled me to more easily adjust values with my CAD pulled up. The "Always On Top" functionality is pretty clutch for that. 

I am releasing this as free to use under GPL 3.0, but there are funding links both in the app and on the github. I've spent about 70 hours as of this commit, so if you feel inclined you are welcome to buy me a coffee :) Please note that donating is entirely optional. 

## Features
![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/1e7db816-c08d-4c95-aa2a-49b134e3f523)

- Project Loading, Saving, and Deleting
- Always On Top toggle
- Ability to choose units for length (mm, cm, in) and volume (mm^3, cm^3, m^3, in^3, Liters, Gallons)
- Setting Modifiers (+ or -)
- Setting Target Volume
- Automatic Modifiers for reaching Target Volume
  - Option to lock modifiers to prevent changing them, and
  - Option to commit any changes to the base value
-  Hiding "advanced" features to make the menu smaller 

![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/55c17296-e556-4b6b-a401-23fa9222a0c3)

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
  - There is no autosaving or last-session cache, so be weary. 
- Preferences:
  - Set theme from the dropdown menu.
  - Set decimal places on results, default is 0.
  - Hit save to automatically load these values the next time you launch the app.
- Tooltips:
  - Hover over sections for pertinent information. 

## Releases
The most convenient way to use this without setting up a development environment is by using the releases tab. There you will find the latest version for Windows. 

## Bugs
Please report any bugs you find under the Issues tab and include as much information as possible about what caused it. 

## Developing
I am developing with Python 3.10 in VS Code. Packages "webview" and "os" are installed with PIP. Functionality of Always-On-Top has been confirmed on Windows 11, but there may be differences across operating systems. 

## License
Please see the relavant file. 

Some clarifications: 
- You are welcome to use the app for personal or commercial use. 
- Use of the app to help design a case does not constitute the need to license your work under the same terms. 
- Creating derivative works of the app is allowed, and there are plenty of useful code snippets in here, but you have to license your work under the same terms, state any changes you made, and give provide appropriate notices of attribution. 