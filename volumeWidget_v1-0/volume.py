"""
<volume.py>

This file is the main application of a Pywebview app. It provides api hooks for javascript code and generates json files and folders to locally store data for the user. 

Author: Jakob Edwards (Github: @idleDevel) (SFF Forum: @Biowarejak)

License: GPL-3.0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
"""
import os
import json
import sys
import subprocess

def install_package(package_name, version=None):
    if version:
        package_specifier = f"{package_name}=={version}"
    else:
        package_specifier = package_name
    subprocess.check_call([sys.executable, "-m", "pip", "install", package_specifier])

try:
    import webview
except:
    install_package("pywebview", "4.1")
    import webview




dir_path = os.path.dirname(os.path.realpath(__file__))
html_file = os.path.join(dir_path, "html\\index.html")

projects_folder = 'Projects'
projects_path = os.path.join(dir_path, projects_folder)

themes_folder = 'html\\themes'
themes_path = os.path.join(dir_path, themes_folder)

if not os.path.exists(projects_path):
    # Create the "Projects" folder if it doesn't exist
    os.makedirs(projects_path)


def populate_list():
    try:
        files = os.listdir(projects_path)
        files = [file for file in files]
        for key in files:
            filename_without_extension = os.path.splitext(key)[0]
            #print(filename_without_extension)
            append_list(filename_without_extension)  
    except Exception as e:
        print(e)

def append_list(name):
    option_html = '<option id="{name}" value="{name}">{name}</option>'.format(name=name)
    javascript_code = """
        var optionHTML = '{}';
        var datalist = document.getElementById('project_list');
        var option = document.getElementById('{name}');
        if (!option) {{
            datalist.innerHTML += optionHTML;
        }}
    """.format(option_html, name=name)
    window.evaluate_js(javascript_code)

def detach_list(name):
    javascript_code = """
        var datalist = document.getElementById('project_list');
        var option = document.getElementById('{0}');
        datalist.removeChild(option);
    """.format(name)
    window.evaluate_js(javascript_code)

def apply_preferences():
    #Apply from the preferences json
    try:
        file_path = os.path.join(dir_path, 'preferences.json')
    except Exception as e:
        print(e)
    # Check if the file exists
    if not os.path.exists(file_path):
        print("defaulting preferences")
        default_preferences = {
            "theme": "default_theme",
            "decimalPlaces": "3"
        }
        # Create a new file if it doesn't exist
        with open(file_path, 'w') as file:
            file.write(json.dumps(default_preferences))
            #pass  # Create an empty file
        #return None
    
    # Read the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
        print("Type: ", type(data))

    try:
        # Parse the JSON string into a Python dictionary
        print("Loaded JSON data:", data)

        for key, value in data.items():
            if key == "theme":
                window.evaluate_js("document.querySelector('option[value={0}]').selected = true".format(value))
                window.evaluate_js("selectTheme();")
            elif key == "decimalPlaces":
                window.evaluate_js("document.getElementById('{0}').value = '{1}'".format(key, value))
                window.evaluate_js("changeDecimal();")
            # room for more options later 
        return
    
    except Exception as e:
        print("Error: ", e)

def populate_themes():
    try:
        files = os.listdir(themes_path)
        files = [file for file in files]
        for key in files:
            filename_without_extension = os.path.splitext(key)[0]
            print(filename_without_extension)
            append_themes(filename_without_extension)
        # Convert the dictionary to JSON
        #json_data = json.dumps(file_dict)
        # Print the JSON data
        

        # Save the JSON string to the file
        #with open(list_path, 'w') as file:
        # file.write(json_data)
    except Exception as e:
        print(e)

def append_themes(name):
    option_html = '<option id="{name}" value="{name}">{name}</option>'.format(name=name)
    javascript_code = """
        var optionHTML = '{}';
        var themeList = document.getElementById('theme');
        var option = document.getElementById('{name}');
        if (!option) {{
            themeList.innerHTML += optionHTML;
        }}
    """.format(option_html, name=name)
    window.evaluate_js(javascript_code)

class Api:
    #Thi is less intrusive than the normal debug options 
    def handle_console_log(self, message):
        print("JavaScript log:", message)
    
    def save_project(self, data):
        # Convert the data object to a JSON string
        #json_str = json.dumps(data)
        json_str = data
        temp_load = json.loads(json_str)
        try:
            name = temp_load['project']
            print(name)
            append_list(name)
            # Construct the file path relative to the script directory
            file_path = os.path.join(dir_path, 'Projects\{0}.json'.format(name))
            if not os.path.exists(file_path):
                # Create a new file if it doesn't exist
                with open(file_path, 'w') as file:
                    pass  # Create an empty file

            # Save the JSON string to the file
            with open(file_path, 'w') as file:
                file.write(json_str)

            # Print the data object (optional)
            print(data)
            # Return a response to the JavaScript side
            #return "JSON data saved successfully!"
        except Exception as e:
            print(e)
        
    def load_project(self, data):
        print("Python Loading!")
        print(data)
        try:
            file_path = os.path.join(projects_path, '{0}.json').format(data)
        except Exception as e:
            print(e)
        # Check if the file exists
        if not os.path.exists(file_path):
            print("not loaded")
            return None
        
        # Read the JSON data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)
            print("Type: ", type(data))

        try:
            # Parse the JSON string into a Python dictionary
            print("Loaded JSON data:", data)

            for key, value in data.items():
                if key == "dimensionUnits" or key == "volumeUnits":
                    window.evaluate_js("document.querySelector('option[value={0}]').selected = true".format(value))
                elif key == "lockLength" or key == "lockWidth" or key == "lockHeight" or key == "alwaysOnTop":
                    # 'or key == advancedToggle'  unfortunately freezes the app, so it's going to be omitted for now
                    checkbox_script = "document.getElementById('{0}').checked".format(key)
                    checkbox_checked = window.evaluate_js(checkbox_script)
                    # Determine if the checkbox is checked and if it should be
                    if value == True and not checkbox_checked:
                        print("Clicking!")
                        # small delay to prevent freezing the loop
                        window.evaluate_js("setTimeout(function() {{ document.getElementById('{0}').click(); }}, 100)".format(key))
                    elif value == False and checkbox_checked:
                        print("Clicking!")
                        # slightly longer delay to prevent freezing the loop
                        window.evaluate_js("setTimeout(function() {{ document.getElementById('{0}').click(); }}, 100)".format(key))
                else:
                    window.evaluate_js("document.getElementById('{0}').value = '{1}'".format(key, value))
            return
        except Exception as e:
            print("Error: ", e)
    
    def delete_project(self, data):
        print("Python Deleting!")
        print(data)
        try:
            file_path = os.path.join(projects_path, '{0}.json').format(data)
        except Exception as e:
            print(e)
        # Check if the file exists
        if os.path.exists(file_path):
            # Delete the file
            os.remove(file_path)
            print(f"The file '{file_path}' has been deleted.")
            detach_list(data)
        else:
            print(f"The file '{file_path}' does not exist.")
    
    def save_preferences(self, data):
        # Convert the data object to a JSON string
        #json_str = json.dumps(data)
        #json_str = data
        try:
            #append_list(name)
            # Construct the file path relative to the script directory
            file_path = os.path.join(dir_path, 'preferences.json')
            if not os.path.exists(file_path):
                # Create a new file if it doesn't exist
                with open(file_path, 'w') as file:
                    pass  # Create an empty file

            # Save the JSON string to the file
            with open(file_path, 'w') as file:
                file.write(data)

            # Print the data object (optional)
            print(data)
            # Return a response to the JavaScript side
            #return "JSON data saved successfully!"
        except Exception as e:
            print(e)

    def toggle_Top(self):
       print("Called Toggle")
       window.on_top = not window.on_top
    
    def set_Window_Size(self, value):
        print("Called Set Window Size")
        if value == "small":
            window.resize(380, 370)
        elif value == "large":
            window.resize(815, 430)

#Possibly useful for a toggle resize option in preferences
""" 
def on_resized(width, height):
    print('pywebview window is resized. new dimensions are {width} x {height}'.format(width=width, height=height))
    if window.resizable == True:
        if width < 815 and height < 430:
            window.set_wind = False
        #hide advanced
"""

def start():
    populate_list()
    populate_themes()
    apply_preferences()
    
if __name__ == '__main__':
    api = Api()
    window = webview.create_window('Case Volume Tool', html_file, min_size=(380, 370), width=815, height=430, js_api=api, on_top=False, text_select=True, resizable=False)
    #window.events.resized += on_resized #enables on_resized
    webview.start(start)
