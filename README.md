# Sounder
This is the the code for Sounder.

## Description
Sounder is a swiping app for SoundCloud Artists. The main purpose of the app is to help SoundCloud artists connect with other SoundCloud artists from around the world and to help SoundCloud artists organically grow his/her follower base. When you sign up for Sounder, you will be asked to enter some basic information about your SoundCloud account and 3 songs you would like to promote on Sounder. Your basic profile will then be made accessible to other Sounder users through our matching system. When you log on to Sounder, you have the ability to "Start Matching", this will take you to another Sounder user's profile. Upon viewing their profile, you can click "Like" or "Next". If you and another user both "like" each other, you will be matched, and this will allow you to view one another's profile indefinitely.

## Directory Structure
The code for Sounder is divided into two directories: frontEnd and backEnd. The frontEnd is further divided into a public, src, and a node_modules directory. The public directory houses the HTML and CSS files, the src directory has the code for the React components, and the node_modules directory has all the necessary files to make our front-end run. The backEnd directory is divided into four directories: build, migrations, node_modules, and seeds. The build directory is a compressed version of all the things that live in the frontEnd directory. The migrations directory contains all the migrations we ran when we set up our SQLite database. The node_modules directory contains all the files necessary for our app to back-end run. The seeds directory has the file necessary to load our data into the database from an external source.



## Running
To run the project, you must cd into the backEnd directory and run the following command: <br/>
  node server.js <br/>

After, you will need to open up a web browser and type "http://localhost:4321/login" into the address bar.

## Editing files in the frontEnd directory:
Editing files in the frontEnd directory and then seeing those changes requires you to run a build in the frontEnd directory. <br/>
After you cd into your backEnd directory, here are the steps to remove the old build and create a new one: <br/>
  rm -rf build <br/>
  cd ../frontEnd <br/>
  npm install <br/>
  npm run build <br/>
  mv build ../backEnd <br/>
  cd ../backEnd <br/>
  node server.js <br/>

Now open up a web browser and type "http://localhost:4321/login" into the address bar.

This will remove the old build directory in the backEnd and replace it with a new build with updated changes from the frontEnd directory. **Note** You only have to run "npm install" the first time you make edits to the front end. The command "npm install" will install the dependencies necessary to run the app.
