# Development Guide 

1.) `npm install` to fetch dependencys 

2.) `npm run start` to start the dev sever 

3.) `firebase emulators:start` to run firebase emulators, see firebase section for info if this fails 


# Firebase 

This application uses https://firebase.google.com as its backend. Firebase allows us to quickly itterate 
by letting google handle backend hosting for us. This lets us focus on delivering a crisp user experience 
using only java script. 

### How do i develop locally with firebase? 

Google provides a emulator suite for many of their firebase cloud items. This allows you to develop without 
having to hit a production database. See https://firebase.google.com/docs/emulator-suite for more info. 


In order to start the emulator there are two pre-requirments

1.) You must java installed on your machine, see https://java.com/en/. 

2.) you must have the firebase cli installed, `npm install -g fiebase-cli`. 


