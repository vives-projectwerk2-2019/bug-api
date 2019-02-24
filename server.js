// Read .env
require('dotenv').config()

// Express router
var router = require('./src/router')

// Mqtt clients
var publisher = require('./src/publisher')
var client = require('./src/client.js')
