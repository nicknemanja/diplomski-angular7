// Dependecies
const express = require('express');

const session = require('express-session');

const config = require('./config/database');
const mongoose = require('mongoose');
//Connection to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '.error);
});

// Initializing Express
const app = express();

const users = require('./routes/users');

app.use(session({
    cookieName: 'session',
    secret: 'ssshhhhh',
    // duration: 30 * 30 * 60 * 1000,
    // activeDuration: 30 * 5 * 60 * 1000,
    saveUninitialized: true,
    resave: false,
    // store: new FileStore,  
    // cookie: { maxAge: 36000000,secure: false, httpOnly: false }
   }));

   app.get('/',function(req,res){
    let sess=req.session;
    // sess.userId = "Nemanja";
    // sess.save();
    res.send("Session id: " + sess.id);
});

app.post('/session1',function(req,res){
    let sess=req.session;
    // sess.userId = "Nemanja";
    // sess.save();
    res.send("Session id: " + sess.id);
});

app.post('/session2',function(req,res){
    let sess=req.session;
    // sess.userId = "Nemanja";
    // sess.save();
    res.send("Session id: " + sess.id);
});

app.use("/users", users);

app.listen(3001, () => {
    console.log('Server started on port: ' + 3001);
});