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
- Automatic Modifiers for Target Volume
  - Option to lock modifiers to prevent changing them, and
  - Option to commit any changes to the base value
-  Hiding "advanced" features to make the menu smaller 

![image](https://github.com/idleDevel/Case-Volume-Tool/assets/20792330/caa6bc2e-e870-45d3-bfe9-e1529709549d)

## Use
Creating a project:
- Type the name in the box and click "Save Project"

Loading a project:
- Select the text box and choose the project you want from the dropdown.
- Typing to filter the list is also an option.

Deleting a project:
- Load the project and click "Delete Project"
- Click "OK" on the prompt to proceed or "Cancel" to cancel.

Saving a project:
- Click "Save Project"
- There is no autosaving or last-session cache, so remember to save.

Preferences:
- Set the theme from the dropdown menu.
- Set decimal places for results, default is 3. Ranges from 0-6.
- Click "Save" to automatically load these preferences the next time you launch the app.
- Click "Close" to close the window without saving the changes.

Tooltips:
- Hover over sections for pertinent information.

## Themes
You are welcome to create your own! Just copy and modify one of the provided CSS files in the "themes" subfolder. I look forward to seeing what you make!

## Releases
Current Release: [1.0](https://github.com/idleDevel/Case-Volume-Tool/releases/tag/v1.0)
- This represents what should be a core-complete application. Everything works, but there may be some quality-of-life updates. 

The most convenient way to use this without setting up a development environment is by using the releases tab. There you will find the latest version in a .zip file. 

To run, you will need to install at least python 3.10:
- https://www.python.org/downloads/release/python-31012/

Select the "volume.py" file, and open it with Python. It will automatically install the latest version of Pywebview concurrent with the release if you don't have it yet.

## Bugs
Please report any bugs you find under the "Issues" tab and include as much information as possible about what caused them.

## Developing 
I am developing with Python 3.10.12 in VS Code. Functionality has been confirmed on Windows 11, but there may be differences across operating systems.

## License
Please see the LICENSE file. 
Some clarifications:
- You are welcome to use the app for personal or commercial use.
- Use of the app to help design a case does NOT constitute the need to license your design under the same terms.
- Creating derivative works of the app is allowed, and there are plenty of useful code snippets in here, but you have to license your work under the same terms.
- None of this supersedes the details outlined in the license, please refer to it if you have any questions.
## Funding
There are funding links both in the app and in the Repository. I've spent about 90 hours as of this commit (Version 1.0), so if you feel inclined you are welcome to buy me a coffee :) Please note that donating is entirely optional. If you would like to contribute in other ways, please see Contributing.

While I do have a non-programming day job, as well as several other projects, donations do encourage me to spend time developing features and other tools tailored for case design. Donations do not create an obligation on my part to address any issues you may have with the application or otherwise, they are simply a courtesy. Thank you for your understanding.

## Contributing
You are welcome to create pull requests! Scattered in comments are some things that are partially implemented, but there are more important things I would like to see first:
- Pull Request Focus Areas:
  - Localization: If you are able to translate the html text to your preferred language, that'd be great. Variable names, element-id's, etc must all remain the same.
  - Accessibility: If you are able to create themes that are better for people with difficulty seeing, be it colors or font size, please do.

Otherwise, I am open to feedback. Please create a post under Discussions. 

## Acknowledgements
I would like to thank:
- [SFF Forum](https://smallformfactor.net/), for so many years of being a wonderful community. I always look to give back where I can. 

