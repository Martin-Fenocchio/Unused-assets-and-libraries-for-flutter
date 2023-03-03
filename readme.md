## Unused assets and libraries checker

A script created with JavaScript to check the unused libraries and asset’s your app. 
<br><br>
It gives you a list of the unused libraries and assets like this:




    The project [name of your app] have 20 unused dependencies, these are:
    
    cropperx
    cupertino_icons
    custom_image_crop
    file_selector
    flutter_isolate
    flutter_launcher_icons
    ... 13 more
    
    You can remove all these dependencies executing this command: 
    
    flutter pub remove cropperx cupertino_icons custom_image_crop... 
    
    
    also the project have 40 unused assets, these are:
    
    assets/icons/cancel.svg
    assets/icons/check.svg
    assets/icons/close.svg
    assets/icons/visibilityOff.svg
    assets/icons/visibilityOn.svg
    ... 26 more


### How install
<br>
It's easy, with a few steps you will able to run the script.
<br>
<br>

1 -  Clone the Github's repository:

`Git clone https://github.com/Novak-Fenocchio/Unused-assets-and-libraries-for-flutter.git`
<br><br>
2 - Download the dependencies:

`npm install`
<br><br>
3 - Set the environment's vars:

Create a9 .env file in the root directory of the cloned project 

`projectRootPath= [the directory of your flutter's project]`

*Example: projectRootPath= Users/****/development/my-flutter-app*
<br><br>


4 - Run the script:

`Run node index.js
`

