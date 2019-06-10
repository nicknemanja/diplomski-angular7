const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

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
router.post('/authenticate', (req, res, next) =>{
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


router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
