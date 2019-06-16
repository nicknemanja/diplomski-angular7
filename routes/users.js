
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const UserAction = require('../models/useraction');

// Register
router.post('/register', (req, res) => {

  let newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password : req.body.password,
    email: req.body.email
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success:false,"msg": "Failed to register user"});
    }else{
      res.json({success:true, "msg": "User registered"});
    }
  });

});

// Authenticate
router.post('/authenticate', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success: false, msg: "Wrong username and/or password!"});
    }

    User.comparePassowrd(password, user.password, (err, isMatch) => {
      if(err){
        throw err;
      }
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 //1 week
        });

        res.json({
          success:true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else{
          res.json({success:false, msg: "Wrong username and/or password!"});
      }
      return res;
    });

  });

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // unset sensitive data
  req.user.password = undefined;

  res.json({user: req.user});
});

// Validate
router.get('/validate', (req, res, next) => {
  res.send('Validate');
});

router.post('/edit', (req, res, next) => {
  let userPassword = '';
  let userData = new User({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    about: req.body.about
  });

  User.getUserByID(userData._id, (err, user) => {
    if(err){
      res.json({success:false,"msg": "Failed to edit user. User does not exist!"});
    }else{
      userData.password = user.password;
      userId = userData._id;
      User.editUser(userData, (err, user) => {
        if(err){
          res.json({success:false,"msg": "User not edited."});
        }else{
          res.json({success:true, "msg": "User edited successfully!"});
        }
      });
    }
  });


});

router.post("/log-user-action", (req, res, next) => {

  let userActionData = new UserAction({
    username: req.body.username,
    action: req.body.action,
    data: req.body.data
  });

  UserAction.logUserAction(userActionData, (err, user) => {
    if(err){
      console.log("LOG_USER_ACTION ERROR: " + JSON.stringify(err));
      res.json({success:false,"msg": "Failed to log user action."});
    }else{
      res.json({success:true, "msg": "User action logged."});
    }});

});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
