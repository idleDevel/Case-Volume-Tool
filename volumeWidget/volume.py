from __future__ import print_function
import webview
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
html_file = os.path.join(dir_path, "html\index3.html")

project_folder = 'Projects'
json_path = os.path.join(dir_path, project_folder)

if not os.path.exists(json_path):
    # Create the "Projects" folder if it doesn't exist
    os.makedirs(json_path)


def populate_list():
    try:
        files = os.listdir(json_path)
        
        # Create a dictionary to store the file names
        excluded = 'projects_list.json'
        files = [file for file in files if file != excluded]
        for key in files:
            filename_without_extension = os.path.splitext(key)[0]
            #print(filename_without_extension)
            append_list(filename_without_extension)

        # Convert the dictionary to JSON
        #json_data = json.dumps(file_dict)
        # Print the JSON data
        

        # Save the JSON string to the file
        #with open(list_path, 'w') as file:
        # file.write(json_data)
        
        
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

class Api:
    def handle_console_log(self, message):
        print("JavaScript log:", message)
    
    def save_json(self, data):
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
        
    def load_json(self, data):
        print("Python Loading!")
        print(data)
        try:
            file_path = os.path.join(json_path, '{0}.json').format(data)
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
    
    def delete_json(self, data):
        print("Python Deleting!")
        print(data)
        try:
            file_path = os.path.join(json_path, '{0}.json').format(data)
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
    
    def toggle_Top(self):
       print("Called Toggle")
       window.on_top = not window.on_top
       print("Window Status: " + window.on_top)
    
    def set_Window_Size(self, value):
        print("Called Set Window Size")
        if value == "small":
            window.resize(380, 370)
        elif value == "large":
            window.resize(815, 430)

 
if __name__ == '__main__':
    api = Api()
    window = webview.create_window('Case Volume Tool', html_file, min_size=(380, 370), width=815, height=430, js_api=api, on_top=False, text_select=True, resizable=False)
    webview.start(populate_list)
