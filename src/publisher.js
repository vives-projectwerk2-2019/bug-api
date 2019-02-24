/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 

var mqtt = require('mqtt');
var db = require('./db');

var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); // ip van de server waarop de broker zal staan

function Publisher(button, newhardware){ //not used for the moment
  this.button = JSON.parse(button); 
  this.newhardware = JSON.parse(newhardware);
}



client.on('connect', function () {

    //setInterval(function() {
        client.publish('API', 'Hello mqtt'); TODO://publish to game server in JSON format
        console.log('Publisher: Message Sent');
    //}, 1000);
});
