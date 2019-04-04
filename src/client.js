var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST);
let http = require('./fetch');
const processdata = require('./dataprocessor')


//This will subscribe the client on TTN and publish the right JSON object to game server!
client.on('connect', function () {
        client.subscribe('TTN');
        client.subscribe('hardware');
})

client.on('message', async (topic, message) => {
    
    var ttndata = JSON.parse(message.toString()); //parsing
    module.exports = { //for http request
        "dev_id": ttndata.dev_id,
        "user_dongle_id": ttndata.id
    }
    var p = new processdata();
    var httpdata = await http(); //fetching data

    if(topic == "TTN"){ //sending logger info to Jop
        client.publish('logger', JSON.stringify(ttndata));
    }

    var dataobj = p.checkAndProcess(ttndata, topic, httpdata);
   
    client.publish('game', JSON.stringify(dataobj));
    console.log("Publisher: " + JSON.stringify(dataobj));
})
