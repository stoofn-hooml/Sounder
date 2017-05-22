# Sounder
This is the the code for Sounder.

## Description
Sounder is a swiping app for SoundCloud Artists. The main purpose of the app is to help SoundCloud artists connect with other SoundCloud artists from around the world and to help SoundCloud artists organically grow his/her follower base. When you sign up for Sounder, you will be asked to enter some basic information about your SoundCloud account and 3 songs you would like to promote on Sounder. Your basic profile will then be able to be made accessible to other Sounder users through our matching system. When you log on to Sounder, you have the ability to "Start Matching", this will take you another Sounder user's profile. Upon viewing their profile, you can click "Like" or "Next". If you and another user both "like" each other, you will be matched, and this will allow you to view one another's profile indefinitely.

## Directory Structure
The code for Sounder is divided into two directories: frontEnd and backEnd. frontEnd is where the React components, HTML, and CSS files are stored. The backEnd directory has all the files pertaining to our SQLite database and the server. Our code only uses one server, and thus at all times, there must be a build directory in the backEnd. The build directory stores the compressed JavaScript code from the frontEnd directory.

## Setup



## Running
To run the project, you must cd into the backEnd directory and run the following command:
  node server.js

If you want to see any changes you have made to any of the files in the frontEnd directory, you will have to cd into the backEnd directory and run the following commands:
  rm -rf build
  cd ../frontEnd
  npm run build
  mv build ../backEnd
  cd ../backEnd
  node server.js

This will remove the old build directory in the backEnd and replace it with a build with updated changes from the frontEnd directory.

After, you will need to open up a web browser and type "http://localhost:4321/login" into the address bar.
