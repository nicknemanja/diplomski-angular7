const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const UserAction = require('../models/useraction');

const cors = require('cors');

const session = require('express-session');

var cookieParser = require('cookie-parser');

const sessionPaths = ["register", "authenticate", "log-user-action",
"user-info"
];

router.use(sessionPaths,cookieParser());

router.use(sessionPaths, session({
  cookieName: 'express-session',
  secret: 'ssshhhhh',
  // duration: 30 * 30 * 60 * 1000,
  // activeDuration: 30 * 5 * 60 * 1000,
  saveUninitialized: true,
  resave: false,
  // store: new FileStore,  
  // cookie: { maxAge: 36000000,secure: false, httpOnly: false }
 }));

// Register
router.post('/register', cors(), (req, res) => {

  let sess=req.session;
  console.log("Session id: " + sess.id);

  req.session.lastCheckingTime = "nemanja";
  req.session.save();

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

// Authenticate
router.post('/authenticate', cors(), (req, res, next) => {

  let sess=req.session;
  console.log("Session id: " + sess.id);

  req.session.lastCheckingTime = "nemanja";
  req.session.save();
  
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const username = req.body.username;
  res.cookie('cookieName', username);
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

        
        req.session.lastCheckingTime = "nemanja";

        let session=req.session;

        session.loggedInUser = "Nakon logina";
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
          res.json({success:false, user: {username: username}, msg: "Wrong username and/or password!"});
      }
      return res;
    });

  });

});


router.post("/log-user-action", cors(), (req, res, next) => {

  let sess=req.session;
  console.log("Session id: " + sess.id);

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

  let sess=req.session;
  console.log("Session id: " + sess.id);

  req.session.lastCheckingTime = "nemanja";
  req.session.save();
  res.setHeader('Access-Control-Allow-Credentials', true);
});

router.post('/activity-tracking', (req, res, next) => {

  let sess=req.session;
  console.log("Session id: " + sess.id);

  req.session.lastCheckingTime = "nemanja";
  req.session.save();
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

router.get("/testsesije", (req, res) => {
  let sess=req.session;
  console.log("Session id: " + sess.id);
  
});

router.get('*', (req, res) => {
  req.session.lastCheckingTime = "nemanja";
  req.session.save();
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.redirect('/');
});

module.exports = router;
