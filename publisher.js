var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://your_ip_address_of_pc'); // ip van de server waarop de broker zal staan
client.on('connect', function () {

    setInterval(function() {
        client.publish('myTopic', 'Hello mqtt'); TODO://publish to game server in JSON format
        console.log('Message Sent');
    }, 5000);
});