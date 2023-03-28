import os
import shutil

# Specify the path of the folder you want to copy from
source_folder = 'dataset_Augmented'

# Specify the path of the folder you want to copy to
destination_folder = 'data_svm'

# Create the destination folder if it doesn't exist
if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

print('wwwww')

# Loop through all the files and subfolders in the source folder
for root, dirs, files in os.walk(source_folder):
    # Loop through all the files in the current subfolder
    for file in files:
        # Get the full path of the file
        file_path = os.path.join(root, file)
        # Get the relative path of the file (without the source folder path)
        relative_path = os.path.relpath(file_path, source_folder)
        # Get the full path of the destination file
        destination_path = os.path.join(destination_folder, file)
        # Copy the file to the destination folder
        shutil.copy2(file_path, destination_path)
