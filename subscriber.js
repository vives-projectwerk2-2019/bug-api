var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://your_ip_address_of_pc'); //ip van de server?

client.on('connect', function () {
    client.subscribe('ttn'); //subscribe op TTN
})

client.on('message', function (topic, message) {
    TODO://how will the format be? How to process information?
    context = message.toString();
    console.log(context);
})