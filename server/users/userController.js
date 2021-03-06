var User = require('./userModel');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
//to remove the mongoose Promise deprecated warning
mongoose.Promise = require('bluebird');

module.exports = {
  //function for signin in user
  signup: function(req, res) {
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        //if the user profile does not exist, we will create the new user
        if (!userProfile) {
          //hashes the password
          bcrypt.hash(password, null, null, function(err, hash) {
            if (err) {
            } else {
              //create the user profile in the database and save
              var newUser = new User({
                username: username,
                password: hash,
                matchingHigh: 0,
                scrambleHigh: 0,
                typingHigh: 0,
                simonHigh: 0,
                tilesHigh: 0,
                mastermindHigh: 0,
                matchingArray: [],
                scrambleArray: [],
                typingArray: [],
                simonArray: [],
                tilesArray: [],
                mastermindArray: []
              });
              newUser.save(function(err, user) {
                if (err) {
                }
                res.sendStatus(200);
              });
            }
          });
        //if the user already exists...
        } else {
          res.send('Account already exists');
        }
      });
  },
  //function for logging in user
  login: function(req, res) {
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        if (!userProfile) {
          res.send('No user found');
        } else {
          //bcrypt compare
          bcrypt.compare(password, userProfile.password, function(err, match) {
            if (match) {
              res.send({redirect: '/#/'});
            } else {
              res.send('Password is incorrect');
            }
          });
        }
      });
  },

  logout: function(req, res) {
    res.send({redirect: '/#/'});
  },

  postScore: function(req, res, next) {
    if (req.body.username) {
      var username = req.body.username;
      var gametype = req.body.gametype;
      var score = req.body.score;
      User.findOne({username: username})
        .exec(function(err, userProfile) {
          if (err) {
            res.status(500).send(err);
          } else {
            // save score when an userProfile is found
            if (userProfile) {
              //push the score into the gametype array
              userProfile[gametype + 'Array'].push(score);
              //here we compare the request score to the saved highscore
              if (score > userProfile[gametype + 'High'] || !userProfile[gametype + 'High']) {//is the high score null
                userProfile[gametype + 'High'] = score;
              }
              userProfile.save(function(err, user) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(201).send('posted score');
                }
              });
            }
          }
        });
    }
  },

  getAll: function(req, res) {
    User.find({}).exec(function(err, users) {
      if (err) {
        res.status(500).send("There's an error");
      } else {
        res.status(200).send(users);
        //filter the users by top 10 highest scores for a specific game
      }
    });
  },

  getUser: function(req, res) {
    User.findOne({username: req.params.username}).exec(function(err, user) {
      if (err) {
        res.send(err);
      } else {
        if (user === null) {
          res.send({redirect: '/#/login'});
        } else {
          var userObject = {
            username: user.username,
            matchingHigh: user.matchingHigh,
            scrambleHigh: user.scrambleHigh,
            typingHigh: user.typingHigh,
            simonHigh: user.simonHigh,
            tilesHigh: user.tilesHigh,
            mastermindHigh: user.mastermindHigh,
            matchingArray: user.matchingArray,
            scrambleArray: user.scrambleArray,
            typingArray: user.typingArray,
            simonArray: user.simonArray,
            tilesArray: user.tilesArray,
            mastermindArray: user.mastermindArray
          };
          res.send(userObject);
        }
      }
    });
  },

  leaderBoard: function(req, res, next) {
   var gameHigh = req.params.gametype + 'High';
    User.find({}).sort('-'+gameHigh).limit(3).exec(function(err, highScoreUsers) {
      res.send(highScoreUsers); //[{username: blah, highscore: 2}, {etce}]
    });
  }

};

