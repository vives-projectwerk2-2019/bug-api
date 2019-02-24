// Read .env
require('dotenv').config()

// Create mariadb connection
var db = require('./src/db');
db.initialize(function(err) {
  if(err) throw err; // bad DB initialization
});

// Express router
var router = require('./src/router')

// Mqtt clients
var publisher = require('./src/publisher')
var client = require('./src/client.js')
