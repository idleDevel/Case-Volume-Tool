# Case-Volume-Tool
Summary:
A portable Pywebview app for helping quickly define case volume for design considerations. 

## Description
This tool started out a widget to help with my personal case design projects. It would have been easy enough to just use spreadsheets, but I found this was a good programming exercise and enabled me to more easily adjust values with my CAD pulled up. The "Always on top" functionality is pretty clutch. 

## Features

![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/1e7db816-c08d-4c95-aa2a-49b134e3f523)

- Project Loading, Saving, and Deleting
- Always on Top toggle
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
- Tooltips:
  - Hover over sections for pertinent information. 

## Developing
I am developing with Python 3.10. PIP installs for webview and os.
