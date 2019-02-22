// Read .env
require('dotenv').config()

// Create mariadb connection
var db = require('./src/db');
db.initialize(function(err) {
  if(err) throw err; // bad DB initialization
});

// Express router
var router = require('./src/router')

// Mosca broker
var broker = require('./src/broker')


// Mqtt clients

var publisher = require('./src/publisher')
