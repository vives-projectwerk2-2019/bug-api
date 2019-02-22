var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://localhost'); //ip van de server?

client.on('connect', function () {
    client.subscribe('API'); //subscribe op TTN
})

client.on('message', function (topic, message) {
    //TODO:how will the format be? How to process information?
    context = message.toString();
    console.log("Subscriber: " + context);
})
