const mongoose = require('mongoose');
const config = require('../config/database');

const UserActionSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  action:{
    type: String,
    required: true
  },
  data:{
    type: String,
    required: true
  },
  time : { 
    type : Date,
    default: Date.now
  }
});


const UserAction = module.exports = mongoose.model('UserAction', UserActionSchema);

module.exports.logUserAction = function(actionData, callback){
  actionData.save(callback);
}