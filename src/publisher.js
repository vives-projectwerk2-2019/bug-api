var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1'); // ip van de server waarop de broker zal staan
client.on('connect', function () {

    setInterval(function() {
        client.publish('API', 'Hello mqtt'); TODO://publish to game server in JSON format
        console.log('Publisher: Message Sent');
    }, 1000);
});
