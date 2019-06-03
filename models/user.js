const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByID = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  console.log("33333333");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {

      if(err) {
        throw err;
      }
      
      newUser.password = hash;
      newUser.save(callback);
    })
  });
  
};

module.exports.comparePassowrd = function(candidatePassword, hashedPassword, callback){
  bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
    if (err){
      throw err;
    }
    callback(null, isMatch);
  });
};

module.exports.editUser = function(user, callback){
  let conditions = {_id: user.id};
  User.update(conditions, user, callback);
};
