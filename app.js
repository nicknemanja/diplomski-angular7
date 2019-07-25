// Dependecies
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
var FileStore = require('session-file-store')(session);

//Connection to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '.error);
});

const sessionPaths = ["/users/register", "/users/authenticate", "/users/log-user-action",
"/users/user-info"
];

// Initializing Express
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// CORS Middleware
app.use(sessionPaths, 
  cors(
    {origin: 'http://localhost:4200'},
    {credentials: true}
  )
);

app.use(sessionPaths, bodyParser.json());

app.use(sessionPaths,cookieParser());

const port = 3000;

 app.use(sessionPaths, session({
  cookieName: 'express-session',
  secret: 'ssshhhhh',
  // duration: 30 * 30 * 60 * 1000,
  // activeDuration: 30 * 5 * 60 * 1000,
  saveUninitialized: true,
  resave: false,
  // store: new FileStore,  
  // cookie: { maxAge: 36000000,secure: false, httpOnly: false }
 }));

// Set Static folder
app.use(sessionPaths, express.static(path.join(__dirname, 'public')));

const users = require('./routes/users');
app.use('/users', users);

app.get('/', (req, res) => {
  res.cookie("test", "test");
  req.session.username = "Nemanja";
  res.send('Invalid Endpoint');
});
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
