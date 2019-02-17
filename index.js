// Express
const express = require('express')
const app = express()
const port = 8080

app.get('/', function (req, res) {
    res.send('Hello World from the REST api!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// Mosca broker
const mosca = require('mosca')

var moscaSettings = {
    port: 1883
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

function setup() {
    console.log('Mosca broker is up and running')
}


// The Things Network
require('dotenv').config()
var ttn = require("ttn")
var appID = process.env.APP_ID
var accessKey = process.env.ACCESS_KEY

if (appID && accessKey) {
    ttn.data(appID, accessKey)
        .then(function (client) {
            client.on("uplink", function (devID, payload) {
                console.log("Received uplink from ", devID)
                console.log(payload)
            })
        })
        .catch(function (error) {
            console.error("Error", error)
            process.exit(1)
        })
}
