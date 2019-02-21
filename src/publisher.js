var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1'); // ip van de server waarop de broker zal staan

//JSON string voor input events example
var dataInput = {
    Player: {
        name: "Jelle",
        id: 1, 
        input: "button", // don't know what this will be yet
        joined: true
    },
    Controller: {
        id: null,
        addons: ["rocket", "speedboost", "anotherthing"]
    }
};

//JSON string voor player update 


client.on('connect', function () {

    setInterval(function() {
        client.publish('API', 'Hello mqtt'); TODO://publish to game server in JSON format
        console.log('Publisher: Message Sent');
    }, 1000);
});
