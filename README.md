# Membrain Documentation

Find the deployed version of Membrain at: [membrain.herokuapp.com](http://membrain.herokuapp.com)

Membrain runs on the following tech stack:
- Node.js
- Express
- React
- MongoDB
- Mongoose

To start the application on a local machine:

1. Run 'npm install'.
2. Run 'npm install webpack -g'.
3. Run 'webpack --watch', 'npm start', and mongoDB on a final terminal window.

## Contributing
[Contribution guidelines for this project](CONTRIBUTING.md)

## Style Guide
[Style guidelines for this project](STYLE-GUIDE.md)

## End-Goal: ##

We envisioned a plethora of games that test mental capabilities, including but not limited to a memory card game, a word scramble game, maybe even a 'trick' game that forces the user to think 'outside the box'. The website will track the user's performance and give them a timeline showing how they've improved or not. The leaderboard will show the top 10 scores accross all users within a specific game as well as the current users highest score. Unless the game has a set number of attempts (say a 20 question test), ideally the game would have a timer on it that defines an end point when the score is calculated and submitted to the server.

## Main Components and their purposes: ##

  index.js:
  In order to provide the 'illusion' of multiple pages, react-router has to be implemented to direct react to render the proper component. This file contains all routes used to render and make available the proper html elements and the functions that interact with them.

  config.js:
  The API used here is from https://market.mashape.com/wordsapi/wordsapi. You'll be able to generate your own wordsapi key and enter it in this file.

  App.js:
  Currently renders the whole webpage through the navbar, which is the one constant element that should be rendered throughout the whole website. The state is currently not used, but is left there for future use.

  NavBar.js:
  Contains a logout function and renders the other components when the proper link is clicked on.

  SignUp.js:
  This component is a sign up form that makes posts requests to the server with data containing the username and password.
  Note: In order to keep the user logged in across components and also have persistent error messages that don't disappear after a re-render, we store the username and error messages in the local storage object. Upon a dismount, the error message local storage object is cleared but the local storage username persists.

  Login.js:
  This component is a login form that is similar to the SignUp form in that it makes posts requests to the server with data containing the username and password.
  Note: In order to keep the user logged in across components and also have persistent error messages that don't disappear after a re-render, we store the username and error messages in the local storage object. Upon a dismount, the error message local storage object is cleared but the local storage username persists.

## Back-End Components: ##

   server/users/userModel.js:
    User information is stored in a MongoDB using Mongoose as an ORM. The schema accepts a unique username field as a string (required) and a password as a string (required). User scores are recorded in an array, with the highest scores of each game in their own property. For each new game added, create a new field for the new game scores array and new game high score.

   server/users/userController.js:
    All methods that interact directly with the database are defined in userController.js. For each new game added update the getUser controller userObject to include the new game high score and array to hold all scores.

   server/server.js:
    Handles all post/get requests and connections to the DB. Also determines what route is chosen when the user clicks on 'profile' page depending on whether or not they're logged in.

    API V2 refactors the routes from the original API to a more RESTful model.

    EX:
    V1: /leaderboard is now
    V2: /api/v2/leaderboard/:gametype
    API V2 is more specific in exposing a route that returns a leaderboard for one game specified in the gametype parameter.
