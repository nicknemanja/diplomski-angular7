const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const UserAction = require('../models/useraction');
const cors = require('cors');
const session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session({
  cookieName: 'express-session',
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: false,
  unset: 'destroy'
 }));

router.post('/register', cors(), (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", true);

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

router.post('/authenticate', cors(), (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success: false,user: {username: username}, msg: "Wrong username and/or password!"});
    }

    User.comparePassowrd(password, user.password, (err, isMatch) => {
      if(err){
        throw err;
      }

      if(isMatch) {
        let session=req.session;
        let userData = {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email
        };

        session.isLoggedIn = true;
        session.user = userData;

        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success:true,
          token: 'JWT ' + token,
          user: userData
        });
      } else{
          res.json({success:false, user: {username: username}, msg: "Wrong username and/or password!"});
      }
      return res;
    });
  });
});

router.post("/log-user-action", cors(), (req, res, next) => {
  
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);

  let userActionData = new UserAction({
    username: req.body.username,
    action: req.body.action,
    data: req.body.data
  });

  UserAction.logUserAction(userActionData, (err, user) => {
    if(err){
      res.json({success:false,"msg": "Failed to log user action."});
    }else{
      res.json({success:true, "msg": "User action logged."});
    }});
});

router.post('/user-info',  (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);

  let session=req.session;
  let userInfo = ( session.user != null ) ? session.user : {};
  
  res.json(JSON.stringify(userInfo));
});

router.post('/activity-tracking', (req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  let query = {username: req.body.username};
   UserAction.find(query, (err, data) => {
    if(err) {
      res.json({success: false, "msg": "Failed to get user activity tracking"});
    } else {
      res.json({success: true, "data": JSON.stringify(data)});
    }
  });
});

router.post("/logout", cors(), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.clearCookie("sessionId");
  res.json({success: true});
});

router.get('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);
});

module.exports = router;
