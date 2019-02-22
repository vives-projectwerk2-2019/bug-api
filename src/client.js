var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://labict.be'); //ip van de server?

client.on('connect', function () {
    client.subscribe('ttn'); //subscribe op TTN
})

client.on('message', function (topic, message) {
    //TODO:how will the format be? How to process information?
    context = message.toString(); //message will be a JSON string need to parse
    
    console.log("Subscriber: " + context);
})
