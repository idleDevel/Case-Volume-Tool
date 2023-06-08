import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
file_path = os.path.join(dir_path, 'dimensions.json')
# Check if the file exists
if not os.path.exists(file_path):
    print("not loaded")
    exit()

# Read the JSON data from the file
with open(file_path, 'r') as file:
    data_1 = json.load(file)
    print("Type: ", type(data_1))
    #print(data_1)
    
data_string = "{\"length\":10,\"width\":10,\"height\":10,\"lengthModifier\":0,\"widthModifier\":0,\"heightModifier\":0}"
data_2 = json.loads(data_string)
print("Type: ", type(data_2))